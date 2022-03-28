export * as Asserts from './utils/asserts';
export * as ArrayUtils from './utils/array-utils';
export * as RandomUtils from './utils/random-utils';

export * from './utils/typeguards';
export type { UnPromisify } from './utils/type-utils';

export const sayHello = (name: string): string => {
  return `I'm the @nexttop.dev/ui-lib component telling ${name} !`;
};
