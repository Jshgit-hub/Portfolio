// src/pages/Home.jsx
import React, { useState, useEffect, useRef } from 'react';

// Import your actual page components
import Project from './Project';
import Contact from './Contact';
import Experience from './Experience'; // Assuming you have an Experience component
import CustomCursor from '../components/customCursor';

// Import the new SocialLinks component
import SocialLinks from '../components/SocialLinks';

const Home = () => {
    const [showProjects, setShowProjects] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const [showExperience, setShowExperience] = useState(false);
    const [showHeroSocialLinks, setShowHeroSocialLinks] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        }, 2000); // Simulate a delay for the download
    }

    const heroRef = useRef(null);
    const projectsSectionRef = useRef(null);
    const resumeSectionRef = useRef(null);
    const contactSectionRef = useRef(null);
    const experienceSectionRef = useRef(null);


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;

            const heroBottom = heroRef.current ? heroRef.current.offsetTop + heroRef.current.offsetHeight : 0;
            const projectsThreshold = heroBottom - (viewportHeight * 0.5); // Reveal Projects when hero is halfway out

            const projectsSectionBottom = projectsSectionRef.current ? projectsSectionRef.current.offsetTop + projectsSectionRef.current.offsetHeight : 0;
            const experienceThreshold = projectsSectionBottom - (viewportHeight * 0.5); // Reveal Experience when projects is halfway out

            const experienceSectionBottom = experienceSectionRef.current ? experienceSectionRef.current.offsetTop + experienceSectionRef.current.offsetHeight : 0;
            const resumeThreshold = experienceSectionBottom - (viewportHeight * 0.5); // Reveal Resume when experience is halfway out

            const resumeSectionBottom = resumeSectionRef.current ? resumeSectionRef.current.offsetTop + resumeSectionRef.current.offsetHeight : 0;
            const contactThreshold = resumeSectionBottom - (viewportHeight * 0.5); // Reveal Contact when resume is halfway out


            // --- Reveal Logic ---

            // Reveal Projects
            if (scrollY > projectsThreshold && !showProjects) {
                setShowProjects(true);
                setShowHeroSocialLinks(true); // Hide hero social links once we scroll past hero
            }

            // Reveal Experience
            // This ensures Experience only reveals after Projects has started showing
            if (showProjects && scrollY > experienceThreshold && !showExperience) {
                setShowExperience(true);
            }

            // Reveal Resume
            // This ensures Resume only reveals after Experience has started showing
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
    }, [showProjects, showResume, showContact, showExperience, showHeroSocialLinks]);



    const scrollToFirstReveal = () => {
        // When clicking the down arrow, set projects to true and hide hero social links
        setShowProjects(true);
        setShowHeroSocialLinks(true);
        // Then scroll smoothly to the projects section
        setTimeout(() => {
            projectsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Small delay to allow state update to apply before scroll
    };




    return (

        <div className="relative min-h-screen bg-brand text-gray-400">

            <CustomCursor />

            <section id='home' ref={heroRef} className="flex flex-col py-16 font-montserrat bg-brand items-start relative">
                <p className="mt-5 justify-start text-xl md:text-2xl">Hi, I'm</p>
                <h2 className="text-4xl justify-start md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 via-blue-400 to-pink-400 bg-[length:300%_300%] animate-gradient bg-clip-text text-transparent mb-4">
                    Joshua Vera Cruz La Rosa
                </h2>
                <p className="text-md text-gray-300 justify-start leading-relaxed">
                    Hi! I’m Joshua Vera Cruz La Rosa, a passionate frontend developer with a strong foundation in backend development. I specialize in building responsive and user-friendly web interfaces using React, Tailwind CSS, and JavaScript. I also create full-stack solutions with PHP and MySQL, bringing functionality and design together. I’m always eager to learn new technologies and deliver clean, efficient, and impactful web experiences.
                </p>

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
                className={`fixed bottom-10 mx-2 justify-start sm:justify-center flex gap-5 transition-all duration-1000 ease-out z-10
                ${showHeroSocialLinks ? 'opacity-0 translate-y-12 pointer-events-none' : 'opacity-100'}`}
            >
                <SocialLinks />
            </div>

            {/* Projects Section */}
            <div
                ref={projectsSectionRef}
                className={`transition-all duration-1000 ease-out ${showProjects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12 pointer-events-none'}`}
            >
                <section id='projects' className="py-12 min-h-screen flex items-center justify-center">
                    <Project />
                </section>
            </div>

            {/* Experience Section - Now correctly linked to showExperience state */}
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
                <section id='contact' className="py-12 px-8 min-h-screen flex items-center justify-center">
                    <Contact />
                </section>
            </div>

            {/* This extra div ensures there's enough scrollable space */}
            {/* <div className="h-[150vh]"></div> */}
        </div>
    );
}

export default Home;