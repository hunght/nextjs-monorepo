import { combineReducers } from '@reduxjs/toolkit';
import { api } from './api';

import auth from './auth-slice';

const rootReducer = combineReducers({
  auth,
  [api.reducerPath]: api.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
