import { useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import gsap from "gsap";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
};

export function PageIntro({ eyebrow, title, description }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-intro__line", {
        yPercent: 105,
        duration: 0.95,
        stagger: 0.05,
        ease: "power4.out"
      });
      gsap.from(".page-intro__meta", {
        opacity: 0,
        y: 14,
        duration: 0.65,
        delay: 0.22,
        ease: "power3.out"
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="page-intro" ref={ref}>
      <p className="eyebrow page-intro__meta">{eyebrow}</p>
      <div className="line-mask">
        <h1 className="display page-intro__line">{title}</h1>
      </div>
      {description && <p className="intro-copy page-intro__meta">{description}</p>}
    </section>
  );
}