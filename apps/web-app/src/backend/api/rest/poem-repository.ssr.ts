import type { UnPromisify } from '@nexttop.dev/core-lib';
import type { PrismaClientDbMain } from '@nexttop.dev/db-main-prisma';
import { InternalServerError } from '@tsed/exceptions';

export type GetPoems = UnPromisify<
  ReturnType<typeof PoemRepositorySsr['prototype']['getPoems']>
>;

export class PoemRepositorySsr {
  constructor(private prisma: PrismaClientDbMain) {}

  /**
   * @throws Error
   */
  getPoems = async (options?: { limit?: number; offset?: number }) => {
    const { limit, offset } = options ?? {};
    try {
      return await this.prisma.poem.findMany({
        skip: offset,
        take: limit,
        orderBy: { author: 'desc' },
      });
    } catch (e) {
      console.log(`==== e ===`);
      console.log(e);
      console.log('==== end log ===');

      throw new InternalServerError(`Poems can't be retrieved`, e);
    }
  };
}
