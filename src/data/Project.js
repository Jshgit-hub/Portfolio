// src/data/Project.js
// Ordered by weight, not by date. Current production work leads; the school
// projects sit at the bottom where they belong now.
//
// No screenshots — entries are text only. An entry with neither `githubLink`
// nor `liveDemoLink` renders an "on request" line instead of a link.
const projects = [
    {
        id: 1,
        title: 'Internal Finance System',
        kind: 'Build',
        year: null,
        context: 'InsBOSS USA — remote',
        summary:
            'Payment requests and internal financial workflows: who may ask, who approves, and what happens at every step in between.',
        note:
            'Approvals used to travel by email and spreadsheet, and a request could sit for days in the wrong inbox. I built this to MVP scope on purpose — data models and role-based access first, then the approval logic, then the webhooks and routing that move a request along on its own. I wrote that workflow by hand instead of assembling it in a form plugin, which is why the conditional paths do exactly what the finance team asked for and nothing else. The hand-offs and re-keying are gone, and a payment can no longer change state without leaving a record of who changed it.',
        technologies: ['PHP', 'WordPress', 'Webhooks', 'Tailwind', 'MySQL'],
    },
    {
        id: 2,
        title: 'Subscription & Billing Platform',
        kind: 'Maintain',
        year: null,
        context: 'InsBOSS USA — remote',
        summary:
            'The WooCommerce platform behind client payment processing — billing, renewals, and the linked sites that depend on it.',
        note:
            'Most of this work is billing discrepancies, and they are almost never where the ticket says they are. Tracing each one back to the plugin behavior that caused it, instead of correcting invoices by hand, brought the repeat reports down and kept client accounts reconciled. Performance is measured rather than guessed at, and the SOPs I wrote mean the next person to open the same ticket does not have to rediscover the trail.',
        technologies: ['WooCommerce', 'WordPress', 'PHP', 'Zoho', 'Elementor'],
    },
    {
        id: 3,
        title: 'Ekonsulta Patient Management',
        kind: 'Build',
        year: '2025',
        context: 'Wesleyan University Hospital — internship',
        summary:
            'Appointments, prescriptions, and medical records for doctors, staff, and patients, replacing a system the hospital had outgrown.',
        note:
            'The interface was never the hard part. The hard part was merging a legacy patient database into the new one without losing or duplicating a single record. I wrote the migration, built the REST endpoints the two systems spoke through, and covered the intake forms with Cypress tests so a bad save could not slip through on a busy shift.',
        technologies: ['React', 'Express', 'MySQL', 'Tailwind', 'Context API', 'Cypress'],
        githubLink: 'https://github.com/BeeRidge/wup-project.git',
    },
    {
        id: 4,
        title: 'NovoCamera',
        kind: 'Build',
        year: '2024',
        context: 'Capstone — Nueva Ecija tourism',
        summary:
            'A travel site for the province: hotels, restaurants, and attractions on an interactive map, with posts so visitors can add what they found.',
        note:
            'Built before I had React — plain PHP, JavaScript, and MySQL, with Ajax handling the map filtering so the page never reloaded while you browsed. It taught me exactly what a framework saves you from, which is the sort of thing you only learn by doing it the long way first.',
        technologies: ['PHP', 'JavaScript', 'Ajax', 'MySQL', 'Bootstrap'],
        githubLink: 'https://github.com/Jshgit-hub/NovoCamera.git',
    },
    {
        id: 5,
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
    {
        id: 6,
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
        id: 7,
        title: 'Construction Supply Storefront',
        kind: 'Design',
        year: null,
        context: 'Product design — Figma prototype',
        summary:
            'Browsing, cart, and checkout for construction materials sold by weight, length, and bulk quantity.',
        note:
            'Retail checkout patterns break here. A contractor orders forty of one item, not one each of forty, so the quantity field belongs at the center of the product page rather than tucked into a dropdown beside the price.',
        technologies: ['Figma', 'Photoshop', 'Wireframe', 'Prototype'],
    },
];

export default projects;
