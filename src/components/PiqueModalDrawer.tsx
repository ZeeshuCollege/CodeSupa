import { useEffect, useState, useRef, useCallback } from "react";
import { X, ChevronUp } from "lucide-react";
import PiqueCaseStudy from "../pages/PiqueCaseStudy";

interface PiqueModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PiqueModalDrawer({ isOpen, onClose }: PiqueModalDrawerProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const topbarRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Animation values [0 = centered popup, 1 = full viewport]
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);

  // Touch gesture tracking
  const touchStartYRef = useRef<number | null>(null);
  const touchStartProgressRef = useRef<number>(0);

  // Pixels of scroll required to transition from centered popup to fullscreen
  const getScrollThreshold = () => Math.min(Math.max(window.innerHeight * 0.42, 280), 440);

  // Dimensions computation for desktop & mobile
  const getBounds = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw <= 780;
    const isTablet = vw <= 1050;

    const initialWidth = isMobile
      ? Math.max(vw - 28, 300)
      : isTablet
      ? Math.min(vw - 56, 940)
      : Math.min(vw - 120, 1360);

    const initialHeight = isMobile
      ? Math.max(vh - 44, 480)
      : isTablet
      ? Math.min(vh - 72, 740)
      : Math.min(vh - 96, 820);

    const initialRadius = isMobile ? 20 : 28;

    return {
      vw,
      vh,
      initialWidth,
      initialHeight,
      initialRadius
    };
  }, []);

  // Direct DOM style application for 60-120fps GPU performance
  const applyStyles = useCallback((p: number) => {
    const sheet = sheetRef.current;
    const overlay = overlayRef.current;
    const topbar = topbarRef.current;
    const scrollEl = scrollRef.current;
    if (!sheet) return;

    const { vw, vh, initialWidth, initialHeight, initialRadius } = getBounds();

    // Smooth clamped progress
    const t = Math.max(0, Math.min(1, p));

    // Interpolate geometry
    const currentWidth = initialWidth + (vw - initialWidth) * t;
    const currentHeight = initialHeight + (vh - initialHeight) * t;
    const currentRadius = initialRadius * (1 - t);

    // Apply geometry
    sheet.style.width = `${currentWidth}px`;
    sheet.style.height = `${currentHeight}px`;
    sheet.style.borderRadius = `${currentRadius}px`;

    // Box shadow fades as gutters vanish
    const shadowAlpha = 0.42 * (1 - t);
    const ambientAlpha = 0.2 * (1 - t);
    sheet.style.boxShadow = t >= 0.999
      ? "none"
      : `0 ${Math.round(28 * (1 - t))}px ${Math.round(80 * (1 - t))}px rgba(0, 0, 0, ${shadowAlpha}), 0 ${Math.round(8 * (1 - t))}px ${Math.round(24 * (1 - t))}px rgba(0, 0, 0, ${ambientAlpha})`;

    // Overlay backdrop opacity fades toward transparent
    if (overlay) {
      overlay.style.opacity = `${Math.max(0, 1 - t * 1.05)}`;
    }

    // Topbar handle and expand hint fade out
    if (topbar) {
      topbar.style.opacity = `${Math.max(0, 1 - t * 2.2)}`;
      topbar.style.pointerEvents = t > 0.4 ? "none" : "auto";
    }

    // Inner scroll container control
    if (scrollEl) {
      if (t >= 0.98) {
        scrollEl.style.overflowY = "auto";
      } else {
        scrollEl.style.overflowY = "hidden";
        if (scrollEl.scrollTop !== 0) {
          scrollEl.scrollTop = 0;
        }
      }
    }
  }, [getBounds]);

  // Start RAF loop with smooth lerping
  const startRafLoop = useCallback(() => {
    if (rafIdRef.current !== null) return;

    const tick = () => {
      const diff = targetProgressRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0008) {
        // Silky smooth damping factor
        progressRef.current += diff * 0.16;
        applyStyles(progressRef.current);
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        progressRef.current = targetProgressRef.current;
        applyStyles(progressRef.current);
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
  }, [applyStyles]);

  // Start closing animation
  const startClosing = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
    setTimeout(() => {
      setIsClosing(false);
      setIsMounted(false);
      targetProgressRef.current = 0;
      progressRef.current = 0;
      onClose();
    }, 400);
  }, [isClosing, onClose]);

  // Handle open / close lifecycle
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setIsClosing(false);
      targetProgressRef.current = 0;
      progressRef.current = 0;

      // Lock background site scrolling
      document.body.style.overflow = "hidden";
      const frame = document.querySelector<HTMLElement>(".site-frame");
      if (frame) frame.style.overflow = "hidden";

      // Set initial styles
      requestAnimationFrame(() => {
        applyStyles(0);
      });
    } else {
      setIsMounted(false);
      document.body.style.overflow = "";
      const frame = document.querySelector<HTMLElement>(".site-frame");
      if (frame) frame.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      const frame = document.querySelector<HTMLElement>(".site-frame");
      if (frame) frame.style.overflow = "";
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isOpen, applyStyles]);

  // Escape key handler and keyboard navigation
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        startClosing();
        return;
      }

      const scrollEl = scrollRef.current;
      const currentScrollTop = scrollEl ? scrollEl.scrollTop : 0;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        if (targetProgressRef.current < 0.999) {
          e.preventDefault();
          targetProgressRef.current = Math.min(1, targetProgressRef.current + 0.35);
          startRafLoop();
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        if (targetProgressRef.current > 0 && currentScrollTop <= 0) {
          e.preventDefault();
          targetProgressRef.current = Math.max(0, targetProgressRef.current - 0.35);
          startRafLoop();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isMounted, startClosing, startRafLoop]);

  // Window resize handler: update dimensions smoothly
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const handleResize = () => {
      applyStyles(progressRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, isMounted, applyStyles]);

  // Global Wheel listener for the modal
  useEffect(() => {
    if (!isOpen || !isMounted) return;

    const handleWheelEvent = (e: WheelEvent) => {
      if (isClosing) return;

      const scrollEl = scrollRef.current;
      const currentScrollTop = scrollEl ? scrollEl.scrollTop : 0;
      const threshold = getScrollThreshold();

      // Case 1: In the transitional / popup state (targetProgress < 1)
      if (targetProgressRef.current < 0.999) {
        if (e.deltaY > 0) {
          // Scroll DOWN -> expand
          e.preventDefault();
          const deltaProgress = e.deltaY / threshold;
          targetProgressRef.current = Math.min(1, targetProgressRef.current + deltaProgress);
          startRafLoop();
        } else if (e.deltaY < 0 && targetProgressRef.current > 0) {
          // Scroll UP -> contract
          e.preventDefault();
          const deltaProgress = e.deltaY / threshold;
          targetProgressRef.current = Math.max(0, targetProgressRef.current + deltaProgress);
          startRafLoop();
        }
      }
      // Case 2: Fully expanded into full viewport
      else {
        // If at top of case study content and scrolling UP
        if (currentScrollTop <= 0 && e.deltaY < 0) {
          e.preventDefault();
          const deltaProgress = e.deltaY / threshold;
          targetProgressRef.current = Math.max(0, 1 + deltaProgress);
          startRafLoop();
        }
        // Otherwise allow native scrolling inside scrollRef
      }
    };

    window.addEventListener("wheel", handleWheelEvent, { passive: false });
    return () => window.removeEventListener("wheel", handleWheelEvent);
  }, [isOpen, isMounted, isClosing, startRafLoop]);

  // Touch handlers for mobile / tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
    touchStartProgressRef.current = targetProgressRef.current;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartYRef.current - currentY; // positive = swipe up = scroll down
    const scrollEl = scrollRef.current;
    const currentScrollTop = scrollEl ? scrollEl.scrollTop : 0;
    const touchThreshold = window.innerHeight * 0.45;

    if (targetProgressRef.current < 0.999) {
      if (deltaY > 0 || (deltaY < 0 && targetProgressRef.current > 0)) {
        if (e.cancelable) e.preventDefault();
        const deltaProgress = deltaY / touchThreshold;
        targetProgressRef.current = Math.max(0, Math.min(1, touchStartProgressRef.current + deltaProgress));
        startRafLoop();
      }
    } else if (currentScrollTop <= 0 && deltaY < 0) {
      if (e.cancelable) e.preventDefault();
      const deltaProgress = deltaY / touchThreshold;
      targetProgressRef.current = Math.max(0, Math.min(1, 1 + deltaProgress));
      startRafLoop();
    }
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
  };

  if (!isOpen && !isMounted) {
    return null;
  }

  const sheetClasses = [
    "pique-popup-sheet",
    isClosing ? "pique-popup-sheet--closing" : "pique-popup-sheet--entering"
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [
    "pique-popup-overlay",
    isClosing ? "pique-popup-overlay--closing" : "pique-popup-overlay--active"
  ].join(" ");

  return (
    <div
      ref={wrapperRef}
      className="pique-popup-wrapper"
      aria-modal="true"
      role="dialog"
      aria-label="PIQUE Case Study"
    >
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        className={overlayClasses}
        onClick={() => {
          if (targetProgressRef.current < 0.25) startClosing();
        }}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div
        ref={sheetRef}
        className={sheetClasses}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Handle / Expansion Control */}
        <div
          ref={topbarRef}
          className="pique-popup-topbar"
          onClick={() => {
            if (targetProgressRef.current < 0.9) {
              targetProgressRef.current = 1;
              startRafLoop();
            }
          }}
          title="Click or scroll down to expand"
        >
          <div className="pique-popup-handle" />
          <div className="pique-popup-expand-hint">
            <ChevronUp size={14} className="pique-expand-arrow" />
            <span>Scroll down or click to expand</span>
          </div>
        </div>

        {/* Global Fixed Close Button in Top Right */}
        <button
          type="button"
          onClick={startClosing}
          className="pique-close-btn pique-close-btn--modal"
          aria-label="Close PIQUE Case Study"
        >
          <X size={20} strokeWidth={2.2} />
        </button>

        {/* Scrollable Container hosting the complete Case Study */}
        <div
          ref={scrollRef}
          className="pique-popup-scrollable"
        >
          <PiqueCaseStudy isModal={true} onClose={startClosing} />
        </div>
      </div>
    </div>
  );
}
