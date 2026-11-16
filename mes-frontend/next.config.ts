import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // output: "export",
  // basePath: "/group/three/2",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
