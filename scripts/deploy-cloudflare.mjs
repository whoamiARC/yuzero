import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const env = { ...process.env, YUZERO_PAGES_BASE_PATH: "/" };
const run = (args) => {
  const result = spawnSync(process.execPath, args, { env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run(["scripts/build-pages.mjs"]);
run(["--test", "tests/rendered-html.test.mjs"]);
run([
  require.resolve("wrangler/bin/wrangler.js"),
  "pages", "deploy", "out", "--project-name", "yuzero", "--branch", "main",
]);
