import type { APICredential } from '@prisma/client';
import { prismaClient } from '@/backend/config/container.config';
import { ThreeCommasAPI } from '@/core/three-commas-api';

export const createThreeCommasAPI = async (
  userId: string
): Promise<{ api: APICredential; client: ThreeCommasAPI }> => {
  const user = await prismaClient.user.findUnique({
    where: { id: userId },
    include: {
      currentAPICredential: true,
    },
  });
  const api = user?.currentAPICredential;
  if (!api) {
    throw new Error('api not found');
  }
  const client = new ThreeCommasAPI({
    key: api.apiKey, // Optional if only query endpoints with no security requirement
    secrets: api.apiSecret, // Optional
    timeout: 60000, // Optional, in ms, default to 30000
    forcedMode: 'real',
    errorHandler: (response, reject) => {
      // Optional, Custom handler for 3Commas error
      const { error, error_description } = response;
      reject(new Error(error_description ?? error));
    },
  });
  return { api, client };
};
export const createThreeCommasAPIWithKey = async ({
  apiKey,
  apiSecret,
}: {
  apiKey: string;
  apiSecret: string;
}): Promise<ThreeCommasAPI> =>
  new ThreeCommasAPI({
    key: apiKey, // Optional if only query endpoints with no security requirement
    secrets: apiSecret, // Optional
    timeout: 60000, // Optional, in ms, default to 30000
    forcedMode: 'real',
    errorHandler: (response, reject) => {
      // Optional, Custom handler for 3Commas error
      const { error, error_description } = response;
      reject(new Error(error_description ?? error));
    },
  });
