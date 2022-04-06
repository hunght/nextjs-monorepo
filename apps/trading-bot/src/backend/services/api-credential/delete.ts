import { prismaClient } from '@/backend/config/container.config';
import type { Result } from 'type/api';
import { STATUS_CODE } from 'type/api';
import type { Profile } from 'type/user';

type Props = {
  userId: string;
  apiCredentialId: string;
};

export const deleteAPICredential = async ({
  userId,
  apiCredentialId,
}: Props): Promise<Result<Profile>> => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
    });

    if (user?.currentAPICredentialId === apiCredentialId) {
      console.error(
        '[deleteAPICredential] Can not deleted api credential default.'
      );
      return {
        error: 'Can not deleted api credential default.',
        code: STATUS_CODE.Forbidden,
      };
    }
    await prismaClient.aPICredential.update({
      data: { status: 'DELETED' },
      where: { id: apiCredentialId },
    });
    const data = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        apiCredentials: { where: { status: 'ACTIVE' } },
        currentAPICredential: true,
      },
    });
    return { data };
  } catch (error) {
    console.error(`[deleteAPICredential] ${error}`);
    return { error: `${error}`, code: STATUS_CODE.InternalServerError };
  }
};
