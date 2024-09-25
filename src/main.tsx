import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import '@/assets/css/index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
