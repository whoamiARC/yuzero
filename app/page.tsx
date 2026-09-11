import Link from "next/link";
import { Arrow } from "@/components/brand";
import { asset } from "@/lib/site";

export default function Home() {
  return (
    <>
<section className="hero" id="top" aria-labelledby="hero-title">
          <div className="shell hero-layout">
            <div className="hero-copy">
              <p className="eyebrow"><span className="tiny-rule" />YUZERO · 煜零科技</p>
              <h1 id="hero-title">从零出发。<br /><span>让想法成为产品。</span></h1>
              <p className="hero-description">让学习更有方向，让生活更便利。<br className="desktop-break" />我们用设计与技术，把真实需求做成日常可用的数字产品。</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/products/">探索旗下产品 <Arrow /></Link>
                <Link className="button button-quiet" href="/about/">认识 YuZero <Arrow diagonal /></Link>
              </div>
              <div className="hero-caption"><span>FROM ZERO, TO POSSIBILITY.</span><span>设计 · 技术 · 日常</span></div>
            </div>
            <div className="brand-stage">
              <div className="brand-stage-top"><span>Built by YuZero</span><span aria-hidden="true">{"{ 0 → ∞ }"}</span></div>
              <img className="hero-logo" src={asset("yuzero-logo.png")} alt="YuZero 公司标志：深蓝与青绿色的环形图案，两侧是代码花括号，下方为 YuZero 字样" width="1254" height="1254" fetchPriority="high" />
              <div className="brand-stage-bottom"><p>不同的产品。<br /><strong>同样认真地创造。</strong></p><Link href="/products/" aria-label="浏览 YuZero 旗下产品"><Arrow /></Link></div>
            </div>
          </div>
          <div className="shell hero-index"><span>为每一种可能，找到入口。</span><Link href="/products/">浏览公司产品 <Arrow /></Link></div>
        </section>
    </>
  );
}
