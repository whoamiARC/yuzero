import type { Metadata } from "next";
import { Arrow } from "@/components/brand";

export const metadata: Metadata = {
  title: "了解我们",
  description: "了解煜零科技（YuZero）的产品理念、设计与技术能力，以及从真实需求出发、持续改进产品的方法。",
  alternates: { canonical: "/about/" },
};

const capabilities = [
  { number: "01", title: "智能应用", english: "Intelligence", text: "将 AI 与具体任务结合，帮助用户更直接地获取信息、完成工作。" },
  { number: "02", title: "数据与云", english: "Engineering", text: "连接产品背后的数据与服务，让体验在不同设备和场景中保持连贯。" },
  { number: "03", title: "数字体验", english: "Experience", text: "从第一次打开到每天使用，打磨清晰的界面、顺畅的操作与可靠的性能。" },
  { number: "04", title: "产业互联", english: "Connection", text: "连接用户、合作伙伴与服务流程，让线上产品解决线下的实际问题。" },
];
const principles = [
  { number: "01", title: "从问题出发", text: "先理解使用场景，再决定做什么。我们关注学习、生活和工作中值得改进的细节。" },
  { number: "02", title: "把体验做好", text: "让功能容易找到，让操作自然发生。设计与开发一起为清楚、流畅的体验负责。" },
  { number: "03", title: "在使用中成长", text: "持续听取反馈、改进产品，让每一次更新都回应真实需求。" },
];

export default function About() {
  return (
    <>
<section className="about-section page-section about-page" id="about" aria-labelledby="about-title" tabIndex={-1}>
          <div className="shell about-layout">
            <div className="about-intro"><p className="eyebrow">ABOUT YUZERO / 了解我们</p><h1 id="about-title">用技术连接想法。<br /><span>用产品回应生活。</span></h1></div>
            <div className="about-copy"><p>煜零科技（YuZero）是一家以产品为核心的科技公司。我们从学习、生活与工作中的具体问题出发，把设计、软件与智能技术结合起来。</p><p>每个产品可以有不同的名字、不同的用户和不同的成长路径。我们共同在意的是：它是否有用，是否好用，是否值得持续改进。</p><a className="text-link" href="#method">我们如何创造 <Arrow /></a></div>
          </div>
        </section>
        <section className="capabilities-section section-space" id="solutions" aria-labelledby="capabilities-title" tabIndex={-1}>
          <div className="shell">
            <div className="section-heading compact"><div><p className="eyebrow">WHAT WE BUILD WITH</p><h2 id="capabilities-title">好产品，<span>需要每一环都做好。</span></h2></div></div>
            <div className="capabilities-grid">{capabilities.map((item) => <article className="capability" key={item.number}><span className="capability-number">{item.number}</span><p className="capability-english">{item.english}</p><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </section>
        <section className="method-section section-space" id="method" aria-labelledby="method-title">
          <div className="shell method-layout"><div><p className="eyebrow">OUR APPROACH</p><h2 id="method-title">把事情想清楚。<br /><span>再把细节做好。</span></h2><p className="method-caption">让每一个从零开始的想法，<br />成为经得起日常使用的产品。</p></div><div className="principle-list">{principles.map((item) => <article key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div></div>
        </section>
    </>
  );
}
