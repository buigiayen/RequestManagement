import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["console.emcvietnam.vn", "hanoicomputercdn.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "console.emcvietnam.vn",
        port: "9000",
        pathname: "/requestmanager-object/images/**",
      },
    ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
};

export default nextConfig;
