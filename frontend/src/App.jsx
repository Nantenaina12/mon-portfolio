import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { useTheme } from './context/ThemeContext';

// Composants de l'ancien fichier
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import InteractiveMap from './components/InteractiveMap';
import Timeline from './components/Timeline';
import ContactFooter from './components/ContactFooter';
import ProjectDetail from './components/ProjectDetail';
import NotFound from './components/NotFound';
import Loader from './components/Loader'; // <-- Conservé !

// Nouveaux composants ajoutés pour la route Admin
import Admin from './pages/Admin';

function App() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulation du chargement initial des ressources (3 secondes)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthProvider>
      <div className={`App ${theme}`}>
        {/* Écran de chargement initial (Loader) animé */}
        <AnimatePresence mode="wait">
          {loading && <Loader />}
        </AnimatePresence>

        {/* Le contenu ne s'affiche qu'après la fin du chargement */}
        {!loading && (
          <>
            <Navigation />
            <AnimatePresence mode="wait">
              <Routes>
                {/* Route d'accueil regroupant toutes vos sections d'origine */}
                <Route path="/" element={
                  <>
                    <Hero />
                    <ProjectGallery />
                    <InteractiveMap />
                    <Timeline />
                    <ContactFooter />
                  </>
                } />
                
                {/* Route dynamique pour le détail de vos projets */}
                <Route path="/project/:id" element={<ProjectDetail />} />
                
                {/* Nouvelle route d'administration */}
                <Route path="/admin" element={<Admin />} />
                
                {/* Gestion de la page 404 Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;