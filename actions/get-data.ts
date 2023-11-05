import prismadb from '@/lib/prismadb';
import type { About, Experience, Expertise } from '@prisma/client';

interface Data {
  about: About | null;
  frontend: Experience[];
  backend: Experience[];
  seooptimization: Expertise[];
  webdevelopment: Expertise[];
  contentcreation: Expertise[];
}

export default async function getData(): Promise<Data> {
  const [
    about,
    frontend,
    backend,
    seooptimization,
    webdevelopment,
    contentcreation
  ] = await prismadb.$transaction([
    prismadb.about.findFirst(),
    prismadb.experience.findMany({
      where: {
        type: 'FRONTEND'
      }
    }),
    prismadb.experience.findMany({
      where: {
        type: 'BACKEND'
      }
    }),
    prismadb.expertise.findMany({
      where: {
        type: 'SEOOPTIMIZATION'
      }
    }),
    prismadb.expertise.findMany({
      where: {
        type: 'WEBDEVELOPMENT'
      }
    }),
    prismadb.expertise.findMany({
      where: {
        type: 'CONTENTCREATION'
      }
    })
  ]);

  return {
    about,
    frontend,
    backend,
    seooptimization,
    webdevelopment,
    contentcreation
  };
}
