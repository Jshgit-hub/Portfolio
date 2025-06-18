// src/components/SocialLinks.jsx
import React from 'react';

function SocialLinks() {
    const linkBaseClasses = `
    flex items-center px-6 py-3 rounded-lg text-white font-bold text-sm
    transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
    social-link-gradient-base
  `;

    return (
        <div className="flex flex-wrap justify-center gap-5">
            <a
                href="mailto:your.email@example.com"
                className={`${linkBaseClasses} social-link-gradient-email`}
            >
                <span className="mr-2 text-lg">✉️</span> Send an email
            </a>
            <a
                href="https://linkedin.com/in/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBaseClasses} social-link-gradient-linkedin`}
            >
                <span className="mr-2 text-lg">in</span> LinkedIn
            </a>
            <a
                href="https://upwork.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBaseClasses} social-link-gradient-upwork`}
            >
                <span className="mr-2 text-lg">up</span> Upwork
            </a>
            <a
                href="https://github.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className={`${linkBaseClasses} social-link-gradient-github`}
            >
                <span className="mr-2 text-lg">🐙</span> Github
            </a>
        </div>
    );
}

export default SocialLinks;