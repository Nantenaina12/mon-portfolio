import { motion } from 'framer-motion'
import './Loader.css'

export default function Loader() {
  return (
    <motion.div 
      className="loader-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="loader-content">
        {/* Logo ou initiale animé */}
        <motion.div 
          className="loader-logo"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 15,
            duration: 0.8 
          }}
        >
          🚀
        </motion.div>

        {/* Nom */}
        <motion.h1 
          className="loader-name"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Portfolio
        </motion.h1>

        {/* Barre de progression */}
        <div className="loader-bar-container">
          <motion.div 
            className="loader-bar"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ 
              duration: 2.5, 
              ease: "easeInOut",
              delay: 0.2
            }}
          />
        </div>

        {/* Points de chargement */}
        <div className="loader-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>

        {/* Message de chargement */}
        <motion.p 
          className="loader-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Chargement...
        </motion.p>
      </div>
    </motion.div>
  )
}