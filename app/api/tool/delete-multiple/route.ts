import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const datas = body;

    const user = await currentUser();

    if (!datas) {
      return NextResponse.json(
        { success: false, error: 'Data is empty.' },
        { status: 400 }
      );
    }

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    await prismadb.tool.deleteMany({
      where: {
        userId: user.id,
        id: {
          in: datas.map((data: any) => data.id)
        }
      }
    });

    revalidatePath('/');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log('[TOOL_DELETE_MULTIPLE_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
