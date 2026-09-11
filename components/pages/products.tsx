import Link from "next/link";
import { Arrow } from "@/components/brand";
import { asset } from "@/lib/site";
import { copy } from "@/lib/copy";
import { localizedPath, type Locale } from "@/lib/i18n";

export default function Products({ locale }: { locale: Locale }) {
  const text = copy[locale].products;
  return (
    <>
<section className="products-section page-section" id="products" aria-labelledby="products-title" tabIndex={-1}>
          <span className="anchor-alias" id="cases" />
          <div className="shell">
            <div className="section-heading page-heading">
              <div><p className="eyebrow">{text.eyebrow}</p><h1 id="products-title">{text.title[0]}<br /><span>{text.title[1]}</span></h1></div>
              <p className="section-description">{text.description[0]}<br />{text.description[1]}</p>
            </div>
            <div className="product-grid">
              <article className="product-card product-go" id="product-go" aria-labelledby="go-title">
                <div className="product-visual go-visual">
                  <img src={asset("products/go-food.webp")} alt={text.go.imageAlt} width="1000" height="1333" loading="lazy" decoding="async" />
                  <div className="go-visual-copy"><span>EVERYDAY, DELIVERED.</span><strong>{text.go.visual[0]}<br />{text.go.visual[1]}</strong></div>
                  <span className="visual-badge">{text.go.badge}</span>
                </div>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="go-title">YuZero <span className="go-word">Go</span></h2><span className="status status-development">{text.go.status}</span></div>
                  <p className="product-category">{text.go.category}</p>
                  <p className="product-description">{text.go.description}</p>
                  <ul className="tag-list" aria-label={text.go.tagsLabel}>{text.go.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <div className="product-bottom"><span className="product-domain">go.yuzero.com <small>{text.go.comingSoon}</small></span><a href="https://go.yuzero.com" target="_blank" rel="noopener noreferrer" className="product-link">{text.go.action} <Arrow diagonal /><span className="sr-only">{text.newWindow}</span></a></div>
                </div>
              </article>
              <article className="product-card product-cet" aria-labelledby="cet-title">
                <a className="product-visual cet-visual" href="https://www.cettong.com" target="_blank" rel="noopener noreferrer" aria-label={text.cet.visit}>
                  <img src={asset("products/cettong-preview.png")} alt={text.cet.imageAlt} width="1731" height="909" loading="lazy" decoding="async" />
                </a>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="cet-title" lang="zh-CN">CET<span className="cet-word">通</span> <small className="product-version">2.0</small></h2><span className="status">{text.available}</span></div>
                  <p className="product-category">{text.cet.category}</p>
                  <p className="product-description">{text.cet.description}</p>
                  <ul className="tag-list" aria-label={text.cet.tagsLabel}>{text.cet.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <div className="product-bottom"><span className="product-domain">www.cettong.com</span><a href="https://www.cettong.com" target="_blank" rel="noopener noreferrer" className="product-link">{text.cet.action} <Arrow diagonal /><span className="sr-only">{text.newWindow}</span></a></div>
                </div>
              </article>
              <article className="product-card product-cet-legacy" aria-labelledby="cet-legacy-title">
                <a className="product-visual cet-legacy-visual" href="https://www.cettong.cn" target="_blank" rel="noopener noreferrer" aria-label={text.legacy.visit}>
                  <img src={asset("products/cettong-v1-logo.webp")} alt={text.legacy.imageAlt} width="120" height="80" loading="lazy" decoding="async" />
                  <div><span lang="zh-CN">CET通 1.0</span><strong>{text.legacy.visual[0]}<br />{text.legacy.visual[1]}</strong><p>{text.legacy.caption}</p></div>
                </a>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="cet-legacy-title" lang="zh-CN">CET<span className="cet-word">通</span> <small className="product-version">1.0</small></h2><span className="status">{text.available}</span></div>
                  <p className="product-category">{text.legacy.category}</p>
                  <p className="product-description">{text.legacy.description}</p>
                  <ul className="tag-list" aria-label={text.legacy.tagsLabel}>{text.legacy.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <div className="product-bottom"><span className="product-domain">www.cettong.cn</span><a href="https://www.cettong.cn" target="_blank" rel="noopener noreferrer" className="product-link">{text.legacy.action} <Arrow diagonal /><span className="sr-only">{text.newWindow}</span></a></div>
                </div>
              </article>
              <article className="product-card product-cofate" aria-labelledby="cofate-title">
                <a className="product-visual cofate-visual" href="https://www.cofate.com" target="_blank" rel="noopener noreferrer" aria-label={text.cofate.visit}>
                  <img src={asset("products/cofate-preview.png")} alt={text.cofate.imageAlt} width="1536" height="1024" loading="lazy" decoding="async" />
                </a>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="cofate-title">CoFate <span className="cofate-word" lang="zh-CN">因果</span></h2><span className="status status-beta">{text.cofate.status}</span></div>
                  <p className="product-category">{text.cofate.category}</p>
                  <p className="product-description">{text.cofate.description}</p>
                  <ul className="tag-list" aria-label={text.cofate.tagsLabel}>{text.cofate.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
                  <div className="product-bottom"><span className="product-domain">www.cofate.com</span><a href="https://www.cofate.com" target="_blank" rel="noopener noreferrer" className="product-link">{text.cofate.action} <Arrow diagonal /><span className="sr-only">{text.newWindow}</span></a></div>
                </div>
              </article>
            </div>
            <div className="products-note"><span className="tiny-rule" /><p>{text.note}</p><Link href={localizedPath(locale, "/contact/")}>{text.collaborate} <Arrow diagonal /></Link></div>
          </div>
        </section>
    </>
  );
}
