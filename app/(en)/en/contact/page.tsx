import Contact from "@/components/pages/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "contact");

export default function Page() {
  return <Contact locale="en" />;
}
