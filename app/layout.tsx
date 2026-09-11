import type { Metadata } from "next";
import SiteShell from "@/components/site-shell";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.yuzero.com"),
  title: {
    default: "YuZero 煜零科技｜从零出发，让想法成为产品",
    template: "%s｜YuZero 煜零科技",
  },
  description: "认识煜零科技（YuZero）与旗下产品：YuZero Go 本地生活配送、CET通 1.0 与 2.0 英语四六级备考、CoFate 因果 AI 多人叙事社交。",
  keywords: ["煜零科技", "YuZero", "YuZero Go", "CET通", "CoFate", "因果", "数字产品", "软件开发"],
  alternates: { canonical: "/" },
  icons: { icon: `${basePath}/yuzero-logo.png`, apple: `${basePath}/yuzero-logo.png` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
