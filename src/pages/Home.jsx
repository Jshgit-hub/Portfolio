import React from 'react';
import Navbar from '../components/Navbar';
import projects from '../data/Project';
import useReveal from '../lib/useReveal';
import {
    FULL_NAME,
    SUBTITLE,
    LOCATION,
    EMAIL,
    PHONE,
    SUMMARY,
    LINKS,
    experience,
    stack,
    credentials,
} from '../data/content';

/* ------------------------------------------------------------- helpers */

const GITHUB = LINKS.find(([label]) => label === 'GitHub')?.[1];
const LINKEDIN = LINKS.find(([label]) => label === 'LinkedIn')?.[1];
const TEL = `tel:${PHONE.replace(/\s/g, '')}`;

// Where a project card's action goes: a real link if one exists, else a note.
function projectAction(p) {
    if (p.liveDemoLink) {
        return { href: p.liveDemoLink, label: p.kind === 'Design' ? 'Open prototype →' : 'Open live →' };
    }
    if (p.githubLink) {
        return { href: p.githubLink, label: 'Read the code →' };
    }
    return {
        note: p.kind === 'Design'
            ? 'Design files available on request'
            : 'Walkthrough on request (no public link)',
    };
}

function badgeFor(p) {
    if (p.year) return p.year;
    if (p.kind === 'Design') return 'Prototype';
    return p.kind;
}

const BADGE_TONE = ['cobalt', 'yellow', 'ink'];

/* --------------------------------------------------------------- hero */

function Hero() {
    const [pre, post] = SUMMARY.split('OAuth 2.0 SSO platform');
    return (
        <section className="hero">
            <div className="hero-main">
                <span className="hero-kicker">{LOCATION}</span>
                <h1>
                    Joshua
                    <br />
                    La Rosa
                </h1>
                <p className="subtitle">
                    Full-Stack Web Developer
                    {SUBTITLE.split(' · ').map((part) => (
                        <React.Fragment key={part}>
                            <span className="dot"> · </span>{part}
                        </React.Fragment>
                    ))}
                </p>
                <p className="hero-summary">
                    {pre}
                    <b>OAuth 2.0 SSO platform</b>
                    {post}
                </p>
                <div className="hero-actions">
                    <a className="btn cobalt" href={`mailto:${EMAIL}`}>Email me</a>
                    <a className="btn" href="/Resume.pdf" download="Joshua-La-Rosa-Resume.pdf">Resume (PDF)</a>
                    {GITHUB ? (
                        <a className="btn ink" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
                    ) : null}
                </div>
                <div className="hero-meta">
                    <span className="tag">{EMAIL}</span>
                    <a className="tag" href={TEL} style={{ textDecoration: 'none' }}>{PHONE}</a>
                    {LINKEDIN ? (
                        <a className="tag" href={LINKEDIN} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            LinkedIn
                        </a>
                    ) : null}
                </div>
            </div>
        </section>
    );
}

/* ----------------------------------------------------------- featured */

function SectionHead({ num, title }) {
    return (
        <div className="sec-head">
            <span className="num">{num}</span>
            <h2>{title}</h2>
        </div>
    );
}

