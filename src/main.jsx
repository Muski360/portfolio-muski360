import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/index.css'
import App from './App.jsx'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
