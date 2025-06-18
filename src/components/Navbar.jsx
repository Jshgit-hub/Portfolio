import React, { useState } from "react";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    return (
        <nav className="bg-brand font-montserrat text-white px-6 py-4 items-center flex justify-between relative">
            <div className="text-2xl font-bold ">Joshua</div>
            <div className="hidden md:flex gap-8">
                <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
                <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
                <a href="#resume" className="hover:text-cyan-400 transition-colors">Resume</a>
                <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
            <button
                className="md:hidden flex flex-col gap-1"
                onClick={() => setOpen(!open)}
                aria-label="Toggle Menu"
            >
                <span className="w-7 h-1 bg-white rounded"></span>
                <span className="w-7 h-1 bg-white rounded"></span>
                <span className="w-7 h-1 bg-white rounded"></span>
            </button>
            <div
                className={`absolute top-full left-0 w-full bg-brand flex flex-col items-center gap-6 py-6 md:hidden z-50
                transition-all duration-300 ease-in-out
                ${open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"}`}
            >
                <a href="#home" className="hover:text-cyan-400" onClick={() => setOpen(false)}>Home</a>
                <a href="#projects" className="hover:text-cyan-400" onClick={() => setOpen(false)}>Projects</a>
                <a href="#resume" className="hover:text-cyan-400" onClick={() => setOpen(false)}>Resume</a>
                <a href="#contact" className="hover:text-cyan-400" onClick={() => setOpen(false)}>Contact</a>
            </div>
        </nav>
    );
};

export default Navbar;