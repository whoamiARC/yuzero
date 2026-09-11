import SiteShell from "@/components/site-shell";
import { siteMetadata } from "@/lib/metadata";
import "../globals.css";

export const metadata = siteMetadata;

export default function ChineseLayout({ children }: { children: React.ReactNode }) {
  return <html lang="zh-CN"><body><SiteShell locale="zh">{children}</SiteShell></body></html>;
}
