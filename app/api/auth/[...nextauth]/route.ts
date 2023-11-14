import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';

import { config } from '@/lib/auth';

export const handler: NextAuthOptions = NextAuth(config);

export { handler as GET, handler as POST };
