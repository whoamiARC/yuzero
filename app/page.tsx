"use client";

import { useEffect, useState, type CSSProperties } from "react";

const siteBasePath = process.env.NEXT_PUBLIC_SITE_BASE_PATH ?? "";

const solutions = [
  {
    index: "01",
    title: "智能应用",
    en: "AI Intelligence",
    description:
      "从业务洞察、模型编排到智能体落地，让 AI 真正进入组织流程，持续释放生产力。",
    tags: ["智能体", "知识工程", "模型应用"],
  },
  {
    index: "02",
    title: "数据与云",
    en: "Data & Cloud",
    description:
      "构建统一、弹性、可信的数据底座，让每一次决策都拥有清晰而及时的依据。",
    tags: ["数据平台", "云原生", "实时计算"],
  },
  {
    index: "03",
    title: "数字体验",
    en: "Digital Experience",
    description:
      "以品牌、产品与技术的系统化协同，打造兼具审美表达与商业价值的数字触点。",
    tags: ["品牌体验", "数字产品", "增长设计"],
  },
  {
    index: "04",
    title: "产业互联",
    en: "Industry Connect",
    description:
      "连接设备、系统与业务现场，以数字化能力重塑产业协同和运营效率。",
    tags: ["智能制造", "物联网", "业务中台"],
  },
];

const cases = [
  {
    number: "CASE / 01",
    type: "智能制造",
    title: "让每一条产线，\n都拥有数字感知力",
    description:
      "面向复杂制造现场，整合设备、质量与生产数据，构建可感知、可分析、可协同的运营中枢。",
    className: "case-blue",
  },
  {
    number: "CASE / 02",
    type: "企业智能",
    title: "让组织知识，\n成为增长引擎",
    description:
      "连接分散的知识资产与业务流程，以企业级智能体提升检索、决策与协作效率。",
    className: "case-silver",
  },
  {
    number: "CASE / 03",
    type: "数字体验",
    title: "让品牌价值，\n发生在每次交互",
    description:
      "围绕用户旅程重构数字触点，将品牌表达、服务体验与数据增长融为一体。",
    className: "case-night",
  },
];

