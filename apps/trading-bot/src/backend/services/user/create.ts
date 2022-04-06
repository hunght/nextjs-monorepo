import { prismaClient } from '@/backend/config/container.config';
import type { Result } from 'type/api';
import { STATUS_CODE } from 'type/api';

import type { Profile } from 'type/user';

type Props = {
  userId: string;
};

export const getUserProfile = async ({
  userId,
}: Props): Promise<Result<Profile>> => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        apiCredentials: { where: { status: 'ACTIVE' } },
        currentAPICredential: true,
      },
    });
    return { data: user };
  } catch (error) {
    console.log(`[getUserProfile] ${error}`);
    return { error: `${error}`, code: STATUS_CODE.InternalServerError };
  }
};
