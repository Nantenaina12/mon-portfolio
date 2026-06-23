import { useParams, Link } from 'react-router-dom'
import projectsData from '../data/projects.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projectsData.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Projet non trouvé</h2>
          <Link to="/" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-500 hover:text-blue-700 mb-6 mt-11 inline-block">
          ← Retour aux projets
        </Link>
        
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Image principale */}
          <div className="h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-400">Aucune image</span>
        )}
      </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Description détaillée */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>
            
            {/* Objectifs */}
            {project.objectives && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Objectifs</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {project.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Technologies */}
            {project.technologies && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">Technologies utilisées</h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Lien vers le projet */}
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                Voir le projet en ligne →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}