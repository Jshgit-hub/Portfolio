// src/pages/Contact.jsx
import React from 'react';
import SocialLinks from '../components/SocialLinks'; // <--- NEW IMPORT

export default function Contact() {
    return (
        <div className="w-full max-w-5xl mx-auto p-4 text-center">
            <h2 className="text-4   xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-10 tracking-widest">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    Get in Touch
                </span>
            </h2>
            <p className="text-lg mb-8">
                I'm always open to new opportunities and collaborations. Feel free to reach out!
            </p>

            {/* Add your contact form or other direct contact info here */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
                <a href="mailto:joshua@example.com" className="text-blue-400 hover:underline">1114joshuafeliciano@Gmail.com</a>
                <a href="tel:+1234567890" className="text-blue-400 hover:underline">+63 963 759 5816</a>
            </div>


            <div className="mt-12">
                <SocialLinks />
            </div>
        </div>
    );
}