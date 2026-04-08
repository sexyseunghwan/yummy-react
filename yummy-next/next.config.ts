import type { NextConfig } from "next";
import path from "path";

// basePath: process.env.NEXT_PUBLIC_BASE_PATH, /* 기본적인 basepath를 지정해줌. */

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  // swcMinify는 Next.js 15에서 기본값이므로 제거

  // 프로젝트 루트 명시적으로 지정 (workspace root 경고 해결)
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;