import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Index from './Context/Index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Index>
      <App />
    </Index>
  </StrictMode>,
)
