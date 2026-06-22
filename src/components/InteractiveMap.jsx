import projectsData from "../data/projects.json"

export default function InteractiveMap() {
  // Filtrer les projets qui ont des coordonnées
  const projectsWithCoords = projectsData.filter(p => p.coordinates && p.coordinates[0] !== 0)
  
  return (
    <section className="py-16 px-4 bg-gray-100" id="carte">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Localisation de mes projets</h2>
        
        {projectsWithCoords.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 mb-4">
              🗺️ Aucun projet avec coordonnées pour l'instant
            </p>
            <p className="text-sm text-gray-500">
              Pour ajouter une carte interactive, ajoute des coordonnées GPS dans <br />
              <code className="bg-gray-100 px-2 py-1 rounded">src/data/projects.json</code>
            </p>
            <div className="mt-4 text-sm text-gray-400">
              Exemple : "coordinates": [48.8566, 2.3522] pour Paris
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projectsWithCoords.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-sm text-gray-600">
                      📍 {project.coordinates[0]}, {project.coordinates[1]}
                    </p>
                    <a 
                      href={`https://www.google.com/maps?q=${project.coordinates[0]},${project.coordinates[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:text-blue-700"
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