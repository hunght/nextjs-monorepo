import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { api } from 'redux/api';

import type { AuthState } from './type';

const initialState: AuthState = { token: undefined, status: 'unauthenticated' };

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { status, token, session: user },
      }: PayloadAction<Partial<AuthState>>
    ) => {
      if (status) {
        state.status = status;
      }
      state.token = token;
      state.session = user;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addMatcher(
  //     api.endpoints.userProfile.matchFulfilled,
  //     (state, { payload }) => {
  //       state.profile = payload.user;
  //     }
  //   );
  // },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', state, action.payload);
      return {
        ...state,
        ...action.payload.subject,
      };
    },
  },
});
export const { setCredentials } = slice.actions;

export default slice.reducer;
