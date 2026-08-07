import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../components/Navbar";
import projects from "../data/Project";
import {
  NAME,
  FULL_NAME,
  TITLE,
  SUBTITLE,
  LOCATION,
  EMAIL,
  PHONE,
  SUMMARY,
  LINKS,
  experience,
  stack,
  credentials,
} from "../data/content";

// The 3D hero web is code-split so the page paints (and the CSS fallback
// shows) before three.js loads — and so a WebGL-less client just gets the
// intentional dark radial background.
const SpiderWeb3D = React.lazy(() => import("../components/SpiderWeb3D"));

/* ----------------------------------------------------------- data lookups */

const GITHUB = LINKS.find(([label]) => label === "GitHub")?.[1];
const LINKEDIN = LINKS.find(([label]) => label === "LinkedIn")?.[1];
const TEL = `tel:${PHONE.replace(/[^\d+]/g, "")}`;
const RESUME_DL = "Joshua-La-Rosa-Resume.pdf";

const [FIRST_NAME, ...REST_NAME] = NAME.split(" ");
const LAST_NAME = REST_NAME.join(" ");

/* ------------------------------------------------------------- inline icons */

function IconArrow(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}
function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
function IconDownload(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </svg>
  );
}
function IconPhone(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2Z" />
    </svg>
  );
}
function IconGithub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.5 2 5.5 2.3 5.5 2.3a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 8.7c0 4.6 2.7 5.7 5.5 6-.4.4-.5.9-.5 1.7V21" />
    </svg>
  );
}
function IconLinkedin(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
      <path d="M10 9h4v2a4 4 0 0 1 8 0v10h-4V12a1 1 0 0 0-2 0v9h-4z" />
    </svg>
  );
}
function IconInfo(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8h.01M11 12h1v4h1" />
    </svg>
  );
}

/* ------------------------------------------------------------ motion helper */

// A reveal that never permanently hides content: reduced-motion clients skip
// the transform entirely (initial={false}), everyone else fades/rises once.
function Reveal({ as = "div", children, className, delay = 0, y = 20, ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/* ---------------------------------------------------------- small primitives */

function Eyebrow({ children }) {
  return (
    <span className="inline-flex items-center gap-[11px] font-mono text-[12px] uppercase tracking-[0.26em] text-redtext">
      <span className="inline-block h-px w-6 bg-red" />
      {children}
    </span>
  );
}

function SectionTitle({ children, id }) {
  return (
    <h2 id={id} className="font-display text-[clamp(30px,5vw,52px)] font-black uppercase leading-[0.98] tracking-[-0.02em] text-primary">
      {children}
    </h2>
  );
}

function TechChips({ items }) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-[7px]">
      {items.map((t) => (
        <span key={t} className="rounded-sm border border-line2 px-[9px] py-1 font-mono text-[11px] text-secondary">
          {t}
        </span>
      ))}
    </div>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(126,230,168,.3)] px-2.5 py-[3px] font-mono text-[10.5px] uppercase tracking-[0.14em] text-[#7ee6a8]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#4fd987]" />
      Live
    </span>
  );
}

const btnBase =
  "inline-flex items-center gap-2.5 rounded-sm px-[22px] py-[13px] font-mono text-[13px] uppercase tracking-[0.08em] transition duration-200 hover:-translate-y-px";

function ButtonRed({ children, ...rest }) {
  return (
    <a className={`${btnBase} border border-red bg-red text-white shadow-[0_6px_24px_rgba(230,36,41,.28)] hover:shadow-[0_8px_30px_rgba(230,36,41,.42)]`} {...rest}>
      {children}
    </a>
  );
}
function ButtonGhost({ children, ...rest }) {
  return (
    <a className={`${btnBase} border border-line2 bg-transparent text-primary hover:border-primary`} {...rest}>
      {children}
    </a>
  );
}

