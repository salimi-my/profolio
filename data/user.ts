import prismadb from '@/lib/prismadb';

export async function getUserByEmail(email: string) {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        email
      }
    });

    return user;
  } catch {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id
      }
    });

    return user;
  } catch {
    return null;
  }
}
