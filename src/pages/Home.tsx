import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiqueModalDrawer } from "../components/PiqueModalDrawer";
import { SussexModalDrawer } from "../components/SussexModalDrawer";
import { ChaleitModalDrawer } from "../components/ChaleitModalDrawer";

gsap.registerPlugin(ScrollTrigger);

const whatsNewItems = [
  {
    id: "awa-2026",
    tag: "Awards",
    tagVariant: "awards",
    image: "/media/whats-new/card-1.png",
    date: "10.06.26",
    titleBold: "Australian Web Awards 2026:",
    titleText: " 4 Wins including Best in Show: Design",
    linkText: "Read more",
    href: "/thinking"
  },
  {
    id: "trailswa-app",
    tag: "App Launch",
    tagVariant: "launch",
    image: "/media/whats-new/card-2.png",
    date: "04.06.26",
    titleBold: "TrailsWA Mobile App:",
    titleText: " New dedicated mobile app available on iOS and Android",
    linkText: "Download the App",
    href: "/work"
  },
  {
    id: "webby-awards",
    tag: "Awards",
    tagVariant: "awards",
    image: "/media/whats-new/card-3.png",
    date: "08.05.26",
    titleBold: "Global Recognition:",
    titleText: " Two Humaan projects receive high honours",
    linkText: "Read More",
    href: "/thinking"
  },
  {
    id: "pharmacy-777",
    tag: "Site Launch",
    tagVariant: "site",
    image: "/media/whats-new/card-4.png",
    date: "18.03.26",
    titleBold: "Pharmacy 777:",
    titleText: " New website for national pharmacy brand",
    linkText: "See Case Study",
    href: "/work"
  },
  {
    id: "marvell-tile",
    tag: "Site Launch",
    tagVariant: "site",
    image: "/media/whats-new/card-5.png",
    date: "23.02.26",
    titleBold: "Marvell Tile & Stone:",
    titleText: " An experience for a unique architectural space",
    linkText: "See Case Study",
    href: "/work"
  }
];

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
  const globeMediaRef = useRef<HTMLVideoElement>(null);
  const stat100Ref = useRef<HTMLSpanElement>(null);
  const stat15Ref = useRef<HTMLSpanElement>(null);
  const stat80Ref = useRef<HTMLSpanElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const whatsNewSectionRef = useRef<HTMLElement>(null);
  const whatsNewStickyRef = useRef<HTMLDivElement>(null);
  const whatsNewWrapperRef = useRef<HTMLDivElement>(null);
  const whatsNewTrackRef = useRef<HTMLDivElement>(null);
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

        // 4. Globe media video - balanced floating parallax & zoom (+20% tuned)
        if (globePanelRef.current && globeMediaRef.current) {
          gsap.fromTo(
            globeMediaRef.current,
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

        // 5. People First animated metrics counter (starts from 0 and reaches target on scroll)
        if (metricsRef.current) {
          const stats = { count100: 0, count15: 0, count80: 0 };
          gsap.to(stats, {
            count100: 100,
            count15: 15,
            count80: 80,
            duration: 1.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: metricsRef.current,
              scroller,
              start: "top 88%",
              once: true
            },
            onUpdate: () => {
              if (stat100Ref.current) stat100Ref.current.textContent = `${Math.round(stats.count100)}%`;
              if (stat15Ref.current) stat15Ref.current.textContent = `${Math.round(stats.count15)}`;
              if (stat80Ref.current) stat80Ref.current.textContent = `${Math.round(stats.count80)}+`;
            }
          });
        }

        // 6. What's New Humaan-style scroll-driven horizontal gallery
        let whatsNewTimeline: gsap.core.Timeline | null = null;

        const setupWhatsNewScroll = () => {
          if (!whatsNewSectionRef.current || !whatsNewTrackRef.current || !whatsNewWrapperRef.current) {
            return null;
          }

          const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const isMobile = window.innerWidth <= 768;

          const sectionEl = whatsNewSectionRef.current;
          const trackEl = whatsNewTrackRef.current;
          const wrapperEl = whatsNewWrapperRef.current;
          const cards = trackEl.querySelectorAll<HTMLElement>(".whats-new-card");
          const metas = trackEl.querySelectorAll<HTMLElement>(".whats-new-meta");

          if (isReducedMotion || isMobile) {
            sectionEl.style.height = "auto";
            gsap.set(trackEl, { clearProps: "all" });
            gsap.set(cards, { clearProps: "all" });
            gsap.set(metas, { clearProps: "all" });
            return null;
          }

          // Compute horizontal translation dynamically from overflow
          // Account for padding on the right edge so the final card is fully visible with margin
          const paddingRight = window.innerWidth <= 860 ? 24 : 42;
          const maxTranslate = Math.max(0, trackEl.scrollWidth - wrapperEl.clientWidth + paddingRight);

          // Proportional vertical scroll space with sensible multiplier so motion feels premium
          const scrollDistance = Math.max(maxTranslate * 1.35, window.innerHeight * 1.25);
          sectionEl.style.height = `${window.innerHeight + scrollDistance}px`;

          // Initial visual states: cards at scale 1.0, text slightly compressed and masked
          gsap.set(cards, { scale: 1.0 });
          gsap.set(metas, {
            y: 22,
            opacity: 0.15,
            clipPath: "inset(0% 0% 85% 0%)"
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionEl,
              scroller: scroller,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.7,
              invalidateOnRefresh: true
            }
          });

          // Main horizontal translation across entire pinned journey
          tl.to(
            trackEl,
            {
              x: -maxTranslate,
              ease: "power1.inOut",
              duration: 1
            },
            0
          );

          // Card subtle scale/shrink effect (1.0 -> 0.92) across scroll
          tl.to(
            cards,
            {
              scale: 0.92,
              ease: "power1.out",
              duration: 0.8
            },
            0.05
          );

          // Spatial text reveal beneath each card (unmasks and floats into position)
          tl.to(
            metas,
            {
              y: 0,
              opacity: 1,
              clipPath: "inset(0% 0% 0% 0%)",
              ease: "power2.out",
              duration: 0.45
            },
            0.06
          );

          // Smooth background color transition: seamlessly blends from canvas beige (#f3f3e9) to white (#ffffff)
          // as the later cards scroll across and the section transitions into the footer
          tl.fromTo(
            [sectionEl, ...bgTargets],
            { backgroundColor: "#f3f3e9" },
            {
              backgroundColor: "#ffffff",
              ease: "power2.inOut",
              duration: 0.44
            },
            0.56
          );

          return tl;
        };

        whatsNewTimeline = setupWhatsNewScroll();

        // Ensure calculations update once images complete loading
        const trackImages = whatsNewTrackRef.current?.querySelectorAll("img");
        trackImages?.forEach((img) => {
          if (!img.complete) {
            img.addEventListener(
              "load",
              () => {
                if (whatsNewTimeline) {
                  whatsNewTimeline.scrollTrigger?.kill();
                  whatsNewTimeline.kill();
                }
                whatsNewTimeline = setupWhatsNewScroll();
                ScrollTrigger.refresh();
              },
              { once: true }
            );
          }
        });

        const handleResize = () => {
          if (currentTimeline) {
            currentTimeline.scrollTrigger?.kill();
            currentTimeline.kill();
          }
          currentTimeline = setupScrollAnimation();

          if (whatsNewTimeline) {
            whatsNewTimeline.scrollTrigger?.kill();
            whatsNewTimeline.kill();
          }
          whatsNewTimeline = setupWhatsNewScroll();

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
          if (whatsNewTimeline) {
            whatsNewTimeline.scrollTrigger?.kill();
            whatsNewTimeline.kill();
          }
          bgTargets.forEach(el => {
            if (el) (el as HTMLElement).style.backgroundColor = "";
          });
          if (whatsNewSectionRef.current) {
            whatsNewSectionRef.current.style.backgroundColor = "";
          }
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
        <video
          ref={globeMediaRef}
          className="cta-panel__image cta-panel__video"
          src="/media/Ref-V6.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Earth video showcase"
        />
        <div className="surveillance-mockup-frame">
          <img
            src="/media/surveillance-watch.png"
            alt="Surveillance Watch interface"
            className="surveillance-mockup-image"
          />
        </div>
      </section>

      <section className="closing-statement" aria-label="Closing statement">
        <h2 className="display">Great work for<br />great <span aria-hidden="true">☺</span> people.</h2>

        <div className="people-first-grid">
          <div className="people-first-col">
            <div className="people-first-copy">
              <p>
                We put people first, understanding that a well-crafted product
                significantly impacts the lives of those who use it. By
                empowering users, we&apos;re able to solve unique problems,
                accelerate progress and unlock potential for our clients.
              </p>
              <p>
                Our independent spirit drives our creative energy and approach
                to technology, allowing us to ensure quality and consistently
                deliver outstanding outcomes.
              </p>
              <Link to="/about" className="people-first-btn">
                <span>About Us</span>
                <ArrowRight size={17} strokeWidth={2.2} />
              </Link>
            </div>

            <div ref={metricsRef} className="people-first-metrics">
              <div className="metric-row">
                <span ref={stat100Ref} className="metric-number">0%</span>
                <span className="metric-label">
                  In-house &amp;<br />independent
                </span>
              </div>
              <div className="metric-row">
                <span ref={stat15Ref} className="metric-number">0</span>
                <span className="metric-label">
                  Years crafting digital<br />experiences
                </span>
              </div>
              <div className="metric-row">
                <span ref={stat80Ref} className="metric-number">0+</span>
                <span className="metric-label">
                  Awards from AWA,<br />FWA, and Awwwards
                </span>
              </div>
            </div>
          </div>

          <div className="people-first-media">
            <img
              src="/media/29.webp"
              alt="CodeSupa team at work"
              className="people-first-img"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* What's New Section */}
      <section ref={whatsNewSectionRef} className="whats-new-section" aria-label="What's New">
        <div ref={whatsNewStickyRef} className="whats-new-sticky">
          <div className="whats-new-header">
            <h2 className="display whats-new-title">What&apos;s New</h2>
          </div>

          <div ref={whatsNewWrapperRef} className="whats-new-track-wrapper">
            <div ref={whatsNewTrackRef} className="whats-new-track">
              {whatsNewItems.map((item) => (
                <article key={item.id} className="whats-new-card">
                  <div className="whats-new-media-wrap">
                    <img
                      src={item.image}
                      alt={item.titleBold}
                      className="whats-new-img"
                      loading="lazy"
                      draggable={false}
                    />
                    <span className={`whats-new-badge whats-new-badge--${item.tagVariant}`}>
                      {item.tag}
                    </span>
                  </div>
                  <div className="whats-new-meta">
                    <time className="whats-new-date">{item.date}</time>
                    <h3 className="whats-new-heading">
                      <strong>{item.titleBold}</strong>{item.titleText}
                    </h3>
                    <Link to={item.href} className="whats-new-link">
                      {item.linkText}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer Section - "Let's make something original" */}
      <footer className="home-footer" aria-label="Site footer">
        <div className="home-footer__cta">
          <Link to="/contact" className="home-footer__cta-link">
            <span className="home-footer__cta-line">
              Let&apos;s make <span className="home-footer__cta-arrow" aria-hidden="true">→</span>
            </span>
            <span className="home-footer__cta-line">something original</span>
          </Link>
        </div>

        <div className="home-footer__body">
          <div className="home-footer__locations">
            <div className="home-footer__loc-col">
              <div className="home-footer__loc-title">
                <Globe size={18} strokeWidth={1.8} className="home-footer__globe-icon" />
                <span>We work globally</span>
              </div>
              <Link to="/contact" className="home-footer__brief-link">
                Submit a brief <span aria-hidden="true">→</span>
              </Link>
              <a href="mailto:hello@codesupa.com" className="home-footer__email">
                hello@codesupa.com
              </a>
            </div>

            <div className="home-footer__loc-col">
              <h4 className="home-footer__loc-heading">USA</h4>
              <p className="home-footer__loc-city">Los Angeles, CA</p>
              <a href="mailto:la@codesupa.com" className="home-footer__email">
                la@codesupa.com
              </a>
            </div>

            <div className="home-footer__loc-col">
              <h4 className="home-footer__loc-heading">Australia</h4>
              <p className="home-footer__loc-city">Perth, WA</p>
              <a href="mailto:perth@codesupa.com" className="home-footer__email">
                perth@codesupa.com
              </a>
            </div>
          </div>
        </div>

        <div className="home-footer__bottom">
          <div className="home-footer__bottom-left">
            <span className="home-footer__wordmark">CodeSupa</span>
            <span className="home-footer__copy-meta">© 2026 Privacy</span>
            <span className="home-footer__copy-meta">CodeSupa &amp; AI</span>
          </div>

          <div className="home-footer__socials">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="home-footer__social-link">Twitter X</a>
            <span className="home-footer__asterisk" aria-hidden="true">✳</span>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="home-footer__social-link">Instagram</a>
            <span className="home-footer__asterisk" aria-hidden="true">✳</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="home-footer__social-link">LinkedIn</a>
          </div>
        </div>
      </footer>

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