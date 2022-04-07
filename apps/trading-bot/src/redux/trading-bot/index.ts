import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { api } from 'redux/api';

import type { TradingBotState } from './type';

const initialState: TradingBotState = { mode: 'real' };

const slice = createSlice({
  name: 'trading-bot',
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { status, token, session: user },
      }: PayloadAction<Partial<TradingBotState>>
    ) => {
      if (status) {
        state.status = status;
      }
      state.token = token;
      state.session = user;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.userProfile.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload.data;
      }
    );
    builder.addMatcher(
      api.endpoints.deleteAPICredential.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload.data;
      }
    );
    builder.addMatcher(
      api.endpoints.createAPICredential.matchFulfilled,
      (state, { payload }) => {
        state.profile = payload.data;
      }
    );
  },
});
export const { setCredentials } = slice.actions;

export default slice.reducer;
