import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProjectGallery from './components/ProjectGallery'
import InteractiveMap from './components/InteractiveMap'
import Timeline from './components/Timeline'
import ContactFooter from './components/ContactFooter'
import ProjectDetail from './components/ProjectDetail'
import NotFound from './components/NotFound'
import { useTheme } from './context/ThemeContext'

function App() {
  const { theme } = useTheme()

  return (
    <div className={`App ${theme}`}>
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <ProjectGallery />
              <InteractiveMap />
              <Timeline />
              <ContactFooter />
            </>
          } />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default App