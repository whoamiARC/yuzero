import About from "@/components/pages/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "about");

export default function Page() {
  return <About locale="en" />;
}
