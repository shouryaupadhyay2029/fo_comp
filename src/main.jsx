/**
 * @fileoverview Main entry point for the Frontend Odyssey application.
 * @module main
 * @description Initializes React DOM root, wraps application in StrictMode and ErrorBoundary.
 * @author Frontend Odyssey Team
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import App from './App.jsx';

/**
 * Initializes and renders the React application root container.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

