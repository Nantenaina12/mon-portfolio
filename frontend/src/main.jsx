import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { getBasePath } from './utils/env.js'   // ⬅️ IMPORT

const basePath = getBasePath();   // ⬅️ RÉCUPÈRE LA VALEUR

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter basename={basePath}>    {/* ⬅️ UTILISE LA VARIABLE */}
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
)