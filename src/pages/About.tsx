import { PageIntro } from "../components/PageIntro";
import { ArrowUpRight } from "lucide-react";

const principles = [
  ["Clarity", "We reduce noise until the right message and action are obvious."],
  ["Craft", "We sweat the details across typography, motion, code and content."],
  ["Momentum", "Every deliverable should make the next decision easier."]
];

export default function About() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="About / CodeSupa"
        title={<>Built for <em>forward.</em></>}
        description="CodeSupa is a digital studio focused on websites, applications, growth systems and social execution."
      />
      <section className="editorial-section">
        <p className="eyebrow">01 / What we believe</p>
        <div className="editorial-grid">
          <h2 className="display">Digital work should feel <em>inevitable.</em></h2>
          <div className="editorial-copy">
            <p>Good digital products do not shout. They make the next step feel natural.</p>
            <p>We pair design thinking with modern engineering to turn complicated requirements into focused experiences people understand quickly.</p>
          </div>
        </div>
      </section>
      <section className="principles">
        {principles.map(([title, body], index) => (
          <article className="principle" key={title}>
            <span>0{index + 1}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="dark-break">
        <p className="eyebrow">02 / Our north star</p>
        <h2 className="display">Less friction. More <em>meaning.</em></h2>
        <a className="text-link text-link--light" href="mailto:hello@codesupa.com">Say hello <ArrowUpRight size={17}/></a>
      </section>
    </div>
  );
}