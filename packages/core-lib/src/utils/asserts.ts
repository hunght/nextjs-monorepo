import { isNonEmptyString } from './typeguards';

export class Asserts {
  static nonEmptyString(
    value: unknown,
    msgOrExceptionFactory?: string | (() => Error) | Error,
    /** auto-trim, default true */
    trim?: boolean
  ): asserts value is string {
    const autoTrim = trim ?? true;
    if (isNonEmptyString(value, autoTrim)) {
      return;
    }
    if (
      typeof msgOrExceptionFactory === 'string' ||
      msgOrExceptionFactory === undefined
    ) {
      throw new Error(
        msgOrExceptionFactory || 'Value must be a non empty string!'
      );
    }
    if (msgOrExceptionFactory instanceof Error) {
      throw msgOrExceptionFactory;
    }
    throw msgOrExceptionFactory();
  }
}
