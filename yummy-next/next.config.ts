import type { NextConfig } from "next";

// basePath: process.env.NEXT_PUBLIC_BASE_PATH, /* 기본적인 basepath를 지정해줌. */ 
  
const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;