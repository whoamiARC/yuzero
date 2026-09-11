import type { Metadata } from "next";
import { localizedPath, pagePaths, type Locale, type Page } from "@/lib/i18n";

const titles = {
  zh: { home: "YuZero 煜零科技｜从零出发，让想法成为产品", products: "公司产品｜YuZero 煜零科技", about: "了解我们｜YuZero 煜零科技", contact: "联系我们｜YuZero 煜零科技" },
  en: { home: "YuZero | From zero, to possibility", products: "Products | YuZero", about: "About us | YuZero", contact: "Contact | YuZero" },
};
const descriptions = {
  zh: {
    home: "认识煜零科技（YuZero）与旗下产品：YuZero Go 本地生活配送、CET通 1.0 与 2.0 英语四六级备考、CoFate 因果 AI 多人叙事社交。",
    products: "探索 YuZero 旗下产品：YuZero Go 配送、CET通 1.0 真题下载、CET通 2.0 备考平台与 CoFate 因果 AI 多人叙事社交。",
    about: "了解煜零科技（YuZero）的产品理念、设计与技术能力，以及从真实需求出发、持续改进产品的方法。",
    contact: "联系煜零科技（YuZero），交流产品合作、业务需求与软件服务。",
  },
  en: {
    home: "Meet YuZero and our digital products: YuZero Go local delivery, CET通 1.0 and 2.0 exam preparation, and CoFate multiplayer storytelling.",
    products: "Explore YuZero Go delivery, CET通 1.0 past paper downloads, CET通 2.0 exam preparation and CoFate AI-powered multiplayer storytelling.",
    about: "Discover how YuZero brings design and technology together to build useful products, starting with real needs and improving through feedback.",
    contact: "Get in touch with YuZero about product partnerships, business needs and software services.",
  },
};

export function pageMetadata(locale: Locale, page: Page): Metadata {
  const path = pagePaths[page];
  return {
    title: titles[locale][page], description: descriptions[locale][page],
    alternates: {
      canonical: localizedPath(locale, path),
      languages: { "zh-CN": path, en: localizedPath("en", path), "x-default": path },
    },
  };
}

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://www.yuzero.com"),
  icons: {
    icon: { url: `${process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? ""}/media/v2/icon-32.png`, sizes: "32x32", type: "image/png" },
    apple: { url: `${process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? ""}/media/v2/icon-180.png`, sizes: "180x180", type: "image/png" },
  },
};
