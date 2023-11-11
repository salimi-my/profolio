import bcrypt, { compare } from 'bcrypt';
import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, current, password, confirm } = body;

    const session = await auth();

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    if (!current) {
      return NextResponse.json(
        { success: false, error: 'Current password is required.' },
        { status: 400 }
      );
    }

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'New password is required.' },
        { status: 400 }
      );
    }

    if (!confirm) {
      return NextResponse.json(
        { success: false, error: 'Confirm password is required.' },
        { status: 400 }
      );
    }

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (password !== confirm) {
      return NextResponse.json(
        { success: false, error: 'Passwords does not match.' },
        { status: 400 }
      );
    }

    const currentUser = await prismadb.user.findUnique({
      where: {
        id: session.user.id
      }
    });

    if (!currentUser || !currentUser.hashedPassword) {
      return NextResponse.json(
        { success: false, error: 'Account does not exist.' },
        { status: 400 }
      );
    }

    const isCorrectPassword = await compare(
      current,
      currentUser.hashedPassword
    );

    if (!isCorrectPassword) {
      return NextResponse.json(
        { success: false, error: 'Wrong current password.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.update({
      where: {
        id: currentUser.id
      },
      data: {
        name,
        email,
        hashedPassword
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.log('[ACCOUNT_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
