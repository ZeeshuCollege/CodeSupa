import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "../components/PageIntro";

const notes = [
  ["01", "Why simple interfaces often convert better", "A practical look at reducing decisions without making a site feel empty.", "UI / UX"],
  ["02", "Building content systems, not posting schedules", "How teams can turn one strong idea into a reusable content engine.", "Growth"],
  ["03", "The hidden cost of a slow website", "Performance is not a technical footnote. It is part of the experience.", "Engineering"],
  ["04", "When an app actually needs an app", "A framework for deciding what belongs in a web flow, a dashboard or a mobile product.", "Product"]
];

export default function Thinking() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Thinking / Notes"
        title={<>Ideas worth <em>shipping.</em></>}
        description="Short notes from the intersection of design, technology, product and growth."
      />
      <section className="thinking-list">
        {notes.map(([no, title, body, tag]) => (
          <a href="#article" className="thinking-row" key={no}>
            <span>{no}</span>
            <div><p className="tag">{tag}</p><h2>{title}</h2><p className="thinking-body">{body}</p></div>
            <ArrowUpRight size={22} strokeWidth={1.6} />
          </a>
        ))}
      </section>
    </div>
  );
}