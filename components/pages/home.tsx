import Link from "next/link";
import { Arrow } from "@/components/brand";
import { asset } from "@/lib/site";
import { copy } from "@/lib/copy";
import { localizedPath, type Locale } from "@/lib/i18n";

export default function Home({ locale }: { locale: Locale }) {
  const text = copy[locale].home;
  return (
    <>
<section className="hero" id="top" aria-labelledby="hero-title">
          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="tiny-rule" />{text.eyebrow}</p>
              <h1 id="hero-title">{text.title[0]}<br /><span>{text.title[1]}</span></h1>
              <p className="hero-description">{text.description[0]}<br className="desktop-break" />{text.description[1]}</p>
              <div className="hero-actions">
                <Link className="button button-primary" href={localizedPath(locale, "/products/")}>{text.products} <Arrow /></Link>
                <Link className="button button-quiet" href={localizedPath(locale, "/about/")}>{text.about} <Arrow diagonal /></Link>
              </div>
              <div className="hero-caption"><span>FROM ZERO, TO POSSIBILITY.</span><span>{text.caption}</span></div>
            </div>
            <div className="brand-stage">
              <div className="brand-stage-top"><span>Built by YuZero</span><span aria-hidden="true">{"{ 0 → ∞ }"}</span></div>
              <img className="hero-logo" src={asset("media/v2/logo-960.webp")} srcSet={`${asset("media/v2/logo-480.webp")} 480w, ${asset("media/v2/logo-960.webp")} 960w`} sizes="(max-width: 480px) 260px, (max-width: 800px) 310px, 440px" alt={text.logoAlt} width="960" height="960" loading="eager" fetchPriority="high" />
              <div className="brand-stage-bottom"><p>{text.stage[0]}<br /><strong>{text.stage[1]}</strong></p><Link href={localizedPath(locale, "/products/")} aria-label={text.browseLabel}><Arrow /></Link></div>
            </div>
          </div>
          <div className="shell hero-index"><span>{text.index}</span><Link href={localizedPath(locale, "/products/")}>{text.browse} <Arrow /></Link></div>
        </section>
    </>
  );
}
