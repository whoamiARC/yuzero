import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);
const configuredBasePath = process.env.YUZERO_PAGES_BASE_PATH;
const basePath = configuredBasePath === "/" ? "" : (configuredBasePath ?? "/yuzero");
const routes = [
  { path: "/", label: "首页", title: "YuZero 煜零科技", section: "hero" },
  { path: "/products/", label: "公司产品", title: "公司产品", section: "products" },
  { path: "/about/", label: "了解我们", title: "了解我们", section: "about" },
  { path: "/contact/", label: "联系我们", title: "联系我们", section: "contact" },
];
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const documents = new Map();
for (const route of routes) {
  const html = await readFile(new URL(route.path.slice(1) + "index.html", outputRoot), "utf8");
  documents.set(route.path, { html, markup: html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "") });
}

for (const route of routes) {
  const { html, markup } = documents.get(route.path);

  test(`${route.path} exports its own content, metadata and active navigation`, () => {
    assert.match(markup, /<html[^>]*lang="zh-CN"/);
    assert.ok(markup.includes(`<title>${route.title}`));
    assert.equal((markup.match(/<h1\b/g) ?? []).length, 1);
    assert.match(markup, /name="description" content="[^"]+"/);
    const canonical = [...markup.matchAll(/<link\b[^>]*>/g)].map((match) => match[0]).find((tag) => attribute(tag, "rel") === "canonical");
    assert.equal(attribute(canonical ?? "", "href"), "https://www.yuzero.com" + route.path);
    const navigation = markup.match(/<nav[^>]*aria-label="主导航"[\s\S]*?<\/nav>/)?.[0] ?? "";
    for (const destination of routes) assert.ok(navigation.includes(`href="${basePath}${destination.path}"`));
    const activeLinks = [...navigation.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)];
    assert.equal(activeLinks.length, 1);
    assert.equal(attribute(activeLinks[0][0], "href"), basePath + route.path);
    assert.doesNotMatch(markup, /Your site is taking shape|react-loading-skeleton/);
  });

  test(`${route.path} has valid page links, anchors and accessibility targets`, () => {
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    for (const match of markup.matchAll(/\baria-(?:labelledby|controls)="([^"]+)"/g)) {
      for (const id of match[1].split(/\s+/)) assert.ok(ids.includes(id), `Missing accessible target: ${id}`);
    }
    for (const match of markup.matchAll(/<a\b[^>]*>/g)) {
      const tag = match[0];
      const href = attribute(tag, "href") ?? "";
      assert.ok(href && href !== "#");
      assert.doesNotMatch(href, /localhost|127\.0\.0\.1|javascript:/);
      if (href.startsWith("#")) assert.ok(ids.includes(href.slice(1)), `Missing anchor: ${href}`);
      if (href.startsWith("/")) {
        assert.ok(href.startsWith(basePath + "/"), `Missing base path: ${href}`);
        const [path, hash] = href.slice(basePath.length).split("#");
        const target = documents.get(path);
        assert.ok(target, `Missing exported page: ${href}`);
        if (hash) assert.ok(target.markup.includes(`id="${hash}"`));
      }
      if (attribute(tag, "target") === "_blank") {
        assert.match(attribute(tag, "rel") ?? "", /\bnoopener\b/);
        assert.match(attribute(tag, "rel") ?? "", /\bnoreferrer\b/);
      }
    }
    assert.match(markup, /<button[^>]*aria-expanded="false"[^>]*aria-controls="mobile-navigation"/);
    assert.match(markup, /<nav[^>]*id="mobile-navigation"[^>]*hidden=""/);
  });

  test(`${route.path} references real assets with the correct deployment prefix`, async () => {
    const paths = new Set();
    for (const match of html.matchAll(/<(?:img|script|link)\b[^>]*>/g)) {
      const path = attribute(match[0], "src") ?? attribute(match[0], "href");
      if (path?.startsWith("/")) paths.add(path.split(/[?#]/)[0]);
    }
    assert.ok(paths.size > 2);
    for (const path of paths) {
      assert.ok(path.startsWith(basePath + "/"), `Missing asset prefix: ${path}`);
      const relative = decodeURIComponent(path.slice(basePath.length + 1));
      assert.ok(relative && !relative.split("/").includes(".."));
      const info = await stat(new URL(relative, outputRoot));
      assert.ok(info.isFile() && info.size > 0, `Missing asset: ${path}`);
    }
    for (const match of markup.matchAll(/<img\b[^>]*>/g)) {
      assert.notEqual(attribute(match[0], "alt"), undefined);
      assert.ok(Number(attribute(match[0], "width")) > 0);
      assert.ok(Number(attribute(match[0], "height")) > 0);
    }
  });
}

test("content is distributed across pages instead of retained as a long homepage", () => {
  const home = documents.get("/").markup;
  assert.match(home, /id="hero-title"/);
  assert.doesNotMatch(home, /id="products"|id="about"|id="solutions"|id="method"|id="contact"/);
  const products = documents.get("/products/").markup;
  assert.match(products, /id="product-go"/);
  assert.match(products, /开发中/);
  assert.match(products, /官网筹备中/);
  assert.match(products, /href="https:\/\/www\.cettong\.com"/);
  assert.match(products, /href="https:\/\/www\.cettong\.cn"/);
  assert.match(products, /href="https:\/\/www\.cofate\.com"/);
  assert.match(products, /class="product-version">1\.0/);
  assert.match(products, /class="product-version">2\.0/);
  assert.match(products, /id="cofate-title"/);
  assert.match(products, /公开测试/);
  assert.doesNotMatch(products, /href="https?:\/\/go\.yuzero\.com/);
  const about = documents.get("/about/").markup;
  assert.match(about, /id="solutions"/);
  assert.match(about, /id="method"/);
  assert.match(documents.get("/contact/").markup, /href="mailto:hello@yuzero\.cn"/);
});
