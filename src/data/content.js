// Single source of copy for the site. Edit here, not in the page components.
// Content mirrors the current resume (Full-Stack Web Developer).

export const NAME = 'Joshua La Rosa';
export const FULL_NAME = 'Joshua Veracruz La Rosa';
export const TITLE = 'Full-Stack Web Developer';
export const SUBTITLE = 'React · TypeScript · Node.js · PHP';
export const LOCATION = 'Philippines (UTC+8) · Remote';

export const EMAIL = '1114joshuafeliciano@gmail.com';
export const PHONE = '+63 963 759 5816';

export const SUMMARY =
    "I'm a full-stack developer who likes owning the whole picture — frontend, backend, database, and the deployment underneath it. I care more about understanding the problem than rushing to code it, and I'd rather ship something simple and dependable than clever and fragile. The parts most people avoid — the edge cases, the flows that don't quite behave — are the ones I enjoy most.";

export const LINKS = [
    ['GitHub', 'https://github.com/Jshgit-hub'],
    ['LinkedIn', 'https://www.linkedin.com/in/joshua-la-rosa-570115370/'],
];

// A few headline numbers for the hero stat strip.
export const HERO_STATS = [
    { value: '~300', label: 'employees on the SSO platform' },
    { value: '7', label: 'internal apps, one credential' },
    { value: '48→91', label: 'PageSpeed on the WooCommerce rebuild' },
];

export const stack = [
    {
        group: 'Languages',
        items: ['TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML/CSS'],
    },
    {
        group: 'Frontend',
        items: ['React', 'TailwindCSS', 'Context API'],
    },
    {
        group: 'Backend & Data',
        items: ['Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'MySQL', 'REST API design'],
    },
    {
        group: 'Auth & Identity',
        items: ['OAuth 2.0'],
    },
    {
        group: 'DevOps & Tooling',
        items: ['Docker', 'Git/GitHub'],
    },
    {
        group: 'WordPress & WooCommerce',
        items: [
            'Theme dev & migration',
            'Plugin customization',
            'Subscriptions & recurring billing',
            'Checkout customization',
            'Custom admin dashboards',
            'Roles & capabilities',
            'Transactional email templates',
            'Elementor',
        ],
    },
    {
        group: 'Integrations & Automation',
        items: ['REST APIs', 'Webhooks', 'Payment processing troubleshooting', 'Conditional workflow routing', 'Zoho'],
    },
    {
        group: 'Testing & Performance',
        items: ['Cypress (E2E)', 'PageSpeed Insights', 'Uptime monitoring'],
    },
    {
        group: 'Tools',
        items: ['Git', 'Figma', 'Obsidian', 'Claude Code CLI'],
    },
];

// Present tense for ongoing duties, past tense for finished builds.
export const experience = [
    {
        role: 'Web Developer',
        org: 'InsBOSS USA',
        place: 'Remote',
        dates: 'Jul 2025 – Present',
        lines: [
            'Architected and shipped a company-wide single sign-on platform (TypeScript, React, Prisma, OAuth 2.0, PostgreSQL, Docker) giving roughly 300 employees one credential across 7 internal applications, replacing per-app manual sign-ins.',
            'Maintain and extend a multi-brand WooCommerce subscription platform across several interconnected WordPress sites, covering recurring billing, checkout, and payment processing.',
            'Investigate and resolve billing discrepancies by tracing subscription records against payment transactions, then fixing the code path behind the error rather than correcting records by hand.',
            'Customize WooCommerce plugins, checkout pages, and transactional email templates in PHP where stock behavior does not fit the subscription model, including porting a full template and checkout set across product lines.',
            'Own inbound support tickets in Zoho end to end; wrote the SOPs and workflow guides the team uses for recurring billing and platform issues.',
            'Built custom Claude Code CLI plugins and skills encoding project conventions and codebase context, so AI-assisted changes follow existing standards and need less rework before release.',
        ],
    },
    {
        role: 'Full Stack Developer Intern',
        org: 'Wesleyan University Hospital Philippines',
        place: 'Cabanatuan, Nueva Ecija',
        dates: 'Jan – May 2025',
        lines: [
            'Migrated a legacy patient database into the hospital\'s new system, reconciling schema differences and duplicate records so clinical staff worked from one source of truth.',
            'Built the patient records interface in React and TailwindCSS with Context API managing user sessions and record state, backed by REST endpoints for data exchange with backend services.',
            'Wrote Cypress end-to-end tests covering form validation, core patient workflows, and API responses, catching regressions before handoff.',
        ],
    },
];

export const credentials = [
    {
        term: 'Education',
        lines: [
            'BS Information Technology, major in Web Systems Technology — 2021–2025',
            'Nueva Ecija University of Science and Technology (NEUST), Nueva Ecija, Philippines',
        ],
    },
    {
        term: 'Certifications',
        lines: [
            'IT Specialist, HTML and CSS — Certiport, 2024',
            'NC III Bookkeeping — TESDA, 2019',
        ],
    },
];
