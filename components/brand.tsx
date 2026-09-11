import Link from "next/link";
import { asset } from "@/lib/site";
import { localizedPath, shellCopy, type Locale } from "@/lib/i18n";

export function Brand({ inert = false, locale }: { inert?: boolean; locale: Locale }) {
  const text = shellCopy[locale];
  return (
    <Link className="brand" href={localizedPath(locale)} aria-label={text.homeLabel} inert={inert}>
      <span className="brand-symbol" aria-hidden="true">
        <img src={asset("yuzero-logo.png")} alt="" width="1254" height="1254" />
      </span>
      <span className="brand-type"><strong>YuZero</strong><span>{text.company}</span></span>
    </Link>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
