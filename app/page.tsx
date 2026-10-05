"use client";

import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Boxes,
  Clock3,
  Code2,
  Download,
  Gauge,
  Globe2,
  GitBranch,
  Mail,
  MapPin,
  MessageCircle,
  Smartphone,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import DigitalTwinChat from "@/components/DigitalTwinChat";

const RESUME_URL = "/Muhammad_Fahad_Khan_Resume.pdf";
const WHATSAPP_URL = "https://wa.me/923432610494";

const navItems = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "assistant", label: "AI Assistant" },
  { id: "open-to", label: "Open to" },
];

const stats = [
  { value: "8+", label: "Years building web & mobile" },
  { value: "3", label: "Major US e-commerce brands" },
  { value: "4", label: "Companies, one through-line" },
  { value: "Daily", label: "AI-assisted development" },
];

const clients = [
  { name: "Williams-Sonoma", url: "https://www.williams-sonoma.com/" },
  { name: "Backcountry", url: "https://www.backcountry.com/" },
  { name: "MotoSport", url: "https://www.motosport.com/" },
  { name: "HomesGlobe", url: "https://homesglobe.com/" },
  { name: "QBric AI", url: "https://www.nisum.com/qbric" },
  { name: "CodeCure AI", url: "https://codecureai.com/" },
];

const nisumHighlights = [
  "Contribute to frontend architecture in a micro-frontend (MFE) monorepo — reusable, accessible (WCAG) components shared across React, Next.js and Vue apps.",
  "Improved load time and Core Web Vitals (LCP, CLS) on web and mobile via deferred scripts, lazy loading and leaner imports.",
  "Migrated a legacy AngularJS tool to React.js and a PHP storefront to a Next.js monorepo, reducing technical debt.",
  "Maintain and extend the Backcountry React Native app, shipping features and fixing production bugs.",
  "Integrate REST APIs and microservices, managing state with Redux, Redux Toolkit and Vuex.",
  "Run code reviews, enforce standards, and mentor engineers on frontend best practices and AI-assisted development.",
];

const earlierRoles = [
  {
    company: "Cooperative Computing",
    role: "Software Engineer",
    period: "Nov 2020 – Jul 2021",
    points: [
      "Migrated the B2B marketplace app Dastgyr from Expo to bare React Native.",
      "Implemented OTP autofill to improve sign-up completion.",
      "Built the Degree37 blood-donation appointment module and owned its testing.",
    ],
  },
  {
    company: "Batoota / NytroTech",
    role: "Mobile Application Developer",
    period: "Nov 2019 – Oct 2020",
    points: ["Built frontend features for the Batoota.pk travel-booking app and NytroTech's cross-platform VPN app."],
  },
  {
    company: "Third Venture Interactive",
    role: "React Developer",
    period: "Jul 2018 – Oct 2019",
    points: ["Built web and mobile apps with React.js and React Native alongside tech leads."],
  },
];

const capabilities = [
  { icon: Boxes, title: "Frontend architecture", copy: "Micro-frontend monorepos and shared component systems that keep large products consistent.", wide: "violet" },
  { icon: Gauge, title: "Performance", copy: "Core Web Vitals (LCP, CLS), lazy loading, code splitting and bundle optimization." },
  { icon: GitBranch, title: "Modernization", copy: "AngularJS → React and PHP → Next.js migrations without losing stability." },
  { icon: Sparkles, title: "AI-assisted delivery", copy: "Cursor, Copilot, Claude, ChatGPT, Lovable and v0 — faster shipping, same quality bar.", wide: "rose" },
  { icon: Smartphone, title: "React Native", copy: "Shipping and stabilizing production mobile apps." },
  { icon: Accessibility, title: "Pixel-perfect & accessible", copy: "High-fidelity mockups to responsive, WCAG-compliant UI." },
  { icon: Users, title: "Team collaboration", copy: "Code review, standards and mentoring across distributed US teams." },
];

const skills = [
  "React.js", "Next.js", "React Native", "Node.js", "JavaScript (ES6+)", "Vue.js", "Web Components",
  "Redux Toolkit", "GraphQL", "REST", "Micro-Frontends", "Tailwind CSS", "Chakra UI", "Material UI",
  "WCAG", "Jest", "webpack",
];

