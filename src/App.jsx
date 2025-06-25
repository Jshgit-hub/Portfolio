import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Projects from "./pages/Project";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Layout from "./theme/Layout";
import Experience from "./pages/Experience";
import { inject } from '@vercel/analytics';

inject();



export default function App() {
  return (
    <div className="bg-brand text-white min-h-screen">

      <Layout>
        <Navbar />
        <main className="p-4 max-w-5xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </Layout>
    </div>

  );
}
