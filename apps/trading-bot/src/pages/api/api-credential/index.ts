// This is an example of to protect an API route

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createAPICredential } from '@/backend/services/api-credential/create';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (session) {
    if (req.method === 'POST') {
      const userId = session?.userId as string;
      const apiKey = req.body.apiKey;
      const apiSecret = req.body.apiSecret;
      const name = req.body.name;

      const { data, error, code } = await createAPICredential({
        apiKey,
        apiSecret,
        userId,
        name,
      });
      res.status(code ?? 200).send({
        data,
        error,
      });
    }
  } else {
    res.status(401).send({
      error: 'You must be signed in',
    });
  }
};
