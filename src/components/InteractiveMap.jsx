import projectsData from "../data/projects.json"

export default function InteractiveMap() {
  const projectsWithCoords = projectsData.filter(p => p.coordinates && p.coordinates[0] !== 0)
  
  return (
    <section className="py-16 px-4 bg-white dark:bg-gray-900 pt-20 md:pt-16" id="carte">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Localisation de mes projets</h2>
        
        {projectsWithCoords.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              🗺️ Aucun projet avec coordonnées pour l'instant
            </p>
            <div className="mt-4 text-sm text-gray-400 dark:text-gray-500">
              Exemple : "coordinates": [48.8566, 2.3522] pour Paris
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsWithCoords.map((project) => (
              <div key={project.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 dark:bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      📍 {project.coordinates[0]}, {project.coordinates[1]}
                    </p>
                    <a 
                      href={`https://www.google.com/maps?q=${project.coordinates[0]},${project.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Voir sur Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}