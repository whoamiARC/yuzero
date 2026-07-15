import type { NextConfig } from "next";

const isGitHubPagesExport = process.env.YUZERO_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isGitHubPagesExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
