import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prismadb from '@/lib/prismadb';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in'
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        return token;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    }
  },
  ...authConfig,
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(prismadb),
  debug: process.env.NODE_ENV !== 'production'
});
