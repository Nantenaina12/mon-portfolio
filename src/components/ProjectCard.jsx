import { Link } from 'react-router-dom'
import { carto, chrono, vecteur, ndvi, occup, meteo } from '../assets/images'

const images = {
  carto: carto,
  chrono: chrono,
  vecteur: vecteur,
  ndvi: ndvi,
  occup: occup,
  meteo: meteo
}

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
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
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <Link 
          to={`/project/${project.id}`}
          className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium inline-block"
        >
          Voir les détails →
        </Link>
      </div>
    </div>
  )
}