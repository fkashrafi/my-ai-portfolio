"use client";

import { ArrowDown, ArrowRight, Asterisk, ExternalLink, Mail, MoveUpRight } from "lucide-react";
import { type PointerEvent as ReactPointerEvent, useEffect, useState } from "react";
import DigitalTwinChat from "@/components/DigitalTwinChat";

const journey = [
  {
    phase: "Nisum",
    period: "Apr 2023 — Present",
    title: "Senior Software Engineer",
    copy: "Leading the current chapter of a career focused on high-quality software delivery, thoughtful code review, and modern product engineering.",
    index: "01",
  },
  {
    phase: "Nisum",
    period: "Aug 2021 — Apr 2023",
    title: "Software Engineer",
    copy: "Expanded across full product lifecycles, contributing to scalable web experiences and cross-functional engineering delivery.",
    index: "02",
  },
  {
    phase: "Cooperative Computing",
    period: "Nov 2020 — Aug 2021",
    title: "Software Engineer",
    copy: "Built and shipped production software while deepening expertise across JavaScript, React, and modern front-end systems.",
    index: "03",
  },
  {
    phase: "NytroTech",
    period: "Dec 2019 — Nov 2020",
    title: "Mobile App Developer",
    copy: "Developed hybrid mobile experiences with React Native, translating product requirements into reliable applications.",
    index: "04",
  },
  {
    phase: "Third Venture Interactive",
    period: "Jul 2018 — Nov 2019",
    title: "Front-end Developer",
    copy: "Started the professional journey crafting responsive interfaces and building a strong foundation in front-end development.",
    index: "05",
  },
];

const principles = [
  ["Clarity over noise", "Make the complex understandable, actionable, and useful."],
  ["Momentum matters", "Build trust through movement, evidence, and consistent delivery."],
  ["Raise the standard", "Details compound. Quality is a habit, not a final pass."],
];

