import { prismaClient } from '@/backend/config/container.config';
import type { Result } from 'type/api';
import { STATUS_CODE } from 'type/api';

import type { Profile } from 'type/user';
import { createThreeCommasAPI } from '../trading-bot/three-commas';

type Props = {
  userId: string;
};

export const getBots = async ({ userId }: Props): Promise<Result<Profile>> => {
  try {
    const api = await createThreeCommasAPI(userId);
    const data = await api.getBots();
    console.log(`==== data ===`);
    console.log(data);
    console.log('==== end log ===');

    return { data };
  } catch (error) {
    console.log(`[getBots] ${error}`);
    return { error: `${error}`, code: STATUS_CODE.InternalServerError };
  }
};
