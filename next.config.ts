import type { NextConfig } from "next";

const isGitHubPagesExport = process.env.YUZERO_STATIC_EXPORT === "true";
const githubPagesBasePath = process.env.YUZERO_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isGitHubPagesExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
        ...(githubPagesBasePath ? { basePath: githubPagesBasePath } : {}),
      }
    : {}),
};

export default nextConfig;
