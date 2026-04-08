import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
   siteName : 'Organic Farms',
   baseURL: 'http://ec2-13-201-126-47.ap-south-1.compute.amazonaws.com:8055',  
  },

   appDir: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  
  trailingSlash: true,

};

export default nextConfig;
