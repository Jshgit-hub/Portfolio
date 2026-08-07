// src/data/Project.js
// Ordered to mirror the resume's Selected Projects: current production work at
// InsBOSS first, then hospital/school builds, then the Figma design work.
//
// Entries are text-only. An entry with neither `githubLink` nor `liveDemoLink`
// renders an "on request" line instead of a link.
//
// Optional fields:
//   featured: true  — rendered as the large lead card
//   stats: [{ value, label }]  — small metric boxes (SSO)
//   pagespeed: { before, after }  — before/after PageSpeed stat (WooCommerce)
const projects = [
    {
        id: 1,
        title: 'Company SSO Platform',
        kind: 'Live',
        year: null,
        context: 'InsBOSS USA — remote',
        featured: true,
        summary:
            'Single sign-on for the whole company: one credential, every internal app.',
        note:
            'Architected and built end to end, backend to frontend — an OAuth 2.0 auth flow with a Prisma/PostgreSQL user store, containerized with Docker. Roughly 300 employees now hold one global credential across 7 internal applications instead of a separate manual sign-in for each.',
        stats: [
            { value: '~300', label: 'employees' },
            { value: '7', label: 'apps' },
            { value: '1', label: 'credential' },
        ],
        technologies: ['TypeScript', 'React', 'Prisma', 'OAuth 2.0', 'PostgreSQL', 'Docker'],
    },
    {
        id: 2,
        title: 'WooCommerce Platform Rebuild',
        kind: 'Live',
        year: null,
        context: 'InsBOSS USA — remote',
        summary:
            'A live store lifted off its legacy theme onto a fresh, fast, extensible one.',
        note:
            'Rebuilt every page type onto a modern theme rather than patching templates one at a time, migrating the accumulated design code with it. Left the codebase in a state the team can extend for additional stores.',
        pagespeed: { before: 48, after: 91 },
        technologies: ['PHP', 'WordPress', 'WooCommerce', 'JavaScript'],
    },
    {
        id: 3,
        title: 'Client Accounting Dashboard',
        kind: 'Live',
        year: null,
        context: 'InsBOSS USA — remote',
        summary:
            'A role-scoped console so a client\'s accounting team never touches WP admin.',
        note:
            'Built so a client\'s accounting executive can create orders and coupons, add order notes, modify subscriptions, and email customers — all without WP admin access. Scoped tightly with WordPress roles and capabilities so each person sees only what their job needs.',
        technologies: ['PHP', 'WooCommerce', 'Roles & capabilities'],
    },
    {
        id: 4,
        title: 'Finance Approval System',
        kind: 'Internal',
        year: null,
        context: 'InsBOSS USA — remote',
        summary:
            'Payment requests with an owner and a timestamp at every step.',
        note:
            'Built the approval workflow as structured PHP — data model, role-based access for requesters, approvers, and finance, and the routing rules between them. Written by hand rather than assembled in a form plugin, replacing roughly 100 manual process steps a week with a system where a request can no longer change state without leaving a record of who changed it.',
        technologies: ['PHP', 'WordPress', 'MySQL', 'Webhooks'],
    },
    {
        id: 5,
        title: 'Ekonsulta Patient Management',
        kind: 'Build',
        year: '2025',
        context: 'Wesleyan University Hospital — internship',
        summary:
            'Appointments, prescriptions, and medical records for doctors, staff, and patients.',
        note:
            'The interface was never the hard part — merging a legacy patient database into the new one without losing or duplicating a single record was. I wrote the migration, built the REST endpoints the two systems spoke through, and covered the intake forms with Cypress tests so a bad save could not slip through on a busy shift.',
        technologies: ['React', 'Express', 'MySQL', 'Tailwind', 'Context API', 'Cypress'],
        githubLink: 'https://github.com/BeeRidge/wup-project.git',
    },
    {
        id: 6,
        title: 'NovoCamera',
        kind: 'Build',
        year: '2024',
        context: 'Capstone — Nueva Ecija tourism',
        summary:
            'Hotels, restaurants, and attractions on an interactive map, with visitor posts.',
        note:
            'Built before I had React — plain PHP, JavaScript, and MySQL, with Ajax handling the map filtering so the page never reloaded while you browsed. It taught me exactly what a framework saves you from, which is the sort of thing you only learn by doing it the long way first.',
        technologies: ['PHP', 'JavaScript', 'Ajax', 'MySQL', 'Bootstrap'],
        githubLink: 'https://github.com/Jshgit-hub/NovoCamera.git',
    },
    {
        id: 7,
        title: 'Caregiver Finder',
        kind: 'Design',
        year: null,
        context: 'Product design — Figma prototype',
        summary:
            'Connects families to caregivers by location and by the particular care they need.',
        note:
            'Designed for someone searching under stress, usually on a phone and often late at night. Large targets, short forms, and no step that asks you to remember what you typed two screens ago.',
        technologies: ['Figma', 'Wireframe', 'Prototype', 'High fidelity'],
        liveDemoLink:
            'https://www.figma.com/proto/DGgqTZ4E1DwK7NJI2fyH7a/2M-Joshua-La-Rosa-figma?node-id=157-3&starting-point-node-id=165%3A129&t=uFUXg45X0mUE6Jd6-1',
    },
    {
        id: 8,
        title: 'Construction Supply Storefront',
        kind: 'Design',
        year: null,
        context: 'Product design — Figma prototype',
        summary:
            'Browsing, cart, and checkout for materials sold by weight, length, and bulk.',
        note:
            'Retail checkout patterns break here. A contractor orders forty of one item, not one each of forty, so the quantity field belongs at the center of the product page rather than tucked into a dropdown beside the price.',
        technologies: ['Figma', 'Photoshop', 'Wireframe', 'Prototype'],
    },
    {
        id: 9,
        title: 'Lending System',
        kind: 'Build',
        year: null,
        context: 'Personal project',
        summary:
            'A lending and borrowing platform — accounts, loan terms, and repayment tracking.',
        note:
            'Money makes you careful. Every balance change runs through a single path in the code, so when a number looks wrong there is exactly one place to look.',
        technologies: ['PHP', 'MySQL', 'Tailwind'],
        githubLink: 'https://github.com/Jshgit-hub/LendingWeb.git',
    },
];

export default projects;
