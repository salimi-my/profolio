import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { image, thumbnail, title, description, githubUrl, demoUrl, tags } =
      body;

    const session = await auth();

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image is required.' },
        { status: 400 }
      );
    }

    if (!thumbnail) {
      return NextResponse.json(
        { success: false, error: 'Thumbnail is required.' },
        { status: 400 }
      );
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Title is required.' },
        { status: 400 }
      );
    }

    if (!description) {
      return NextResponse.json(
        { success: false, error: 'Description is required.' },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { success: false, error: 'GitHub URL is required.' },
        { status: 400 }
      );
    }

    if (!demoUrl) {
      return NextResponse.json(
        { success: false, error: 'Demo URL is required.' },
        { status: 400 }
      );
    }

    if (tags.length < 1) {
      return NextResponse.json(
        { success: false, error: 'Tags is required.' },
        { status: 400 }
      );
    }

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const portfolio = await prismadb.portfolio.create({
      data: {
        image,
        thumbnail,
        title,
        description,
        githubUrl,
        demoUrl,
        userId: session?.user?.id!
      }
    });

    const tagsCreated = await prismadb.tag.createMany({
      data: tags.map((tag: { name: string; portfolioId: string }) => ({
        name: tag.name,
        portfolioId: portfolio.id
      }))
    });

    return NextResponse.json({ success: true, portfolio, tagsCreated });
  } catch (error: any) {
    console.log('[PORTFOLIO_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
