import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // images: {
  //   domains: ["frontend-test-api.digitalcreative.cn"],
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frontend-test-api.digitalcreative.cn",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
