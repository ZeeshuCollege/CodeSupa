import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface SussexCaseStudyProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function SussexCaseStudy({ onClose, isModal = false }: SussexCaseStudyProps) {
  const navigate = useNavigate();
  const heroVideoRef = useRef<HTMLVideoElement>(null);
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

    // Subtle parallax on the top hero video
    if (heroSectionRef.current && heroVideoRef.current) {
      gsap.fromTo(
        heroVideoRef.current,
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
    <article className="pique-case-study" aria-label="Sussex Taps Case Study">
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
              <h1 className="pique-case-title">Sussex Taps</h1>

              <div className="pique-case-meta">
                <a
                  href="https://sussextaps.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pique-visit-btn"
                  aria-label="Visit Sussex Taps website in a new tab"
                >
                  Visit Website <ArrowUpRight size={16} />
                </a>
                <span className="pique-tag">Manufacturing</span>
              </div>

              <div className="pique-case-description">
                <p>
                  Sussex Taps is a manufacturer of premium tapware with a deep heritage in Australian manufacturing.
                </p>
                <p>
                  Following a brand repositioning, Sussex Taps engaged Humaan to design an immersive digital experience that communicated the brand's core proposition of quality, heritage and craftsmanship.
                </p>
                <p>
                  The visual content and product suite played a hero role within the website, which was augmented by bleeding-edge interactivity and animation treatments to give the audiences a tangible and tactile digital showroom experience.
                </p>
                <p>
                  The result is a sensory-rich experience that pushes the boundaries of UI design and interactive development and which has strengthened the brand’s category-leading position in the market.
                </p>
              </div>

              <ul className="pique-case-services" aria-label="Services provided">
                <li>
                  <span className="pique-dot">✳</span>
                  <span>Digital Strategy &amp; UX</span>
                </li>
                <li>
                  <span className="pique-dot">◎</span>
                  <span>Interaction Design</span>
                </li>
                <li>
                  <span className="pique-dot">⌢</span>
                  <span>3D Product Visualisation</span>
                </li>
                <li>
                  <span className="pique-dot">✕</span>
                  <span>Animation and Interaction</span>
                </li>
                <li>
                  <span className="pique-dot">✳</span>
                  <span>Custom eCommerce</span>
                </li>
              </ul>

              <div className="pique-case-awards" aria-label="Awards &amp; Recognition">
                <h2 className="pique-awards-heading">Awards</h2>

                <div className="pique-award-row">
                  <span className="award-org">Good Design Awards</span>
                  <span className="award-title">Winner – Web Design and Development</span>
                  <span className="award-year">2023</span>
                </div>

                <div className="pique-award-row">
                  <span className="award-org">PADC Skulls</span>
                  <span className="award-title">Silver Skull – Use of Experience Design</span>
                  <span className="award-year">2023</span>
                </div>

                <div className="pique-award-row">
                  <span className="award-org">PADC Skulls</span>
                  <span className="award-title">Silver Skull – Best Websites Brand Experience</span>
                  <span className="award-year">2023</span>
                </div>

                <div className="pique-award-row">
                  <span className="award-org">Awwwards</span>
                  <span className="award-title">Dev Award</span>
                  <span className="award-year">2022</span>
                </div>

                <div className="pique-award-row">
                  <span className="award-org">Awwwards</span>
                  <span className="award-title">Site of the Day</span>
                  <span className="award-year">2022</span>
                </div>

                <div className="pique-award-row">
                  <span className="award-org">FWA</span>
                  <span className="award-title">Site of the Day</span>
                  <span className="award-year">2022</span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT: Complete Gallery (Ref-V3 sequence with Ref-V2, 11-18, and Ref-V4) */}
          <div className="pique-case-gallery">
            {/* 1. Hero Video: Matte Black Tapware */}
            <figure
              ref={heroSectionRef}
              className="pique-gallery-card pique-gallery-card--hero-video"
            >
              <video
                ref={heroVideoRef}
                src="/media/Ref-V2.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Sussex Taps craftsmanship hero"
              />
            </figure>

            {/* 2 & 3. Split Pair 1: Images 11 & 12 */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img
                  src="/media/11.webp"
                  alt="Sussex Taps Scala Collection Mobile"
                  loading="lazy"
                />
              </figure>
              <figure className="pique-gallery-card">
                <img
                  src="/media/12.webp"
                  alt="Sussex Taps Specification Options"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* 4. Full Width Video: Ref-V4 (Making it right entirely in Australia since 1997) */}
            <figure className="pique-gallery-card pique-gallery-card--video-wide">
              <video
                src="/media/Ref-V4.mp4"
                autoPlay
                muted
                loop
                playsInline
                aria-label="Making it right entirely in Australia since 1997"
              />
            </figure>

            {/* 5 & 6. Split Pair 2: Images 13 & 14 */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img
                  src="/media/13.webp"
                  alt="Sussex Taps Finish Swatches Sample Added"
                  loading="lazy"
                />
              </figure>
              <figure className="pique-gallery-card">
                <img
                  src="/media/14.webp"
                  alt="Sussex Taps Calibre Geometric Wireframe"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* 7. Full Width Mockup: Image 15 (Synchronised harmony) */}
            <figure className="pique-gallery-card">
              <img
                src="/media/15.webp"
                alt="Sussex Taps Synchronised Harmony Showcase"
                loading="lazy"
              />
            </figure>

            {/* 8. Client Testimonial Quote */}
            <div className="sussex-case-quote" aria-label="Client testimonial">
              <blockquote className="sussex-case-quote__text">
                “Humaan are true professionals, masters in their field, with meticulous attention to detail. With our dream website complete, we have an asset that can evolve with us for many years to come. Thank you amazing Humaans!”
              </blockquote>
              <div className="sussex-case-quote__author">
                <span className="sussex-case-quote__dot" />
                <span className="sussex-case-quote__name">Vanessa Katsanevakis</span>
                <span className="sussex-case-quote__role">CEO</span>
              </div>
            </div>

            {/* 9 & 10. Split Pair 3: Images 16 & 17 */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img
                  src="/media/16.webp"
                  alt="Sussex Taps State of the Art Facility"
                  loading="lazy"
                />
              </figure>
              <figure className="pique-gallery-card">
                <img
                  src="/media/17.webp"
                  alt="Sussex Taps Living Rustic Iron Finish"
                  loading="lazy"
                />
              </figure>
            </div>

            {/* 11. Full Width Showcase: Image 18 (Projects slider) */}
            <figure className="pique-gallery-card">
              <img
                src="/media/18.webp"
                alt="Sussex Taps Projects Slider Showcase"
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
          <h2 className="pique-up-next__title">TrailsWA</h2>
        </div>
        <Link
          to="/work"
          onClick={() => {
            if (onClose) onClose();
          }}
          className="pique-up-next__banner"
          aria-label="View TrailsWA project"
        >
          <div className="pique-up-next__media-wrap">
            <img
              src="/media/Jungle Woods.jpg"
              alt="TrailsWA Hero"
              className="pique-up-next__media"
              loading="lazy"
            />
          </div>
          <div className="pique-up-next__badge">
            <span>TrailsWA</span>
            <ArrowUpRight size={18} />
          </div>
        </Link>
      </section>
    </article>
  );
}
