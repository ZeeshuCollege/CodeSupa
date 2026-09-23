import { PageIntro } from "../components/PageIntro";
import { ArrowUpRight } from "lucide-react";

const services = [
  { no: "01", title: "Web development", body: "High-performance marketing sites, company websites, landing systems and CMS-backed experiences." },
  { no: "02", title: "App development", body: "Modern web applications and mobile product experiences with a scalable technical foundation." },
  { no: "03", title: "SEO & growth", body: "Technical SEO, content structures and conversion-focused pages designed to compound over time." },
  { no: "04", title: "Social systems", body: "Content planning, creative direction and social handle management built around an actual brand voice." }
];

export default function Expertise() {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Expertise / What we do"
        title={<>Strategy, design, <em>technology.</em></>}
        description="One studio across the parts that matter — from positioning and interface to the code behind it and the growth after launch."
      />
      <section className="service-list">
        {services.map((service) => (
          <article key={service.no} className="service-row">
            <span>{service.no}</span>
            <h2 className="display">{service.title}</h2>
            <p>{service.body}</p>
            <ArrowUpRight className="service-arrow" size={24} strokeWidth={1.6} />
          </article>
        ))}
      </section>
      <section className="expertise-footer">
        <p className="eyebrow">Technology / By default</p>
        <div className="tech-cloud">
          {["React", "TypeScript", "Vite", "Node", "PostgreSQL", "Supabase", "REST", "AI workflows"].map((t) => <span key={t}>{t}</span>)}
        </div>
      </section>
    </div>
  );
}