import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    formats:['image/webp'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'ipfs.io',
      // port: '',
      // pathname: '/assets/**'
    },
    {
      protocol: "https",
      hostname: "res.cloudinary.com",
    },
  
  
  ]
  },
};

export default nextConfig;
