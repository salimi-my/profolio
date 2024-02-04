import { v4 as uuidv4 } from 'uuid';
import prismadb from '@/lib/prismadb';

export async function generateDownloadToken(email: string) {
  const token = uuidv4();

  // Expire the token in 10 minutes
  const expires = new Date(new Date().getTime() + 10 * 60 * 1000);

  const existingToken = await prismadb.downloadToken.findFirst({
    where: {
      email
    }
  });

  if (existingToken) {
    await prismadb.downloadToken.delete({
      where: {
        id: existingToken.id
      }
    });
  }

  const downloadToken = await prismadb.downloadToken.create({
    data: {
      email,
      token,
      expires
    }
  });

  return downloadToken;
}
