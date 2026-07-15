import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextCli = require.resolve("next/dist/bin/next");
const siteBasePath = process.env.YUZERO_PAGES_BASE_PATH ?? "/yuzero";

const result = spawnSync(process.execPath, [nextCli, "build"], {
  env: {
    ...process.env,
    YUZERO_STATIC_EXPORT: "true",
    YUZERO_PAGES_BASE_PATH: siteBasePath,
    NEXT_PUBLIC_SITE_BASE_PATH: siteBasePath,
  },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
