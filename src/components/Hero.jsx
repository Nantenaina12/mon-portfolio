import { motion } from 'framer-motion'
import { config } from "../data/config"

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-20 md:pt-16">
      <motion.div 
        className="text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="w-32 h-32 mx-auto mb-6 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-4xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {config.name.charAt(0)}
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {config.name}
        </motion.h1>
        
        <motion.h2 
          className="text-2xl text-gray-600 dark:text-gray-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {config.title}
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {config.tagline}
        </motion.p>
        
        <motion.div 
          className="mt-8 flex gap-4 justify-center flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="#projets" 
            className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          >
            Voir mes projets
          </a>
          <a 
            href="#contact" 
            className="px-6 py-3 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition"
          >
            Me contacter
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}