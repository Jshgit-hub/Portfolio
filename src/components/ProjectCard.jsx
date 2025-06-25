// src/components/ProjectCard.jsx
import React from 'react';

import novocoverImage from '../assets/img/novocover.png';
import lendingcoverImage from '../assets/img/lendingcover.jpeg';
import ekonsultacoverImage from '../assets/img/ekonsultacover.jpeg';
import inventorySystemImage from '../assets/img/noimage.jpeg';
import tradeCoverImage from '../assets/img/TradeCover.jpeg';
import caregiverImage from '../assets/img/Caregiver.jpeg';



const projectImageMap = {
    'novocover.png': novocoverImage,
    'lendingcover.jpeg': lendingcoverImage,
    'ekonsultacover.jpeg': ekonsultacoverImage,
    'noimage.jpeg': inventorySystemImage,
    'TradeCover.jpeg': tradeCoverImage,
    'Caregiver.jpeg': caregiverImage,

};

const ProjectCard = ({ project }) => {

    const imageUrl = projectImageMap[project.image];

    // Improved error handling for missing images (your current design for this)
    if (!imageUrl) {
        console.error(`Image not found for project: "${project.title}". Check filename "${project.image}" in projects.js and its import/mapping in ProjectCard.jsx.`);
        return (
            <div className="rounded-lg shadow-lg w-full p-6 text-center">
                <p className="text-red-500">Image not found for project: {project.title}</p>
                <p className="text-gray-400 text-sm mt-2">Missing file: {project.image}</p>
            </div>
        );
    }

    return (


        <div className="bg-brand rounded-lg w-full  overflow-hidden 
                        transform transition-transform duration-300 hover:scale-[1.02] ">

            <div className="p-3 flex flex-col flex-start md:flex-wrap">



                <div className="relative w-full h-80 bg-cover bg-center"
                    style={{ backgroundImage: `url(${imageUrl})` }}>

                </div>



                <h3 className="text-2xl font-semibold text-white  mb-2">{project.title}</h3>


                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Live Demo and GitHub Links */}
                <div className="flex justify-start items-center gap-4 mt-6">
                    {project.liveDemoLink && (
                        <a
                            href={project.liveDemoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 border border-blue-500 rounded-lg text-blue-300 font-semibold text-sm
                            hover:bg-blue-900/30 transition-colors duration-300"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                            Live demo
                        </a>
                    )}
                    {project.githubLink && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 border border-gray-600 rounded-lg text-gray-300 font-semibold text-sm
                            hover:bg-gray-700/50 transition-colors duration-300"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">

                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.163 6.839 9.48.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.464-1.11-1.464-.908-.618.069-.606.069-.606 1.002.07 1.531 1.029 1.531 1.029.892 1.528 2.341 1.084 2.903.829.091-.645.35-1.085.637-1.336-2.22-.252-4.555-1.11-4.555-4.945 0-1.09.39-1.984 1.029-2.675-.103-.252-.446-1.264.098-2.638 0 0 .84-.268 2.75 1.022.797-.222 1.643-.333 2.486-.337.843.004 1.689.115 2.486.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.374.202 2.386.099 2.638.64.691 1.028 1.585 1.028 2.675 0 3.844-2.339 4.689-4.566 4.935.359.308.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .268.18.579.688.482C20.14 20.165 23 16.419 23 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                            Github
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;