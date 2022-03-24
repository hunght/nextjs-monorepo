import { createSlice } from '@reduxjs/toolkit';

import { api } from 'redux/api';

import type { AuthState } from './type';

const initialState: AuthState = { token: undefined };
const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
      }
    );
  },
});

export default slice.reducer;
