// src/components/SocialLinks.jsx
import React from 'react';
import { SiGmail } from 'react-icons/si';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BsBriefcaseFill } from 'react-icons/bs';

function SocialLinks() {
    const linkBaseClasses = `
      flex items-center px-6 py-3 rounded-lg text-white font-bold text-sm
      transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
      social-link-gradient-base
    `;

    return (
        <div className="flex flex-wrap justify-center gap-5">
            <a
                href="mailto:your.email@gmail.com"
                className={`${linkBaseClasses} social-link-gradient-email`}
            >
                <SiGmail className="mr-2 text-lg text-red-500" /> Gmail
            </a>
            <a
                href="https://www.linkedin.com/in/la-rosa-joshua-570115370/"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBaseClasses} social-link-gradient-linkedin`}
            >
                <FaLinkedin className="mr-2 text-lg text-blue-400" /> LinkedIn
            </a>
            <a
                href="https://upwork.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBaseClasses} social-link-gradient-upwork`}
            >
                <BsBriefcaseFill className="mr-2 text-lg text-green-400" /> Jobstreet
            </a>
            <a
                href="https://github.com/Jshgit-hub"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBaseClasses} social-link-gradient-github`}
            >
                <FaGithub className="mr-2 text-lg" /> Github
            </a>
        </div>
    );
}

export default SocialLinks;
// Note: Replace the href values with your actual profile links.