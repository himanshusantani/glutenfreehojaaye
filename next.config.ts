import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
   siteName : 'Organic Farms',
   baseURL: 'http://34.100.205.229:8055',  
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
