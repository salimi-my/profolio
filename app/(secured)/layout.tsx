import { auth } from '@/lib/auth';
import SessionProvider from '@/providers/session-provider';

export default async function SecuredLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