function Wordmark() {
  return (
    <a className="wordmark" href="#top" aria-label="Back to top">
      <span className="wordmark-mark">FK</span>
      <span>F.K. ASHRAFI</span>
    </a>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(available > 0 ? Math.min(window.scrollY / available, 1) : 0);
    };
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
      { threshold: 0.12, rootMargin: "0px 0px -8%" },
    );
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: "-18% 0px -48%" },
    );

    document.querySelectorAll(".scroll-reveal").forEach((element) => revealObserver.observe(element));
    document.querySelectorAll("section[id]").forEach((element) => sectionObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  function handleSpotlight(event: ReactPointerEvent<HTMLElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    event.currentTarget.style.setProperty("--tilt-x", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -4}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 4}deg`);
  }

  function clearTilt(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <main id="top">
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} aria-hidden="true" />
      <header className={scrolled ? "site-header scrolled" : "site-header"}>
        <Wordmark />
        <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation">
          <a className={activeSection === "about" ? "active" : ""} href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className={activeSection === "journey" ? "active" : ""} href="#journey" onClick={() => setMenuOpen(false)}>Journey</a>
          <a className={activeSection === "twin" ? "active" : ""} href="#twin" onClick={() => setMenuOpen(false)}>AI Twin</a>
          <a className={activeSection === "work" ? "active" : ""} href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a className="nav-cta" href="mailto:mfahadkhanashrafi@outlook.com">Let&apos;s talk <ArrowRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <section className="hero section-shell spotlight-surface" onPointerMove={handleSpotlight}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-kicker reveal"><span className="pulse" /> Muhammad Fahad Khan · Karachi, Pakistan</div>
        <h1 className="hero-title reveal delay-1">
          <span>Strategy with</span>
          <span className="accent-line">an edge<span className="title-dot">.</span></span>
        </h1>
        <div className="hero-bottom reveal delay-2">
          <p>Senior software engineer building fast, resilient web and mobile products with modern JavaScript.</p>
          <a className="scroll-link" href="#about"><span>Explore profile</span><ArrowDown size={18} /></a>
        </div>
        <div className="hero-index" aria-hidden="true">01 / 05</div>
      </section>

      <section className="signal-strip" aria-label="Professional focus">
        <div className="signal-track">
          <span>TypeScript</span><Asterisk /><span>React & Next.js</span><Asterisk /><span>React Native</span><Asterisk /><span>Node.js</span><Asterisk />
          <span>TypeScript</span><Asterisk /><span>React & Next.js</span><Asterisk /><span>React Native</span><Asterisk /><span>Node.js</span><Asterisk />
        </div>
      </section>

      <section id="about" className="about section-shell light-section">
        <div className="section-label"><span>01</span> About</div>
        <div className="about-layout scroll-reveal">
          <div className="about-heading">
            <p className="eyebrow">Six-plus years in software</p>
            <h2>Engineering with intent.<br /><em>Always</em> moving forward.</h2>
          </div>
          <div className="about-copy">
            <p className="lead">I&apos;m a computer science graduate and senior software engineer focused on building polished digital products.</p>
            <p>My experience spans front-end development with React and Next.js, full-stack work with Node.js and the MERN ecosystem, and hybrid mobile applications with React Native. I&apos;m drawn to cutting-edge technology, clean execution, and the constant evolution of the craft.</p>
            <a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">View résumé <MoveUpRight size={17} /></a>
          </div>
        </div>
        <div className="metrics-grid scroll-reveal stagger-children">
          <div><strong>01</strong><span>Web engineering</span><p>React, Next.js, TypeScript, and modern front-end architecture.</p></div>
          <div><strong>02</strong><span>Mobile products</span><p>Cross-platform application development with React Native.</p></div>
          <div><strong>03</strong><span>Full-stack thinking</span><p>Node.js, MERN, code review, and pragmatic delivery.</p></div>
        </div>
      </section>

      <section id="journey" className="journey section-shell">
        <div className="section-label inverse"><span>02</span> Career journey</div>
        <div className="journey-intro scroll-reveal">
          <p className="eyebrow coral">Career, in chapters</p>
          <h2>One through-line:<br />make it <em>matter.</em></h2>
        </div>
        <div className="timeline scroll-reveal stagger-children">
          {journey.map((item) => (
            <article className="timeline-item" key={item.index}>
              <div className="timeline-index">{item.index}</div>
              <div className="timeline-meta"><span>{item.phase}</span><small>{item.period}</small></div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="principles section-shell light-section">
        <div className="section-label"><span>03</span> Operating principles</div>
        <div className="principles-layout scroll-reveal">
          <h2>The way I<br /><em>work.</em></h2>
          <div className="principle-list">
            {principles.map(([title, copy], index) => (
              <div className="principle" key={title}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="twin" className="twin section-shell light-section">
        <div className="section-label"><span>04</span> Digital twin</div>
        <div className="twin-layout scroll-reveal">
          <div className="twin-copy">
            <p className="eyebrow">Ask the résumé</p>
            <h2>Meet my<br /><em>digital twin.</em></h2>
            <p>Explore my career in conversation. Ask about roles, skills, progression, or the experience I bring to a team.</p>
            <div className="twin-model"><span /> Powered by Ling 3.0 Flash Sante</div>
          </div>
          <div className="tilt-shell" onPointerMove={handleSpotlight} onPointerLeave={clearTilt}>
            <DigitalTwinChat />
          </div>
        </div>
      </section>

      <section id="work" className="work section-shell">
        <div className="section-label inverse"><span>05</span> Selected work</div>
        <div className="work-heading scroll-reveal">
          <div><p className="eyebrow coral">Portfolio / coming soon</p><h2>Work worth<br /><em>showing.</em></h2></div>
          <p>Detailed case studies are being prepared. This space will showcase the engineering challenge, technical decisions, and measurable outcome behind selected products.</p>
        </div>
        <div className="project-grid scroll-reveal stagger-children">
          {["Web platforms", "Mobile products", "Engineering systems"].map((name, index) => (
            <article
              className={`project-card project-${index + 1}`}
              key={name}
              onPointerMove={handleSpotlight}
              onPointerLeave={clearTilt}
            >
              <div className="project-top"><span>Case study {String(index + 1).padStart(2, "0")}</span><ExternalLink size={19} /></div>
              <div><p>Reserved for future work</p><h3>{name}</h3></div>
              <span className="project-status">In development</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer section-shell">
        <div className="section-label inverse"><span>06</span> Connect</div>
        <div className="footer-main scroll-reveal">
          <p className="eyebrow coral">The next chapter</p>
          <h2>Let&apos;s build something<br /><em>that matters.</em></h2>
          <a className="big-link" href="mailto:mfahadkhanashrafi@outlook.com">Start a conversation <ArrowRight /></a>
        </div>
        <div className="footer-bottom">
          <Wordmark />
          <p>Open to conversations, ideas, and ambitious engineering work.</p>
          <div className="socials"><a href="mailto:mfahadkhanashrafi@outlook.com" aria-label="Email"><Mail size={18} /></a><a className="linkedin-glyph" href="https://www.linkedin.com/in/fkashrafi" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a></div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
