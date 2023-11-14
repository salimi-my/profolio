import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, thumbnail, name, color } = body;

    const session = await auth();

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image is required.' },
        { status: 400 }
      );
    }

    if (!thumbnail) {
      return NextResponse.json(
        { success: false, error: 'Thumbnail is required.' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!color) {
      return NextResponse.json(
        { success: false, error: 'Color is required.' },
        { status: 400 }
      );
    }

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const tool = await prismadb.tool.create({
      data: {
        image,
        thumbnail,
        name,
        color,
        userId: session?.user?.id
      }
    });

    revalidatePath('/');

    return NextResponse.json({ success: true, tool });
  } catch (error: any) {
    console.log('[TOOL_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
