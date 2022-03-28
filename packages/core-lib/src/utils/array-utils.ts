import { getRandomInt } from './random-utils';

export const getRandom = <T>(items: T[]): T => {
  return items[getRandomInt(0, items.length - 1)];
};

export const removeItem = <T>(arr: T[], item: T): T[] => {
  const index = arr.indexOf(item);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export const notEmpty = <TValue>(
  value: TValue | null | undefined
): value is TValue => {
  return !(value === null || value === undefined);
};
