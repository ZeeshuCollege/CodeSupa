import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiqueModalDrawer } from "../components/PiqueModalDrawer";
import { SussexModalDrawer } from "../components/SussexModalDrawer";
import { ChaleitModalDrawer } from "../components/ChaleitModalDrawer";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isPiqueOpen, setIsPiqueOpen] = useState(false);
  const [isSussexOpen, setIsSussexOpen] = useState(false);
  const [isChaleitOpen, setIsChaleitOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);
  const showcaseStickyRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const logoStripRef = useRef<HTMLElement>(null);
  const ctaPanelRef = useRef<HTMLElement>(null);
  const ctaImageRef = useRef<HTMLImageElement>(null);
  const secondaryPanelRef = useRef<HTMLElement>(null);
  const secondaryImagesRef = useRef<(HTMLImageElement | HTMLVideoElement)[]>([]);
  const globePanelRef = useRef<HTMLElement>(null);
  const globeImageRef = useRef<HTMLImageElement>(null);
  const videoSource = "/media/Vid-1.mp4";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        yPercent: 112,
        stagger: 0.07,
        duration: 1.15,
        ease: "power4.out",
        delay: 0.05
      });
      gsap.from(".hero-utility", {
        opacity: 0,
        y: 15,
        duration: 0.8,
        stagger: 0.08,
        delay: 0.35,
        ease: "power3.out"
      });

      if (videoSectionRef.current && videoPlayerRef.current) {
        const scroller = document.querySelector<HTMLElement>(".site-frame") || window;

        const getBounds = () => {
          const isMobile = window.innerWidth <= 780;
          const isTablet = window.innerWidth <= 1050;
          const sideMargin = isMobile ? 36 : isTablet ? 52 : 84;
          const initialWidth = window.innerWidth - sideMargin;
          const initialHeight = Math.min(window.innerWidth * 0.58, 720);
          const initialRadius = isMobile ? 18 : 28;
          const targetWidth = Math.max(window.innerWidth, document.documentElement.clientWidth);
          const targetHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);

          return {
            initialWidth,
            initialHeight,
            initialRadius,
            targetWidth,
            targetHeight
          };
        };

        const scrollerEl = document.querySelector<HTMLElement>(".site-frame");
        const stageEl = document.querySelector<HTMLElement>(".desktop-stage");
        const bodyEl = document.body;
        const htmlEl = document.documentElement;

        const bgTargets = [scrollerEl, stageEl, bodyEl, htmlEl].filter(Boolean);

        gsap.set(bgTargets, { backgroundColor: "#f3f3e9" });

        const setupScrollAnimation = () => {
          const { initialWidth, initialHeight, initialRadius, targetWidth, targetHeight } = getBounds();

          gsap.set(videoPlayerRef.current, {
            width: `${initialWidth}px`,
            height: `${initialHeight}px`,
            borderRadius: `${initialRadius}px`,
            boxShadow: "none"
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: videoSectionRef.current,
              scroller: scroller,
              start: "top 75%",
              end: "bottom bottom",
              scrub: 0.6,
              invalidateOnRefresh: true
            }
          });

          // 1. Zoom in: starts dynamically as user scrolls down and reaches full bleed exactly at top: 0
          tl.to(videoPlayerRef.current, {
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            borderRadius: "0px",
            boxShadow: "none",
            ease: "none",
            duration: 0.50
          }, 0)
          // Smoothly transition background to purple as video covers full bleed
          .fromTo(bgTargets,
            { backgroundColor: "#f3f3e9" },
            {
              backgroundColor: "#B488F1",
              ease: "none",
              duration: 0.25
            },
            0.25
          )
          // 2. COMPLETELY COVER SCREEN: hold full bleed (100vw x 100vh, 0px radius) with NO purple border
          .to(videoPlayerRef.current, {
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            borderRadius: "0px",
            ease: "none",
            duration: 0.15
          }, 0.50)
          // 3. Zoom out + scroll down simultaneously: contracts back to card size as page scrolls into statement
          .to(videoPlayerRef.current, {
            width: `${initialWidth}px`,
            height: `${initialHeight}px`,
            borderRadius: `${initialRadius}px`,
            boxShadow: "none",
            ease: "none",
            duration: 0.35
          }, 0.65);

          return tl;
        };

        let currentTimeline = setupScrollAnimation();

        // Entrance animation for the brand statement text
        gsap.from(".statement-strip__text", {
          scrollTrigger: {
            trigger: ".statement-strip",
            scroller: scroller,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          opacity: 0,
          y: 35,
          duration: 0.9,
          ease: "power3.out"
        });

        const logoBatches = gsap.utils.toArray<HTMLElement>(".client-logo-batch");
        const logoLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.35 });

        logoBatches.forEach(batch => {
          const logos = batch.querySelectorAll(".client-logo");
          logoLoop
            .set(batch, { autoAlpha: 1 })
            .fromTo(logos, { autoAlpha: 0, y: 24 }, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.12,
              ease: "power3.out"
            })
            .to({}, { duration: 1.4 })
            .to(logos, {
              autoAlpha: 0,
              y: -18,
              duration: 0.45,
              stagger: 0.08,
              ease: "power2.in"
            })
            .set(batch, { autoAlpha: 0 });
        });

        ScrollTrigger.create({
          trigger: logoStripRef.current,
          scroller,
          start: "top 82%",
          end: "bottom 18%",
          onEnter: () => logoLoop.play(),
          onEnterBack: () => logoLoop.play(),
          onLeave: () => logoLoop.pause(0),
          onLeaveBack: () => logoLoop.pause(0)
        });

        // 1. First full-width image (Nature) - balanced, refined parallax & scale (+20% tuned)
        if (ctaPanelRef.current && ctaImageRef.current) {
          gsap.fromTo(
            ctaImageRef.current,
            { yPercent: -6.3, scale: 1.054 },
            {
              yPercent: 6.3,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: ctaPanelRef.current,
                scroller,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.85,
                invalidateOnRefresh: true
              }
            }
          );
        }

        if (logoStripRef.current) {
          ScrollTrigger.create({
            trigger: logoStripRef.current,
            scroller,
            start: "bottom top",
            onEnter: () => {
              gsap.to(bgTargets, {
                backgroundColor: "#f3f3e9",
                duration: 0.55,
                ease: "power2.out",
                overwrite: "auto"
              });
            },
            onLeaveBack: () => {
              gsap.to(bgTargets, {
                backgroundColor: "#B488F1",
                duration: 0.55,
                ease: "power2.out",
                overwrite: "auto"
              });
            }
          });
        }

        // 2 & 3. Split dual images (Jungle Woods & Layers) - balanced depth parallax (+20% tuned)
        if (secondaryPanelRef.current && secondaryImagesRef.current.length) {
          if (secondaryImagesRef.current[0]) {
            gsap.fromTo(
              secondaryImagesRef.current[0],
              { yPercent: -6.3, scale: 1.054 },
              {
                yPercent: 6.3,
                scale: 1.0,
                ease: "none",
                scrollTrigger: {
                  trigger: secondaryPanelRef.current,
                  scroller,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.85,
                  invalidateOnRefresh: true
                }
              }
            );
          }

          if (secondaryImagesRef.current[1]) {
            gsap.fromTo(
              secondaryImagesRef.current[1],
              { yPercent: -4.5, scale: 1.0 },
              {
                yPercent: 6.9,
                scale: 1.054,
                ease: "none",
                scrollTrigger: {
                  trigger: secondaryPanelRef.current,
                  scroller,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.9,
                  invalidateOnRefresh: true
                }
              }
            );
          }
        }

        // 4. Globe image - balanced floating parallax & zoom (+20% tuned)
        if (globePanelRef.current && globeImageRef.current) {
          gsap.fromTo(
            globeImageRef.current,
            { yPercent: -6.3, scale: 1.054 },
            {
              yPercent: 6.3,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: globePanelRef.current,
                scroller,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.85,
                invalidateOnRefresh: true
              }
            }
          );
        }

        const handleResize = () => {
          if (currentTimeline) {
            currentTimeline.scrollTrigger?.kill();
            currentTimeline.kill();
          }
          currentTimeline = setupScrollAnimation();
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", handleResize);

        const timer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 150);

        return () => {
          window.removeEventListener("resize", handleResize);
          clearTimeout(timer);
          if (currentTimeline) {
            currentTimeline.scrollTrigger?.kill();
            currentTimeline.kill();
          }
          bgTargets.forEach(el => {
            if (el) (el as HTMLElement).style.backgroundColor = "";
          });
        };
      }
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="page home-page">
      <section className="hero-section">
        <div className="hero-copy-wrap">
          <h1 className="display hero-heading" aria-label="Extraordinary Digital Experiences">
            <span className="line-mask"><span className="hero-word">Extraordinary</span></span>
            <span className="line-mask accent-line"><span className="hero-word">Digital Experiences.</span></span>
          </h1>
        </div>

        <div className="hero-bottom">
        </div>
      </section>

      <section ref={videoSectionRef} className="video-showcase" aria-label="Featured video">
        <div ref={showcaseStickyRef} className="video-showcase__sticky">
          <div ref={videoPlayerRef} className="video-player">
            <div className="video-player__art">
              <video
                className="video-player__media"
                src={videoSource}
                autoPlay
                muted
                loop
                playsInline
                aria-label="Featured video"
              />
              <div className="video-player__title">CodeSupa<br /><em>in motion.</em></div>
            </div>
          </div>
        </div>
      </section>

      <section ref={statementRef} className="statement-strip" aria-label="Brand statement">
        <div className="statement-strip__content">
          <h2 className="statement-strip__text">
            <span className="statement-strip__line">We design, build and ship</span>
            <span className="statement-strip__line">world-class digital products</span>
            <span className="statement-strip__line">for forward-thinking brands.</span>
          </h2>
        </div>
      </section>

      <section ref={logoStripRef} className="client-logo-strip" aria-label="Selected clients">
        <div className="client-logo-batch">
          <div className="client-logo client-logo--rychiger">RYCHIGER</div>
          <div className="client-logo client-logo--breast"><span className="client-logo__mark">◯</span><span>National<br />Breast Cancer<br />Foundation</span></div>
          <div className="client-logo client-logo--curtin"><span className="client-logo__badge">▤</span><span>Curtin University</span></div>
          <div className="client-logo client-logo--seven"><strong>◈ au</strong><span>SEVEN WEST MEDIA</span></div>
          <div className="client-logo client-logo--cocos"><span className="client-logo__ring">◌</span><span>Cocos Keeling<br />Islands</span></div>
        </div>
        <div className="client-logo-batch">
          <div className="client-logo client-logo--pentanet">♢ PENTANET</div>
          <div className="client-logo client-logo--macquarie"><strong>✧</strong><span>MACQUARIE<br />University</span></div>
          <div className="client-logo client-logo--deloitte">Deloitte.</div>
          <div className="client-logo client-logo--agrifutures"><strong>◎</strong><span>AgriFutures<br /><small>Australia</small></span></div>
          <div className="client-logo client-logo--cancer"><strong>✿</strong><span>Cancer<br />Council<br /><small>WA</small></span></div>
        </div>
      </section>

      <section ref={ctaPanelRef} className="cta-panel">
        <img ref={ctaImageRef} className="cta-panel__image" src="/media/Nature.jpg" alt="Nature" />
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsPiqueOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsPiqueOpen(true);
            }
          }}
          className="pique-mockup-frame"
          style={{ cursor: "pointer" }}
          aria-label="Open PIQUE case study popup"
        >
          <video
            className="pique-mockup-video"
            src="/media/Vid-2.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="PIQUE case study walkthrough"
          />
        </div>
        <button
          type="button"
          onClick={() => setIsPiqueOpen(true)}
          className="cta-panel__brand-tag cta-panel__brand-tag--btn"
          aria-label="Open PIQUE project popup"
        >
          PIQUE
        </button>
      </section>

      <section ref={secondaryPanelRef} className="cta-panel cta-panel--split">
        {/* Chaleit Card on the left of Sussex */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsChaleitOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsChaleitOpen(true);
            }
          }}
          className="cta-panel__half"
          style={{ cursor: "pointer" }}
          aria-label="Open Chaleit case study popup"
        >
          <img
            ref={element => {
              if (element) secondaryImagesRef.current[0] = element;
            }}
            className="cta-panel__image"
            src="/media/Layers.jpg"
            alt="Chaleit"
          />
          <div className="chaleit-mockup-frame">
            <img
              src="/media/chaleit-mobile.png"
              alt="Chaleit Mobile Experience"
              className="chaleit-mockup-image"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsChaleitOpen(true);
            }}
            className="cta-panel__brand-tag cta-panel__brand-tag--btn"
            aria-label="Open Chaleit project popup"
          >
            Chaleit
          </button>
        </div>

        {/* Sussex Taps Card on the right */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsSussexOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsSussexOpen(true);
            }
          }}
          className="cta-panel__half"
          style={{ cursor: "pointer" }}
          aria-label="Open Sussex Taps case study popup"
        >
          <video
            ref={element => {
              if (element) secondaryImagesRef.current[1] = element;
            }}
            className="cta-panel__image cta-panel__video"
            src="/media/Ref-V2.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Sussex Taps craftsmanship video"
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsSussexOpen(true);
            }}
            className="cta-panel__brand-tag cta-panel__brand-tag--btn"
            aria-label="Open Sussex Taps project popup"
          >
            Sussex Taps
          </button>
        </div>
      </section>

      <section ref={globePanelRef} className="cta-panel">
        <img ref={globeImageRef} className="cta-panel__image" src="/media/Globe.png" alt="Globe" />
      </section>

      <section className="closing-statement" aria-label="Closing statement">
        <h2 className="display">Great work for<br />great <span aria-hidden="true">☺</span> people.</h2>
      </section>

      {/* PIQUE Case Study Popup Drawer */}
      <PiqueModalDrawer
        isOpen={isPiqueOpen}
        onClose={() => setIsPiqueOpen(false)}
      />

      {/* Sussex Taps Case Study Popup Drawer */}
      <SussexModalDrawer
        isOpen={isSussexOpen}
        onClose={() => setIsSussexOpen(false)}
      />

      {/* Chaleit Case Study Popup Drawer */}
      <ChaleitModalDrawer
        isOpen={isChaleitOpen}
        onClose={() => setIsChaleitOpen(false)}
      />
    </div>
  );
}