// src/pages/resume.jsx
import React, { useState, useEffect } from 'react';

// You can create a data file for your resume highlights if it gets too long
// For now, we'll put them directly here for simplicity
const resumeHighlights = {
    skills: [
        { name: 'React.js', level: '95%' },
        { name: 'Tailwind CSS', level: '90%' },
        { name: 'JavaScript (ES6+)', level: '90%' },
        { name: 'Node.js', level: '70%' },
        { name: 'PHP', level: '80%' },
        { name: 'MySQL', level: '85%' },
        { name: 'Vue.js', level: '75%' },
        // Add more skills as needed
    ],
    education: [
        {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Example',
            years: '2018 - 2022',
        },
        // Add more education entries if applicable
    ],
    experienceSummary: [
        'Developed responsive and user-friendly web interfaces using React and Tailwind CSS.',
        'Created full-stack solutions with PHP and MySQL, integrating design and functionality.',
        'Contributed to the development of mobile and web applications with React Native.',
        'Successfully completed numerous freelance projects with 5-star ratings on Upwork.',
    ],
};

const Resume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(false); // State to animate content appearance

    // Assuming your PDF is directly in the 'public' folder.
    const resumeFilePath = '/resume.pdf'; // Make sure this path is correct!

    useEffect(() => {
        // Trigger content animation shortly after the component mounts (or is revealed by Home.jsx)
        const timer = setTimeout(() => {
            setShowContent(true);
        }, 300); // Small delay for content to fade in after section itself appears

        return () => clearTimeout(timer);
    }, []);

    const handleDownloadResume = () => {
        if (isLoading) return;

        setIsLoading(true);

        // Simulate a network request or processing time for a more realistic feel
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = resumeFilePath;
            link.setAttribute('download', 'Joshua_Vera_Cruz_La_Rosa_Resume.pdf'); // Suggest a filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setIsLoading(false);
        }, 2000); // 2-second delay for the "amazing" download effect
    };

    return (
        <div className="w-full max-w-4xl p-8 bg-gray-800 rounded-lg shadow-lg text-center flex flex-col items-center justify-center min-h-[70vh]">
            <h2 className="text-4xl font-bold text-white mb-8">My Resume</h2>

            <div className={`transition-opacity duration-1000 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'} w-full`}>
                {/* Section 1: Skills */}
                <div className="mb-10 text-left">
                    <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.286L12 21l-2.286-6.857L3 12l5.714-2.286L12 3z"></path>
                        </svg>
                        Skills
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resumeHighlights.skills.map((skill, index) => (
                            <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                                <span className="text-gray-200 font-medium">{skill.name}</span>
                                {/* Optional: Progress bar visual for skills */}
                                <div className="w-2/5 bg-gray-600 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                                        style={{ width: showContent ? skill.level : '0%' }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section 2: Education */}
                <div className="mb-10 text-left">
                    <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.208 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.792 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.792 5 16.5 5s3.332.477 4.5 1.253v13C19.832 18.477 18.208 18 16.5 18s-3.332.477-4.5 1.253"></path>
                        </svg>
                        Education
                    </h3>
                    {resumeHighlights.education.map((edu, index) => (
                        <div key={index} className="mb-3">
                            <p className="text-lg text-gray-200 font-medium">{edu.degree}</p>
                            <p className="text-md text-gray-400">{edu.institution} | {edu.years}</p>
                        </div>
                    ))}
                </div>

                {/* Section 3: Experience Summary */}
                <div className="mb-12 text-left">
                    <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
                        <svg className="w-6 h-6 mr-2 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-1.04-9-2.745M12 9V7.5a2.25 2.25 0 014.5 0V9m0 0V9.75a2.25 2.25 0 01-4.5 0V9m0 0V7.5a2.25 2.25 0 014.5 0V9m0 0v.75a2.25 2.25 0 01-4.5 0V9m0 0V7.5a2.25 2.25 0 014.5 0V9m0 0v.75a2.25 2.25 0 01-4.5 0V9"></path>
                        </svg>
                        Key Contributions
                    </h3>
                    <ul className="list-none space-y-2">
                        {resumeHighlights.experienceSummary.map((item, index) => (
                            <li key={index} className="text-gray-400 text-base flex items-start">
                                <span className="mr-2 text-gray-500 text-lg leading-none">-</span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* The Amazing Download Button */}
            <button
                onClick={handleDownloadResume}
                disabled={isLoading}
                className={`
                    relative px-10 py-4 rounded-full text-xl font-bold tracking-wide
                    transition-all duration-300 ease-in-out transform
                    focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-70
                    group // Tailwind group for more complex hover effects
                    overflow-hidden // To hide the background gradient spill
                    z-10 // Ensure it's above other elements if needed
                    ${isLoading
                        ? 'bg-gray-700 text-gray-400 border-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent'
                    }
                    ${!isLoading && 'hover:from-blue-700 hover:to-purple-700 hover:scale-105 active:scale-95'}
                    // Background hover glow
                    before:content-[""] before:absolute before:inset-0 before:bg-gradient-to-r from-blue-400 to-purple-400
                    before:opacity-0 before:transition-opacity before:duration-500 before:rounded-full
                    ${!isLoading && 'group-hover:before:opacity-100 group-hover:before:blur-lg'}
                    // Inner "fake" border on hover
                    after:content-[""] after:absolute after:inset-0 after:rounded-full after:border-2
                    after:border-transparent after:transition-all after:duration-300 after:ease-out
                    ${!isLoading && 'group-hover:after:border-blue-500 group-hover:after:scale-105'}
                `}
            >
                {/* Content for the button */}
                {isLoading ? (
                    <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-4 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="relative z-10">Downloading...</span> {/* Added relative z-10 */}
                    </span>
                ) : (
                    <span className="flex items-center justify-center">
                        {/* Download Icon */}
                        <svg className="w-7 h-7 mr-3 text-white group-hover:animate-bounce-y-slight" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        <span className="relative z-10">Download My Full Resume</span> {/* Added relative z-10 */}
                    </span>
                )}
            </button>

            {/* Optional: Small note below the button */}
            {!isLoading && (
                <p className="mt-4 text-sm text-gray-500">
                    (Your comprehensive resume will be downloaded as a PDF)
                </p>
            )}
        </div>
    );
};

export default Resume;