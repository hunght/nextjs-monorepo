/**
 * Convenience singleton to help dealing with fast-refresh
 * and connection limits in development mode.
 */
import type { Prisma, PrismaClient } from '@prisma/client';
export type PrismaClientOptions = Prisma.PrismaClientOptions;
export type PrismaClientDbMain = PrismaClient;

declare let global: {
  __PRISMA_INSTANCES__: Record<string, PrismaClient> | undefined;
};

let instances: Record<string, PrismaClient>;

/**
 * Create and maintain a prismaClient instance that avoids issues with
 * db connections limit exhaustion in dev mode.
 *
 * In dev mode the prisma instance is kept unique by using a `global` reference
 * preventing issues with Fast-Refresh / Hot-Module-Replacement (HMR) strategies
 *
 * @see {@link https://pris.ly/d/help/next-js-best-practices|Prisma NextJs Best Practices}
 */

export const getDevSafeInstance = (
  instanceKey: string,
  prismaClientFactory: () => PrismaClient
): PrismaClient => {
  if (process.env.NODE_ENV === 'production') {
    if (!instances?.[instanceKey]) {
      instances ??= {};
      instances[instanceKey] = prismaClientFactory();
    }
    return instances[instanceKey];
  } else {
    // PrismaClient is attached to the `global` object in development to prevent
    // exhausting your database connection limit.
    if (!global.__PRISMA_INSTANCES__?.[instanceKey]) {
      global.__PRISMA_INSTANCES__ ??= {};
      global.__PRISMA_INSTANCES__[instanceKey] = prismaClientFactory();
      console.debug(
        '[PrismaFactory.createDevSafeInstance]: Dev instance created and preserved globally.'
      );
    }
    return global.__PRISMA_INSTANCES__[instanceKey];
  }
};
