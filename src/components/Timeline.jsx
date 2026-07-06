import { motion } from 'framer-motion'
import timelineData from "../data/timeline.json"

export default function Timeline() {
  return (
    <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 pt-20 md:pt-16" id="parcours">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Mon Parcours</h2>
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div 
              key={index} 
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                {index < timelineData.length - 1 && (
                  <div className="w-0.5 h-20 bg-blue-200 dark:bg-blue-800"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition">
                  <span className="text-sm text-blue-500 dark:text-blue-400 font-semibold">{item.year}</span>
                  <h3 className="text-xl font-bold mt-1 text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-2">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}