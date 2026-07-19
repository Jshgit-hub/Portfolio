// Single source of copy for all three design directions. Edit here, not in the
// page components — otherwise the versions drift apart while you compare them.

export const EMAIL = '1114joshuafeliciano@gmail.com';
export const PHONE = '+63 963 759 5816';

export const LINKS = [
    ['GitHub', 'https://github.com/Jshgit-hub'],
    ['LinkedIn', 'https://www.linkedin.com/in/la-rosa-joshua-570115370/'],
];

export const stack = [
    {
        group: 'Reach for daily',
        items: ['JavaScript', 'PHP', 'React', 'WordPress', 'WooCommerce', 'MySQL', 'Tailwind CSS'],
    },
    {
        group: 'For connecting systems',
        items: ['REST APIs', 'Webhooks', 'Express', 'Node.js', 'MySQL', 'Zoho'],
    },
    {
        group: 'Also in hand',
        items: ['Python', 'Elementor', 'Bootstrap', 'Cypress', 'Figma', 'Git', 'Claude Code CLI'],
    },
];

// Present tense for ongoing duties, past tense for finished builds — held
// consistent within each bullet.
export const experience = [
    {
        role: 'Web Developer',
        org: 'InsBOSS USA',
        place: 'Remote',
        dates: 'Jul 2025 – present',
        lines: [
            'Own the WooCommerce subscription platform the company bills its clients through. Tracing each billing discrepancy to the plugin behavior that caused it, rather than correcting invoices one at a time, brought the repeat reports down and kept client accounts reconciled across several linked sites.',
            'Designed and built the company\'s finance system to a deliberate MVP scope — data models, role-based access, approval logic — replacing an approval chain that ran on email and spreadsheets. Requests are tracked in one place now instead of stalling in an inbox.',
            'Built the routing layer for it by hand rather than assembling it in a form plugin — webhooks firing on state changes, with the notification and conditional-approval paths written directly. The manual re-keying between forms and finance records is gone.',
            'Customize and tune WooCommerce plugins, watching PageSpeed Insights and uptime alerts so a slowdown surfaces before a client notices it.',
            'Handle support and issue resolution in Zoho, working from SOPs and workflow guides I wrote, so recurring problems are solved from a documented process rather than from memory.',
            'Use Claude Code CLI with custom plugins and skills to build context-aware tooling and hold the codebase to a standard, which shortened the turnaround between versioned releases.',
        ],
    },
    {
        role: 'Full-stack Developer Intern',
        org: 'YKMK Global Training and Assessment, Inc.',
        note: 'Wesleyan University Hospital Philippines',
        place: 'Cabanatuan, Nueva Ecija',
        dates: 'Jan – May 2025',
        lines: [
            'Merged a legacy patient database into the new hospital system, reconciling the records that existed in both and keeping the data consistent across platforms.',
            'Designed and implemented secure REST APIs for the exchange between frontend and backend services.',
            'Built the React and Tailwind interfaces for every user role, with Context API holding user sessions and patient records.',
            'Wrote Cypress end-to-end tests across form validation, workflows, and API responses — the paths hospital staff use hundreds of times a week.',
        ],
    },
];

export const credentials = [
    {
        term: 'Education',
        lines: [
            'BS Information Technology, major in Web Systems Technology — 2021–2025',
            'Nueva Ecija Science and Technology (Wesleyan University Philippines)',
        ],
    },
    {
        term: 'Certifications',
        lines: [
            'IT Specialist, HTML and CSS — Certiport, 2024',
            'NCIII Bookkeeping — TESDA, 2019',
        ],
    },
];
