import { compare } from 'bcrypt';
import prismadb from '@/lib/prismadb';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required.');
        }

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user.hashedPassword) {
          throw new Error('Incorrect email or password.');
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error('Incorrect email or password.');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/sign-in'
  },
  debug: process.env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },
  secret: process.env.NEXTAUTH_SECRET
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
