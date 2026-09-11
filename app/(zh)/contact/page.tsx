import Contact from "@/components/pages/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("zh", "contact");

export default function Page() {
  return <Contact locale="zh" />;
}
