import React, { useEffect, useState } from "react";
import { EMAIL } from "../data/content";

const NAV = [
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Skills", "#skills"],
  ["Contact", "#contact"],
];

// Inspired-by web brandmark — a generic radial web, no trademarks.
function WebMark() {
  return (
    <svg viewBox="0 0 40 40" className="h-[26px] w-[26px] flex-none" aria-hidden="true">
      <g fill="none" stroke="#E62429" strokeWidth="1.4" strokeLinecap="round">
        <line x1="20" y1="20" x2="20" y2="2" />
        <line x1="20" y1="20" x2="34" y2="9" />
        <line x1="20" y1="20" x2="38" y2="26" />
        <line x1="20" y1="20" x2="26" y2="38" />
        <line x1="20" y1="20" x2="8" y2="36" />
        <line x1="20" y1="20" x2="2" y2="20" />
        <line x1="20" y1="20" x2="6" y2="7" />
      </g>
      <g fill="none" stroke="#9BA2B4" strokeWidth="1" opacity=".85">
        <path d="M20 8 L28 12 L31 20 L26 30 L15 31 L7 22 L11 11 Z" />
        <path d="M20 14 L25 17 L26 22 L22 26 L15 25 L13 18 Z" />
      </g>
    </svg>
  );
}

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 backdrop-blur-md transition-colors duration-300 border-b ${
        solid ? "bg-ink/90 border-line" : "bg-ink/40 border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[60px] max-w-shell items-center justify-between px-6">
        <a
          href="#top"
          className="flex items-center gap-[11px] font-display text-[15px] uppercase tracking-[0.02em] text-primary"
          aria-label="Joshua La Rosa — home"
        >
          <WebMark />
          <span>
            J.&nbsp;La&nbsp;<span className="text-red">Rosa</span>
          </span>
        </a>

        <div className="flex items-center gap-6">
          <nav
            className="hidden items-center gap-[26px] font-mono text-[12.5px] uppercase tracking-[0.08em] text-secondary md:flex"
            aria-label="Primary"
          >
            {NAV.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="relative py-1 transition-colors after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-red after:transition-all after:duration-300 hover:text-primary hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>
          <a
            href={`mailto:${EMAIL}`}
            className="hidden items-center gap-2 rounded-sm border border-line2 px-3.5 py-2 font-mono text-[12px] uppercase tracking-[0.08em] text-primary transition-colors hover:border-red hover:text-redtext sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-[14px] w-[14px]" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Email me
          </a>
        </div>
      </div>
    </header>
  );
}
