import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const outputRoot = new URL("../out/", import.meta.url);
const configuredBasePath = process.env.YUZERO_PAGES_BASE_PATH;
const basePath = configuredBasePath === "/" ? "" : (configuredBasePath ?? "/yuzero");
const pages = [
  { path: "/", titles: ["YuZero 煜零科技", "YuZero | From zero"], section: "hero" },
  { path: "/products/", titles: ["公司产品", "Products | YuZero"], section: "products" },
  { path: "/about/", titles: ["了解我们", "About us | YuZero"], section: "about" },
  { path: "/contact/", titles: ["联系我们", "Contact | YuZero"], section: "contact" },
];
const routes = ["zh-CN", "en"].flatMap((locale, index) => pages.map((page) => ({
  ...page, locale, title: page.titles[index],
  path: (index ? "/en" : "") + page.path,
  alternate: (index ? "" : "/en") + page.path,
  chinesePath: page.path,
})));
const attribute = (tag, name) => tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
const documents = new Map();
for (const route of routes) {
  const html = await readFile(new URL(route.path.slice(1) + "index.html", outputRoot), "utf8");
  documents.set(route.path, { html, locale: route.locale, markup: html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "") });
}

for (const route of routes) {
  const { html, markup } = documents.get(route.path);

  test(`${route.path} exports its own content, metadata and active navigation`, () => {
    assert.ok(markup.includes(`<html lang="${route.locale}"`));
    assert.ok(markup.includes(`<title>${route.title}`));
    assert.equal((markup.match(/<h1\b/g) ?? []).length, 1);
    assert.match(markup, /name="description" content="[^"]+"/);
    const canonical = [...markup.matchAll(/<link\b[^>]*>/g)].map((match) => match[0]).find((tag) => attribute(tag, "rel") === "canonical");
    assert.equal(attribute(canonical ?? "", "href"), "https://www.yuzero.com" + route.path);
    const navigationLabel = route.locale === "en" ? "Main navigation" : "主导航";
    const navigation = markup.match(new RegExp(`<nav[^>]*aria-label="${navigationLabel}"[\\s\\S]*?<\\/nav>`))?.[0] ?? "";
    for (const destination of routes.filter((item) => item.locale === route.locale)) assert.ok(navigation.includes(`href="${basePath}${destination.path}"`));
    const activeLinks = [...navigation.matchAll(/<a\b[^>]*aria-current="page"[^>]*>/g)];
    assert.equal(activeLinks.length, 1);
    assert.equal(attribute(activeLinks[0][0], "href"), basePath + route.path);
    assert.doesNotMatch(markup, /Your site is taking shape|react-loading-skeleton/);
    const alternates = [...markup.matchAll(/<link\b[^>]*>/g)].map((match) => match[0]).filter((tag) => attribute(tag, "rel") === "alternate");
    for (const [language, path] of [["zh-CN", route.chinesePath], ["en", "/en" + route.chinesePath], ["x-default", route.chinesePath]]) {
      const alternate = alternates.find((tag) => attribute(tag, "hrefLang") === language);
      assert.ok(alternate, `Missing ${language} alternate`);
      assert.equal(attribute(alternate, "href"), "https://www.yuzero.com" + path);
    }
  });

  test(`${route.path} switches language on the same page and retains language in all internal links`, () => {
    const switches = [...markup.matchAll(/<a\b[^>]*class="language-switch"[^>]*>/g)];
    assert.equal(switches.length, 1);
    const link = switches[0][0];
    assert.equal(attribute(link, "href"), basePath + route.alternate);
    assert.equal(attribute(link, "hrefLang"), route.locale === "en" ? "zh-CN" : "en");
    assert.equal(attribute(link, "lang"), route.locale === "en" ? "zh-CN" : "en");
    assert.ok(attribute(link, "aria-label"));
    assert.match(markup.match(/<header[\s\S]*?<\/header>/)?.[0] ?? "", /class="language-switch"/);
    for (const match of markup.matchAll(/<a\b[^>]*>/g)) {
      const tag = match[0];
      const href = attribute(tag, "href") ?? "";
      if (!href.startsWith("/") || attribute(tag, "class") === "language-switch") continue;
      assert.equal(documents.get(href.slice(basePath.length).split("#")[0])?.locale, route.locale, `Unexpected language change: ${href}`);
    }
    if (route.locale === "en") {
      const visible = markup.replace(/<[^>]+>/g, " ").replace(/中文|通|因果/g, "");
      assert.doesNotMatch(visible, /[\u3400-\u9fff]/, "Untranslated visible Chinese outside product names and the language switch");
      assert.match(markup, /aria-label="Open menu"/);
    }
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
  assert.match(products, /公开体验/);
  assert.match(products, /体验版 · 无真实配送/);
  assert.match(products, /href="https:\/\/www\.cettong\.com"/);
  assert.match(products, /href="https:\/\/www\.cettong\.cn"/);
  assert.match(products, /href="https:\/\/www\.cofate\.com"/);
  assert.match(products, /class="product-version">1\.0/);
  assert.match(products, /class="product-version">2\.0/);
  assert.match(products, /id="cofate-title"/);
  assert.match(products, /公开测试/);
  assert.match(products, /href="https:\/\/go\.yuzero\.com"/);
  const about = documents.get("/about/").markup;
  assert.match(about, /id="solutions"/);
  assert.match(about, /id="method"/);
  assert.match(documents.get("/contact/").markup, /href="mailto:hello@yuzero\.cn"/);
});

test("English product descriptions preserve launch status, versions and destinations", () => {
  const english = documents.get("/en/products/").markup;
  assert.match(english, /Public preview/);
  assert.match(english, /Demo only · No real deliveries/);
  assert.match(english, /Public beta/);
  assert.match(english, /class="product-version">1\.0/);
  assert.match(english, /class="product-version">2\.0/);
  for (const domain of ["www.cettong.com", "www.cettong.cn", "www.cofate.com"]) assert.ok(english.includes(`href="https://${domain}"`));
  assert.match(english, /No registration needed/);
  assert.match(english, /learning records/);
  assert.match(english, /href="https:\/\/go\.yuzero\.com"/);
  assert.match(documents.get("/en/contact/").markup, /href="mailto:hello@yuzero\.cn"/);
});
