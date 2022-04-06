// This is an example of to protect an API route

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getUserProfile } from '@/backend/services/user/create';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.send({
      error: 'You must be signed in',
    });
    return;
  }

  const userId = session?.userId as string;
  const { data, error, code } = await getUserProfile({ userId });
  res.status(code ?? 200).send({
    data,
    error,
  });
};
