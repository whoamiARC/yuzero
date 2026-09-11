import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/brand";
import { asset, email } from "@/lib/site";

export const metadata: Metadata = {
  title: "公司产品",
  description: "探索 YuZero 旗下产品：YuZero Go 配送、CET通 1.0 真题下载、CET通 2.0 备考平台与 CoFate 因果 AI 多人叙事社交。",
  alternates: { canonical: "/products/" },
};

export default function Products() {
  return (
    <>
<section className="products-section page-section" id="products" aria-labelledby="products-title" tabIndex={-1}>
          <span className="anchor-alias" id="cases" />
          <div className="shell">
            <div className="section-heading page-heading">
              <div><p className="eyebrow">OUR PRODUCTS / 公司产品</p><h1 id="products-title">不同的场景，<br /><span>同一个出发点。</span></h1></div>
              <p className="section-description">学习、生活与共同创造的故事。<br />我们的产品各有方向，都从真实需求开始。</p>
            </div>
            <div className="product-grid">
              <article className="product-card product-go" id="product-go" aria-labelledby="go-title">
                <div className="product-visual go-visual">
                  <img src={asset("products/go-food.webp")} alt="刚制作好的汉堡与薯条" width="1000" height="1333" loading="lazy" decoding="async" />
                  <div className="go-visual-copy"><span>EVERYDAY, DELIVERED.</span><strong>好好生活，<br />其余交给 Go。</strong></div>
                  <span className="visual-badge">首站 · 埃塞俄比亚</span>
                </div>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="go-title">YuZero <span className="go-word">Go</span></h2><span className="status status-development">开发中</span></div>
                  <p className="product-category">本地生活与即时配送</p>
                  <p className="product-description">面向埃塞俄比亚，连接餐厅、超市、骑手与消费者，把点餐和日常采购放进同一个 App。</p>
                  <ul className="tag-list" aria-label="YuZero Go 产品方向"><li>餐饮外卖</li><li>超市配送</li><li>骑手服务</li></ul>
                  <div className="product-bottom"><span className="product-domain">go.yuzero.com <small>官网筹备中</small></span><a href={"mailto:" + email + "?subject=" + encodeURIComponent("YuZero Go 合作咨询")} className="product-link">合作咨询 <Arrow diagonal /></a></div>
                </div>
              </article>
              <article className="product-card product-cet" aria-labelledby="cet-title">
                <a className="product-visual cet-visual" href="https://www.cettong.com" target="_blank" rel="noopener noreferrer" aria-label="访问 CET通 2.0 官网（新窗口）">
                  <img src={asset("products/cettong-preview.png")} alt="CET通：四六级学习，就这么通" width="1731" height="909" loading="lazy" decoding="async" />
                </a>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="cet-title">CET<span className="cet-word">通</span> <small className="product-version">2.0</small></h2><span className="status">在线体验</span></div>
                  <p className="product-category">英语四、六级备考</p>
                  <p className="product-description">从历年真题到每日练习，结合大纲词汇、错题复习与学习记录，让日常备考更有条理。</p>
                  <ul className="tag-list" aria-label="CET通 2.0 主要功能"><li>历年真题</li><li>词汇学习</li><li>错题复习</li></ul>
                  <div className="product-bottom"><span className="product-domain">www.cettong.com</span><a href="https://www.cettong.com" target="_blank" rel="noopener noreferrer" className="product-link">体验 2.0 <Arrow diagonal /><span className="sr-only">（新窗口）</span></a></div>
                </div>
              </article>
              <article className="product-card product-cet-legacy" aria-labelledby="cet-legacy-title">
                <a className="product-visual cet-legacy-visual" href="https://www.cettong.cn" target="_blank" rel="noopener noreferrer" aria-label="访问 CET通 1.0 官网（新窗口）">
                  <img src={asset("products/cettong-v1-logo.webp")} alt="CET通 1.0 标志" width="120" height="80" loading="lazy" decoding="async" />
                  <div><span>CET通 1.0</span><strong>真题，<br />随时开练。</strong><p>试卷 · 答案 · 听力</p></div>
                </a>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="cet-legacy-title">CET<span className="cet-word">通</span> <small className="product-version">1.0</small></h2><span className="status">在线体验</span></div>
                  <p className="product-category">英语四、六级真题下载</p>
                  <p className="product-description">提供历年试卷 PDF、答案解析与配套听力 MP3。无需注册即可下载，为纸上练习和离线备考准备资料。</p>
                  <ul className="tag-list" aria-label="CET通 1.0 主要功能"><li>真题下载</li><li>答案解析</li><li>听力音频</li></ul>
                  <div className="product-bottom"><span className="product-domain">www.cettong.cn</span><a href="https://www.cettong.cn" target="_blank" rel="noopener noreferrer" className="product-link">进入 1.0 <Arrow diagonal /><span className="sr-only">（新窗口）</span></a></div>
                </div>
              </article>
              <article className="product-card product-cofate" aria-labelledby="cofate-title">
                <a className="product-visual cofate-visual" href="https://www.cofate.com" target="_blank" rel="noopener noreferrer" aria-label="访问 CoFate 因果官网（新窗口）">
                  <img src={asset("products/cofate-preview.png")} alt="CoFate 因果：一个二维码，把在场的人送进同一个世界" width="1536" height="1024" loading="lazy" decoding="async" />
                </a>
                <div className="product-body">
                  <div className="product-title-row"><h2 id="cofate-title">CoFate <span className="cofate-word">因果</span></h2><span className="status status-beta">公开测试</span></div>
                  <p className="product-category">AI 多人叙事社交</p>
                  <p className="product-description">通过二维码或邀请码，进入同一个文字世界。领取各自的身份、规则与目标，让每个人的选择共同推进故事。</p>
                  <ul className="tag-list" aria-label="CoFate 产品特点"><li>多人共创</li><li>私人身份</li><li>AI 叙事</li></ul>
                  <div className="product-bottom"><span className="product-domain">www.cofate.com</span><a href="https://www.cofate.com" target="_blank" rel="noopener noreferrer" className="product-link">探索因果 <Arrow diagonal /><span className="sr-only">（新窗口）</span></a></div>
                </div>
              </article>
            </div>
            <div className="products-note"><span className="tiny-rule" /><p>一个 YuZero，多种可能。每款产品专注自己的用户与问题。</p><Link href="/contact/">与我们一起创造 <Arrow diagonal /></Link></div>
          </div>
        </section>
    </>
  );
}
