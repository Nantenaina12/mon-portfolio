// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// La variable d'environnement VITE_BASE_PATH est définie dans .env.* ou sur Railway
const base = process.env.VITE_BASE_PATH || '/';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: base,   // ← dynamique
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/images': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})