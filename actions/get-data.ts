import prismadb from '@/lib/prismadb';
import type { About, Experience } from '@prisma/client';

interface Data {
  about: About | null;
  frontend: Experience[];
  backend: Experience[];
}

export default async function getData(): Promise<Data> {
  const [about, frontend, backend] = await prismadb.$transaction([
    prismadb.about.findFirst(),
    prismadb.experience.findMany({
      where: {
        type: 'frontend'
      }
    }),
    prismadb.experience.findMany({
      where: {
        type: 'backend'
      }
    })
  ]);

  return { about, frontend, backend };
}
