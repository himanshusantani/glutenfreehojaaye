import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
   baseURL: 'http://34.100.205.229:8055',  
  },

  output: 'export',
  trailingSlash: true,

};

export default nextConfig;
