import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import getBlurDataUrl from '@/data/image-blur';
import { currentUser } from '@/lib/authentication';

export async function PATCH(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const user = await currentUser();

    const body = await req.json();
    const { image, thumbnail, title, description, githubUrl, demoUrl, tags } =
      body;

    if (!user || !user.id) {
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

    const blurDataUrl = await getBlurDataUrl(image);

    const portfolio = await prismadb.portfolio.update({
      where: {
        id: params.portfolioId
      },
      data: {
        image,
        thumbnail,
        blurDataUrl,
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

    revalidatePath('/');

    return NextResponse.json({ success: true, portfolio, tagsCreated });
  } catch (error) {
    console.log('[PORTFOLIO_PATCH]', error);

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

export async function DELETE(
  _req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user.id) {
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

    revalidatePath('/');

    return NextResponse.json({ success: true, portfolio });
  } catch (error) {
    console.log('[PORTFOLIO_DELETE]', error);

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
