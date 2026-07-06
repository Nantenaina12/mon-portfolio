import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProjectGallery from './components/ProjectGallery'
import InteractiveMap from './components/InteractiveMap'
import Timeline from './components/Timeline'
import ContactFooter from './components/ContactFooter'
import ProjectDetail from './components/ProjectDetail'
import NotFound from './components/NotFound'  // AJOUTER
import { useTheme } from './context/ThemeContext'  // AJOUTER

function App() {
  const { theme } = useTheme()  // AJOUTER

  return (
    <div className={`App ${theme}`}>  // MODIFIER
      <Navigation />
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
        <Route path="*" element={<NotFound />} />  {/* AJOUTER */}
      </Routes>
    </div>
  )
}

export default App