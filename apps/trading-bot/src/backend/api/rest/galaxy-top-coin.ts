import axios from 'axios';
import { threeCommasAPI } from '../three-commas';
import { LUNARCRUSH_API_KEY } from '@/config/env';
import {
  LUNARCRUSH_GALAXY_TOP,
  MAX_ACR_SCORE,
  MAX_COINS,
} from '@/config/galaxy-top-coin';

const fetchGalaxyTopCoins = async (): Promise<{
  data: { data: { s: string; acr: number; v: number }[] };
}> => {
  const params = {
    data: 'market',
    type: 'fast',
    sort: 'gs',
    limit: 100,
    key: LUNARCRUSH_API_KEY,
    desc: true,
  };

  return axios.get(LUNARCRUSH_GALAXY_TOP, { params });
};

export const getGalaxyTopCoins = async ({
  minvolume,
}: {
  minvolume: number;
}): Promise<{ data: string[]; success: boolean }> => {
  try {
    const pairsToUpdate = new Set<string>();
    const { data } = await fetchGalaxyTopCoins();

    const { last } = await threeCommasAPI.getCurrencyRate({
      market_code: 'binance',
      pair: 'USDT_BTC',
    });

    const result = await threeCommasAPI.getMarketPairs({
      market_code: 'binance',
    });

    const { pairs: blackListPairs } = await threeCommasAPI.getBlackListPairs();

    const usdtPairs = result.filter((pair) => pair.includes('USDT_'));
    for (let index = 0; index < data.data.length; index++) {
      const item = data.data[index];
      const acrscore = item.acr;

      const volbtc = item.v / Number(last ?? 0) ?? 0;

      const pair = `USDT_${item.s}`;

      //  Check if coin has minimum 24h volume as set in bot
      if (volbtc < minvolume) {
        console.log(
          `Quote currency ${pair} does not have enough 24h BTC volume (${volbtc}), skipping`
        );
        continue;
      }

      if (blackListPairs.includes(pair)) {
        console.log(`Quote currency ${pair} is in BlackList Pairs, skipping`);
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
    return { success: true, data: Array.from(pairsToUpdate) };
  } catch (error) {
    throw new Error('Lunarcrush api crash');
  }
};
