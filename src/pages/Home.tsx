import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const videoSectionRef = useRef<HTMLElement>(null);
  const showcaseStickyRef = useRef<HTMLDivElement>(null);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLElement>(null);
  const logoStripRef = useRef<HTMLElement>(null);
  const ctaPanelRef = useRef<HTMLElement>(null);
  const ctaImageRef = useRef<HTMLImageElement>(null);
  const secondaryPanelRef = useRef<HTMLElement>(null);
  const secondaryImagesRef = useRef<HTMLImageElement[]>([]);
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
          const targetWidth = window.innerWidth;
          const targetHeight = window.innerHeight;

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
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
              invalidateOnRefresh: true
            }
          });

          // 1. Expand smoothly to cover the whole screen (bezelless)
          tl.to(videoPlayerRef.current, {
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            borderRadius: "0px",
            boxShadow: "none",
            ease: "power2.inOut",
            duration: 0.42
          }, 0)
          // As video covers the screen, transition the root canvas background to #B488F1
          .fromTo(bgTargets,
            { backgroundColor: "#f3f3e9" },
            {
              backgroundColor: "#B488F1",
              duration: 0.22,
              ease: "power1.inOut"
            },
            0.32
          )
          // 2. Hold full screen while user scrolls through the showcase
          .to(videoPlayerRef.current, {
            duration: 0.16
          }, 0.42)
          // 3. Smoothly contract back to normal size (zoom out) against the seamless purple background
          .to(videoPlayerRef.current, {
            width: `${initialWidth}px`,
            height: `${initialHeight}px`,
            borderRadius: `${initialRadius}px`,
            boxShadow: "none",
            ease: "power2.inOut",
            duration: 0.42
          }, 0.58);

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

        if (ctaPanelRef.current && ctaImageRef.current) {
          gsap.fromTo(
            ctaImageRef.current,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: ctaPanelRef.current,
                scroller,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
              }
            }
          );
        }

        if (ctaPanelRef.current) {
          gsap.fromTo(
            bgTargets,
            { backgroundColor: "#f3f3e9" },
            {
              backgroundColor: "#b488f1",
              ease: "none",
              scrollTrigger: {
                trigger: ctaPanelRef.current,
                scroller,
                start: "top 90%",
                end: "top 35%",
                scrub: 0.8,
                invalidateOnRefresh: true
              }
            }
          );
        }

        if (secondaryPanelRef.current && secondaryImagesRef.current.length) {
          gsap.fromTo(
            secondaryImagesRef.current,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: secondaryPanelRef.current,
                scroller,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                invalidateOnRefresh: true
              }
            }
          );
        }

        if (globePanelRef.current && globeImageRef.current) {
          gsap.fromTo(
            globeImageRef.current,
            { yPercent: -12 },
            {
              yPercent: 12,
              ease: "none",
              scrollTrigger: {
                trigger: globePanelRef.current,
                scroller,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
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
      </section>

      <section ref={secondaryPanelRef} className="cta-panel cta-panel--split">
        <div className="cta-panel__half">
          <img
            ref={element => {
              if (element) secondaryImagesRef.current[0] = element;
            }}
            className="cta-panel__image"
            src="/media/Jungle%20Woods.jpg"
            alt="Jungle woods"
          />
        </div>
        <div className="cta-panel__half">
          <img
            ref={element => {
              if (element) secondaryImagesRef.current[1] = element;
            }}
            className="cta-panel__image"
            src="/media/Layers.jpg"
            alt="Layers"
          />
        </div>
      </section>

      <section ref={globePanelRef} className="cta-panel">
        <img ref={globeImageRef} className="cta-panel__image" src="/media/Globe.png" alt="Globe" />
      </section>

      <section className="closing-statement" aria-label="Closing statement">
        <h2 className="display">Great work for<br />great <span aria-hidden="true">☺</span> people.</h2>
      </section>
    </div>
  );
}