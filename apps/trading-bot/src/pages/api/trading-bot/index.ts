import { isNonEmptyString } from '@nexttop.dev/core-lib';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { getBots } from '@/backend/services/trading-bot/get-bots';

import { STATUS_CODE } from 'type/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).send({
      error: 'You must be signed in',
    });
  }
  const userId = session?.userId;

  if (!isNonEmptyString(userId)) {
    console.error('[trading-bot][index.ts]  userId is not string', {
      userId,
    });
    res.status(STATUS_CODE.BadRequest).send({
      error: 'Invalid input',
    });
    return;
  }

  if (req.method === 'GET') {
    const { data, error, code } = await getBots({ userId });
    return res.status(code ?? 200).send({
      data,
      error,
    });
  }
  return res.status(STATUS_CODE.Forbidden).send({
    error: `Method name is not supported =${req.method}`,
  });
};
