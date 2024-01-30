import bcrypt, { compare } from 'bcryptjs';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, current, password, confirm } = body;

    const user = await currentUser();

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

    if (!user || !user.id) {
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

    const loggedInUser = await prismadb.user.findUnique({
      where: {
        id: user.id
      }
    });

    if (!loggedInUser || !loggedInUser.hashedPassword) {
      return NextResponse.json(
        { success: false, error: 'Account does not exist.' },
        { status: 400 }
      );
    }

    const isCorrectPassword = await compare(
      current,
      loggedInUser.hashedPassword
    );

    if (!isCorrectPassword) {
      return NextResponse.json(
        { success: false, error: 'Wrong current password.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const updatedUser = await prismadb.user.update({
      where: {
        id: loggedInUser.id
      },
      data: {
        name,
        email,
        hashedPassword
      }
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error: any) {
    console.log('[ACCOUNT_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
