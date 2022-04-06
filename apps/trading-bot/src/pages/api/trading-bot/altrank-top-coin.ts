import { isNonEmptyString } from '@nexttop.dev/core-lib';
import { JsonApiResponseFactory } from '@nexttop.dev/core-lib/api/json-api';
import { JsonApiErrorFactory } from '@nexttop.dev/core-lib/api/json-api/json-api-error.factory';
import { MethodNotAllowed } from '@tsed/exceptions';

import type { NextApiRequest, NextApiResponse } from 'next';

import { getSession } from 'next-auth/react';
import { channelId, slackClient } from '@/backend/services/slack';

import { getAltRankTopCoins } from '@/backend/services/trading-bot/altrank-top-coin';
import { createThreeCommasAPI } from '@/backend/services/trading-bot/three-commas';
import { BOT_ID } from '@/config/galaxy-top-coin';

export default async function altRankTopCoin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) {
    res.send({
      error: 'You must be signed in',
    });
    return;
  }

  const userId = session?.userId;
  if (!isNonEmptyString(userId)) {
    console.error('[trading-bot][altRankTopCoin] id or userId is not string', {
      userId,
    });
    res.status(400).send({
      error: 'Invalid input',
    });
    return;
  }
  if (req.method === 'GET') {
    const threeCommasAPI = await createThreeCommasAPI(userId);
    const bot = await threeCommasAPI.getBot(BOT_ID);
    let updatePairs: string[] = [];
    try {
      const minvolume = bot.min_volume_btc_24h ?? 0;

      const { data: pairs } = await getAltRankTopCoins({
        userId,
        minvolume,
      });
      updatePairs = pairs;
      if (pairs.length < bot.max_active_deals) {
        await threeCommasAPI.disableBot(bot.id);
        await slackClient.chat.postMessage({
          channel: channelId,
          text: `
        ==== start log ===
        Disabled bot name: ${bot.name}
        Pairs: ${JSON.stringify(updatePairs)}
        ==== end log ===
        `,
        });
        return res.status(500).json({
          message: 'disabled trade bot',
          apiError: JsonApiResponseFactory.fromError('apiError'),
        });
      }
      if (!bot.is_enabled) {
        await threeCommasAPI.enableBot(bot.id);
      }
      const updateBot = await threeCommasAPI.updateBot({
        bot: { ...bot, pairs: pairs },
      });
      await slackClient.chat.postMessage({
        channel: channelId,
        text: `
        ==== start log ===
        ${JSON.stringify(updateBot.pairs)}
        ==== end log ===
        `,
      });
      return res.json(updateBot);
    } catch (e) {
      await threeCommasAPI.disableBot(bot.id);
      await slackClient.chat.postMessage({
        channel: channelId,
        text: `
        ==== start log ===
        Disabled bot name: ${bot.name}
        Pairs: ${JSON.stringify(updatePairs)}
        ==== end log ===
        `,
      });
      const apiError = JsonApiErrorFactory.fromCatchVariable(e);
      return res.status(apiError.status ?? 500).json({
        message: 'disabled trade bot',
        apiError: JsonApiResponseFactory.fromError(apiError),
      });
    }
  } else {
    return res
      .status(MethodNotAllowed.STATUS)
      .json(
        JsonApiResponseFactory.fromError(
          `The HTTP ${req.method} method is not supported at this route.`,
          MethodNotAllowed.STATUS
        )
      );
  }
}
