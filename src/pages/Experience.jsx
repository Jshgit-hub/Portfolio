// src/pages/Experience.jsx
import React from 'react';

const experienceData = [
    {
        id: 1,
        title: 'Frontend Engineer (Remote)',
        company: 'Selfbook',
        location: 'US - New York',
        dates: 'Jul 2021 - Present',
        responsibilities: [
            'Developing screens and UI components for the web application using React and Tailwind.',
            'Fixing UI issues and integrating backend APIs with Redux Saga.',
        ],
    },
    {
        id: 2,
        title: 'Software Developer (Remote)',
        company: 'Wavoz',
        location: 'Italy',
        dates: 'Jun 2021 - Present',
        responsibilities: [
            'Developing mobile and web applications using React and React Native.',
            'Developing web scraping bots using Python and Selenium.',
            'Helping with PHP backend tasks and occasionally working with different programming languages.',
            'Consulting on front-end tech stack and integrating multiple external APIs across all platforms.',
        ],
    },
    {
        id: 3,
        title: 'Frontend Engineer (Contractor)',
        company: 'FreeBeige',
        location: '', // No location provided in screenshot, keep empty or remove if not needed
        dates: 'Mar 2021 - Aug 2021',
        responsibilities: [
            'Working on web applications and occasionally leading the development team.',
            'Using React and integrating external APIs with the HIVE blockchain.',
        ],
    },
    {
        id: 4,
        title: 'Frontend Engineer (In Office)',
        company: 'TDF',
        location: 'Algeria',
        dates: 'Feb 2021 - Mar 2021',
        responsibilities: [
            'Made landing pages and web applications collaborating with the back-end engineers of the team.',
            'Convert designs into real world applications and pages using multiple front-end technologies.',
            'Frequently working on e-commerce projects.',
        ],
    },
    {
        id: 5,
        title: 'Frontend Engineer (Freelance)',
        company: 'Upwork',
        location: '', // No location provided
        dates: 'May 2021 - Aug 2021', // Dates from screenshot
        responsibilities: [
            'Successfully completed numerous frontend jobs and high availability projects for clients which all have 5-star ratings and great feedback as well in a short amount of time which led me to get verified on Upwork with an 100% job success and more than 4k$ earnings and top rated badge',
        ],
    },
    {
        id: 6,
        title: 'Software Developer (Remote)',
        company: 'Shoppy',
        location: '', // No location provided
        dates: 'Nov 2018 - Mar 2020', // Dates from screenshot
        responsibilities: [
            'Worked on various client-side dashboard and payment components from designs and site features using Vue and Nuxt alongside integrating backend APIs.',
        ],
    },
];

const Experience = () => {
    return (
        <div className="w-full max-w-5xl py-8  rounded-lg">
            {/* Main Section Title */}
            <h2 className="text-xl md:text-2xl font-bold text-gray-400 uppercase tracking-widest mb-10  md:text-left">
                Experience
            </h2>

            {/* Experience Entries Container */}
            <div className="space-y-10"> {/* Adds vertical space between each experience block */}
                {experienceData.map((job) => (
                    <div key={job.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-start">
                        {/* Dates Column (aligned right on desktop) */}
                        <div className="md:col-span-1 text-left md:text-right">
                            <p className="text-sm text-gray-400 font-medium">{job.dates}</p>
                        </div>

                        {/* Job Details Column (takes up more space) */}
                        <div className="md:col-span-2 text-left">
                            <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                            <p className="text-md text-gray-300 font-medium mb-3">{job.company}{job.location && <span className="text-gray-500"> / {job.location}</span>}</p>
                            <ul className="list-none space-y-2"> {/* Removed default list styling */}
                                {job.responsibilities.map((resp, index) => (
                                    <li key={index} className="text-gray-400 text-sm flex items-start">
                                        <span className="mr-2 text-gray-500 text-lg leading-none">-</span> {/* Custom hyphen */}
                                        {resp}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Experience;