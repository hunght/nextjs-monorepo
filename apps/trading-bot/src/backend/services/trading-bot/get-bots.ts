import type { TradingBot } from '@prisma/client';

import moment from 'moment';
import { prismaClient } from '@/backend/config/container.config';
import type { Result } from 'type/api';
import { STATUS_CODE } from 'type/api';
import { createThreeCommasAPI } from '../trading-bot/three-commas';

type Props = {
  userId: string;
};

export const getBots = async ({
  userId,
}: Props): Promise<Result<TradingBot[]>> => {
  try {
    const { client, api } = await createThreeCommasAPI(userId);

    if (api.lastSync) {
      const duration = moment.duration(moment().diff(api.lastSync));
      const minutes = duration.asMinutes();
      console.log(`==== minutes ===`);
      console.log(minutes);
      console.log('==== end log ===');

      if (minutes > 5) {
        const bots = await prismaClient.tradingBot.findMany({
          where: { apiCredentialId: api.id },
        });
        return { data: bots };
      }
    }
    const data = await client.getBots();
    const apiId = api.id;
    const promises = data.map(
      async (bot) =>
        await prismaClient.tradingBot.upsert({
          where: {
            botId_apiCredentialId: {
              botId: bot.id.toString(),
              apiCredentialId: apiId,
            },
          },
          create: {
            botId: bot.id.toString(),
            name: bot.name,
            userId,
            status: 'ACTIVE',
            rawData: bot,
            apiCredentialId: apiId,
          },
          update: { name: bot.name, rawData: bot },
        })
    );
    const bots = await Promise.all(promises);
    await prismaClient.aPICredential.update({
      where: { id: api.id },
      data: { lastSync: moment().toDate() },
    });
    return { data: bots };
  } catch (error) {
    console.log(`[getBots] ${error}`);
    return { error: `${error}`, code: STATUS_CODE.InternalServerError };
  }
};
