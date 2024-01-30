import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

import prismadb from '@/lib/prismadb';
import { currentUser } from '@/lib/authentication';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      email,
      messengerName,
      messengerUrl,
      discordUsername,
      discordUrl,
      facebookUrl,
      instagramUrl,
      twitterUrl,
      linkedinUrl,
      githubUrl,
      cvUrl,
      titles
    } = body;

    const user = await currentUser();

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    if (!messengerName) {
      return NextResponse.json(
        { success: false, error: 'Messenger name is required.' },
        { status: 400 }
      );
    }

    if (!messengerUrl) {
      return NextResponse.json(
        { success: false, error: 'Messenger URL is required.' },
        { status: 400 }
      );
    }

    if (!discordUsername) {
      return NextResponse.json(
        { success: false, error: 'Discord username is required.' },
        { status: 400 }
      );
    }

    if (!discordUrl) {
      return NextResponse.json(
        { success: false, error: 'Discord URL is required.' },
        { status: 400 }
      );
    }

    if (!facebookUrl) {
      return NextResponse.json(
        { success: false, error: 'Facebook URL is required.' },
        { status: 400 }
      );
    }

    if (!instagramUrl) {
      return NextResponse.json(
        { success: false, error: 'Instagram URL is required.' },
        { status: 400 }
      );
    }

    if (!twitterUrl) {
      return NextResponse.json(
        { success: false, error: 'Twitter URL is required.' },
        { status: 400 }
      );
    }

    if (!linkedinUrl) {
      return NextResponse.json(
        { success: false, error: 'LinkedIn URL is required.' },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { success: false, error: 'GitHub URL is required.' },
        { status: 400 }
      );
    }

    if (!cvUrl) {
      return NextResponse.json(
        { success: false, error: 'CSV URL is required.' },
        { status: 400 }
      );
    }

    if (titles.length < 1) {
      return NextResponse.json(
        { success: false, error: 'Titles is required.' },
        { status: 400 }
      );
    }

    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthenticated.' },
        { status: 401 }
      );
    }

    const currentMiscellaneous = await prismadb.miscellaneous.findFirst({
      where: {
        userId: user.id
      }
    });

    if (currentMiscellaneous) {
      const miscellaneous = await prismadb.miscellaneous.update({
        where: {
          id: currentMiscellaneous.id
        },
        data: {
          email,
          messengerName,
          messengerUrl,
          discordUsername,
          discordUrl,
          facebookUrl,
          instagramUrl,
          twitterUrl,
          linkedinUrl,
          githubUrl,
          cvUrl
        }
      });

      await prismadb.title.deleteMany({
        where: {
          miscellaneousId: currentMiscellaneous.id
        }
      });

      const titlesCreated = await prismadb.title.createMany({
        data: titles.map(
          (title: { name: string; miscellaneousId: string }) => ({
            name: title.name,
            miscellaneousId: miscellaneous.id
          })
        )
      });

      revalidatePath('/');

      return NextResponse.json({ success: true, miscellaneous, titlesCreated });
    } else {
      const miscellaneous = await prismadb.miscellaneous.create({
        data: {
          email,
          messengerName,
          messengerUrl,
          discordUsername,
          discordUrl,
          facebookUrl,
          instagramUrl,
          twitterUrl,
          linkedinUrl,
          githubUrl,
          cvUrl,
          userId: user.id
        }
      });

      const titlesCreated = await prismadb.title.createMany({
        data: titles.map(
          (title: { name: string; miscellaneousId: string }) => ({
            name: title.name,
            miscellaneousId: miscellaneous.id
          })
        )
      });

      revalidatePath('/');

      return NextResponse.json({ success: true, miscellaneous, titlesCreated });
    }
  } catch (error: any) {
    console.log('[MISCELLANEOUS_POST]', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
