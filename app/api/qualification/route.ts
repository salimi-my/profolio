import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, degree, school, position, company, startYear, endYear } =
      body;

    const user = await currentUser();

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

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const qualification = await prismadb.qualification.create({
      data: {
        type,
        degree,
        school,
        position,
        company,
        startYear,
        endYear,
        userId: user.id
      }
    });

    revalidatePath('/');

    return NextResponse.json({ success: true, qualification });
  } catch (error) {
    console.log('[QUALIFICATION_POST]', error);

    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
