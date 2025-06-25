import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const experienceData = [
    {
        id: 1,
        title: 'Full Stack Developer',
        company: 'Capstone',
        location: 'Cabanatuan Nueva Ecija, Philippines',
        dates: 'January 2024 - November 2024',
        responsibilities: [
            'Developing a tourism website with mapping features and highly interactive UI, and it has posting features for users to share their experiences. It is built using PHP, Javascript, and MySQL.',
        ],
    },
    {
        id: 2,
        title: 'Full Stack Developer Intern',
        company: 'Wesleyan University Philippines Hospital',
        location: 'Cabanatuan Nueva Ecija, Philippines',
        dates: 'January 2025 - May 2025',
        responsibilities: [
            'Assisted in designing and developing an e-Konsulta Patient Management System to streamline outpatient consultations.',
            'Helped transition manual transactions into a systematic digital process, allowing staff to access patient overviews and manage records more efficiently.',
            'Developing apis for the e-Konsulta Patient Management System using Express.js and MySQL.',
        ],
    },
];

const Experience = () => {
    const sectionRef = useRef(null);
    const itemRefs = useRef([]);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    const saberY = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1200]), // Adjust 1200 to your section height
        { stiffness: 80, damping: 20 }
    );

    const [revealStates, setRevealStates] = useState(
        Array(experienceData.length).fill(false)
    );

    useEffect(() => {
        const unsubscribe = saberY.on('change', (yValue) => {
            itemRefs.current.forEach((el, index) => {
                if (!revealStates[index] && el) {
                    const offsetTop =
                        el.getBoundingClientRect().top -
                        sectionRef.current.getBoundingClientRect().top;
                    if (yValue > offsetTop - 100) {
                        setRevealStates((prev) => {
                            const updated = [...prev];
                            updated[index] = true;
                            return updated;
                        });
                    }
                }
            });
        });
        return () => unsubscribe();
    }, [saberY, revealStates]);

    return (
        <section
            ref={sectionRef}
            className="relative bg-brand py-28 px-4 text-white overflow-hidden"
        >
            <div className="max-w-5xl mx-auto relative">
                {/* Title */}
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-10 tracking-widest">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                        Experience
                    </span>
                </h2>


                <div className="hidden sm:block md:block absolute top-0 left-1/2 -translate-x-1/2 w-[3px] h-full z-10">
                    <motion.div
                        style={{ height: saberY }}
                        className="w-full  bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-500 rounded-full shadow-[0_0_30px_#00f2fe88]"
                    />
                    {/*  <motion.div
                        style={{ y: saberY }}
                        className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-white via-cyan-400 to-purple-500 rounded-full shadow-[0_0_40px_10px_rgba(0,242,254,0.6)]"
                    /> */}
                </div>

                <div className="space-y-28 relative z-20">
                    {experienceData.map((job, index) => (
                        <div
                            key={job.id}
                            ref={(el) => (itemRefs.current[index] = el)}
                            className={`flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                } items-center md:items-start gap-10 transition-all duration-700 ease-in-out ${revealStates[index]
                                    ? 'opacity-100 translate-y-0'
                                    : 'opacity-0 translate-y-10 pointer-events-none'
                                }`}
                        >
                            <div className="w-full md:w-1/2 text-right sm:text-center px-4">
                                <p className="text-sm text-cyan-300 mb-1 tracking-wider">
                                    {job.dates}
                                </p>
                                <h3 className="text-2xl font-bold text-white mb-1">
                                    {job.title}
                                </h3>
                                <p className="text-md text-gray-300 mb-3 font-medium">
                                    {job.company} /{' '}
                                    <span className="text-gray-500">{job.location}</span>
                                </p>
                                <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                                    {job.responsibilities.map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
