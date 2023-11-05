import prismadb from '@/lib/prismadb';
import type { About } from '@prisma/client';

interface Data {
  about: About | null;
}

export default async function getData(): Promise<Data> {
  const [about] = await prismadb.$transaction([prismadb.about.findFirst()]);

  return { about };
}
