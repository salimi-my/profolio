import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';
import { ModeToggle } from '@/components/mode-toggle';
import ViewWebsite from '@/components/secured/view-website';

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (session && session.user) {
    redirect('/admin');
  }

  return (
    <>
      <div className='sticky z-30 top-5 w-full flex justify-end px-5 space-x-2'>
        <ViewWebsite newTab />
        <ModeToggle />
      </div>
      <div className='w-full h-[calc(100vh_-_32px)] flex flex-col justify-center items-center px-5'>
        {children}
      </div>
    </>
  );
}
