import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const links = [
  { href: "/", label: "Home", bg: "#082415", color: "#38ed7a" },
  { href: "/about", label: "About", bg: "#071536", color: "#6cb2ff" },
  { href: "/work", label: "Work", bg: "#280a1c", color: "#ff6298" },
  { href: "/expertise", label: "Expertise", bg: "#062326", color: "#3ce2ea" },
  { href: "/thinking", label: "Thinking", bg: "#22190c", color: "#ffb443" },
  { href: "/contact", label: "Contact", bg: "#082415", color: "#38ed7a" }
] as const;

function BrandMark() {
  return (
    <div className="brand-mark" aria-hidden="true">
      <span className="mark-dot dot-a" />
      <span className="mark-dot dot-b" />
      <span className="mark-corner" />
      <span className="mark-smile" />
    </div>
  );
}

export function SiteShell() {
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out", delay: 0.15 }
      );
    }, navRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const active = navRef.current?.querySelector(".nav-link.active");
    if (active) {
      gsap.fromTo(
        active,
        { scale: 0.94, opacity: 0.9 },
        { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" }
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    const frame = document.querySelector<HTMLElement>(".site-frame");
    if (!frame) return;

    const handleScroll = () => setIsScrolled(frame.scrollTop > 24);
    handleScroll();
    frame.addEventListener("scroll", handleScroll, { passive: true });
    return () => frame.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header className={`topbar${isScrolled ? " topbar--scrolled" : ""}`}>
        <NavLink to="/" className="wordmark" aria-label="CodeSupa home">
          CodeSupa
        </NavLink>
        <nav ref={navRef} className="nav-pill" aria-label="Primary">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === "/"}
              style={({ isActive }) =>
                isActive
                  ? ({
                      "--active-bg": link.bg,
                      "--active-color": link.color
                    } as React.CSSProperties)
                  : undefined
              }
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/contact" className="brand-action" aria-label="Start a project">
          <span>Start</span>
          <ArrowUpRight size={18} strokeWidth={1.8} />
        </NavLink>
      </header>
    </>
  );
}