import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.AUTH_URL
    ? `${process.env.AUTH_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/'
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
