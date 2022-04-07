import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { api } from 'redux/api';

import type { Mode, TradingBotState } from './type';

const initialState: TradingBotState = { mode: 'real', bots: [] };

const slice = createSlice({
  name: 'trading-bot',
  initialState: initialState,
  reducers: {
    setTradingMode: (state, { payload }: PayloadAction<Mode>) => {
      state.mode = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.tradingBots.matchFulfilled,
      (state, { payload }) => {
        state.bots = payload.data;
      }
    );
  },
});
export const { setTradingMode } = slice.actions;

export default slice.reducer;
