// src/utils/env.js
export const getBasePath = () => {
  // En développement local, on utilise le chemin de GitHub Pages
  // En production sur Railway, on utilise la racine
  const base = import.meta.env.VITE_BASE_PATH || '/';
  return base;
};