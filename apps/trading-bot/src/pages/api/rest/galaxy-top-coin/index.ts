import { JsonApiResponseFactory } from '@nexttop.dev/core-lib/api/json-api';
import { JsonApiErrorFactory } from '@nexttop.dev/core-lib/api/json-api/json-api-error.factory';
import { MethodNotAllowed } from '@tsed/exceptions';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getGalaxyTopCoins } from '@/backend/api/rest/galaxy-top-coin';
import { channelId, slackClient } from '@/backend/api/slack';
import { threeCommasAPI } from '@/backend/api/three-commas';
import { BOT_ID } from '@/config/galaxy-top-coin';

export default async function handleListPoems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const bot = await threeCommasAPI.getBot(BOT_ID);
    try {
      const minvolume = bot.min_volume_btc_24h ?? 0;

      const { data: pairs } = await getGalaxyTopCoins({ minvolume });

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
