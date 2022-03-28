import { isNonEmptyString } from './typeguards';

export function isPresent<T>(
  v: T,
  msgOrErrorFactory?: string | (() => Error)
): asserts v is NonNullable<T> {
  if (v === null || v == undefined) {
    throw createException(msgOrErrorFactory, 'Value is null or undefined.');
  }
}

export function safeInteger(
  v: unknown,
  msgOrErrorFactory?: string | (() => Error)
): asserts v is number {
  if (typeof v !== 'number' || !Number.isSafeInteger(v)) {
    throw createException(msgOrErrorFactory, 'Value is not a safe integer');
  }
}

export function nonEmptyString(
  v: unknown,
  msgOrErrorFactory?: string | (() => Error),
  /** auto-trim, default true */
  trim?: boolean
): asserts v is string {
  if (!isNonEmptyString(v, trim ?? true)) {
    throw createException(msgOrErrorFactory);
  }
}

export const never = (v: never, msg?: string): never => {
  throw new Error(msg ?? 'Unexpected value');
};

const createException = (
  msgOrErrorFactory?: string | (() => Error),
  fallbackMsg?: string
): Error => {
  if (
    typeof msgOrErrorFactory === 'string' ||
    msgOrErrorFactory === undefined
  ) {
    throw new Error(
      msgOrErrorFactory ?? fallbackMsg ?? 'Assertion did not pass.'
    );
  }
  throw msgOrErrorFactory();
};
