export default function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Zone de l'image modifiée */}
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
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        {project.link && (
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
          >
            Voir le projet →
          </a>
        )}
      </div>
    </div>
  )
}