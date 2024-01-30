import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items } = body;

    const user = await currentUser();

    if (items.length < 1) {
      return NextResponse.json(
        { success: false, error: 'Service is required.' },
        { status: 400 }
      );
    }

    items.map((item: { service: string; type: string }) => {
      if (!item.service) {
        return NextResponse.json(
          { success: false, error: 'Service is required.' },
          { status: 400 }
        );
      }

      if (!item.type) {
        return NextResponse.json(
          { success: false, error: 'Type is required.' },
          { status: 400 }
        );
      }
    });

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    await prismadb.expertise.deleteMany({
      where: {
        userId: user.id,
        type: items[0].type
      }
    });

    const expertises = await prismadb.expertise.createMany({
      data: items.map((item: { service: string; type: string }) => ({
        service: item.service,
        type: item.type,
        userId: user.id
      }))
    });

    revalidatePath('/');

    return NextResponse.json({ success: true, expertises });
  } catch (error: any) {
    console.log('[EXPERTISE_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
