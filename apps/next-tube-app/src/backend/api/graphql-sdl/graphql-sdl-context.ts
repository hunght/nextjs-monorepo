import type { PrismaClientDbMain } from '@nexttop.dev/db-main-prisma';
import { prismaClient } from '@/backend/config/container.config';

export type GraphqlSdlContext = {
  prisma: PrismaClientDbMain;
};

export const graphqlSdlContext: GraphqlSdlContext = {
  prisma: prismaClient,
};
