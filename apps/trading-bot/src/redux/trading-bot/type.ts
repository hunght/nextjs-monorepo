import type { Profile, Session } from 'type/user';

export interface TradingBotState {
  mode: Mode;
}
export type Mode = 'real' | 'paper';
