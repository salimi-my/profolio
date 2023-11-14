import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { qualificationId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { type, degree, school, position, company, startYear, endYear } =
      body;

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!type) {
      return NextResponse.json(
        { success: false, error: 'Type is required.' },
        { status: 400 }
      );
    }

    if (type === 'EDUCATION' && !degree) {
      return NextResponse.json(
        { success: false, error: 'Degree is required.' },
        { status: 400 }
      );
    }

    if (type === 'EDUCATION' && !school) {
      return NextResponse.json(
        { success: false, error: 'School is required.' },
        { status: 400 }
      );
    }

    if (type === 'EXPERIENCE' && !position) {
      return NextResponse.json(
        { success: false, error: 'Position is required.' },
        { status: 400 }
      );
    }

    if (type === 'EXPERIENCE' && !company) {
      return NextResponse.json(
        { success: false, error: 'Company is required.' },
        { status: 400 }
      );
    }

    if (!startYear) {
      return NextResponse.json(
        { success: false, error: 'Start year is required.' },
        { status: 400 }
      );
    }

    if (!endYear) {
      return NextResponse.json(
        { success: false, error: 'End year is required.' },
        { status: 400 }
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

    const qualification = await prismadb.qualification.update({
      where: {
        id: params.qualificationId
      },
      data: {
        type,
        degree,
        school,
        position,
        company,
        startYear,
        endYear
      }
    });

    revalidatePath('/');

    return NextResponse.json({ success: true, qualification });
  } catch (error: any) {
    console.log('[QUALIFICATION_PATCH]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

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

    revalidatePath('/');

    return NextResponse.json({ success: true, qualification });
  } catch (error: any) {
    console.log('[QUALIFICATION_DELETE]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
