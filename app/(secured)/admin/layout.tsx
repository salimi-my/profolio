import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import ModalProvider from '@/providers/modal-provider';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect('/api/auth/signin');
  }

  return (
    <>
      <ModalProvider />
      {children}
    </>
  );
}
