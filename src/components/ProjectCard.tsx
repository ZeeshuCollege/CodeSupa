import { ArrowUpRight } from "lucide-react";

type Project = {
  client: string;
  title: string;
  type: string;
  note: string;
  accent: string;
  index: string;
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`project-card project-card--${project.accent}`}>
      <div className="project-top">
        <span>{project.index}</span>
        <span>{project.type}</span>
      </div>
      <div className="project-visual" aria-hidden="true">
        <span className="visual-grid" />
        <span className="visual-orb" />
        <span className="visual-word">{project.client}</span>
      </div>
      <div className="project-bottom">
        <div>
          <p className="project-client">{project.client}</p>
          <h3>{project.title}</h3>
          <p className="project-note">{project.note}</p>
        </div>
        <ArrowUpRight size={23} strokeWidth={1.7} />
      </div>
    </article>
  );
}