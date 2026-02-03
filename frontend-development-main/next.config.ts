import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  async rewrites() {
    if (!isDev) return [];

    return [
      {
        source: "/api/:path*",
        destination: "https://dharnpt0p4.execute-api.ap-south-2.amazonaws.com/:path*",
        //destination: "https://zzkin6wpq1.execute-api.ap-south-1.amazonaws.com/dev/:path*",
      },
    ];
  },
};

export default nextConfig;
