import { prismaClient } from '@/backend/config/container.config';
import type { Result } from 'type/api';
import { STATUS_CODE } from 'type/api';

import type { Profile } from 'type/user';
import { createThreeCommasAPIWithKey } from '../trading-bot/three-commas';

type Props = {
  apiKey: string;
  apiSecret: string;
  userId: string;
  name: string;
};

export const createAPICredential = async ({
  apiKey,
  apiSecret,
  userId,
  name,
}: Props): Promise<Result<Profile>> => {
  try {
    const api = await createThreeCommasAPIWithKey({ apiKey, apiSecret });
    const data = await api.getBlackListPairs();

    const credential = await prismaClient.aPICredential.create({
      data: { apiKey, apiSecret, userId, name, status: 'ACTIVE' },
    });
    const user = await prismaClient.user.update({
      where: { id: userId },
      data: { currentAPICredentialId: credential.id },
      include: {
        apiCredentials: { where: { status: 'ACTIVE' } },
        currentAPICredential: true,
      },
    });

    return { data: user };
  } catch (error) {
    console.log(`[createAPICredential] ${error}`);
    return { error: `${error}`, code: STATUS_CODE.InternalServerError };
  }
};
