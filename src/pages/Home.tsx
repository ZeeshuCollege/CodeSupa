import { useLayoutEffect, useRef } from "react";
import { ArrowUpRight, Maximize2, Pause, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
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

      <section className="video-showcase" aria-label="Featured video">
        <div className="video-player">
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
            <span className="video-player__orb video-player__orb--one" />
            <span className="video-player__orb video-player__orb--two" />
            <span className="video-player__line video-player__line--one" />
            <span className="video-player__line video-player__line--two" />
            <div className="video-player__title">CodeSupa<br /><em>in motion.</em></div>
            <button className="video-player__play" type="button" aria-label="Play video">
              <span />
            </button>
          </div>
          <div className="video-player__controls">
            <span className="video-player__time">00:00 <i /> 01:24</span>
            <div className="video-player__progress"><span /></div>
            <div className="video-player__actions">
              <button type="button" aria-label="Pause"><Pause size={15} /></button>
              <button type="button" aria-label="Volume"><Volume2 size={15} /></button>
              <button type="button" aria-label="Fullscreen"><Maximize2 size={15} /></button>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-panel">
        <p className="eyebrow">03 / Let's make something</p>
        <h2 className="display">Your next digital move starts here.</h2>
        <Link to="/contact" className="big-cta">Tell us about it <ArrowUpRight size={24} /></Link>
      </section>
    </div>
  );
}