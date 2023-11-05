import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { experience, project, worldwide, summary } = body;

    const session = await auth();

    if (!experience) {
      return NextResponse.json(
        { success: false, error: 'Wxperience is required.' },
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

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const currentAbout = await prismadb.about.findFirst({
      where: {
        userId: session?.user?.id!
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

      return NextResponse.json({ success: true, about });
    } else {
      const about = await prismadb.about.create({
        data: {
          experience,
          project,
          worldwide,
          summary,
          userId: session.user.id!
        }
      });

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
