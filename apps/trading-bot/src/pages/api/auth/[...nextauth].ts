import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';

import EmailProvider from 'next-auth/providers/email';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

import { prismaClient } from '@/backend/config/container.config';
import * as EmailServices from '@/backend/services/email';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export default NextAuth({
  adapter: PrismaAdapter(prismaClient),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest(data) {
        EmailServices.sendVerificationRequest(data);
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? '',
      clientSecret: process.env.FACEBOOK_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      return session;
    },
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    },
  },
});
