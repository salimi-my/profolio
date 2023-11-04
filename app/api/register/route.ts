import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, confirm } = body;

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

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required.' },
        { status: 400 }
      );
    }

    if (!confirm) {
      return NextResponse.json(
        { success: false, error: 'Confirm password is required.' },
        { status: 400 }
      );
    }

    if (password !== confirm) {
      return NextResponse.json(
        { success: false, error: 'Passwords does not match.' },
        { status: 400 }
      );
    }

    const existingUser = await prismadb.user.findUnique({
      where: {
        email
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email is already taken.' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        hashedPassword,
        image: '',
        emailVerified: new Date()
      }
    });

    return NextResponse.json({ success: true, user });
  } catch (error: any) {
    console.log('[REGISTER_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
