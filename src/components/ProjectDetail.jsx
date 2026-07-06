import { useParams, Link } from 'react-router-dom'
import projectsData from '../data/projects.json'
import { carto, chrono, vecteur, ndvi, occup, meteo } from '../assets/images'

const images = {
  carto: carto,
  chrono: chrono,
  vecteur: vecteur,
  ndvi: ndvi,
  occup: occup,
  meteo: meteo
}

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projectsData.find(p => p.id === parseInt(id))

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Projet non trouvé</h2>
          <Link to="/" className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mt-4 inline-block">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 mt-11 inline-block">
          ← Retour aux projets
        </Link>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {project.imageName && images[project.imageName] ? (
              <img 
                src={images[project.imageName]} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400 dark:text-gray-500">Image du projet</span>
            )}
          </div>
          
          <div className="p-8">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{project.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag, index) => (
                <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Description</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {project.detailedDescription || project.description}
              </p>
            </div>
            
            {project.objectives && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Objectifs</h2>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                  {project.objectives.map((objective, index) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 dark:bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition"
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