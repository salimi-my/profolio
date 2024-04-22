import { getPlaiceholder } from 'plaiceholder';

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`);
    }

    const buffer = await res.arrayBuffer();

    const { base64 } = await getPlaiceholder(Buffer.from(buffer));

    return base64;
  } catch (e) {
    if (e instanceof Error) console.log(e.stack);
  }
}

export default async function getBlurDataUrl(
  imageUrl: string
): Promise<string | undefined> {
  const blurDataUrl = await getBase64(imageUrl);

  return blurDataUrl;
}
