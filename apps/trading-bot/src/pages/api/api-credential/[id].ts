// This is an example of to protect an API route

import { isNonEmptyString } from '@nexttop.dev/core-lib';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { prismaClient } from '@/backend/config/container.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const { id } = req.query;
    if (!isNonEmptyString(id)) {
      console.error('id is not string', id);
      return false;
    }
    if (req.method === 'DELETE') {
      const userId = session?.userId as string;

      const user = await prismaClient.user.findUnique({
        where: { id: userId },
      });

      if (user?.currentAPICredentialId === id) {
        res.status(300).send({
          message: 'Can not deleted api credential default.',
        });
        return;
      }
      await prismaClient.aPICredential.update({
        data: { status: 'DELETED' },
        where: { id: id },
      });
      const data = await prismaClient.user.findUnique({
        where: { id: userId },
        include: {
          apiCredentials: { where: { status: 'ACTIVE' } },
          currentAPICredential: true,
        },
      });
      res.send({
        data,
      });
      console.log(`==== user ===`);
      console.log(user);
      console.log('==== end log ===');
    }
  } else {
    res.status(401).send({
      error: 'You must be signed in',
    });
  }
};
