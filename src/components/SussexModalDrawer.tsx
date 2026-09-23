import { useEffect, useState, useRef, useCallback } from "react";
import { X, ChevronUp } from "lucide-react";
import SussexCaseStudy from "../pages/SussexCaseStudy";

interface SussexModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SussexModalDrawer({ isOpen, onClose }: SussexModalDrawerProps) {
  // Mode can be: "closed" | "emerged" | "fullscreen"
  const [mode, setMode] = useState<"closed" | "emerged" | "fullscreen">("closed");
  const [isClosing, setIsClosing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef<number | null>(null);

  const startClosing = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setMode("closed");
      onClose();
    }, 450);
  }, [onClose]);

  // When isOpen changes
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      // Disable background scrolling on the site
      document.body.style.overflow = "hidden";
      const frame = document.querySelector<HTMLElement>(".site-frame");
      if (frame) frame.style.overflow = "hidden";

      // Small tick to ensure slide-up animation from translateY(100%) triggers
      requestAnimationFrame(() => {
        setMode("emerged");
      });
    } else {
      document.body.style.overflow = "";
      const frame = document.querySelector<HTMLElement>(".site-frame");
      if (frame) frame.style.overflow = "";
      setMode("closed");
    }

    return () => {
      document.body.style.overflow = "";
      const frame = document.querySelector<HTMLElement>(".site-frame");
      if (frame) frame.style.overflow = "";
    };
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        startClosing();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, startClosing]);

  // Wheel listener: when scrolled down in "emerged" mode, smoothly expand upward to full screen
  const handleWheel = (e: React.WheelEvent) => {
    if (mode === "emerged" && e.deltaY > 5) {
      setMode("fullscreen");
    }
  };

  // Touch handlers for mobile/trackpad gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartYRef.current - currentY; // positive means swiping UP (scrolling down)

    if (mode === "emerged" && deltaY > 15) {
      setMode("fullscreen");
    }
  };

  const handleTouchEnd = () => {
    touchStartYRef.current = null;
  };

  // Scroll listener inside the container: if user scrolls down in emerged mode
  const handleScroll = () => {
    if (mode === "emerged" && scrollRef.current && scrollRef.current.scrollTop > 8) {
      setMode("fullscreen");
    }
  };

  if (!isOpen && mode === "closed") {
    return null;
  }

  const sheetClasses = [
    "pique-popup-sheet",
    mode === "emerged" ? "pique-popup-sheet--emerged" : "",
    mode === "fullscreen" ? "pique-popup-sheet--fullscreen" : "",
    isClosing ? "pique-popup-sheet--closing" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const overlayClasses = [
    "pique-popup-overlay",
    isClosing ? "pique-popup-overlay--closing" : "pique-popup-overlay--active"
  ].join(" ");

  return (
    <div className="pique-popup-wrapper" aria-modal="true" role="dialog" aria-label="Sussex Taps Case Study">
      {/* Backdrop overlay */}
      <div
        className={overlayClasses}
        onClick={() => {
          if (mode === "emerged") startClosing();
        }}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div
        className={sheetClasses}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Handle / Expansion Control */}
        <div
          className="pique-popup-topbar"
          onClick={() => {
            if (mode === "emerged") setMode("fullscreen");
          }}
          title={mode === "emerged" ? "Click or scroll to expand to full screen" : undefined}
        >
          <div className="pique-popup-handle" />
          {mode === "emerged" && (
            <div className="pique-popup-expand-hint">
              <ChevronUp size={14} className="pique-expand-arrow" />
              <span>Scroll down or click to expand</span>
            </div>
          )}
        </div>

        {/* Global Fixed Close Button in Top Right */}
        <button
          type="button"
          onClick={startClosing}
          className="pique-close-btn pique-close-btn--modal"
          aria-label="Close Sussex Taps Case Study"
        >
          <X size={20} strokeWidth={2.2} />
        </button>

        {/* Scrollable Container hosting the complete Case Study */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="pique-popup-scrollable"
        >
          <SussexCaseStudy isModal={true} onClose={startClosing} />
        </div>
      </div>
    </div>
  );
}
