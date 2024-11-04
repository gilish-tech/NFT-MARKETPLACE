import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'ipfs.io',
      // port: '',
      // pathname: '/assets/**'
    }]
  },
};

export default nextConfig;
