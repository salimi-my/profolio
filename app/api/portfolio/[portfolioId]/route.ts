import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { image, thumbnail, title, description, githubUrl, demoUrl, tags } =
      body;

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

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

    if (!params.portfolioId) {
      return NextResponse.json(
        { success: false, error: 'Portfolio ID is required.' },
        { status: 400 }
      );
    }

    const portfolioFound = await prismadb.portfolio.findUnique({
      where: {
        id: params.portfolioId
      }
    });

    if (!portfolioFound) {
      return NextResponse.json(
        { success: false, error: 'Portfolio not found.' },
        { status: 400 }
      );
    }

    const portfolio = await prismadb.portfolio.update({
      where: {
        id: params.portfolioId
      },
      data: {
        image,
        thumbnail,
        title,
        description,
        githubUrl,
        demoUrl
      }
    });

    await prismadb.tag.deleteMany({
      where: {
        portfolioId: params.portfolioId
      }
    });

    const tagsCreated = await prismadb.tag.createMany({
      data: tags.map((tag: { name: string; portfolioId: string }) => ({
        name: tag.name,
        portfolioId: params.portfolioId
      }))
    });

    return NextResponse.json({ success: true, portfolio, tagsCreated });
  } catch (error: any) {
    console.log('[PORTFOLIO_PATCH]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!params.portfolioId) {
      return NextResponse.json(
        { success: false, error: 'Portfolio ID is required.' },
        { status: 400 }
      );
    }

    const portfolioFound = await prismadb.portfolio.findUnique({
      where: {
        id: params.portfolioId
      }
    });

    if (!portfolioFound) {
      return NextResponse.json(
        { success: false, error: 'Portfolio not found.' },
        { status: 400 }
      );
    }

    const portfolio = await prismadb.portfolio.delete({
      where: {
        id: params.portfolioId
      }
    });

    return NextResponse.json({ success: true, portfolio });
  } catch (error: any) {
    console.log('[PORTFOLIO_DELETE]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
