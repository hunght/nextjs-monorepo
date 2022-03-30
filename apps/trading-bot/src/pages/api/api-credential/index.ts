// This is an example of to protect an API route

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prismaClient } from '@/backend/config/container.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    console.log(`==== req.method ===`);
    console.log(req.method);
    console.log('==== end log ===');

    if (req.method === 'POST') {
      const userId = session?.userId as string;
      const apiKey = req.body.apiKey;
      const apiSecret = req.body.apiSecret;
      const name = req.body.name;

      const credential = await prismaClient.aPICredential.create({
        data: { apiKey, apiSecret, userId, name, status: 'ACTIVE' },
      });
      const user = await prismaClient.user.update({
        where: { id: userId },
        data: { currentAPICredentialId: credential.id },
        include: {
          apiCredentials: true,
          currentAPICredential: true,
        },
      });
      res.send({
        data: user,
      });
    }
  } else {
    res.send({
      error: 'You must be signed in',
    });
  }
};
