export enum STATUS_CODE {
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  InternalServerError = 500,
}
export type Result<T> = {
  error?: string;
  code?: STATUS_CODE;
  data?: T | null;
};
