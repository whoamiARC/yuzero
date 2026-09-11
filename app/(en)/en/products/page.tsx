import Products from "@/components/pages/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "products");

export default function Page() {
  return <Products locale="en" />;
}
