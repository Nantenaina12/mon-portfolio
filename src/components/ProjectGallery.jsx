import { useState } from 'react'
import projectsData from "../data/projects.json"
import ProjectCard from "./ProjectCard"
import FilterBar from "./FilterBar"

export default function ProjectGallery() {
  const allTags = [...new Set(projectsData.flatMap(p => p.tags))]
  const [activeFilter, setActiveFilter] = useState('all')
  
  const filteredProjects = activeFilter === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.tags.includes(activeFilter))

  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 pt-20 md:pt-16" id="projets">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Mes Projets</h2>
        
        <FilterBar 
          tags={allTags}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Aucun projet trouvé pour le tag "{activeFilter}"</p>
          </div>
        )}
      </div>
    </section>
  )
}