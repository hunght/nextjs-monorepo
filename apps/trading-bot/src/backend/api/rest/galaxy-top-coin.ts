import axios from 'axios';
import { threeCommasAPI } from '../three-commas';
import { LUNARCRUSH_API_KEY } from '@/config/env';
import {
  LUNARCRUSH_GALAXY_TOP,
  MAX_ALT_RANK_SCORE,
  MAX_GALAXY_SCORE,
  MAX_COINS,
} from '@/config/galaxy-top-coin';

const MARKET_CODE = 'binance';
const CURRENCY_PAIR_DEFAULT = 'USDT_BTC';

type Coin = {
  s: string;
  acr: number;
  v: number;
  gs: number;
};

const fetchGalaxyTopCoins = async (): Promise<{
  data: { data: Coin[] };
}> => {
  const params = {
    data: 'market',
    type: 'fast',
    sort: 'gs',
    limit: MAX_ALT_RANK_SCORE,
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
    const { data } = await fetchGalaxyTopCoins();

    const { last } = await threeCommasAPI.getCurrencyRate({
      market_code: MARKET_CODE,
      pair: CURRENCY_PAIR_DEFAULT,
    });

    const result = await threeCommasAPI.getMarketPairs({
      market_code: MARKET_CODE,
    });

    const { pairs: blackListPairs } = await threeCommasAPI.getBlackListPairs();

    const usdtPairs = result.filter((pair) => pair.includes('USDT_'));

    const pairsToUpdate = getPairsToUpdate({
      coins: data.data,
      last,
      blackListPairs,
      usdtPairs,
      minvolume,
    });
    return { success: true, data: pairsToUpdate };
  } catch (error) {
    throw new Error('Lunarcrush api crash');
  }
};

const getPairsToUpdate = ({
  coins,
  last,
  blackListPairs,
  usdtPairs,
  minvolume,
}: {
  coins: Coin[];
  last: string;
  blackListPairs: string[];
  usdtPairs: string[];
  minvolume: number;
}): string[] => {
  const pairsToUpdate = new Set<string>();
  for (let index = 0; index < coins.length; index++) {
    const item = coins[index];
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
    if (acrscore >= MAX_ALT_RANK_SCORE) {
      console.log(
        `Quote currency ${pair} is not in AltRank score top ${MAX_ALT_RANK_SCORE} (${acrscore}), skipping`
      );
      continue;
    }

    if (item.gs >= MAX_GALAXY_SCORE) {
      console.log(
        `Quote currency ${pair} is not in GALAXY score basic ${MAX_GALAXY_SCORE} (${item.gs}), skipping`
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
  return Array.from(pairsToUpdate);
};
