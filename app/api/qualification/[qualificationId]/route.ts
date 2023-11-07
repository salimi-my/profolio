import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function DELETE(
  _req: Request,
  { params }: { params: { qualificationId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!params.qualificationId) {
      return NextResponse.json(
        { success: false, error: 'Qualification ID is required.' },
        { status: 400 }
      );
    }

    const qualificationFound = await prismadb.qualification.findUnique({
      where: {
        id: params.qualificationId
      }
    });

    if (!qualificationFound) {
      return NextResponse.json(
        { success: false, error: 'Qualification not found.' },
        { status: 400 }
      );
    }

    const qualification = await prismadb.qualification.delete({
      where: {
        id: params.qualificationId
      }
    });

    return NextResponse.json({ success: true, qualification });
  } catch (error: any) {
    console.log('[QUALIFICATION_DELETE]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
