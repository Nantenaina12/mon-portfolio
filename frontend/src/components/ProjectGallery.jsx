import { useState, useEffect } from 'react'
import { getProjects } from '../utils/api'
import ProjectCard from "./ProjectCard"
import FilterBar from "./FilterBar"

export default function ProjectGallery() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  // Récupérer les projets depuis l'API
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
      setError('')
    } catch (err) {
      setError(err.message || 'Erreur de chargement')
    } finally {
      setLoading(false)
    }
  }

  // Tags uniques
  const allTags = [...new Set(projects.flatMap(p => p.tags || []))]
  
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.tags && p.tags.includes(activeFilter))

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800" id="projets">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500 dark:text-gray-400">Chargement des projets...</p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800" id="projets">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500">❌ {error}</p>
          <button onClick={loadProjects} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
            Réessayer
          </button>
        </div>
      </section>
    )
  }

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