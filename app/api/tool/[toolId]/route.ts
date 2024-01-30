import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function PATCH(
  req: Request,
  { params }: { params: { toolId: string } }
) {
  try {
    const user = await currentUser();

    const body = await req.json();
    const { image, thumbnail, name, color } = body;

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

    revalidatePath('/');

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
    const user = await currentUser();

    if (!user || !user.id) {
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

    revalidatePath('/');

    return NextResponse.json({ success: true, tool });
  } catch (error: any) {
    console.log('[TOOL_DELETE]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
