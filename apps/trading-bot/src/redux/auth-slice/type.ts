import type { Profile, Session } from 'type/user';

export interface AuthState {
  token?: string;
  status: Status;
  session?: Session;
  profile?: Profile;
}
export type Status = 'authenticated' | 'unauthenticated' | 'loading';
