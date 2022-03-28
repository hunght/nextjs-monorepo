import type { APICredential, TradingBot, User } from '@prisma/client';

export interface Session {
  email: string;
  image: string;
  name: string;
  id: string;
}
export type Profile = User & {
  apiCredentials: APICredential[];
  currentAPICredential: APICredential | null;
};
