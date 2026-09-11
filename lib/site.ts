const basePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

// Only public assets need the explicit prefix. Next Link applies basePath itself.
export const asset = (path: string) => `${basePath}/${path}`;
export const email = "hello@yuzero.cn";
// Native language links cross root layouts and work before JavaScript loads.
export const siteHref = (path: string) => `${basePath}${path}`;
