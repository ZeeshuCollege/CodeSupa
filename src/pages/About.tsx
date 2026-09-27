import { useLayoutEffect, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SiteFooter } from "../components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

const capabilityGroups = [
  {
    title: "Strategy & UX",
    items: [
      "Digital Strategy",
      "User Research",
      "User Journey Mapping",
      "Information Architecture",
      "Wireframing"
    ]
  },
  {
    title: "Design",
    items: [
      "Interaction Design",
      "User Interface Design",
      "Design Systems",
      "Prototyping & Animation",
      "Accessibility"
    ]
  },
  {
    title: "Development",
    items: [
      "Websites",
      "eCommerce",
      "Web Applications",
      "Mobile Apps (iOS & Android)",
      "Platform Integrations"
    ]
  },
  {
    title: "Technology",
    items: [
      "Vue & React.js",
      "Headless Content Management",
      "WordPress & WooCommerce",
      "Laravel",
      "Shopify"
    ]
  },
  {
    title: "Optimisation",
    items: [
      "Website / App Review",
      "Performance Optimisation",
      "Conversion Optimisation",
      "A/B Testing",
      "Ongoing Enhancements"
    ]
  },
  {
    title: "Support",
    items: [
      "Project Management",
      "Website Hosting",
      "Website Maintenance",
      "Performance & Security",
      "3rd Party Integrations"
    ]
  }
];

const testimonials = [
  {
    quote: "“It was one of the most extraordinary experiences we have had in 24 years of business. Why? Because you challenged us and helped us articulate something very special.”",
    name: "Esra'a Al Shafei",
    role: "Founder, AHWAA & Majal.org"
  },
  {
    quote: "“It's their ability to interrogate and solve their clients' problems that makes them exceptional. I've worked with some great digital agencies over the years, but they delivered the best results.”",
    name: "Jason Webster",
    role: "General Manager, Pharmacy 777"
  },
  {
    quote: "“The team are true professionals, masters in their field, with meticulous attention to detail.”",
    name: "Vanessa Katsanevakis",
    role: "Director, Sussex Taps"
  },
  {
    quote: "“Beyond the impressive work quality, the team's collaborative and professional approach made us continually feel like we were part of the same winning team.”",
    name: "Kerstin Stender",
    role: "Program Manager, TrailsWA"
  },
  {
    quote: "“Working with them is an absolute joy. I'd recommend them in a heartbeat.”",
    name: "Sarah Marvell",
    role: "Managing Director, Marvell Tile & Stone"
  }
];

const teamMembers = [
  { name: "Teegan", role: "Front-end Developer", img: "/media/1.webp" },
  { name: "Sam", role: "Front-end Developer", img: "/media/2.webp" },
  { name: "Jay", role: "Founder & CEO", img: "/media/3.webp" },
  { name: "Lee", role: "Technical Director", img: "/media/4.webp" },
  { name: "Janmay", role: "Mobile Developer", img: "/media/5.webp" },
  { name: "Niaal", role: "Agency Director", img: "/media/6.webp" },
  { name: "Jodie", role: "Production Manager", img: "/media/7.webp" },
  { name: "Lia", role: "Front-end Developer", img: "/media/8.webp" },
  { name: "Ross", role: "Back-end Developer", img: "/media/9.webp" },
  { name: "Matt", role: "Back-end Developer", img: "/media/10.webp" },
  { name: "Dan", role: "Creative Director", img: "/media/11.webp" },
  { name: "Phill", role: "Lead Designer", img: "/media/12.webp" },
  { name: "DT", role: "Back-end Developer", img: "/media/13.webp" },
  { name: "Jess", role: "Designer", img: "/media/14.webp" },
  { name: "Dedy", role: "Back-end Developer", img: "/media/15.webp" },
  { name: "Sharné", role: "People & Culture", img: "/media/16.webp" },
  { name: "Jasmine", role: "Designer", img: "/media/17.webp" },
  { name: "Paul", role: "Implementation Director", img: "/media/18.webp" },
  { name: "Alistair", role: "SEO Specialist", img: "/media/19.webp" }
];

const awardBadges = [
  "/media/20.webp",
  "/media/21.webp",
  "/media/22.webp",
  "/media/23.webp",
  "/media/24.webp",
  "/media/25.webp",
  "/media/26.webp",
  "/media/27.webp",
  "/media/28.webp"
];

const dos = [
  "World-class digital",
  "Expect creativity",
  "Celebrate success",
  "Obsess over detail",
  "Pub lunch Fridays",
  "Embrace change",
  "Unlock potential",
  "High-five",
  "Outstanding service",
  "Value relationships",
  "Exceed expectations",
  "Party"
];

const donts = [
  "Work weekends",
  "Outsource",
  "Resist cake",
  "Lose at Mario Kart",
  "‘Make it pop’",
  "Free pitches",
  "Sacrifice quality for profit",
  "Egos",
  "Overpromise",
  "Cut corners",
  "Accept mediocrity",
  "Decaf"
];

