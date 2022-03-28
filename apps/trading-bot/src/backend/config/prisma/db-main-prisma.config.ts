import {
  getDevSafeInstance,
  PrismaClientDbMain,
} from '@nexttop.dev/db-main-prisma';
import { NODE_ENV, PRISMA_DATABASE_URL } from '@/config/env';

const isDev = NODE_ENV === 'development';

export const getPrismaClientDbMain: () => PrismaClientDbMain = () => {
  const url = PRISMA_DATABASE_URL;

  return getDevSafeInstance('db-main', () => {
    const prismaClient = new PrismaClientDbMain({
      datasources: {
        db: {
          url: url,
        },
      },
      errorFormat: isDev ? 'pretty' : 'colorless',
      log: [
        {
          level: 'query',
          emit: 'event',
        },
        {
          level: 'error',
          emit: 'stdout',
        },
        {
          level: 'info',
          emit: 'stdout',
        },
        {
          level: 'warn',
          emit: 'stdout',
        },
      ],
    });
    if (isDev) {
      prismaClient.$on('query', (e) => {
        console.log('Query: ' + e.query);
        console.log('Duration: ' + e.duration + 'ms');
      });
    }
    return prismaClient;
  });
};
