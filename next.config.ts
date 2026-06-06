import type { NextConfig } from "next";

// Fix SSL certificate verification error with Node.js 25 + external image hosts
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos",  port: "", pathname: "/**" },
      { protocol: "https", hostname: "placehold.co",   port: "", pathname: "/**" },
    ],
  },
};

export default nextConfig;