function Featured() {
    const sso = projects.find((p) => p.featured);
    const woo = projects.find((p) => p.pagespeed);
    if (!sso && !woo) return null;

    return (
        <section className="sec" id="work">
            <SectionHead num="01 / FEATURED" title="Shipped, live, in use" />

            {sso ? (
                <article className="featured reveal">
                    <div className="featured-head">
                        <h3>{sso.title}</h3>
                        <span className="where">InsBOSS USA · Live</span>
                    </div>
                    <div className="featured-body">
                        <p>{sso.note}</p>
                        {sso.stats ? (
                            <div className="figrow">
                                {sso.stats.map((s) => (
                                    <div className="fig" key={s.label}>
                                        <span className="n">{s.value}</span>
                                        <span className="l">{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        ) : null}
                        <div className="tags">
                            {sso.technologies.map((t) => (
                                <span className="tag" key={t}>{t}</span>
                            ))}
                        </div>
                        <p className="card-note" style={{ marginTop: 16 }}>
                            Production system behind a client login — walkthrough on request (no public link).
                        </p>
                    </div>
                </article>
            ) : null}

            {woo ? (
                <article className="ba reveal">
                    <div className="ba-head">
                        <h3>{woo.title}</h3>
                        <span className="where">InsBOSS USA · Live</span>
                    </div>
                    <div className="ba-body">
                        <p>{woo.note}</p>
                        <div className="ba-metric">
                            <div className="score before">
                                <span className="n">{woo.pagespeed.before}</span>
                                <span className="l">PageSpeed · before</span>
                            </div>
                            <div className="arrow" aria-hidden="true">
                                ➜<span className="word">rebuilt</span>
                            </div>
                            <div className="score after">
                                <span className="n">{woo.pagespeed.after}</span>
                                <span className="l">PageSpeed · after</span>
                            </div>
                        </div>
                        <div className="tags" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {woo.technologies.map((t) => (
                                <span className="tag" key={t}>{t}</span>
                            ))}
                        </div>
                        <p className="card-note" style={{ marginTop: 16 }}>No public link.</p>
                    </div>
                </article>
            ) : null}
        </section>
    );
}

/* ----------------------------------------------------------- projects */

function ProjectCard({ project, index }) {
    const action = projectAction(project);
    return (
        <article className="card reveal">
            <div className="card-head">
                <h3>{project.title}</h3>
                <span className="idx">{String(index + 1).padStart(2, '0')}</span>
            </div>
            <div className="card-body">
                <div className="card-meta">
                    <span className="where">{project.context}</span>
                    <span className={`tag ${BADGE_TONE[index % 3]}`}>{badgeFor(project)}</span>
                </div>
                <p>{project.note}</p>
                <div className="card-tech">
                    {project.technologies.map((t) => (
                        <span className="tag" key={t}>{t}</span>
                    ))}
                </div>
                {action.href ? (
                    <a className="card-link" href={action.href} target="_blank" rel="noopener noreferrer">
                        {action.label}
                    </a>
                ) : (
                    <span className="card-note">{action.note}</span>
                )}
            </div>
        </article>
    );
}

function Projects() {
    return (
        <section className="sec">
            <SectionHead num="02 / PROJECTS" title="Nine things I built" />
            <div className="projects">
                {projects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}

/* --------------------------------------------------------- experience */

function Experience() {
    return (
        <section className="sec" id="experience">
            <SectionHead num="03 / EXPERIENCE" title="Where I work" />
            <div className="exp">
                {experience.map((job) => (
                    <article className="job reveal" key={job.org}>
                        <div className="job-head">
                            <h3>{job.role}</h3>
                            <div className="co">
                                <span>{job.org}</span>
                                {job.place ? <span>· {job.place}</span> : null}
                                <span className="when">{job.dates}</span>
                            </div>
                        </div>
                        <ul>
                            {job.lines.map((line) => (
                                <li key={line}>{line}</li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------- skills */

function Skills() {
    return (
        <section className="sec" id="skills">
            <SectionHead num="04 / STACK" title="What I reach for" />
            <div className="skills">
                {stack.map((group) => (
                    <div className="skillgroup reveal" key={group.group}>
                        <h3>{group.group}</h3>
                        <div className="tags">
                            {group.items.map((item) => (
                                <span className="tag" key={item}>{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

/* --------------------------------------------------------- credentials */

function Credentials() {
    const education = credentials.find((c) => c.term === 'Education');
    const certs = credentials.find((c) => c.term === 'Certifications');

    return (
        <section className="sec" id="education">
            <SectionHead num="05 / CREDENTIALS" title="School & certs" />
            <div className="edugrid">
                {education ? (
                    <div className="edublock reveal">
                        <h3>Education</h3>
                        <div className="degree">{education.lines[0]}</div>
                        <div className="school">{education.lines[1]}</div>
                    </div>
                ) : null}
                {certs ? (
                    <div className="edublock certs reveal">
                        <h3>Certifications</h3>
                        <ul className="certlist">
                            {certs.lines.map((line) => {
                                const [name, issuer] = line.split(' — ');
                                return (
                                    <li key={line}>
                                        <b>{name}</b>
                                        {issuer || ''}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ) : null}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------- contact */

function Contact() {
    return (
        <section className="sec" id="contact">
            <div className="contact reveal">
                <h2>Have a system that needs finishing? I'd like to hear about it.</h2>
                <p>
                    Tell me what you're building and where it's stuck. If I'm not the right fit,
                    I'll say so in the reply rather than cost you a week finding out.
                </p>
                <div className="actions">
                    <a className="btn" href={`mailto:${EMAIL}`}>{EMAIL}</a>
                    <a className="btn paper" href={TEL}>{PHONE}</a>
                    <a className="btn ink" href="/Resume.pdf" download="Joshua-La-Rosa-Resume.pdf">Resume (PDF)</a>
                </div>
            </div>
        </section>
    );
}

/* ----------------------------------------------------------------- page */

export default function Home() {
    useReveal();

    return (
        <main className="page">
            <Navbar />
            <Hero />
            <Featured />
            <Projects />
            <Experience />
            <Skills />
            <Credentials />
            <Contact />
            <footer className="site">
                <span>{FULL_NAME} · {LOCATION}</span>
                <span>
                    {GITHUB ? (
                        <a href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
                    ) : null}
                    {GITHUB && LINKEDIN ? ' / ' : null}
                    {LINKEDIN ? (
                        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    ) : null}
                </span>
            </footer>
        </main>
    );
}
