import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { SiteShell } from "./components/SiteShell";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Work = lazy(() => import("./pages/Work"));
const Expertise = lazy(() => import("./pages/Expertise"));
const Thinking = lazy(() => import("./pages/Thinking"));
const Contact = lazy(() => import("./pages/Contact"));
const PiqueCaseStudy = lazy(() => import("./pages/PiqueCaseStudy"));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector(".site-frame")?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return null;
}

function LoadingScreen() {
  return <div className="loading-screen" aria-label="Loading">Loading<span>.</span><span>.</span><span>.</span></div>;
}

export default function App() {
  return (
    <main className="desktop-stage">
      <section className="site-frame" aria-label="CodeSupa website">
        <SiteShell />
        <ScrollToTop />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/pique" element={<PiqueCaseStudy />} />
            <Route path="/expertise" element={<Expertise />} />
            <Route path="/thinking" element={<Thinking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </section>
    </main>
  );
}