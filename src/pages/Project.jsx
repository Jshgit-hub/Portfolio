import projects from "../data/Project";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
    return (
        <section className="py-10">
            <h2 className="text-5xl font-extrabold  uppercase mb-10 tracking-widest">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                    My Projects
                </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
