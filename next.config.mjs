/** @type {import('next').NextConfig} */
import withPlaiceholder from '@plaiceholder/next';
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev'
      }
    ]
  }
};

export default withPlaiceholder(nextConfig);
