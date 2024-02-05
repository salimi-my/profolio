import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import prismadb from '@/lib/prismadb';
import authConfig from '@/auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  update
} = NextAuth({
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in'
  },
  callbacks: {
    async session({ token, session, trigger, newSession }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      if (
        session.user &&
        trigger === 'update' &&
        newSession?.name &&
        newSession?.email
      ) {
        session.user.name = newSession.name;
        session.user.email = newSession.email;
      }

      return session;
    },
    async jwt({ user, token, trigger, session }) {
      if (user) {
        token.sub = user.id;
      }

      if (!user) {
        return token;
      }

      const existingUser = await prismadb.user.findUnique({
        where: {
          id: token.sub
        }
      });

      if (!existingUser) {
        return token;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;

      if (trigger === 'update' && session?.name && session?.email) {
        token.name = session.name;
        token.email = session.email;
      }

      return token;
    }
  },
  adapter: PrismaAdapter(prismadb),
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  ...authConfig
});
