import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Resume = () => {
    const [isLoading, setIsLoading] = useState(false);
    const resumeFilePath = '/Resume.pdf';

    // Smooth glowing cursor
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springX = useSpring(cursorX, { stiffness: 100, damping: 20 });
    const springY = useSpring(cursorY, { stiffness: 100, damping: 20 });

    const [sparkles, setSparkles] = useState([]);

    const handleDownloadResume = () => {
        if (isLoading) return;
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
    };

    useEffect(() => {
        const move = (e) => {
            cursorX.set(e.clientX - 50);
            cursorY.set(e.clientY - 50);
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [cursorX, cursorY]);

    useEffect(() => {
        const sparkArray = Array.from({ length: 6 }).map(() => ({
            x: Math.random() * 100 + '%',
            delay: Math.random() * 3,
            duration: 5 + Math.random() * 2,
        }));
        setSparkles(sparkArray);
    }, []);

    return (
        <section className="relative w-full min-h-screen py-24 px-6 bg-brand text-white overflow-hidden flex flex-col items-center justify-center">

            {/* ✅ Floating Glow Cursor */}
            <motion.div
                className="fixed w-24 h-24 rounded-full bg-cyan-400/10 border border-cyan-300 blur-2xl pointer-events-none z-[9999]"
                style={{
                    x: springX,
                    y: springY,
                }}
            />

            {/* ✨ Sparkle Background */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                {sparkles.map((s, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-[4px] h-[4px] bg-cyan-300 rounded-full"
                        initial={{ y: 0, opacity: 0 }}
                        animate={{ y: [0, 600], opacity: [0, 0.6, 0] }}
                        transition={{
                            repeat: Infinity,
                            delay: s.delay,
                            duration: s.duration,
                            ease: 'easeInOut',
                        }}
                        style={{ left: s.x, top: '0%' }}
                    />
                ))}
            </div>

            {/* Content */}
            <motion.div
                className="relative z-10 text-center max-w-3xl"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <motion.h2
                    className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mb-6 tracking-tight"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    Need My Full Resume?
                </motion.h2>

                <motion.p
                    className="text-gray-300 text-lg mb-12"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    Hover around this area to activate the experience. Click the glowing button below to get the PDF resume instantly.
                </motion.p>

                <motion.button
                    onClick={handleDownloadResume}
                    disabled={isLoading}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
            relative px-10 py-4 rounded-full text-lg font-semibold tracking-wide overflow-hidden group z-10
            ${isLoading
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'}
            before:absolute before:inset-0 before:rounded-full
            before:bg-gradient-to-r before:from-cyan-500 before:to-purple-500
            before:opacity-0 group-hover:before:opacity-10
            before:transition-opacity before:duration-500
          `}
                >
                    {isLoading ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Downloading...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <svg className="w-6 h-6 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download Resume
                        </span>
                    )}
                </motion.button>
            </motion.div>
        </section>
    );
};

export default Resume;
