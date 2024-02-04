import { Resend } from 'resend';
import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { generateDownloadToken } from '@/lib/token';
import DownloadLinkEmail from '@/components/emails/download-link-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company } = body;

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

    const existingDownloader = await prismadb.resumeDownloader.findFirst({
      where: {
        email
      }
    });

    if (!existingDownloader) {
      await prismadb.resumeDownloader.create({
        data: {
          name,
          email,
          company: company || null
        }
      });
    }

    const downloadToken = await generateDownloadToken(email);

    const data = await resend.emails.send({
      from: 'Salimi <no-reply@salimi.my>',
      to: [email],
      subject: 'CV Download Link',
      react: DownloadLinkEmail({ name, downloadToken: downloadToken.token })
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    let message;

    if (error instanceof Error) {
      message = error.message;
    } else {
      message = String(error);
    }

    console.log('[GENERATE_LINK_POST]', error);

    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
