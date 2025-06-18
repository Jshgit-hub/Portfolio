import projects from "../data/Project";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
    return (
        <section className="py-10">
            <h2 className="text-3xl font-semibold mb-6">My Projects</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
}
