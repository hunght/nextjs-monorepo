import { isNonEmptyString } from '@nexttop.dev/core-lib';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { createAPICredential } from '@/backend/services/api-credential/create';
import { STATUS_CODE } from 'type/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).send({
      error: 'You must be signed in',
    });
    return;
  }

  const userId = session?.userId;

  if (!isNonEmptyString(userId)) {
    console.error('[api-credential][index.ts] id or userId is not string', {
      userId,
    });
    res.status(STATUS_CODE.BadRequest).send({
      error: 'Invalid input',
    });
    return;
  }

  if (req.method === 'POST') {
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
};
