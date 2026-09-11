import { Arrow } from "@/components/brand";
import { copy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

export default function About({ locale }: { locale: Locale }) {
  const text = copy[locale].about;
  return (
    <>
<section className="about-section page-section about-page" id="about" aria-labelledby="about-title" tabIndex={-1}>
          <div className="shell about-layout">
            <div className="about-intro"><p className="eyebrow">{text.eyebrow}</p><h1 id="about-title">{text.title[0]}<br /><span>{text.title[1]}</span></h1></div>
            <div className="about-copy">{text.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a className="text-link" href="#method">{text.methodLink} <Arrow /></a></div>
          </div>
        </section>
        <section className="capabilities-section section-space" id="solutions" aria-labelledby="capabilities-title" tabIndex={-1}>
          <div className="shell">
            <div className="section-heading compact"><div><p className="eyebrow">WHAT WE BUILD WITH</p><h2 id="capabilities-title">{text.capabilitiesTitle[0]}{" "}<span>{text.capabilitiesTitle[1]}</span></h2></div></div>
            <div className="capabilities-grid">{text.capabilities.map((item, index) => <article className="capability" key={item.label}><span className="capability-number">0{index + 1}</span><p className="capability-english">{item.label}</p><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </section>
        <section className="method-section section-space" id="method" aria-labelledby="method-title">
          <div className="shell method-layout"><div><p className="eyebrow">OUR APPROACH</p><h2 id="method-title">{text.methodTitle[0]}<br /><span>{text.methodTitle[1]}</span></h2><p className="method-caption">{text.methodCaption[0]}<br />{text.methodCaption[1]}</p></div><div className="principle-list">{text.principles.map((item, index) => <article key={item.title}><span>0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div>
        </section>
    </>
  );
}
