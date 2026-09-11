const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

// Only public assets need the explicit prefix. Next Link applies basePath itself.
export const asset = (path: string) => `${basePath}/${path}`;
export const email = "hello@yuzero.cn";
export const navigation = [
  { href: "/", label: "首页" },
  { href: "/products/", label: "公司产品" },
  { href: "/about/", label: "了解我们" },
  { href: "/contact/", label: "联系我们" },
];
