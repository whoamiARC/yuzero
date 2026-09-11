import Home from "@/components/pages/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("zh", "home");

export default function Page() {
  return <Home locale="zh" />;
}
