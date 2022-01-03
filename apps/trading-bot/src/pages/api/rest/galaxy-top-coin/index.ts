import { JsonApiResponseFactory } from '@nexttop.dev/core-lib/api/json-api';
import { JsonApiErrorFactory } from '@nexttop.dev/core-lib/api/json-api/json-api-error.factory';
import { MethodNotAllowed } from '@tsed/exceptions';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { THREE_COMMAS_API_KEY, THREE_COMMAS_SECRET_KEY } from '@/config/env';
import { ThreeCommasAPI } from '@/core/three-commas-api';

const api = new ThreeCommasAPI({
  key: THREE_COMMAS_API_KEY, // Optional if only query endpoints with no security requirement
  secrets: THREE_COMMAS_SECRET_KEY, // Optional
  timeout: 60000, // Optional, in ms, default to 30000
  forcedMode: 'real',
  errorHandler: (response, reject) => {
    // Optional, Custom handler for 3Commas error
    const { error, error_description } = response;
    reject(new Error(error_description ?? error));
  },
});
const MAX_ACR_SCORE = 100;
const MAX_COINS = 10;
const LUNARCRUSH_GALAXY_TOP = 'https://api.lunarcrush.com/v2';
const BOT_ID = 7616300;
const getGalaxyTopCoins = async (): Promise<{
  data: { data: { s: string; acr: number; v: number }[] };
}> => {
  const params = {
    data: 'market',
    type: 'fast',
    sort: 'gs',
    limit: 100,
    key: 'q9xjgw91cmq0bre4o8ol29',
    desc: true,
  };

  return axios.get(LUNARCRUSH_GALAXY_TOP, { params });
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export default async function handleListPoems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { data } = await getGalaxyTopCoins();
      const pairsToUpdate = new Set<string>();
      const bot = await api.getBot(BOT_ID);
      const minvolume = bot.min_volume_btc_24h ?? 0;
      const { last } = await api.getCurrencyRate({
        market_code: 'binance',
        pair: 'USDT_BTC',
      });

      const result = await api.getMarketPairs({ market_code: 'binance' });
      const usdtPairs = result.filter((pair) => pair.includes('USDT_'));
      for (let index = 0; index < data.data.length; index++) {
        const item = data.data[index];
        const acrscore = item.acr;

        const volbtc = item.v / Number(last) ?? 0;

        const pair = `USDT_${item.s}`;

        //  Check if coin has minimum 24h volume as set in bot
        if (volbtc < minvolume) {
          console.log(
            `Quote currency ${pair} does not have enough 24h BTC volume (${volbtc}), skipping`
          );
          continue;
        }

        //  Check if coin has minimum AltRank score
        if (acrscore > MAX_ACR_SCORE) {
          console.log(
            `Quote currency ${pair} is not in AltRank score top ${MAX_ACR_SCORE} (${acrscore}), skipping`
          );
          continue;
        }

        if (usdtPairs.includes(pair)) {
          pairsToUpdate.add(pair);
        }
        if (Array.from(pairsToUpdate).length >= MAX_COINS) {
          break;
        }
      }
      const pairs = Array.from(pairsToUpdate);

      const updateBot = await api.updateBot({
        bot_id: BOT_ID,
        bot: { ...bot, pairs: pairs },
      });

      return res.json(updateBot);
    } catch (e) {
      const apiError = JsonApiErrorFactory.fromCatchVariable(e);
      return res
        .status(apiError.status ?? 500)
        .json(JsonApiResponseFactory.fromError(apiError));
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
