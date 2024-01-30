import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { experience, project, worldwide, summary } = body;

    const user = await currentUser();

    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Experience is required.' },
        { status: 400 }
      );
    }

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project is required.' },
        { status: 400 }
      );
    }

    if (!worldwide) {
      return NextResponse.json(
        { success: false, error: 'Worldwide is required.' },
        { status: 400 }
      );
    }

    if (!summary) {
      return NextResponse.json(
        { success: false, error: 'Summary is required.' },
        { status: 400 }
      );
    }

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const currentAbout = await prismadb.about.findFirst({
      where: {
        userId: user.id
      }
    });

    if (currentAbout) {
      const about = await prismadb.about.update({
        where: {
          id: currentAbout.id
        },
        data: {
          experience,
          project,
          worldwide,
          summary
        }
      });

      revalidatePath('/');

      return NextResponse.json({ success: true, about });
    } else {
      const about = await prismadb.about.create({
        data: {
          experience,
          project,
          worldwide,
          summary,
          userId: user.id
        }
      });

      revalidatePath('/');

      return NextResponse.json({ success: true, about });
    }
  } catch (error: any) {
    console.log('[ABOUT_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
