import { JsonApiResponseFactory } from '@nexttop.dev/core-lib/api/json-api';
import { JsonApiErrorFactory } from '@nexttop.dev/core-lib/api/json-api/json-api-error.factory';
import { MethodNotAllowed } from '@tsed/exceptions';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { prismaClient } from '@/backend/config/container.config';
import { THREE_COMMAS_API_KEY, THREE_COMMAS_SECRET_KEY } from '@/config/env';
import { ThreeCommasAPI } from '@/core/three-commas-api';

const api = new ThreeCommasAPI({
  key: THREE_COMMAS_API_KEY, // Optional if only query endpoints with no security requirement
  secrets: THREE_COMMAS_SECRET_KEY, // Optional
  timeout: 60000, // Optional, in ms, default to 30000
  forcedMode: 'paper',
  errorHandler: (response, reject) => {
    // Optional, Custom handler for 3Commas error
    const { error, error_description } = response;
    reject(new Error(error_description ?? error));
  },
});
const MAX_COINS = 10;
const LUNARCRUSH_GALAXY_TOP =
  'https://api.lunarcrush.com/v2?data=market&type=fast&sort=gs&limit=50&key=asdf&desc=True';
const LUNARCRUSH_ALT_RANK =
  'https://api.lunarcrush.com/v2?data=market&type=fast&sort=acr&limit=50&key=asdf';

const getGalaxyTopCoins = async (): Promise<{
  data: { data: { s: string }[] };
}> => {
  return axios.get(LUNARCRUSH_GALAXY_TOP);
};
const getAltRankCoins = async (): Promise<{
  data: { data: { s: string }[] };
}> => {
  return axios.get(LUNARCRUSH_ALT_RANK);
};
export default async function handleListPoems(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { data } = await getGalaxyTopCoins();
      const pairsToUpdate = new Set<string>();
      // const bots = await api.getBots();
      const bot = await api.getBot(7481843);

      const result = await api.getMarketPairs({ market_code: 'binance' });
      const usdtPairs = result.filter((pair) => pair.includes('USDT_'));
      for (let index = 0; index < data.data.length; index++) {
        const { s } = data.data[index];
        const pair = `USDT_${s}`;
        if (usdtPairs.includes(pair)) {
          pairsToUpdate.add(pair);
        }
        if (Array.from(pairsToUpdate).length >= MAX_COINS) {
          break;
        }
      }
      const pairs = Array.from(pairsToUpdate);

      const updateBot = await api.updateBot({
        bot_id: 7481843,
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
