// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log(`==== session ===`);
  console.log(session);
  console.log('==== end log ===');

  if (session) {
    res.send({
      content:
        'This is protected content. You can access this content because you are signed in.',
    });
  } else {
    res.send({
      error:
        'You must be signed in to view the protected content on this page.',
    });
  }
};
