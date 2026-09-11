import SiteShell from "@/components/site-shell";
import { siteMetadata } from "@/lib/metadata";
import "../../globals.css";

export const metadata = siteMetadata;

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><SiteShell locale="en">{children}</SiteShell></body></html>;
}
