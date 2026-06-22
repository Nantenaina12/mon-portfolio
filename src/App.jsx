import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProjectGallery from './components/ProjectGallery'
import InteractiveMap from './components/InteractiveMap'
import Timeline from './components/Timeline'
import ContactFooter from './components/ContactFooter'
import ProjectDetail from './components/ProjectDetail'

function App() {
  return (
    <div className="App">
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
      </Routes>
    </div>
  )
}

export default App