// This is an example of to protect an API route

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { prismaClient } from '@/backend/config/container.config';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    const userId = session?.userId as string;
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        apiCredentials: { where: { status: 'ACTIVE' } },
        currentAPICredential: true,
      },
    });
    res.send({
      user,
    });
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};
