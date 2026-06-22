import Hero from "./components/Hero"
import ProjectGallery from "./components/ProjectGallery"
import Timeline from "./components/Timeline"
import ContactFooter from "./components/ContactFooter"
import InteractiveMap from "./components/InteractiveMap"
import Navigation from "./components/Navigation"

function App() {
  return (
    <div className="App">
      <Navigation />
      <Hero />
      <ProjectGallery />
      <InteractiveMap />
      <Timeline />
      <ContactFooter />
    </div>
  )
}

export default App