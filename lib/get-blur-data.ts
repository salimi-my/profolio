import { Prisma } from '@prisma/client';
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

type PortfolioWithTags = Prisma.PortfolioGetPayload<{
  include: { tags: true };
}>;

type PortfolioWithBlur = PortfolioWithTags & {
  blurredDataUrl?: string;
};

export default async function addBlurredDataUrls(
  portfolios: PortfolioWithBlur[]
): Promise<PortfolioWithBlur[]> {
  // Make all requests at once instead of awaiting each one - avoiding a waterfall
  const base64Promises = portfolios.map((portfolio) =>
    getBase64(portfolio.image!)
  );

  // Resolve all requests in order
  const base64Results = await Promise.all(base64Promises);

  const portfolioWithBlur: PortfolioWithBlur[] = portfolios.map(
    (portfolio, index) => {
      portfolio.blurredDataUrl = base64Results[index];
      return portfolio;
    }
  );

  return portfolioWithBlur;
}
