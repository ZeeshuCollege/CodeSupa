import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface ChaleitCaseStudyProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function ChaleitCaseStudy({ onClose, isModal = false }: ChaleitCaseStudyProps) {
  const navigate = useNavigate();
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const stickyColRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate(-1);
    }
  };

  useEffect(() => {
    if (!isModal) {
      window.scrollTo(0, 0);
    }

    const scroller =
      document.querySelector<HTMLElement>(".pique-popup-scrollable") ||
      document.querySelector<HTMLElement>(".site-frame") ||
      window;

    // Subtle parallax on the top hero image
    if (heroSectionRef.current && heroImageRef.current) {
      gsap.fromTo(
        heroImageRef.current,
        { yPercent: -4 },
        {
          yPercent: 4,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === heroSectionRef.current) st.kill();
      });
    };
  }, [isModal]);

  return (
    <article className="pique-case-study" aria-label="Chaleit Case Study">
      {/* Top action header for standalone mode */}
      {!isModal && (
        <header className="pique-case-nav">
          <Link to="/work" className="pique-back-link">
            ← Back to Work
          </Link>
          <button
            type="button"
            onClick={handleClose}
            className="pique-close-btn"
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </header>
      )}

      {/* Main 2-Column Content Layout */}
      <section className="pique-case-body">
        <div className="pique-case-grid">
          {/* LEFT: Pinned Sticky Column */}
          <aside className="pique-case-aside">
            <div ref={stickyColRef} className="pique-sticky-col">
              <h1 className="pique-case-title">Chaleit</h1>

              <div className="pique-case-meta">
                <a
                  href="https://chaleit.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pique-visit-btn"
                  aria-label="Visit Chaleit website in a new tab"
                >
                  Visit Website <ArrowUpRight size={16} />
                </a>
                <span className="pique-tag">Cybersecurity</span>
              </div>

              <div className="pique-case-description">
                <p>
                  Leading cybersecurity outfit Chaleit partnered with Humaan in pursuit of a comprehensive rebrand and website transformation, to more effectively connect their online presence with their evolving expertise and capabilities.
                </p>
                <p>
                  The project focused on elevating a relatively young brand into a sophisticated, industry-leading presence—engaging users, strengthening positioning, and setting Chaleit apart from a saturated competitive landscape.
                </p>
                <p>
                  At the heart of this transformation is a reimagined visual identity and associated design language—flexible, dynamic, and seamlessly woven into the fabric of the site. The website itself is powered by a headless architecture using Payload CMS, delivering a fully customised content experience and a rich, intuitive journey through Chaleit’s services and thought leadership.
                </p>
                <p>
                  The result is a contemporary, high-impact digital presence that elevates the brand and engages with its audience.
                </p>
              </div>

              <ul className="pique-case-services" aria-label="Services provided">
                <li>
                  <span className="pique-dot">✳</span>
                  <span>Rebrand &amp; Repositioning</span>
                </li>
                <li>
                  <span className="pique-dot">◎</span>
                  <span>Digital Strategy</span>
                </li>
                <li>
                  <span className="pique-dot">⌢</span>
                  <span>UI &amp; UX Design</span>
                </li>
                <li>
                  <span className="pique-dot">✕</span>
                  <span>React.js and Next.js Headless Framework</span>
                </li>
                <li>
                  <span className="pique-dot">✳</span>
                  <span>Payload CMS</span>
                </li>
              </ul>

              <div className="pique-case-awards" aria-label="Awards &amp; Recognition">
                <h2 className="pique-awards-heading">Awards</h2>

                <div className="pique-award-row">
                  <span className="award-org">Australian Web Awards</span>
                  <span className="award-title">Technology</span>
                  <span className="award-year">2025</span>
                </div>

                <div className="pique-award-row">
                  <span className="award-org">Good Design Awards</span>
                  <span className="award-title">Gold Winner – Web Design and Development</span>
                  <span className="award-year">2025</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Complete Gallery (Images 19 through 28) */}
          <div className="pique-case-gallery">
            {/* 1. Hero Showcase: Image 19 */}
            <figure
              ref={heroSectionRef}
              className="pique-gallery-card pique-gallery-card--hero-video"
            >
              <img
                ref={heroImageRef}
                src="/media/19.webp"
                alt="Chaleit Hero - Real security needs deep expertise"
                loading="eager"
              />
            </figure>

            {/* 2 & 3. Split Pair 1: Images 20 & 21 */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img
                  src="/media/20.webp"
                  alt="Chaleit Threat Breakdown Visualization"
                  loading="lazy"
                />
              </figure>
              <figure className="pique-gallery-card">
                <img
                  src="/media/21.webp"
                  alt="Chaleit Customer Stories Mobile Experience"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* 4. Full Width Showcase: Image 22 */}
            <figure className="pique-gallery-card">
              <img
                src="/media/22.webp"
                alt="Chaleit Security Insights that drive real change"
                loading="lazy"
              />
            </figure>

            {/* 5 & 6. Split Pair 2: Images 23 & 24 */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img
                  src="/media/23.webp"
                  alt="Chaleit Critical Infrastructure Mobile Experience"
                  loading="lazy"
                />
              </figure>
              <figure className="pique-gallery-card">
                <img
                  src="/media/24.webp"
                  alt="Chaleit CISO Insights Mobile Stories"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* 7. Full Width Showcase: Image 25 */}
            <figure className="pique-gallery-card">
              <img
                src="/media/25.webp"
                alt="Chaleit Pen Testing Knowledge Article"
                loading="lazy"
              />
            </figure>

            {/* 8 & 9. Split Pair 3: Images 26 & 27 */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img
                  src="/media/26.webp"
                  alt="Chaleit Brand Identity and Logotype"
                  loading="lazy"
                />
              </figure>
              <figure className="pique-gallery-card">
                <img
                  src="/media/27.webp"
                  alt="Chaleit Hash Function and Cryptographic Geometry"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* 10. Full Width Showcase: Image 28 */}
            <figure className="pique-gallery-card">
              <img
                src="/media/28.webp"
                alt="Chaleit Comprehensive Security Services Grid"
                loading="lazy"
              />
            </figure>
          </div>
        </div>
      </section>

      {/* Up Next Project Footer */}
      <section className="pique-up-next" aria-label="Up next project">
        <div className="pique-up-next__header">
          <span className="pique-up-next__eyebrow">Up next</span>
          <h2 className="pique-up-next__title">Fair Go Finance</h2>
        </div>
        <Link
          to="/work"
          onClick={() => {
            if (onClose) onClose();
          }}
          className="pique-up-next__banner"
          aria-label="View Fair Go Finance project"
        >
          <div className="pique-up-next__media-wrap">
            <img
              src="/media/Globe.png"
              alt="Fair Go Finance Hero"
              className="pique-up-next__media"
              loading="lazy"
            />
          </div>
          <div className="pique-up-next__badge">
            <span>Fair Go Finance</span>
            <ArrowUpRight size={18} />
          </div>
        </Link>
      </section>
    </article>
  );
}
