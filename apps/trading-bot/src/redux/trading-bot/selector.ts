import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '../rootReducer';

export const selectIsAuthenticated = createSelector(
  (state: RootState) => state.auth.token,

  (accessToken) => (accessToken ? false : true)
);
