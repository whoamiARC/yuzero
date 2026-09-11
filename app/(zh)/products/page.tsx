import Products from "@/components/pages/products";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("zh", "products");

export default function Page() {
  return <Products locale="zh" />;
}
