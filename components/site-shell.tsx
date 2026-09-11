"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Arrow, Brand } from "@/components/brand";
import { siteHref } from "@/lib/site";
import { alternatePath, getNavigation, shellCopy, type Locale } from "@/lib/i18n";

const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

export default function SiteShell({ children, locale }: { children: ReactNode; locale: Locale }) {
  const pathname = normalizePath(usePathname() ?? "/");
  // A route change resets the menu and releases its scroll/focus state.
  return <SiteFrame key={pathname} pathname={pathname} locale={locale}>{children}</SiteFrame>;
}

function SiteFrame({ children, pathname, locale }: { children: ReactNode; pathname: string; locale: Locale }) {
  const text = shellCopy[locale];
  const navigation = getNavigation(locale);
  const otherLanguage = locale === "zh" ? "en" : "zh-CN";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLElement>(null);
  const languageSwitch = useRef<HTMLAnchorElement>(null);
  const isCurrent = (href: string) => normalizePath(href) === pathname;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuToggle.current?.focus();
      }
      if (event.key !== "Tab") return;
      const controls = [languageSwitch.current, menuToggle.current, ...Array.from(menuPanel.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])].filter(Boolean) as HTMLElement[];
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 801px)");
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [menuOpen]);

  function onNavigate(href: string) {
    setMenuOpen(false);
    if (isCurrent(href)) {
      requestAnimationFrame(() => document.getElementById("main")?.focus({ preventScroll: true }));
    }
  }

  return (
    <>
      <a className="skip-link" href="#main" inert={menuOpen}>{text.skip}</a>
      <header className={"site-header" + (scrolled ? " is-scrolled" : "")} role={menuOpen ? "dialog" : undefined} aria-modal={menuOpen || undefined} aria-label={menuOpen ? text.menu : undefined}>
        <div className="header-inner">
          <Brand inert={menuOpen} locale={locale} />
          <nav className="desktop-nav" aria-label={text.navigationLabel}>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <a ref={languageSwitch} className="language-switch" href={siteHref(alternatePath(locale, pathname))} hrefLang={otherLanguage} lang={otherLanguage} aria-label={text.languageLabel}>
              <svg aria-hidden="true" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg>
              <span>{text.language}</span>
            </a>
            <button ref={menuToggle} className={"menu-toggle" + (menuOpen ? " is-open" : "")} type="button" aria-label={menuOpen ? text.close : text.open} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
              <span /><span />
            </button>
          </div>
        </div>
        <nav ref={menuPanel} id="mobile-navigation" className="mobile-nav" aria-label={text.mobileNavigation} hidden={!menuOpen}>
          {navigation.map((item, index) => (
            <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined} onClick={() => onNavigate(item.href)}>
              <span>0{index + 1}</span>{item.label}<Arrow />
            </Link>
          ))}
          <p>From zero, to possibility.</p>
        </nav>
      </header>
      <main id="main" tabIndex={-1} inert={menuOpen}>{children}</main>
      <footer className="site-footer" inert={menuOpen}>
        <div className="shell footer-main">
          <Brand locale={locale} />
          <p>From zero,<br /><strong>to possibility.</strong></p>
          <nav aria-label={text.footerNavigation}>
            {navigation.slice(1).map((item) => <Link key={item.href} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}</Link>)}
          </nav>
          <a className="back-top" href="#main" aria-label={text.backTop}>↑</a>
        </div>
        <div className="shell footer-bottom"><span>© {new Date().getFullYear()} YuZero · {text.company}</span><span>{text.footer}</span></div>
      </footer>
    </>
  );
}
