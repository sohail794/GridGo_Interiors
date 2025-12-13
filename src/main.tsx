import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { initWebVitals } from './utils/webVitals';
import { registerServiceWorker, initPWAInstallPrompt } from './utils/serviceWorker';

// Initialize web vitals tracking for performance monitoring
initWebVitals();

// Register service worker for PWA functionality
registerServiceWorker();

// Initialize PWA install prompt
initPWAInstallPrompt();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
