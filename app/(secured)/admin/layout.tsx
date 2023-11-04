import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return <>{children}</>;
}
