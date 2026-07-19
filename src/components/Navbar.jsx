import React from 'react';

const sections = [
    { href: '#work', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#stack', label: 'Stack' },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur-sm border-b border-rule">
            <div className="mx-auto max-w-6xl px-5 sm:px-8">
                <div className="flex h-14 items-center justify-between gap-6">
                    <a href="#top" className="font-mono text-[13px] tracking-tight text-ink">
                        J. La Rosa
                        <span className="hidden sm:inline text-muted"> / web developer</span>
                    </a>

                    <nav className="flex items-center gap-6">
                        <ul className="hidden md:flex items-center gap-6">
                            {sections.map((s) => (
                                <li key={s.href}>
                                    <a href={s.href} className="label link-draw hover:text-ink">
                                        {s.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <a
                            href="#contact"
                            className="font-mono text-[12px] uppercase tracking-[0.14em] text-oxide link-draw"
                        >
                            Get in touch
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
}
