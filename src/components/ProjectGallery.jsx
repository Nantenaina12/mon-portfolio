import projectsData from "../data/projects.json"
import ProjectCard from "./ProjectCard"

export default function ProjectGallery() {
  return (
    <section className="py-16 px-4 bg-gray-50" id="projets">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Mes Projets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}