import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import credentials from 'next-auth/providers/credentials';

import prismadb from '@/lib/prismadb';

export default {
  providers: [
    credentials({
      async authorize(credentials) {
        if (
          !credentials.email ||
          !credentials.password ||
          typeof credentials.email !== 'string' ||
          typeof credentials.password !== 'string'
        ) {
          return null;
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (
          !user ||
          !user.hashedPassword ||
          !(await compare(credentials.password, user.hashedPassword))
        ) {
          return null;
        }

        return user;
      }
    })
  ]
} satisfies NextAuthConfig;
