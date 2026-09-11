import Link from "next/link";
import { asset } from "@/lib/site";

export function Brand({ inert = false }: { inert?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="YuZero 煜零科技，返回首页" inert={inert}>
      <span className="brand-symbol" aria-hidden="true">
        <img src={asset("yuzero-logo.png")} alt="" width="1254" height="1254" />
      </span>
      <span className="brand-type"><strong>YuZero</strong><span>煜零科技</span></span>
    </Link>
  );
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}
