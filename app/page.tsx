"use client";

import { ArrowDown, ArrowRight, Asterisk, Code2, ExternalLink, Mail, MessageCircle, MoveUpRight } from "lucide-react";
import { type PointerEvent as ReactPointerEvent, useEffect, useState } from "react";
import DigitalTwinChat from "@/components/DigitalTwinChat";

const journey = [
  {
    phase: "Nisum",
    period: "Aug 2021 - Present",
    title: "Principal Software Engineer",
    copy: "Leading front-end architecture for large-scale US e-commerce, modernizing legacy platforms, improving Core Web Vitals, and maintaining React Native products.",
    index: "01",
  },
  {
    phase: "Cooperative Computing",
    period: "Nov 2020 - Jul 2021",
    title: "Software Engineer",
    copy: "Migrated Dastgyr from Expo to bare React Native, implemented OTP autofill, and built and tested the appointment module for Degree37.",
    index: "02",
  },
  {
    phase: "Batoota / NytroTech",
    period: "Nov 2019 - Oct 2020",
    title: "Mobile Application Developer",
    copy: "Developed front-end features for the Batoota.pk travel-booking product and built the front end for a cross-platform VPN mobile application.",
    index: "03",
  },
  {
    phase: "Third Venture Interactive",
    period: "Jul 2018 - Oct 2019",
    title: "React Developer",
    copy: "Built web and mobile applications with React.js and React Native while collaborating with technical leads on specifications and testing.",
    index: "04",
  },
];

const principles = [
  ["Architecture at scale", "Reusable, accessible component systems that keep complex products consistent and delivery moving."],
  ["Performance as product", "Core Web Vitals, lazy loading, code splitting, and bundle optimization treated as user experience."],
  ["Modernize deliberately", "Pragmatic migrations from legacy stacks to React and Next.js without losing sight of stability."],
];

const projects = [
  { name: "QBric AI QA Tool", detail: "Reporting and dashboard UI for an AI test-automation platform.", tech: "React.js · Next.js" },
  { name: "CodeCure AI", detail: "Micro-SaaS and brand site built through AI-assisted development.", tech: "Next.js · Lovable" },
  { name: "Homesglobe", detail: "Real-estate e-commerce experience with a full administration panel.", tech: "React.js · Ant Design · Tailwind" },
  { name: "Backcountry Imaging Tool", detail: "End-to-end modernization from AngularJS to React.js.", tech: "React.js · Chakra UI · Jest" },
  { name: "Cloud Cost Engine", detail: "Cloud-cost portal with reporting, filtering, and pagination.", tech: "React.js · Node.js" },
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
          <a className="nav-cta" href="https://wa.me/923432610494" target="_blank" rel="noreferrer">Let&apos;s talk <ArrowRight size={15} /></a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>
          <span /><span />
        </button>
      </header>

      <section className="hero section-shell spotlight-surface" onPointerMove={handleSpotlight}>
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-kicker reveal"><span className="pulse" /> Muhammad Fahad Khan · Principal Software Engineer</div>
        <h1 className="hero-title reveal delay-1">
          <span>Strategy with</span>
          <span className="accent-line">an edge<span className="title-dot">.</span></span>
        </h1>
        <div className="hero-bottom reveal delay-2">
          <p>Principal software engineer building high-performance products. Open to remote opportunities and relocation worldwide.</p>
          <a className="scroll-link" href="#about"><span>Explore profile</span><ArrowDown size={18} /></a>
        </div>
        <div className="hero-index" aria-hidden="true">01 / 05</div>
      </section>

      <section className="signal-strip" aria-label="Professional focus">
        <div className="signal-track">
          <span>React & Next.js</span><Asterisk /><span>React Native</span><Asterisk /><span>Core Web Vitals</span><Asterisk /><span>Node.js & GraphQL</span><Asterisk />
          <span>React & Next.js</span><Asterisk /><span>React Native</span><Asterisk /><span>Core Web Vitals</span><Asterisk /><span>Node.js & GraphQL</span><Asterisk />
        </div>
      </section>

      <section id="about" className="about section-shell light-section">
        <div className="section-label"><span>01</span> About</div>
        <div className="about-layout scroll-reveal">
          <div className="about-heading">
            <p className="eyebrow">Around seven years in software</p>
            <h2>Engineering with intent.<br /><em>Always</em> moving forward.</h2>
          </div>
          <div className="about-copy">
            <p className="lead">I lead front-end architecture and deliver high-performance web and mobile products for large-scale platforms.</p>
            <p>My work spans React.js, Next.js, React Native, Node.js, Vue.js, Web Components, GraphQL, and REST APIs. I have modernized legacy AngularJS and PHP platforms, improved Core Web Vitals, built accessible WCAG component systems, and integrated AI-assisted development into daily engineering workflows.</p>
            <a className="text-link" href="/Muhammad_Fahad_Khan_Resume.pdf" target="_blank" rel="noreferrer">View résumé <MoveUpRight size={17} /></a>
          </div>
        </div>
        <div className="metrics-grid scroll-reveal stagger-children">
          <div><strong>01</strong><span>Front-end architecture</span><p>Reusable, accessible systems for large-scale US e-commerce.</p></div>
          <div><strong>02</strong><span>Performance</span><p>Core Web Vitals, lazy loading, code splitting, and bundle optimization.</p></div>
          <div><strong>03</strong><span>AI-assisted delivery</span><p>Cursor, GitHub Copilot, Claude, and ChatGPT across development and review.</p></div>
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
          <div><p className="eyebrow coral">AI projects first</p><h2>Work worth<br /><em>showing.</em></h2></div>
          <p>AI products lead this selection, followed by e-commerce, modernization, real-estate, and cloud-cost work across modern React and Node.js stacks.</p>
        </div>
        <div className="project-grid scroll-reveal stagger-children">
          {projects.map((project, index) => (
            <article
              className={`project-card project-${index + 1}`}
              key={project.name}
              onPointerMove={handleSpotlight}
              onPointerLeave={clearTilt}
            >
              <div className="project-top"><span>Selected project {String(index + 1).padStart(2, "0")}</span><ExternalLink size={19} /></div>
              <div><p>{project.detail}</p><h3>{project.name}</h3></div>
              <span className="project-status">{project.tech}</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer section-shell">
        <div className="section-label inverse"><span>06</span> Connect</div>
        <div className="footer-main scroll-reveal">
          <p className="eyebrow coral">The next chapter</p>
          <h2>Let&apos;s build something<br /><em>that matters.</em></h2>
          <a className="big-link" href="https://wa.me/923432610494" target="_blank" rel="noreferrer">Start a conversation <ArrowRight /></a>
        </div>
        <div className="footer-bottom">
          <Wordmark />
          <p>Muhammad Fahad Khan · Open to remote and relocation opportunities · <a className="contact-number" href="https://wa.me/923432610494" target="_blank" rel="noreferrer">WhatsApp +92 343 2610494</a></p>
          <div className="socials"><a href="mailto:mfahadkhanashrafi@outlook.com" aria-label="Email"><Mail size={18} /></a><a href="https://wa.me/923432610494" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a><a href="https://github.com/fkashrafi" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={18} /></a><a className="linkedin-glyph" href="https://www.linkedin.com/in/fkashrafi/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a></div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </main>
  );
}
