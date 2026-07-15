import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "煜零科技 YuZero｜智启万象，重构可能边界",
  description:
    "煜零科技以智能、数据与体验为核心，为面向未来的企业构建持续进化的数字能力。",
  keywords: ["煜零科技", "YuZero", "人工智能", "数字化转型", "数据与云", "数字体验"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
