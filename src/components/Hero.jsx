import { config } from "../data/config"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center px-4">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
          {config.name.charAt(0)}
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
          {config.name}
        </h1>
        <h2 className="text-2xl text-gray-600 dark:text-gray-300 mb-4">{config.title}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{config.tagline}</p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <a href="#projets" className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition">
            Voir mes projets
          </a>
          <a href="#contact" className="px-6 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
            Me contacter
          </a>
        </div>
      </div>
    </section>
  )
}