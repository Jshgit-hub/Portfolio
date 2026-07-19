import React from 'react';
import projects from '../data/Project';
import useReveal from '../lib/useReveal';
import { EMAIL, PHONE, LINKS, stack, experience, credentials } from '../data/content';

/* ---------------------------------------------------------------- sections */

function Hero() {
    return (
        <section id="top" className="border-b border-rule">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="pt-16 pb-16 sm:pt-28 sm:pb-24">
                    <p className="label mb-6 sm:mb-8">Web developer</p>

                    <h1 className="font-display tracking-tightest text-[clamp(3.1rem,13vw,10.5rem)]">
                        Joshua
                        <br />
                        <span className="text-graphite">La Rosa</span>
                    </h1>

                    <p className="mt-8 sm:mt-12 max-w-measure text-[1.0625rem] sm:text-xl leading-[1.6] text-graphite">
                        I'm a Web Developer who enjoys building software that solves real
                        business problems. I approach development with a focus on writing
                        clean, maintainable code and designing solutions that remain reliable
                        as projects evolve.{' '}
                        <span className="text-ink">
                            I value understanding the problem before writing code, and I
                            believe the best systems are those that are simple to maintain,
                            easy to extend, and dependable in production.
                        </span>
                    </p>

                    {/* Conversion path starts here, above the fold. */}
                    <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
                        <a
                            href={`mailto:${EMAIL}`}
                            className="inline-flex items-center justify-center bg-ink px-7 py-4 font-mono text-[13px] uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:bg-oxide"
                        >
                            Email me →
                        </a>
                        <a
                            href="/Resume.pdf"
                            download="Joshua-La-Rosa-Resume.pdf"
                            className="inline-flex items-center justify-center border border-ink px-7 py-4 font-mono text-[13px] uppercase tracking-[0.14em] text-ink transition-colors duration-200 hover:bg-ink hover:text-paper"
                        >
                            Resume (PDF)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function SectionHead({ index, title }) {
    return (
        <div className="reveal border-b border-rule pb-6">
            <h2 className="font-display text-[clamp(2.25rem,6vw,4rem)] tracking-tightest">
                <span className="mr-4 align-super font-mono text-[11px] tracking-normal text-oxide">
                    {index}
                </span>
                {title}
            </h2>
        </div>
    );
}

function WorkEntry({ project, index }) {
    const link = project.liveDemoLink || project.githubLink;
    const linkLabel = project.liveDemoLink
        ? project.kind === 'Design'
            ? 'Open prototype'
            : 'Open live'
        : 'Read the code';

    return (
        <article className="reveal border-b border-rule py-10 md:py-14">
            <div className="grid gap-8 md:grid-cols-12 md:gap-10">
                {/* Ledger gutter */}
                <div className="md:col-span-2">
                    <span className="font-mono text-[13px] text-oxide">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="label mt-2">
                        {project.kind}
                        {project.year ? ` · ${project.year}` : ''}
                    </p>
                </div>

                <div className="md:col-span-6">
                    <h3 className="font-display text-[clamp(1.9rem,4.5vw,2.9rem)] tracking-tightest">
                        {project.title}
                    </h3>
                    <p className="label mt-2">{project.context}</p>

                    <p className="mt-5 max-w-measure text-[1.0625rem] leading-[1.6] text-ink">
                        {project.summary}
                    </p>
                    <p className="mt-4 max-w-measure text-[0.9375rem] leading-[1.65] text-graphite">
                        {project.note}
                    </p>
                </div>

                {/* Spec column — what it was built with, and where to look. */}
                <div className="md:col-span-4 md:border-l md:border-rule md:pl-8">
                    <p className="label">Built with</p>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 md:block md:space-y-1.5">
                        {project.technologies.map((tech) => (
                            <li key={tech} className="font-mono text-[13px] text-ink">
                                {tech}
                            </li>
                        ))}
                    </ul>

                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 inline-block font-mono text-[12px] uppercase tracking-[0.14em] text-oxide link-draw"
                        >
                            {linkLabel} ↗
                        </a>
                    ) : (
                        <p className="mt-7 max-w-[30ch] font-mono text-[12px] leading-relaxed text-muted">
                            {project.kind === 'Design'
                                ? 'Client work — files available on request.'
                                : 'Production system behind a client login — walkthrough on request.'}
                        </p>
                    )}
                </div>
            </div>
        </article>
    );
}

function Work() {
    return (
        <section id="work" className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
            <SectionHead index="01" title="Selected work" />

            <div className="mt-4">
                {projects.map((project, i) => (
                    <WorkEntry key={project.id} project={project} index={i} />
                ))}
            </div>
        </section>
    );
}

