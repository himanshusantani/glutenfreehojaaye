import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    baseURL: 'https://headora.ocodecommerce.com',
  },

  output: 'export',
  trailingSlash: true,

};

export default nextConfig;
