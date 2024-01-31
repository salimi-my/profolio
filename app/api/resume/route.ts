import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pdf } = body;

    const user = await currentUser();

    if (!pdf) {
      return NextResponse.json(
        { success: false, error: 'File is required.' },
        { status: 400 }
      );
    }

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const currentResume = await prismadb.resume.findFirst({
      where: {
        userId: user.id
      }
    });

    if (currentResume) {
      const resume = await prismadb.resume.update({
        where: {
          id: currentResume.id
        },
        data: {
          pdf
        }
      });

      revalidatePath('/');

      return NextResponse.json({ success: true, resume });
    } else {
      const resume = await prismadb.resume.create({
        data: {
          pdf,
          userId: user.id
        }
      });

      revalidatePath('/');

      return NextResponse.json({ success: true, resume });
    }
  } catch (error: any) {
    console.log('[RESUME_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
