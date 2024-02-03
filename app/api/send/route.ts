import { Resend } from 'resend';
import { NextResponse } from 'next/server';

import ContactEmail from '@/components/emails/contact-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

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

    if (!subject) {
      return NextResponse.json(
        { success: false, error: 'Subject is required.' },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required.' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: 'My Website <no-reply@salimi.my>',
      to: ['contact@salimi.my'],
      reply_to: email,
      subject: subject,
      react: ContactEmail({ email, name, message })
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.log('[SEND_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
