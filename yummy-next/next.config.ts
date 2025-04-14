import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH, /* 기본적인 basepath를 지정해줌. */ 
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;