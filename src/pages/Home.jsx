
import React, { useState, useEffect, useRef } from 'react';


import Project from './Project';
import Contact from './Contact';
import Experience from './Experience';
import CustomCursor from '../components/customCursor';
import ScrollVelocity from '../components/ScrollVelocity';
import BlurText from '../components/BlurText';

import {
    FaPhp,
    FaJs,
    FaPython,
    FaNodeJs,
    FaReact,
    FaBootstrap,
} from 'react-icons/fa';
import {
    SiTailwindcss,
    SiMysql,
    SiVite,
    SiExpress,
} from 'react-icons/si';

// Import the new SocialLinks component
import SocialLinks from '../components/SocialLinks';

const Home = () => {
    const [showProjects, setShowProjects] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showTechstack, setshowTech] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [showHeroSocialLinks, setShowHeroSocialLinks] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const frontendTechs = [
        { name: 'HTML', icon: <FaJs className="text-[#e34c26]" /> },
        { name: 'JavaScript', icon: <FaJs className="text-[#f7df1e]" /> },
        { name: 'React', icon: <FaReact className="text-[#61DAFB]" /> },
        { name: 'TailwindCSS', icon: <SiTailwindcss className="text-[#38BDF8]" /> },
        { name: 'Bootstrap', icon: <FaBootstrap className="text-[#7952B3]" /> },
        { name: 'Vite.js', icon: <SiVite className="text-[#646CFF]" /> },
    ];

    const backendTechs = [
        { name: 'PHP', icon: <FaPhp className="text-[#8892be]" /> },
        { name: 'Python', icon: <FaPython className="text-[#306998]" /> },
        { name: 'Node.js', icon: <FaNodeJs className="text-[#68a063]" /> },
        { name: 'MySQL', icon: <SiMysql className="text-[#00758F]" /> },
        { name: 'Express.js', icon: <SiExpress className="text-gray-300" /> },
    ];

    const resumeFilePath = '/Resume.pdf'; // Path to your resume file

    const handleDownloadResume = () => {
        if (isLoading) return; // Prevent multiple clicks
        setIsLoading(true);

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = resumeFilePath;
            link.setAttribute('download', 'Joshua_Vera_Cruz_La_Rosa_Resume.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsLoading(false);
        }, 2000);
    }

    const heroRef = useRef(null);
    const projectsSectionRef = useRef(null);
    const resumeSectionRef = useRef(null);
    const contactSectionRef = useRef(null);
    const experienceSectionRef = useRef(null);
    const TechStackSectionRef = useRef(null);




    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            const heroBottom = heroRef.current ? heroRef.current.offsetTop + heroRef.current.offsetHeight : 0;
            const projectsThreshold = heroBottom - (viewportHeight * 0.5);

            const showTechstackThreshold = heroBottom - (viewportHeight * 0.5);


            const projectsSectionBottom = projectsSectionRef.current ? projectsSectionRef.current.offsetTop + projectsSectionRef.current.offsetHeight : 0;
            const experienceThreshold = projectsSectionBottom - (viewportHeight * 0.5);

            const experienceSectionBottom = experienceSectionRef.current ? experienceSectionRef.current.offsetTop + experienceSectionRef.current.offsetHeight : 0;
            const resumeThreshold = experienceSectionBottom - (viewportHeight * 0.5);

            const resumeSectionBottom = resumeSectionRef.current ? resumeSectionRef.current.offsetTop + resumeSectionRef.current.offsetHeight : 0;
            const contactThreshold = resumeSectionBottom - (viewportHeight * 0.5);


            // --- Reveal Logic ---

            // Reveal Projects
            if (scrollY > heroBottom && !showTechstack) {
                setshowTech(true); o
            }

            if (scrollY > showTechstackThreshold && !showTechstack) {
                setshowTech(true);
            }

            if (scrollY > projectsThreshold && !showProjects) {
                setShowProjects(true);
                setShowHeroSocialLinks(true);
            }


            if (showProjects && scrollY > experienceThreshold && !showExperience) {
                setShowExperience(true);
            }


            if (showExperience && scrollY > resumeThreshold && !showResume) {
                setShowResume(true);
            }

            // Reveal Contact
            // This ensures Contact only reveals after Resume has started showing
            if (showResume && scrollY > contactThreshold && !showContact) {
                setShowContact(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showProjects, showResume, showContact, showTechstack, showExperience, showHeroSocialLinks]);


    const scrollToFirstReveal = () => {
        setShowProjects(true);
        setShowHeroSocialLinks(true);

        setTimeout(() => {
            projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };




    return (

        <div className="relative min-h-screen bg-brand text-gray-400">

            <CustomCursor />

            <section id='home' ref={heroRef} className="flex flex-col py-16 font-montserrat bg-brand items-start relative">
                <BlurText
                    text="Hi I'm"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="mt-5 justify-start text-xl md:text-2xl"
                />

                <BlurText
                    text="Joshua Vera Cruz La Rosa"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-4xl md:text-6xl font-extrabold text-white mb-4 "
                />

                <BlurText
                    text=" A passionate front-end developer with a strong foundation in backend development. I specialize in building responsive and user-friendly web interfaces using React, Tailwind CSS, and JavaScript. I also create full-stack solutions with PHP and MySQL, bringing functionality and design together. I’m always eager to learn new technologies and deliver clean, efficient, and impactful web experiences."
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-md text-gray-300 justify-start leading-relaxed"
                />


                <button
                    className={`p-3 ml-3 rounded-md mt-5 bg-gradient-to-r from-purple-500 via-blue-400 to-pink-400 bg-[length:300%_300%] text-white font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                    onClick={handleDownloadResume}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg
                                className="w-5 h-5 animate-spin text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 01-8 8z"
                                />
                            </svg>
                            Downloading...
                        </>
                    ) : (
                        'Download My Resume'
                    )}
                </button>


                {/* The Scroll Indicator (Down Arrow) */}
                <div
                    className="absolute bottom-1 sm:bottom-8 right-10 text-5xl cursor-pointer text-blue-400 animate-bounce-slow"
                    onClick={scrollToFirstReveal}
                >
                    ↓
                </div>
            </section>

            {/* Social Links - FIXED at bottom of hero, controlled by showHeroSocialLinks */}
            <div
                className={`hidden sm:fixed sm:bottom-6 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:flex sm:flex-wrap sm:justify-center sm:items-center sm:gap-4 sm:px-4 sm:transition-all sm:duration-700 sm:ease-out z-10 ${showHeroSocialLinks ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100'
                    }`}
            >
                <SocialLinks />
            </div>

            {/*  */}
            <div
                ref={TechStackSectionRef}
                className={`transition-all duration-1000 ease-out ${showTechstack ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <section id="techstack" className="py-24 text-white">
                    <h2 className="text-4xl md:text-5xl font-extrabold uppercase tracking-widest mb-20">
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            My TechStack
                        </span>
                    </h2>

                    {/* FRONTEND */}
                    <div className="items-center">
                        <h3 className="text-2xl font-semibold text-start uppercase tracking-wide mb-8 text-cyan-400">
                            Frontend
                        </h3>
                        <ScrollVelocity
                            texts={[
                                <div className="flex space-x-6 px-4">
                                    {frontendTechs.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="min-w-[160px] px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-md flex items-center justify-center gap-3 hover:bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:shadow-lg transition-all duration-300"
                                        >
                                            <span className="text-3xl">{tech.icon}</span>
                                            <span className="text-base font-medium text-white">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>,
                            ]}
                            velocity={70}
                            numCopies={4}
                            className="items-center"
                        />
                    </div>

                    {/* BACKEND */}
                    <div>
                        <h3 className="text-2xl  font-semibold text-start uppercase tracking-wide mb-8 text-purple-400">
                            Backend
                        </h3>
                        <ScrollVelocity
                            texts={[
                                <div className="flex space-x-6 px-4">
                                    {backendTechs.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="min-w-[160px] px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-md flex items-center justify-center gap-3 hover:bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 hover:shadow-lg transition-all duration-300"
                                        >
                                            <span className="text-3xl">{tech.icon}</span>
                                            <span className="text-base font-medium text-white">{tech.name}</span>
                                        </div>
                                    ))}
                                </div>,
                            ]}
                            velocity={70}
                            numCopies={4}
                            className="items-center"
                        />
                    </div>
                </section>


            </div>


            {/* Projects Section */}
            <div
                ref={projectsSectionRef}
                className={`transition-all duration-1000 ease-out ${showProjects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <section id='projects' className=" min-h-screen flex items-center justify-center">
                    <Project />
                </section>
            </div>

            <div
                ref={experienceSectionRef}
                className={`transition-all duration-1000 ease-out ${showExperience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <section id='experience' className="py-12  min-h-screen flex">
                    <Experience />
                </section>
            </div>

            {/* Resume Section */}
            {/*   <div
                ref={resumeSectionRef}
                className={`transition-all duration-1000 ease-out ${showResume ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <section className="py-12 px-8 min-h-screen flex items-center justify-center">
                    <Resume />
                </section>
            </div> */}

            {/* Contact Section */}
            <div
                ref={contactSectionRef}
                className={`transition-all duration-1000 ease-out ${showContact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <section id='contact' className="py-12 px-8 flex items-center justify-center">
                    <Contact />
                </section>
            </div>

            {/* This extra div ensures there's enough scrollable space */}
            {/* <div className="h-[150vh]"></div> */}
        </div>
    );
}

export default Home;