function Experience() {
    return (
        <section id="experience" className="border-t border-rule bg-card/50">
            <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
                <SectionHead index="02" title="Where I've worked" />

                <div className="mt-4">
                    {experience.map((job) => (
                        <div
                            key={job.org}
                            className="reveal grid gap-6 border-b border-rule py-10 md:grid-cols-12 md:gap-10 md:py-14"
                        >
                            <div className="md:col-span-4">
                                <p className="font-mono text-[13px] text-oxide">{job.dates}</p>
                                <h3 className="mt-3 font-display text-[clamp(1.6rem,3.5vw,2.25rem)] tracking-tightest">
                                    {job.role}
                                </h3>
                                <p className="mt-2 text-[15px] text-ink">{job.org}</p>
                                {job.note ? (
                                    <p className="mt-1 text-[14px] text-graphite">{job.note}</p>
                                ) : null}
                                <p className="label mt-1">{job.place}</p>
                            </div>

                            <ul className="md:col-span-8 space-y-3">
                                {job.lines.map((line) => (
                                    <li
                                        key={line}
                                        className="max-w-measure border-l border-rule pl-5 text-[0.9375rem] leading-[1.65] text-graphite"
                                    >
                                        {line}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Stack() {
    return (
        <section id="stack" className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
            <SectionHead index="03" title="What I reach for" />

            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-12">
                {stack.map((column) => (
                    <div key={column.group} className="reveal">
                        <p className="label border-b border-rule pb-3">{column.group}</p>
                        <ul className="mt-5 space-y-2.5">
                            {column.items.map((item) => (
                                <li key={item} className="font-mono text-[14px] text-ink">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Credentials read as the document's endnotes, deliberately quiet. */}
            <dl className="mt-16 grid gap-8 border-t border-rule pt-8 md:grid-cols-2 md:gap-12">
                {credentials.map((entry) => (
                    <div key={entry.term} className="reveal">
                        <dt className="label">{entry.term}</dt>
                        <dd className="mt-3 space-y-1.5">
                            {entry.lines.map((line, i) => (
                                <p
                                    key={line}
                                    className={
                                        i === 0
                                            ? 'text-[15px] leading-relaxed text-ink'
                                            : 'font-mono text-[12px] leading-relaxed text-muted'
                                    }
                                >
                                    {line}
                                </p>
                            ))}
                        </dd>
                    </div>
                ))}
            </dl>
        </section>
    );
}

function Contact() {
    return (
        <section id="contact" className="border-t border-rule bg-ink text-paper">
            <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-32">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                    04 — Get in touch
                </p>

                <h2 className="reveal mt-8 max-w-4xl font-display text-[clamp(2.5rem,8vw,6rem)] tracking-tightest">
                    If you have a system that needs finishing, I'd like to hear about it.
                </h2>

                <p className="reveal mt-8 max-w-measure text-[1.0625rem] leading-[1.6] text-paper/70">
                    Tell me what you're building and where it's stuck. If I'm not the right
                    fit, I'll tell you in the reply rather than cost you a week finding out.
                </p>

                <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-t border-paper/15 pt-10">
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                            Email
                        </p>
                        <a
                            href={`mailto:${EMAIL}`}
                            className="mt-3 block break-all font-mono text-[14px] text-paper link-draw"
                        >
                            {EMAIL}
                        </a>
                    </div>
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                            Phone
                        </p>
                        <a
                            href={`tel:${PHONE.replace(/\s/g, '')}`}
                            className="mt-3 block font-mono text-[14px] text-paper link-draw"
                        >
                            {PHONE}
                        </a>
                    </div>
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                            Elsewhere
                        </p>
                        <ul className="mt-3 space-y-2">
                            {LINKS.map(([label, href]) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-mono text-[14px] text-paper link-draw"
                                    >
                                        {label} ↗
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-paper/50">
                            Or take the file
                        </p>
                        <a
                            href="/Resume.pdf"
                            download="Joshua-La-Rosa-Resume.pdf"
                            className="mt-3 inline-block border border-paper/30 px-5 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-paper transition-colors duration-200 hover:bg-paper hover:text-ink"
                        >
                            Resume (PDF)
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------- page */

export default function Home() {
    useReveal();

    return (
        <>
            <Hero />
            <Work />
            <Experience />
            <Stack />
            <Contact />
            <footer className="bg-ink text-paper/40">
                <div className="mx-auto max-w-6xl px-5 sm:px-8 py-8 border-t border-paper/10">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em]">
                        Joshua Vera Cruz La Rosa
                    </p>
                </div>
            </footer>
        </>
    );
}