const principles = [
  {
    index: "01",
    title: "理解真实问题",
    text: "从业务目标与关键场景出发，找到技术投入真正应该发生的位置。",
  },
  {
    index: "02",
    title: "设计系统解法",
    text: "以产品思维统筹体验、数据与工程，形成可演进的完整解决方案。",
  },
  {
    index: "03",
    title: "交付长期价值",
    text: "与客户团队并肩共创，让能力沉淀在组织中，让创新持续生长。",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="YuZero 煜零科技首页">
          <span className="brand-mark" aria-hidden="true">
            <span />
          </span>
          <span className="brand-type">
            <strong>YuZero</strong>
            <small>煜零科技</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="主导航">
          <a href="#about">关于我们</a>
          <a href="#solutions">解决方案</a>
          <a href="#cases">标杆实践</a>
          <a href="#method">创新方法</a>
        </nav>

        <a className="nav-contact" href="#contact">
          <span>联系我们</span>
          <i aria-hidden="true">↗</i>
        </a>

        <button
          className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>
          <nav aria-label="移动端导航">
            <a href="#about" onClick={closeMenu}>
              <span>01</span>关于我们
            </a>
            <a href="#solutions" onClick={closeMenu}>
              <span>02</span>解决方案
            </a>
            <a href="#cases" onClick={closeMenu}>
              <span>03</span>标杆实践
            </a>
            <a href="#method" onClick={closeMenu}>
              <span>04</span>创新方法
            </a>
            <a href="#contact" onClick={closeMenu}>
              <span>05</span>联系我们
            </a>
          </nav>
          <p>TECHNOLOGY, DESIGNED FOR PROGRESS.</p>
        </div>
      </header>

      <section className="hero" id="top">
        <div
          className="hero-image"
          aria-hidden="true"
          style={
            {
              "--hero-image": `url("${siteBasePath}/yuzero-hero.png")`,
            } as CSSProperties
          }
        />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />

        <div className="hero-content shell">
          <div className="hero-kicker reveal-up">
            <span className="signal-dot" />
            <span>YUZERO TECHNOLOGY · SHANGHAI</span>
          </div>

          <h1 className="reveal-up delay-1">
            智启万象
            <br />
            <span>重构可能边界</span>
          </h1>

          <p className="hero-copy reveal-up delay-2">
            煜零科技以智能、数据与体验为核心，
            <br />
            为面向未来的企业构建持续进化的数字能力。
          </p>

          <div className="hero-actions reveal-up delay-3">
            <a className="primary-button" href="#solutions">
              <span>探索 YuZero</span>
              <i aria-hidden="true">→</i>
            </a>
            <a className="text-link" href="#about">
              <span>认识煜零</span>
              <i aria-hidden="true">↘</i>
            </a>
          </div>
        </div>

        <div className="hero-meta shell" aria-hidden="true">
          <p>INTELLIGENCE / DATA / EXPERIENCE</p>
          <div className="scroll-cue">
            <span>SCROLL TO DISCOVER</span>
            <i>↓</i>
          </div>
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="shell">
          <div className="section-label dark-label">
            <span>01</span>
            <p>WHO WE ARE / 关于煜零</p>
          </div>

          <div className="manifesto-layout">
            <p className="manifesto-intro">
              <span className="eyebrow-line" />
              我们相信，真正有价值的技术，
              <br />
              应当让复杂归于简单，让想象成为现实。
            </p>
            <div className="manifesto-statement">
              <h2>
                以技术的深度
                <br />
                <span>拓展商业的广度</span>
              </h2>
              <p>
                YuZero 是一家面向未来的科技创新公司。我们与行业伙伴一起，从真实业务问题出发，
                将前沿技术、产品思维与长期主义融为一体，打造可落地、可增长、可持续演进的数字解决方案。
              </p>
              <a className="line-link" href="#method">
                <span>我们的创新方法</span>
                <i aria-hidden="true">↗</i>
              </a>
            </div>
          </div>

          <div className="belief-row">
            <article>
              <span>01 / INSIGHT</span>
              <strong>业务洞察</strong>
              <p>穿透表象，定义值得解决的问题</p>
            </article>
            <article>
              <span>02 / CRAFT</span>
              <strong>技术匠心</strong>
              <p>以工程质量承载创新想象</p>
            </article>
            <article>
              <span>03 / GROWTH</span>
              <strong>长期共创</strong>
              <p>让每次交付都成为增长的起点</p>
            </article>
          </div>
        </div>
      </section>

      <section className="solutions-section" id="solutions">
        <div className="shell">
          <div className="section-head">
            <div className="section-label">
              <span>02</span>
              <p>WHAT WE DO / 核心能力</p>
            </div>
            <div className="section-title-wrap">
              <h2>
                让创新，成为
                <br />
                <em>可持续的竞争力</em>
              </h2>
              <p>
                从战略到落地，我们用端到端的能力，
                <br />
                帮助企业跨越技术与业务之间的鸿沟。
              </p>
            </div>
          </div>

          <div className="solutions-grid">
            {solutions.map((solution) => (
              <article className="solution-card" key={solution.index}>
                <div className="solution-top">
                  <span>{solution.index}</span>
                  <i aria-hidden="true">↗</i>
                </div>
                <div className={`solution-symbol symbol-${solution.index}`} aria-hidden="true">
                  <span />
                  <i />
                </div>
                <div className="solution-content">
                  <small>{solution.en}</small>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <div className="tag-row">
                    {solution.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cases-section" id="cases">
        <div className="shell">
          <div className="cases-title">
            <div className="section-label dark-label">
              <span>03</span>
              <p>SELECTED WORK / 标杆实践</p>
            </div>
            <h2>
              在真实世界中
              <br />
              <span>创造可见的改变</span>
            </h2>
          </div>

          <div className="case-list">
            {cases.map((item) => (
              <article className={`case-card ${item.className}`} key={item.number}>
                <div className="case-visual" aria-hidden="true">
                  <div className="case-orbit orbit-one" />
                  <div className="case-orbit orbit-two" />
                  <div className="case-core" />
                  <span className="case-code">Y / 0</span>
                </div>
                <div className="case-content">
                  <div className="case-meta">
                    <span>{item.number}</span>
                    <span>{item.type}</span>
                  </div>
                  <h3>
                    {item.title.split("\n").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </h3>
                  <p>{item.description}</p>
                  <span className="case-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="method-section" id="method">
        <div className="method-aura" aria-hidden="true" />
        <div className="shell method-shell">
          <div className="method-intro">
            <div className="section-label">
              <span>04</span>
              <p>HOW WE WORK / 创新方法</p>
            </div>
            <div>
              <p className="method-en">THINK DEEPLY. BUILD PRECISELY.</p>
              <h2>
                不止交付答案
                <br />
                更构建解决问题的能力
              </h2>
            </div>
          </div>

          <div className="principle-list">
            {principles.map((principle) => (
              <article key={principle.index}>
                <span>{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
                <i aria-hidden="true">—</i>
              </article>
            ))}
          </div>

          <div className="method-quote">
            <span aria-hidden="true">“</span>
            <p>
              科技不应只是更快的工具，
              <br />
              更应是通往更好未来的方式。
            </p>
            <small>YUZERO / OUR BELIEF</small>
          </div>
        </div>
      </section>

      <section className="contact-section" id="contact">
        <div className="contact-grid" aria-hidden="true" />
        <div className="contact-ring" aria-hidden="true">
          <span />
        </div>
        <div className="shell contact-content">
          <div className="contact-kicker">
            <span className="signal-dot" />
            <p>START A CONVERSATION</p>
          </div>
          <h2>
            一起，让下一个可能
            <br />
            <span>从此刻发生</span>
          </h2>
          <p>
            无论是一次业务升级、一款全新产品，还是一个关于未来的大胆构想，
            <br />
            我们都期待与你共同探索。
          </p>
          <a className="contact-button" href="mailto:hello@yuzero.cn">
            <span>开启合作</span>
            <i aria-hidden="true">↗</i>
          </a>
        </div>
      </section>

      <footer>
        <div className="shell footer-top">
          <a className="brand footer-brand" href="#top" aria-label="返回首页">
            <span className="brand-mark" aria-hidden="true">
              <span />
            </span>
            <span className="brand-type">
              <strong>YuZero</strong>
              <small>煜零科技</small>
            </span>
          </a>
          <p className="footer-statement">
            TECHNOLOGY, DESIGNED
            <br />
            FOR <span>PROGRESS.</span>
          </p>
          <div className="footer-contact">
            <span>商务合作</span>
            <a href="mailto:hello@yuzero.cn">hello@yuzero.cn</a>
          </div>
        </div>
        <div className="shell footer-bottom">
          <p>© 2026 YUZERO TECHNOLOGY. ALL RIGHTS RESERVED.</p>
          <div>
            <a href="#about">关于煜零</a>
            <a href="#solutions">核心能力</a>
            <a href="#contact">联系我们</a>
          </div>
          <a className="back-top" href="#top" aria-label="返回顶部">
            ↑
          </a>
        </div>
      </footer>
    </main>
  );
}
