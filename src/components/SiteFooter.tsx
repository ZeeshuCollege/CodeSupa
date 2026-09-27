import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

interface SiteFooterProps {
  showCta?: boolean;
}

export function SiteFooter({ showCta = true }: SiteFooterProps) {
  return (
    <footer className="home-footer" aria-label="Site footer">
      {showCta && (
        <div className="home-footer__cta">
          <Link to="/contact" className="home-footer__cta-link">
            <span className="home-footer__cta-line">
              Let&apos;s make <span className="home-footer__cta-arrow" aria-hidden="true">→</span>
            </span>
            <span className="home-footer__cta-line">something original</span>
          </Link>
        </div>
      )}

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
  );
}
