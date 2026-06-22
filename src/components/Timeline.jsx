import timelineData from "../data/timeline.json"

export default function Timeline() {
  return (
    <section className="py-16 px-4" id="parcours">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Mon Parcours</h2>
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                {index < timelineData.length - 1 && (
                  <div className="w-0.5 h-20 bg-blue-200"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <span className="text-sm text-blue-500 font-semibold">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}