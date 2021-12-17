import { sayHello } from '@nexttop.dev/core-lib';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function ApiHelloRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return res.send(sayHello('world loaded from /api/hello'));
}
