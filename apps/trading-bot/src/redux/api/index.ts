import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Profile } from 'type/user';

export interface UserResponse {
  user?: Profile;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
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
