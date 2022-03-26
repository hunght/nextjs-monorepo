import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { Profile } from 'type/user';

export interface UserResponse {
  user?: Profile;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    userProfile: builder.query<UserResponse, void>({
      query: () => ({
        url: 'api/user/profile',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyUserProfileQuery } = api;
