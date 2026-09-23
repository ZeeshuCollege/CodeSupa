import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PiqueCaseStudyProps {
  onClose?: () => void;
  isModal?: boolean;
}

export default function PiqueCaseStudy({ onClose, isModal = false }: PiqueCaseStudyProps) {
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

    // Hero background subtle parallax
    if (heroSectionRef.current && heroImageRef.current) {
      gsap.fromTo(
        heroImageRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
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
  }, []);

  return (
    <div className="page pique-case-page">
      {/* 1. Hero Showcase Section */}
      <section ref={heroSectionRef} className="pique-case-hero" aria-label="PIQUE showcase hero">
        <img
          ref={heroImageRef}
          className="pique-case-hero__bg"
          src="/media/Nature.jpg"
          alt="PIQUE architectural backdrop"
        />
        <div className="pique-mockup-frame">
          <video
            className="pique-mockup-video"
            src="/media/Vid-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="PIQUE website walkthrough video"
          />
        </div>
        <div className="cta-panel__brand-tag">PIQUE</div>
      </section>

      {/* 2. Main Case Study Section */}
      <section className="pique-case-body">
        {/* Floating Close Button for standalone page */}
        {!isModal && (
          <button
            type="button"
            onClick={handleClose}
            className="pique-close-btn"
            aria-label="Close case study"
          >
            <X size={20} strokeWidth={2} />
          </button>
        )}

        <div className="pique-case-grid">
          {/* Left Column: Sticky Narrative & Specs */}
          <aside ref={stickyColRef} className="pique-case-aside">
            <h1 className="pique-case-title">PIQUE</h1>

            <div className="pique-case-meta">
              <a
                href="https://pique.com.au"
                target="_blank"
                rel="noopener noreferrer"
                className="pique-visit-btn"
              >
                <span>Visit Website</span>
                <ArrowUpRight size={15} />
              </a>
              <span className="pique-case-badge">Building &amp; Construction</span>
            </div>

            <div className="pique-case-narrative">
              <p className="pique-case-lead">
                PIQUE is a leading manufacturer of prefabricated, premium modular homes,
                designed for people living in challenging and remote locations.
              </p>
              <p>
                The website was to play a vital role in the launch campaign for PIQUE, needing
                to simultaneously evoke the brand’s premium cues whilst ensuring vital product
                information around specifications and build process was highly accessible.
              </p>
              <p>
                The answer lied in a content-rich experience that balanced both form and
                function in equal measures. A sophisticated browsing experience with elegant
                UI production techniques mirrored the quality and craftsmanship of the product
                suite, supported by clear technical information and CTAs to drive consumer
                consideration and in-bound enquiry.
              </p>
              <p>
                The outcome was an industry award-winning website that exceeded its business
                objectives and positioned the brand as a leader in the modular home sector.
              </p>
            </div>

            {/* Scope / Services */}
            <div className="pique-case-services">
              <ul>
                <li><span className="pique-dot">◫</span> Digital Strategy</li>
                <li><span className="pique-dot">◫</span> UX &amp; UI Design</li>
                <li><span className="pique-dot">◫</span> Rich Visual Media Application</li>
                <li><span className="pique-dot">◫</span> Animation &amp; Prototyping</li>
              </ul>
            </div>

            {/* Awards */}
            <div className="pique-case-awards">
              <h3 className="pique-awards-heading">Awards</h3>
              <div className="pique-award-row">
                <span className="award-org">Good Design Awards</span>
                <span className="award-title">Winner – Web Design and Development</span>
                <span className="award-year">2023</span>
              </div>
              <div className="pique-award-row">
                <span className="award-org">PADC Skulls</span>
                <span className="award-title">Bronze Skull – User Interface Design</span>
                <span className="award-year">2023</span>
              </div>
            </div>
          </aside>

          {/* Right Column: Ordered Gallery 1 through 10 */}
          <div className="pique-case-gallery">
            {/* Image 1: Main hero mockup */}
            <figure className="pique-gallery-card pique-gallery-card--full">
              <img src="/media/1.webp" alt="PIQUE design showcase 1" loading="lazy" />
            </figure>

            {/* Images 2 & 3: Dual split */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img src="/media/2.webp" alt="PIQUE architectural rendering 2" loading="lazy" />
              </figure>
              <figure className="pique-gallery-card">
                <img src="/media/3.webp" alt="PIQUE mobile configuration 3" loading="lazy" />
              </figure>
            </div>

            {/* Image 4 */}
            <figure className="pique-gallery-card pique-gallery-card--full">
              <img src="/media/4.webp" alt="PIQUE floorplan & specifications 4" loading="lazy" />
            </figure>

            {/* Image 5 */}
            <figure className="pique-gallery-card pique-gallery-card--full">
              <img src="/media/5.webp" alt="PIQUE modular build architecture 5" loading="lazy" />
            </figure>

            {/* Images 6 & 7: Dual split */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img src="/media/6.webp" alt="PIQUE organic graphics 6" loading="lazy" />
              </figure>
              <figure className="pique-gallery-card">
                <img src="/media/7.webp" alt="PIQUE mobile navigation 7" loading="lazy" />
              </figure>
            </div>

            {/* Images 8 & 9: Dual split */}
            <div className="pique-gallery-split">
              <figure className="pique-gallery-card">
                <img src="/media/8.webp" alt="PIQUE interior details 8" loading="lazy" />
              </figure>
              <figure className="pique-gallery-card">
                <img src="/media/9.webp" alt="PIQUE interface design 9" loading="lazy" />
              </figure>
            </div>

            {/* Image 10: Grand panoramic finish */}
            <figure className="pique-gallery-card pique-gallery-card--full">
              <img src="/media/10.webp" alt="PIQUE full panoramic home 10" loading="lazy" />
            </figure>
          </div>
        </div>
      </section>

      {/* 3. Up Next Section (Sussex Taps) */}
      <section className="pique-up-next">
        <div className="pique-up-next__header">
          <span className="pique-up-next__eyebrow">Up Next</span>
          <h2 className="pique-up-next__title">Sussex Taps</h2>
        </div>
        <Link to="/work" className="pique-up-next__banner" aria-label="View Sussex Taps project">
          <div className="pique-up-next__media-wrap">
            <img
              src="/media/Layers.jpg"
              alt="Sussex Taps precision craftsmanship"
              className="pique-up-next__media"
            />
          </div>
          <div className="pique-up-next__badge">
            <span>Sussex Taps</span>
            <ArrowUpRight size={18} />
          </div>
        </Link>
      </section>
    </div>
  );
}
