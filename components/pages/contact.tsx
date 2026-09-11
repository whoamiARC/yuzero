import { Arrow } from "@/components/brand";
import { email } from "@/lib/site";
import { copy } from "@/lib/copy";
import type { Locale } from "@/lib/i18n";

export default function Contact({ locale }: { locale: Locale }) {
  const text = copy[locale].contact;
  return (
    <>
<section className="contact-section contact-page" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
          <div className="shell contact-panel"><div><p className="eyebrow">{text.eyebrow}</p><h1 id="contact-title">{text.title[0]}<br />{text.title[1]}</h1><p>{text.description[0]}<br />{text.description[1]}</p></div><div className="contact-action"><a className="button button-white" href={"mailto:" + email}>{text.action} <Arrow diagonal /></a><a className="contact-email" href={"mailto:" + email}>{email}</a><span>{text.caption}</span></div></div>
        </section>
    </>
  );
}
