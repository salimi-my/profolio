import { NextResponse } from 'next/server';
import { getDownloadUrl } from '@edgestore/react/utils';

import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'No download token provided.' },
        { status: 400 }
      );
    }

    const existingToken = await prismadb.downloadToken.findFirst({
      where: {
        token
      }
    });

    if (!existingToken) {
      return NextResponse.json(
        { success: false, error: 'Download token does not exist.' },
        { status: 400 }
      );
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return NextResponse.json(
        { success: false, error: 'Download token has expired.' },
        { status: 400 }
      );
    }

    const resume = await prismadb.resume.findFirst();

    if (!resume || !resume.pdf) {
      return NextResponse.json(
        { success: false, error: 'Resume does not exist.' },
        { status: 400 }
      );
    }

    const response = await fetch(resume.pdf);

    return new Response(response.body, {
      headers: {
        ...response.headers,
        'content-disposition': `attachment; filename="salimi-resume.pdf"`
      }
    });
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    console.log('[DOWNLOAD_FILE_POST]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
