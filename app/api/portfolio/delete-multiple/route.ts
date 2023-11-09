import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const datas = body;

    const session = await auth();

    if (!datas) {
      return NextResponse.json(
        { success: false, error: 'Data is empty.' },
        { status: 400 }
      );
    }

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    await prismadb.portfolio.deleteMany({
      where: {
        userId: session?.user?.id!,
        id: {
          in: datas.map((data: any) => data.id)
        }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.log('[PORTFOLIO_DELETE_MULTIPLE_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