const projects = [
  { name: "QBric AI QA Tool", url: "https://www.nisum.com/qbric", tag: "Nisum · AI", detail: "AI-powered QA automation that generates test scripts directly from code. Its Shift Left approach brings testing early into the development cycle — accelerating testing, boosting coverage and cutting manual effort. I built the reporting and dashboard UI.", tech: ["React.js", "Next.js"], tone: "blue", featured: true, wide: true },
  { name: "CodeCure AI", url: "https://codecureai.com/", tag: "Nisum · Healthcare", detail: "Business website for a medical coding company, built with AI-assisted development.", tech: ["Next.js", "Lovable"], tone: "purple", featured: true },
  { name: "HomesGlobe", url: "https://homesglobe.com/", tag: "Nisum · E-commerce", detail: "Real-estate e-commerce site with an admin panel.", tech: ["React.js", "Ant Design", "Tailwind"], tone: "green", featured: true },
  { name: "Backcountry Imaging Tool", tag: "Nisum · Migration", detail: "AngularJS to React.js migration, end to end.", tech: ["React.js", "Chakra UI", "Jest"], tone: "orange" },
  { name: "Cloud Cost Optimization Engine", tag: "Nisum · Cloud", detail: "Cloud-cost portal with reporting, filtering and pagination.", tech: ["React.js", "Node.js"], tone: "pink" },
  { name: "Dastgyr", url: "https://play.google.com/store/apps/details?id=com.dstgyr.dastgyr", tag: "Cooperative Computing · B2B Marketplace", detail: "B2B marketplace mobile app. Migrated it from Expo to bare React Native and implemented OTP autofill to improve sign-up completion.", tech: ["React Native", "OTP autofill"], tone: "teal" },
  { name: "Degree37", tag: "Cooperative Computing · Healthcare", detail: "Blood-donation platform connecting donors and blood centers. Built the appointment module and owned unit and functional testing across releases.", tech: ["Appointment module", "Unit & functional testing"], tone: "red" },
];