function ThreadRule() {
  return (
    <div className="mx-auto max-w-shell px-6">
      <Reveal className="thread-rule" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ sections */

function Hero() {
  return (
    <header id="top" className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line">
      {/* Intentional CSS fallback — always present behind the canvas. */}
      <div className="hero-fallback absolute inset-0 z-0" aria-hidden="true" />

      {/* 3D web background. pointer-events:none keeps buttons clickable. */}
      <div className="pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
        <React.Suspense fallback={null}>
          <SpiderWeb3D />
        </React.Suspense>
      </div>

      {/* Directional vignette darkening the copy side. */}
      <div className="hero-vignette pointer-events-none absolute inset-0 z-[2]" aria-hidden="true" />

      {/* Text — its own stacking context above the canvas. */}
      <div className="relative z-[3] mx-auto w-full max-w-shell px-6 py-20">
        <div className="relative max-w-[600px]">
          <div className="hero-scrim pointer-events-none absolute inset-[-9%]" aria-hidden="true" />
          <div className="relative">
            <Reveal as="div" y={14}>
              <Eyebrow>Full-Stack · Est. behind a login</Eyebrow>
            </Reveal>

            <Reveal as="div" delay={0.05} className="my-[18px] flex flex-wrap gap-[14px] font-mono text-[12.5px] tracking-[0.1em] text-secondary">
              {LOCATION}
            </Reveal>

            <Reveal as="h1" delay={0.08} className="font-display text-[clamp(46px,10vw,100px)] font-black uppercase leading-[0.9] tracking-[-0.025em] text-primary [text-shadow:0_2px_34px_rgba(10,11,18,.92)]">
              {FIRST_NAME}
              <br />
              <span>{LAST_NAME}</span>
            </Reveal>

            <Reveal as="div" delay={0.12} className="mt-4 font-mono text-[clamp(13.5px,2.2vw,17px)] font-semibold tracking-[0.05em] text-redtext">
              {TITLE} <span className="text-secondary">— {SUBTITLE}</span>
            </Reveal>

            <Reveal as="p" delay={0.16} className="my-6 max-w-[54ch] text-[clamp(15px,1.9vw,17px)] leading-[1.68] text-primary">
              {SUMMARY}
            </Reveal>

            <Reveal as="div" delay={0.2} className="flex flex-wrap items-center gap-[14px]">
              <ButtonRed href={`mailto:${EMAIL}`}>
                <IconMail className="h-[15px] w-[15px]" />
                Email me
              </ButtonRed>
              <ButtonGhost href="/Resume.pdf" download={RESUME_DL}>
                <IconDownload className="h-[15px] w-[15px]" />
                Resume (PDF)
              </ButtonGhost>
            </Reveal>

            <Reveal as="div" delay={0.24} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-[12.5px] text-secondary">
              <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <IconMail className="h-[14px] w-[14px] text-red" />
                {EMAIL}
              </a>
              <a href={TEL} className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                <IconPhone className="h-[14px] w-[14px] text-red" />
                {PHONE}
              </a>
              {LINKEDIN ? (
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                  <IconLinkedin className="h-[14px] w-[14px] text-red" />
                  LinkedIn
                </a>
              ) : null}
            </Reveal>
          </div>
        </div>
      </div>
    </header>
  );
}

function SecHead({ eyebrow, children, blurb, id }) {
  return (
    <Reveal className="mb-[clamp(40px,5vw,56px)] flex max-w-[720px] flex-col gap-[18px]">
      <Eyebrow>{eyebrow}</Eyebrow>
      <SectionTitle id={id}>{children}</SectionTitle>
      {blurb ? <p className="m-0 max-w-[60ch] text-[16.5px] leading-[1.6] text-secondary">{blurb}</p> : null}
    </Reveal>
  );
}

function FeaturedWork() {
  const sso = projects.find((p) => p.featured);
  const woo = projects.find((p) => p.pagespeed);

  return (
    <section id="work" aria-labelledby="work-h" className="relative py-[clamp(76px,9vw,116px)]">
      {/* decorative web corner */}
      <svg className="web-corner pointer-events-none absolute right-0 top-7 z-[1] h-[130px] w-[130px] -scale-x-100 opacity-[0.34]" viewBox="0 0 130 130" aria-hidden="true">
        <path d="M0 0 L130 0 L130 130" />
        <path d="M0 0 Q80 20 130 90" />
        <path d="M0 0 Q40 60 90 130" />
        <line x1="26" y1="0" x2="130" y2="104" />
        <line x1="60" y1="0" x2="130" y2="70" />
      </svg>

      <div className="mx-auto max-w-shell px-6">
        <SecHead
          eyebrow="Featured Work"
          id="work-h"
          blurb="Both live behind client logins, so there's no public URL — a walkthrough is on request. Here's what they are and what they moved."
        >
          The two that <span className="text-secondary">run in production</span>
        </SecHead>

        <div className="grid gap-[22px]">
          {/* ---- SSO: prose left, static figures right ---- */}
          {sso ? (
            <Reveal as="article" className="feat-surface relative overflow-hidden rounded border border-line">
              <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-red" aria-hidden="true" />
              <div className="grid md:grid-cols-[1.15fr_.85fr]">
                <div className="p-9 md:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-redtext">
                      <span className="h-1.5 w-1.5 rounded-full bg-red" />
                      {sso.title} · {sso.context}
                    </span>
                    <LiveBadge />
                  </div>
                  <h3 className="my-4 font-display text-[clamp(24px,3vw,34px)] font-black uppercase leading-[1.05] text-primary">
                    One credential,
                    <br />
                    the whole company
                  </h3>
                  <p className="mb-4 max-w-[46ch] text-[15.5px] text-secondary">{sso.note}</p>
                  <TechChips items={sso.technologies} />
                  <div className="mt-4 flex items-start gap-2 font-mono text-[12px] text-muted">
                    <IconInfo className="mt-0.5 h-[13px] w-[13px] flex-none text-muted" />
                    Production system behind a client login — walkthrough on request, no public link.
                  </div>
                </div>
                <div className="sso-figs flex flex-col justify-center border-t border-line px-9 py-8 md:border-l md:border-t-0">
                  {sso.stats?.map((s, i) => (
                    <div key={s.label} className={`flex items-baseline gap-4 py-3.5 ${i > 0 ? "border-t border-dashed border-line2" : ""}`}>
                      <span className={`font-display text-[clamp(38px,6vw,58px)] font-black leading-[0.9] ${i === sso.stats.length - 1 ? "text-red" : "text-primary"}`}>
                        {s.value}
                      </span>
                      <span className="font-mono text-[12px] uppercase tracking-[0.08em] text-secondary">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ) : null}

          {/* ---- WooCommerce: static PageSpeed line left, prose right ---- */}
          {woo ? (
            <Reveal as="article" className="feat-surface relative overflow-hidden rounded border border-line">
              <span className="absolute bottom-0 left-0 top-0 w-[3px] bg-blue" aria-hidden="true" />
              <div className="grid md:grid-cols-[.85fr_1.15fr]">
                <div className="woo-score order-2 flex flex-col justify-center border-t border-line px-9 py-8 md:order-1 md:border-r md:border-t-0">
                  <div className="mb-3.5 font-mono text-[12px] uppercase tracking-[0.14em] text-secondary">PageSpeed, after the rebuild</div>
                  <div className="flex items-center gap-[18px] font-display">
                    <span className="text-[clamp(40px,7vw,64px)] leading-[0.9] text-secondary">{woo.pagespeed.before}</span>
                    <span className="text-[clamp(30px,5vw,44px)] leading-[0.9] text-red" aria-hidden="true">→</span>
                    <span className="text-[clamp(58px,11vw,104px)] leading-[0.85] text-red [text-shadow:0_6px_40px_rgba(230,36,41,.35)]">{woo.pagespeed.after}</span>
                  </div>
                  <div className="mt-3 font-mono text-[12px] text-muted">// legacy theme → fresh modern theme, every page type migrated</div>
                </div>
                <div className="order-1 p-9 md:order-2 md:p-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-blue">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue" />
                      {woo.title} · {woo.context}
                    </span>
                    <LiveBadge />
                  </div>
                  <h3 className="my-4 font-display text-[clamp(24px,3vw,34px)] font-black uppercase leading-[1.05] text-primary">
                    Rebuilt on the
                    <br />
                    studs, not patched
                  </h3>
                  <p className="mb-4 max-w-[52ch] text-[15.5px] text-secondary">{woo.note}</p>
                  <TechChips items={woo.technologies} />
                  <div className="mt-4 flex items-start gap-2 font-mono text-[12px] text-muted">
                    <IconInfo className="mt-0.5 h-[13px] w-[13px] flex-none text-muted" />
                    Live client store — no public link.
                  </div>
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

// Accent per strand: InsBOSS work reads heaviest (blue), school/personal
// builds carry the red thread, quiet design work stays muted.
function strandAccent(p) {
  if (p.kind === "Design") return { node: "bg-secondary", idx: "text-secondary", glow: "group-hover:shadow-[0_0_0_4px_rgba(155,162,180,.14)]", edge: "" };
  if (p.context.includes("InsBOSS")) return { node: "bg-blue", idx: "text-blue", glow: "group-hover:shadow-[0_0_0_4px_rgba(59,123,230,.16)]", edge: "bg-blue" };
  return { node: "bg-red", idx: "text-redtext", glow: "group-hover:shadow-[0_0_0_4px_rgba(230,36,41,.14)]", edge: "bg-red" };
}

function StrandLink({ project }) {
  if (project.githubLink || project.liveDemoLink) {
    const href = project.githubLink || project.liveDemoLink;
    const label = project.githubLink ? "Read the code" : "Open prototype";
    const kind = project.githubLink ? "GitHub" : "Prototype";
    return (
      <>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-2 border-b border-line2 pb-0.5 font-mono text-[12px] text-primary transition-colors hover:border-red hover:text-redtext"
        >
          {label}
          <IconArrow className="h-[13px] w-[13px]" />
        </a>
        <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{kind}</span>
      </>
    );
  }
  const quiet = project.kind === "Design" ? "Design · files on request" : project.kind === "Internal" ? "Internal" : "No public link";
  return <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{quiet}</span>;
}

function CaughtInTheWeb() {
  const others = projects.filter((p) => !p.featured && !p.pagespeed);

  return (
    <section id="more-work" aria-labelledby="caught-h" className="relative py-[clamp(76px,9vw,116px)]">
      <div className="mx-auto max-w-shell px-6">
        <SecHead eyebrow="More Work" id="caught-h">
          Caught in the <span className="text-secondary">web</span>
        </SecHead>
        <Reveal as="p" className="-mt-8 mb-11 font-mono text-[13px] tracking-[0.04em] text-secondary">
          // {others.length} more strands — the InsBOSS systems that carry weight, then the quieter school &amp; design work
        </Reveal>

        <div className="border-t border-line">
          {others.map((p, i) => {
            const accent = strandAccent(p);
            const meta = [p.context, p.kind, p.year].filter(Boolean);
            return (
              <Reveal
                as="article"
                key={p.id}
                className="group relative grid grid-cols-[28px_1fr] items-start gap-4 border-b border-line py-7 transition-[padding,background] duration-300 hover:bg-[linear-gradient(90deg,rgba(230,36,41,.045),transparent_58%)] hover:pl-3 sm:grid-cols-[56px_1fr_auto] sm:gap-6 sm:pr-2"
              >
                <span className={`absolute bottom-0 left-0 top-0 w-0.5 origin-center scale-y-0 transition-transform duration-300 group-hover:scale-y-100 ${accent.edge}`} aria-hidden="true" />
                <div className={`pt-1.5 font-mono text-[13px] tracking-[0.05em] ${accent.idx}`}>
                  <span className={`mr-2 inline-block h-2 w-2 rounded-full align-middle transition-shadow duration-300 ${accent.node} ${accent.glow}`} />
                  {String(i + 3).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-1.5 font-display text-[22px] font-black tracking-[-0.01em] text-primary">{p.title}</h3>
                  <div className="mb-3 flex flex-wrap items-center gap-2.5 font-mono text-[12px] text-secondary">
                    {meta.map((m, mi) => (
                      <React.Fragment key={m}>
                        {mi > 0 ? <span className="text-line2">/</span> : null}
                        <span>{m}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="mb-3 max-w-[70ch] text-[15px] text-secondary">{p.note}</p>
                  <div className="font-mono text-[11.5px] text-muted">{p.technologies.join(" · ")}</div>
                </div>
                <div className="col-span-full flex min-w-[130px] flex-col items-start gap-2.5 pt-1 sm:col-span-1 sm:items-end sm:text-right">
                  <StrandLink project={p} />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" aria-labelledby="exp-h" className="relative py-[clamp(76px,9vw,116px)]">
      <div className="mx-auto max-w-shell px-6">
        <SecHead eyebrow="Experience" id="exp-h">
          The <span className="text-secondary">ledger</span>
        </SecHead>
        <div className="border-l-2 border-line">
          {experience.map((job) => (
            <Reveal as="div" key={job.org} className="relative pb-11 pl-8 pt-1.5 last:pb-0">
              <span className="absolute -left-2 top-2 h-3 w-3 rounded-full border-2 border-red bg-ink" aria-hidden="true" />
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-[22px] font-black text-primary">
                  {job.role} — <span className="text-redtext">{job.org}</span>
                </h3>
                <span className="whitespace-nowrap font-mono text-[12px] tracking-[0.04em] text-secondary">{job.dates}</span>
              </div>
              {job.place ? <div className="mb-4 font-mono text-[12px] text-muted">{job.place}</div> : null}
              <ul className="m-0 grid list-none gap-3 p-0 md:grid-cols-2 md:gap-x-[34px]">
                {job.lines.map((line) => (
                  <li key={line} className="relative pl-[22px] text-[15px] leading-[1.55] text-secondary">
                    <span className="absolute left-0 top-[9px] h-[9px] w-[9px] rotate-45 border border-red" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const BLUE_GROUPS = ["Auth & Identity", "DevOps & Tooling", "Tools"];

function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-h" className="relative py-[clamp(76px,9vw,116px)]">
      <div className="mx-auto max-w-shell px-6">
        <SecHead eyebrow="Skills" id="skills-h">
          The <span className="text-secondary">toolkit</span>
        </SecHead>
        <Reveal className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((group) => {
            const blue = BLUE_GROUPS.includes(group.group);
            const wide = group.group === "WordPress & WooCommerce";
            return (
              <div key={group.group} className={`bg-ink2 p-6 ${wide ? "sm:col-span-2 lg:col-span-3" : ""}`}>
                <h4 className={`mb-3.5 font-mono text-[12px] font-semibold uppercase tracking-[0.12em] ${blue ? "text-blue" : "text-redtext"}`}>{group.group}</h4>
                <ul className="m-0 flex list-none flex-wrap gap-[7px] p-0">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-sm border border-line2 bg-[rgba(232,234,242,.02)] px-2.5 py-[5px] font-mono text-[12.5px] text-primary">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" aria-labelledby="edu-h" className="relative py-[clamp(76px,9vw,116px)]">
      <div className="mx-auto max-w-shell px-6">
        <SecHead eyebrow="Education & Certifications" id="edu-h">
          On the <span className="text-secondary">record</span>
        </SecHead>
        <div className="grid gap-[22px] md:grid-cols-2">
          {credentials.map((c) => (
            <Reveal as="div" key={c.term} className="rounded border border-line bg-ink2 p-8">
              <h4 className="mb-5 font-mono text-[12px] uppercase tracking-[0.14em] text-secondary">{c.term}</h4>
              <div className="flex flex-col gap-3">
                {c.lines.map((line, i) => (
                  <p key={line} className={i === 0 ? "font-display text-[18px] font-black leading-[1.2] text-primary" : "text-[14.5px] leading-[1.5] text-secondary"}>
                    {line}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { k: "Email", v: EMAIL, href: `mailto:${EMAIL}`, Icon: IconMail },
    { k: "Phone", v: PHONE, href: TEL, Icon: IconPhone },
    GITHUB ? { k: "GitHub", v: GITHUB.replace(/^https?:\/\//, ""), href: GITHUB, ext: true, Icon: IconGithub } : null,
    LINKEDIN ? { k: "LinkedIn", v: LINKEDIN.replace(/^https?:\/\/(www\.)?/, ""), href: LINKEDIN, ext: true, Icon: IconLinkedin } : null,
  ].filter(Boolean);

  return (
    <section id="contact" aria-labelledby="contact-h" className="contact-surface relative border-t border-line py-[clamp(76px,9vw,116px)]">
      <div className="mx-auto max-w-shell px-6">
        <Reveal>
          <Eyebrow>Contact</Eyebrow>
          <h2 id="contact-h" className="mb-5 mt-[18px] max-w-[16ch] font-display text-[clamp(28px,5vw,50px)] font-black uppercase leading-[0.98] text-primary">
            Have a system that needs finishing? I&rsquo;d like to hear about it.
          </h2>
          <p className="m-0 mb-[34px] max-w-[58ch] text-[16.5px] text-secondary">
            Tell me what you&rsquo;re building and where it&rsquo;s stuck. If I&rsquo;m not the right fit, I&rsquo;ll say so in the reply rather than cost you a week finding out.
          </p>
          <div className="mb-10 flex flex-wrap gap-[14px]">
            <ButtonRed href={`mailto:${EMAIL}`}>
              <IconMail className="h-[15px] w-[15px]" />
              Email me
            </ButtonRed>
            <ButtonGhost href="/Resume.pdf" download={RESUME_DL}>
              <IconDownload className="h-[15px] w-[15px]" />
              Resume (PDF)
            </ButtonGhost>
          </div>
        </Reveal>

        <Reveal className="grid max-w-[700px] grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2">
          {links.map((link) => {
            const LinkIcon = link.Icon;
            return (
              <a
                key={link.k}
                href={link.href}
                {...(link.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center gap-3.5 bg-ink2 px-5 py-4 transition-colors hover:bg-[rgba(230,36,41,.06)]"
              >
                <LinkIcon className="h-[18px] w-[18px] flex-none text-red" />
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{link.k}</span>
                  <span className="block break-all text-[14px] text-primary">{link.v}</span>
                </span>
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-3.5 px-6 font-mono text-[12px] text-muted">
        <span>
          {FULL_NAME} · {LOCATION}
        </span>
        <span className="flex items-center gap-4">
          {GITHUB ? (
            <a href={GITHUB} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <IconGithub className="h-[15px] w-[15px]" />
              GitHub
            </a>
          ) : null}
          {LINKEDIN ? (
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
              <IconLinkedin className="h-[15px] w-[15px]" />
              LinkedIn
            </a>
          ) : null}
        </span>
      </div>
    </footer>
  );
}

/* ---------------------------------------------------------------------- page */

export default function Home() {
  return (
    <>
      {/* Page-wide comic halftone, used once and kept very subtle. */}
      <div className="halftone pointer-events-none fixed inset-0 z-0 opacity-50 mix-blend-screen" aria-hidden="true" />
      <div className="relative z-[1]">
        <Navbar />
        <main>
          <Hero />
          <FeaturedWork />
          <ThreadRule />
          <CaughtInTheWeb />
          <ThreadRule />
          <ExperienceSection />
          <ThreadRule />
          <Skills />
          <ThreadRule />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
