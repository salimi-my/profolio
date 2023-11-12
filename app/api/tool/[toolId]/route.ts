import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prismadb from '@/lib/prismadb';

export async function PATCH(
  req: Request,
  { params }: { params: { toolId: string } }
) {
  try {
    const session = await auth();
    const body = await req.json();
    const { image, thumbnail, name, color } = body;

    if (!session || !session.user || !session.user.id) {
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

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!color) {
      return NextResponse.json(
        { success: false, error: 'Color is required.' },
        { status: 400 }
      );
    }

    if (!params.toolId) {
      return NextResponse.json(
        { success: false, error: 'Tool ID is required.' },
        { status: 400 }
      );
    }

    const toolFound = await prismadb.tool.findUnique({
      where: {
        id: params.toolId
      }
    });

    if (!toolFound) {
      return NextResponse.json(
        { success: false, error: 'Tool not found.' },
        { status: 400 }
      );
    }

    const tool = await prismadb.tool.update({
      where: {
        id: params.toolId
      },
      data: {
        image,
        thumbnail,
        name,
        color
      }
    });

    return NextResponse.json({ success: true, tool });
  } catch (error: any) {
    console.log('[TOOL_PATCH]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { toolId: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    if (!params.toolId) {
      return NextResponse.json(
        { success: false, error: 'Tool ID is required.' },
        { status: 400 }
      );
    }

    const toolFound = await prismadb.tool.findUnique({
      where: {
        id: params.toolId
      }
    });

    if (!toolFound) {
      return NextResponse.json(
        { success: false, error: 'Tool not found.' },
        { status: 400 }
      );
    }

    const tool = await prismadb.tool.delete({
      where: {
        id: params.toolId
      }
    });

    return NextResponse.json({ success: true, tool });
  } catch (error: any) {
    console.log('[TOOL_DELETE]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
