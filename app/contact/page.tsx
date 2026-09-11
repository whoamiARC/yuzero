import type { Metadata } from "next";
import { Arrow } from "@/components/brand";
import { email } from "@/lib/site";

export const metadata: Metadata = {
  title: "联系我们",
  description: "联系煜零科技（YuZero），交流产品合作、业务需求与软件服务。",
  alternates: { canonical: "/contact/" },
};

export default function Contact() {
  return (
    <>
<section className="contact-section contact-page" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
          <div className="shell contact-panel"><div><p className="eyebrow">GET IN TOUCH / 联系我们</p><h1 id="contact-title">下一个好想法，<br />从一次交流开始。</h1><p>产品合作、业务需求，或一个值得解决的问题。<br />欢迎和煜零聊聊。</p></div><div className="contact-action"><a className="button button-white" href={"mailto:" + email}>联系煜零 <Arrow diagonal /></a><a className="contact-email" href={"mailto:" + email}>{email}</a><span>商务合作与产品交流</span></div></div>
        </section>
    </>
  );
}
