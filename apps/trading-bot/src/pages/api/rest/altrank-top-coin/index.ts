import { JsonApiResponseFactory } from '@nexttop.dev/core-lib/api/json-api';
import { JsonApiErrorFactory } from '@nexttop.dev/core-lib/api/json-api/json-api-error.factory';
import { MethodNotAllowed } from '@tsed/exceptions';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getAltRankTopCoins } from '@/backend/api/rest/altrank-top-coin';

import { channelId, slackClient } from '@/backend/api/slack';
import { threeCommasAPI } from '@/backend/api/three-commas';
import { BOT_ID } from '@/config/galaxy-top-coin';

export default async function altRankTopCoin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const bot = await threeCommasAPI.getBot(BOT_ID);
    let updatePairs: string[] = [];
    try {
      const minvolume = bot.min_volume_btc_24h ?? 0;

      const { data: pairs } = await getAltRankTopCoins({
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
