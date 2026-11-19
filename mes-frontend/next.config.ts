import type { NextConfig } from "next";
import path from "path";

const isProduction = process.env.NODE_ENV === 'production'
const nextConfig: NextConfig = {
  output: "export",
  ...(isProduction && {
    basePath: "/group/three/2",
  }),
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
