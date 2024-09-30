import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import '@/assets/css/index.css';
import '@/assets/sass/custom.scss';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
