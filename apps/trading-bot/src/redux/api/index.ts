import type { APICredential } from '@prisma/client';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import type { Profile } from 'type/user';

export interface UserResponse {
  user?: Profile;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    userProfile: builder.query<UserResponse, void>({
      query: () => ({
        url: 'user/profile',
        method: 'GET',
      }),
    }),
    userCreateAPICredential: builder.mutation<
      UserResponse,
      Pick<APICredential, 'apiKey' | 'apiSecret' | 'name'>
    >({
      query: (postData) => ({
        url: `api-credential`,
        method: 'POST',
        body: postData,
      }),
    }),
  }),
});

export const { useLazyUserProfileQuery, useUserCreateAPICredentialMutation } =
  api;
