import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

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
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      {children}
    </div>
  );
}