const openTo = [
  { icon: Globe2, title: "Fully remote", copy: "Roles anywhere in the world." },
  { icon: MapPin, title: "On-site / hybrid", copy: "Roles in Pakistan." },
  { icon: Clock3, title: "US & EU time zones", copy: "Comfortable with overlap and async collaboration." },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Always open at the top: drop any #section from a previous visit and disable scroll restoration.
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("motion-ready");
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: "-20% 0px -45%" },
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
    document.querySelectorAll("section[id]").forEach((element) => sectionObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return (
    <main id="top">
      <header className={`nav ${scrolled ? "is-scrolled" : ""} ${menuOpen ? "is-open" : ""}`}>
        <div className="nav-inner">
          <a className="nav-brand" href="#top" onClick={() => setMenuOpen(false)}>
            <span className="brand-icon" aria-hidden="true"><Code2 size={15} strokeWidth={2.5} /></span>
            Fahad Khan
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={activeSection === item.id ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a className="nav-cta" href={RESUME_URL} target="_blank" rel="noreferrer">Resume</a>
          </nav>
          <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            <span /><span />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <a className="availability intro" href="#open-to">
          <span className="dot" /> Open to remote roles worldwide <ArrowRight size={14} />
        </a>
        <p className="hero-name intro delay-1">Muhammad Fahad Khan</p>
        <h1 className="hero-title intro delay-1">
          Principal Software Engineer.<br />
          <span className="gradient-text">Built for scale. Powered by AI.</span>
        </h1>
        <p className="hero-sub intro delay-2">
          8+ years building high-performance web and mobile apps across React.js, Next.js, React Native and Node.js —
          building frontends for brands like Williams-Sonoma, Backcountry and MotoSport as part of distributed US teams.
        </p>
        <div className="hero-actions intro delay-3">
          <a className="btn btn-primary" href="#assistant"><Bot size={17} /> Ask my AI Assistant</a>
          <a className="btn btn-link" href={RESUME_URL} target="_blank" rel="noreferrer">Download resume <ArrowUpRight size={16} /></a>
        </div>

        <div className="stats reveal">
          {stats.map((stat) => (
            <div className="stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="clients" aria-label="Clients and products">
        <p>Trusted to build for</p>
        <div className="client-row">
          {clients.map((client) => (
            <a key={client.name} href={client.url} target="_blank" rel="noreferrer">{client.name}</a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section section-gray">
        <div className="section-head reveal">
          <p className="eyebrow">Experience</p>
          <h2>Eight years. <span className="muted">One through-line: ship what matters.</span></h2>
        </div>

        <article className="feature-role reveal">
          <div className="feature-role-head">
            <div>
              <span className="pill pill-live"><span className="dot" /> Current role</span>
              <h3>Principal Software Engineer</h3>
              <p className="role-company">Nisum · Karachi, PK</p>
            </div>
            <span className="role-period">Aug 2021 – Present</span>
          </div>
          <div className="chip-row">
            {clients.map((client) => (
              <a className="chip" key={client.name} href={client.url} target="_blank" rel="noreferrer">
                {client.name} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
          <ul className="highlight-list">
            {nisumHighlights.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </article>

        <div className="role-grid reveal stagger">
          {earlierRoles.map((role) => (
            <article className="role-card" key={role.company}>
              <span className="role-period">{role.period}</span>
              <h3>{role.role}</h3>
              <p className="role-company">{role.company}</p>
              <ul>
                {role.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <div className="education reveal">
          <span className="eyebrow">Education</span>
          <p><strong>B.Sc. Computer Science</strong> · Federal Urdu University of Arts, Science &amp; Technology, Karachi · 2012 – 2016</p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section">
        <div className="section-head reveal">
          <p className="eyebrow">What I bring</p>
          <h2>Pro-level frontend. <span className="muted">From architecture to the last pixel.</span></h2>
        </div>
        <div className="bento reveal stagger">
          {capabilities.map(({ icon: Icon, title, copy, wide }) => (
            <article className={`bento-card ${wide ? `wide wide-${wide}` : ""}`} key={title}>
              <span className="bento-icon"><Icon size={22} /></span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
        <div className="skill-cloud reveal">
          {skills.map((skill) => <span key={skill}>{skill}</span>)}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="section section-gray">
        <div className="section-head reveal">
          <p className="eyebrow">Selected work</p>
          <h2>Work worth showing. <span className="muted">AI products first.</span></h2>
        </div>
        <div className="project-grid reveal stagger">
          {projects.map((project) => {
            const className = `project-card tone-${project.tone} ${project.featured ? "featured" : ""} ${project.wide ? "wide" : ""}`;
            const content = (
              <>
                <div className="project-top">
                  <span className="project-tag">{project.tag}</span>
                  {project.url && <span className="project-visit">Visit <ArrowUpRight size={15} /></span>}
                </div>
                <h3>{project.name}</h3>
                <p>{project.detail}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
                </div>
              </>
            );
            return project.url ? (
              <a className={className} key={project.name} href={project.url} target="_blank" rel="noreferrer" aria-label={`${project.name} (opens in a new tab)`}>
                {content}
              </a>
            ) : (
              <article className={className} key={project.name}>{content}</article>
            );
          })}
        </div>
      </section>

      {/* AI Assistant */}
      <section id="assistant" className="section section-dark">
        <div className="assistant-layout">
          <div className="assistant-copy reveal">
            <p className="eyebrow eyebrow-light">AI Assistant</p>
            <h2>Ask my resume <span className="gradient-text">anything.</span></h2>
            <p>
              My AI assistant is grounded in my published resume. Ask about my experience, the brands I&apos;ve built for,
              my skills, or whether I&apos;m a fit for your team — and get an answer in seconds.
            </p>
            <ul className="assistant-points">
              <li><Sparkles size={16} /> Resume-grounded answers, no invented facts</li>
              <li><MessageCircle size={16} /> Hands off to WhatsApp when it doesn&apos;t know</li>
              <li><Bot size={16} /> Powered by Ling 3.0 Flash Sante</li>
            </ul>
          </div>
          <div className="reveal">
            <DigitalTwinChat />
          </div>
        </div>
      </section>

      {/* Open to */}
      <section id="open-to" className="section">
        <div className="open-card reveal">
          <span className="pill pill-live"><span className="dot" /> Available now</span>
          <h2>Open to <span className="gradient-text">what&apos;s next.</span></h2>
          <p className="open-lead">
            Principal and senior software engineering roles across React.js, Next.js, React Native and Node.js —
            especially teams investing in performance, architecture and AI-assisted engineering.
          </p>
          <div className="open-grid">
            {openTo.map(({ icon: Icon, title, copy }) => (
              <div className="open-item" key={title}>
                <Icon size={22} />
                <strong>{title}</strong>
                <span>{copy}</span>
              </div>
            ))}
          </div>
          <div className="hero-actions">
            <a className="btn btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Let&apos;s talk</a>
            <a className="btn btn-secondary" href="mailto:mfahadkhanashrafi@outlook.com"><Mail size={17} /> Email me</a>
            <a className="btn btn-link" href={RESUME_URL} target="_blank" rel="noreferrer"><Download size={16} /> Resume</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} Muhammad Fahad Khan · Principal Software Engineer · Karachi, PK</p>
          <div className="footer-links">
            <a href="mailto:mfahadkhanashrafi@outlook.com"><Mail size={15} /> Email</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={15} /> +92 343 2610494</a>
            <a href="https://github.com/fkashrafi" target="_blank" rel="noreferrer"><Code2 size={15} /> GitHub</a>
            <a href="https://www.linkedin.com/in/fkashrafi/" target="_blank" rel="noreferrer"><ArrowUpRight size={15} /> LinkedIn</a>
          </div>
        </div>
      </footer>
      <a
        className={`ai-fab ${activeSection === "assistant" ? "is-hidden" : ""}`}
        href="#assistant"
        aria-label="Ask my AI Assistant"
        tabIndex={activeSection === "assistant" ? -1 : 0}
      >
        <span className="ai-fab-icon"><Bot size={20} /></span>
        <span className="ai-fab-text"><strong>Ask my AI Assistant</strong><small>Resume answers in seconds</small></span>
      </a>
    </main>
  );
}
