import type { TradingBot } from '@prisma/client';
import type { Profile, Session } from 'type/user';

export interface TradingBotState {
  mode: Mode;
  bots: TradingBot[];
}
export type Mode = 'real' | 'paper';
