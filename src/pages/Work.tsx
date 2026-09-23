import { ArrowUpRight } from "lucide-react";
import { PageIntro } from "../components/PageIntro";
import { ProjectCard } from "../components/ProjectCard";

const projects = [
  { client: "NOVA", title: "Launch systems for ambitious teams.", type: "Brand + Web", note: "Positioning, identity and a conversion-first web platform.", accent: "lime", index: "01" },
  { client: "MIRA", title: "A clearer path from idea to product.", type: "Product", note: "UX strategy and a modular application experience.", accent: "ink", index: "02" },
  { client: "ORBIT", title: "Marketing that behaves like product.", type: "Growth", note: "Content systems, landing pages and social operations.", accent: "soft", index: "03" },
  { client: "ALTO", title: "Turning complex service into simple journeys.", type: "Web app", note: "Architecture, interface design and front-end engineering.", accent: "lime", index: "04" }
];

export default function Work() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Work / Selected"
        title={<>Work that <em>moves</em> people.</>}
        description="A deliberately small selection of the kinds of digital systems CodeSupa can design and ship."
      />
      <section className="work-list">
        {projects.map((project) => <ProjectCard key={project.index} project={project} />)}
      </section>
      <section className="work-note">
        <p className="eyebrow">Have a different problem?</p>
        <h2 className="display">Good. We like different.</h2>
        <a className="big-cta" href="mailto:hello@codesupa.com">Start a conversation <ArrowUpRight size={24}/></a>
      </section>
    </div>
  );
}