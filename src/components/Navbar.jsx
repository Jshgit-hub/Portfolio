import React from 'react';

const sections = [
    { href: '#work', label: 'Work' },
    { href: '#experience', label: 'Experience' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' },
];

// Brutalist top bar. Rendered inside the .page container in Home.
export default function Navbar() {
    return (
        <div className="topbar" id="top">
            <span className="brand">JLR // Full-Stack</span>
            <nav aria-label="Section navigation">
                {sections.map((s) => (
                    <a key={s.href} href={s.href}>
                        {s.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}
