export type Locale = "zh" | "en";
export type Page = "home" | "products" | "about" | "contact";

export const pagePaths: Record<Page, string> = {
  home: "/", products: "/products/", about: "/about/", contact: "/contact/",
};

export function localizedPath(locale: Locale, path = "/") {
  return locale === "en" ? `/en${path}` : path;
}

export function alternatePath(locale: Locale, pathname: string) {
  const path = locale === "en" ? pathname.replace(/^\/en(?=\/|$)/, "") : pathname;
  const normalized = path.replace(/\/+$/, "") + "/";
  return localizedPath(locale === "en" ? "zh" : "en", normalized);
}

export const shellCopy = {
  zh: {
    navigation: ["首页", "公司产品", "了解我们", "联系我们"],
    company: "煜零科技", homeLabel: "YuZero 煜零科技，返回首页",
    skip: "跳转到正文", menu: "主菜单", navigationLabel: "主导航",
    open: "打开菜单", close: "关闭菜单", mobileNavigation: "移动端导航",
    footerNavigation: "页脚导航", backTop: "返回顶部",
    footer: "设计与技术，让想法发生。",
    language: "English", languageLabel: "Switch to English",
  },
  en: {
    navigation: ["Home", "Products", "About us", "Contact"],
    company: "Technology", homeLabel: "YuZero, back to home",
    skip: "Skip to content", menu: "Main menu", navigationLabel: "Main navigation",
    open: "Open menu", close: "Close menu", mobileNavigation: "Mobile navigation",
    footerNavigation: "Footer navigation", backTop: "Back to top",
    footer: "Bringing ideas to life through design and technology.",
    language: "中文", languageLabel: "切换到中文",
  },
} as const;

export function getNavigation(locale: Locale) {
  return Object.entries(pagePaths).map(([page, path], index) => ({
    page: page as Page,
    href: localizedPath(locale, path),
    label: shellCopy[locale].navigation[index],
  }));
}
