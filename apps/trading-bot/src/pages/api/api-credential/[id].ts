import { isNonEmptyString } from '@nexttop.dev/core-lib';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { deleteAPICredential } from '@/backend/services/api-credential/delete';
import { STATUS_CODE } from 'type/api';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(STATUS_CODE.Unauthorized).send({
      error: 'You must be signed in',
    });
  }
  const { id } = req.query;
  const userId = session?.userId;

  if (!isNonEmptyString(id) || !isNonEmptyString(userId)) {
    console.error('[api-credential][id.ts] id or userId is not string', {
      id,
      userId,
    });
    res.status(STATUS_CODE.BadRequest).send({
      error: 'Invalid input',
    });
    return;
  }

  if (req.method === 'DELETE') {
    const { data, error, code } = await deleteAPICredential({
      userId,
      apiCredentialId: id,
    });

    res.status(code ?? 200).send({
      data,
      error,
    });
  }
};
