import { auth } from '@/auth';

export async function currentUser() {
  const session = await auth();

  return session?.user;
}