const rotatingWords = [
  "epic",
  "innovative",
  "delightful",
  "robust",
  "extraordinary",
  "original",
  "intelligent",
  "engaging",
  "beautiful",
  "secure",
  "world-class"
];

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroImageWrapRef = useRef<HTMLDivElement>(null);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Animated rotating word ticker in closing section
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const scroller = document.querySelector<HTMLElement>(".site-frame") || window;
      const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // 1. Hero Entrance Animation
      const heroLines = heroTextRef.current?.querySelectorAll(".about-hero__line");
      if (heroLines && heroLines.length) {
        gsap.fromTo(
          heroLines,
          { yPercent: 65, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.15,
            stagger: 0.08,
            ease: "power4.out",
            delay: 0.1
          }
        );
      }

      // 2. Hero Parallax Scroll Motion
      if (!isReducedMotion && heroRef.current && heroTextRef.current && heroImageWrapRef.current) {
        gsap.to(heroTextRef.current, {
          yPercent: -18,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            scroller: scroller,
            start: "top top",
            end: "bottom top",
            scrub: 0.6
          }
        });

        gsap.to(heroImageWrapRef.current, {
          yPercent: 8,
          scale: 1.05,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            scroller: scroller,
            start: "top top",
            end: "bottom top",
            scrub: 0.6
          }
        });
      }

      // 3. Scroll Reveals for editorial sections
      const revealSections = [
        ".about-philosophy-lead",
        ".about-history-heading",
        ".about-capabilities-lead",
        ".about-awards-heading",
        ".about-dodont-heading"
      ];

      revealSections.forEach((selector) => {
        const el = pageRef.current?.querySelector(selector);
        if (el) {
          gsap.from(el, {
            scrollTrigger: {
              trigger: el,
              scroller: scroller,
              start: "top 85%",
              toggleActions: "play none none reverse"
            },
            y: 35,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out"
          });
        }
      });

      // 4. Stagger for Capability Groups
      const capGroups = pageRef.current?.querySelectorAll(".about-capability-group");
      if (capGroups && capGroups.length) {
        gsap.from(capGroups, {
          scrollTrigger: {
            trigger: ".about-capabilities-grid",
            scroller: scroller,
            start: "top 82%",
            toggleActions: "play none none reverse"
          },
          y: 28,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out"
        });
      }

      // 5. Stagger for Team Cards
      const teamCards = pageRef.current?.querySelectorAll(".about-team-card");
      if (teamCards && teamCards.length) {
        gsap.from(teamCards, {
          scrollTrigger: {
            trigger: ".about-team-grid",
            scroller: scroller,
            start: "top 85%",
            toggleActions: "play none none reverse"
          },
          y: 36,
          opacity: 0,
          stagger: 0.04,
          duration: 0.75,
          ease: "power3.out"
        });
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div ref={pageRef} className="about-page">
      {/* 1. Hero Section */}
      <section ref={heroRef} className="about-hero" aria-label="About Hero">
        <div className="about-hero__container">
          <div className="about-hero__content">
            <h1 ref={heroTextRef} className="about-hero__title">
              <span className="about-hero__line">Digital</span>
              <span className="about-hero__line">Products.</span>
              <span className="about-hero__line">Human</span>
              <span className="about-hero__line">Experiences.</span>
            </h1>
          </div>

          <div ref={heroImageWrapRef} className="about-hero__image-wrap">
            <img
              src="/media/30.webp"
              alt="CodeSupa team at the beach under a beach umbrella"
              className="about-hero__img"
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* 2. Philosophy / Human Experiences Section */}
      <section className="about-philosophy-section" aria-label="Our Philosophy">
        <div className="about-philosophy-container">
          <p className="about-philosophy-lead">
            <span className="about-pill-highlight">Human experiences</span>
            are the foundation of everything we do – client relationships, team collaboration
            and an unwavering focus on the end user. This philosophy is in our name, our core
            values and underpins our approach to every engagement.
          </p>
        </div>
      </section>

      {/* 3. History Section ("Since 2010...") */}
      <section className="about-history-section" aria-label="Company History">
        <div className="about-history-container">
          <h2 className="about-history-heading">
            Since 2010 we’ve been working with amazing{" "}
            <Link to="/work" className="about-history-pill" aria-label="View our clients in Work">
              <span>clients</span>
              <ArrowUpRight size={22} strokeWidth={2.2} />
            </Link>{" "}
            to create meaningful impact and compelling experiences.
          </h2>

          <div className="about-history-metrics">
            <div className="about-metric-item">
              <span className="about-metric-number">15+</span>
              <span className="about-metric-label">Years crafting digital experiences</span>
            </div>
            <div className="about-metric-item">
              <span className="about-metric-number">100%</span>
              <span className="about-metric-label">In-house, independent team</span>
            </div>
            <div className="about-metric-item">
              <span className="about-metric-number">80+</span>
              <span className="about-metric-label">Awards from AWA, FWA, and Awwwards</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Capabilities Section */}
      <section className="about-capabilities-section" aria-label="Our Capabilities">
        <div className="about-capabilities-header">
          <h2 className="about-capabilities-lead">
            Our <span className="about-capabilities-pill">capabilities</span> are centred around our ability to deliver
            world-class websites and apps. We’re 100% in-house and work end-to-end, ensuring each project is delivered
            to the highest standard.
          </h2>
        </div>

        <div className="about-capabilities-grid">
          {capabilityGroups.map((group) => (
            <div key={group.title} className="about-capability-group">
              <h3 className="about-capability-title">{group.title}</h3>
              <ul className="about-capability-list">
                {group.items.map((item) => (
                  <li key={item} className="about-capability-item">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="about-testimonials-section" aria-label="Client Testimonials">
        <div className="about-testimonials-container">
          <span className="about-testimonials-eyebrow">Testimonials</span>

          <div className="about-testimonial-card">
            <blockquote className="about-testimonial-quote">
              {testimonials[activeTestimonial].quote}
            </blockquote>

            <div className="about-testimonial-author">
              <div className="about-testimonial-meta">
                <span className="about-testimonial-name">{testimonials[activeTestimonial].name}</span>
                <span className="about-testimonial-role">{testimonials[activeTestimonial].role}</span>
              </div>

              <div className="about-testimonial-controls">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="about-testimonial-btn"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft size={18} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="about-testimonial-btn"
                  aria-label="Next testimonial"
                >
                  <ArrowRight size={18} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Team Section ("We're only Humaan") */}
      <section className="about-team-section" aria-label="Our Team">
        <div className="about-team-header">
          <h2 className="about-team-title">We&apos;re only human</h2>
          <p className="about-team-subtitle">
            We&apos;re a team of makers, thinkers, explorers and theatre singers. We approach work and play with curiosity
            and experimentation, using what we learn to create meaningful digital products that connect with people,
            just like you.
          </p>
        </div>

        <div className="about-team-grid">
          {teamMembers.map((member) => (
            <article key={member.name} className="about-team-card">
              <img
                src={member.img}
                alt={`${member.name} – ${member.role}`}
                className="about-team-img"
                loading="lazy"
              />
              <div className="about-team-pill">
                <span className="about-team-name">{member.name}</span>
                <span className="about-team-role">{member.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 7. Awards / Recognition Section */}
      <section className="about-awards-section" aria-label="Awards & Recognition">
        <div className="about-awards-container">
          <h2 className="about-awards-heading">
            While our focus is on client success, we’re proud to have our work continually{" "}
            <span className="about-awards-pill">recognised</span> by the best of the best.
          </h2>

          <div className="about-awards-badges">
            {awardBadges.map((badge, idx) => (
              <div key={idx} className="about-badge-item">
                <img src={badge} alt="Industry award emblem" className="about-badge-img" loading="lazy" />
              </div>
            ))}
          </div>

          <div className="about-awards-list">
            <div className="about-award-col">
              <span className="about-award-org">Australian Web Awards</span>
              <span className="about-award-desc">Multiple Best in Show, Best Commercial Website, and Best App honors.</span>
            </div>
            <div className="about-award-col">
              <span className="about-award-org">Awwwards</span>
              <span className="about-award-desc">Recognized with Site of the Day, Developer Awards, and Studio of the Year Nominations.</span>
            </div>
            <div className="about-award-col">
              <span className="about-award-org">FWA &amp; The Webby Awards</span>
              <span className="about-award-desc">Celebrating global digital excellence, interactive craft, and community impact.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. What we do / What we don't Section */}
      <section className="about-dodont-section" aria-label="What we do and what we don't">
        <div className="about-dodont-container">
          <h2 className="about-dodont-heading">
            Above all, we believe in human relationships, exceptional outcomes, and having fun along the way.
          </h2>

          <div className="about-dodont-grid">
            <div className="about-dodont-col">
              <h3 className="about-dodont-title">What we do</h3>
              <ul className="about-dodont-list">
                {dos.map((item) => (
                  <li key={item} className="about-dodont-item">
                    <span className="about-dodont-mark about-dodont-mark--do" aria-hidden="true">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="about-dodont-col">
              <h3 className="about-dodont-title">What we don&apos;t</h3>
              <ul className="about-dodont-list">
                {donts.map((item) => (
                  <li key={item} className="about-dodont-item">
                    <span className="about-dodont-mark about-dodont-mark--dont" aria-hidden="true">
                      <X size={13} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Animated "Let's make something..." Closing Sequence */}
      <section className="about-closing-section" aria-label="Closing Call to Action">
        <div className="about-closing-container">
          <Link to="/contact" className="about-closing-link">
            <span className="about-closing-line">
              <span>Let&apos;s make</span>
              <span className="about-closing-arrow" aria-hidden="true">→</span>
            </span>
            <span className="about-closing-line">
              <span>something </span>
              <span className="about-closing-ticker" aria-live="polite">
                <span key={wordIndex} className="about-closing-word">
                  {rotatingWords[wordIndex]}
                </span>
              </span>
            </span>
          </Link>
        </div>
      </section>

      {/* 10. Global Site Footer */}
      <SiteFooter showCta={false} />
    </div>
  );
}