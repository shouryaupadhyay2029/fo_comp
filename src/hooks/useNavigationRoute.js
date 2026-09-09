/**
 * @fileoverview Custom Single Page Navigation Routing Hook.
 * @module useNavigationRoute
 * @description Provides client-side SPA routing logic, path normalization, page curtain transition signals, and acoustic feedback triggers.
 * @author Frontend Odyssey Team
 */

import { useState, useEffect } from 'react';
import { synth } from '../utils/audio';

/**
 * Normalizes a URL path string by removing query parameters, trailing slashes, and hash fragments.
 *
 * @function getCleanPath
 * @param {string} [p] Raw URL path string.
 * @returns {string} Normalized path string (e.g., '/discover').
 */
export function getCleanPath(p) {
  const raw = (typeof p === 'string' ? p : window.location.pathname).toLowerCase();
  const cleaned = raw.split('?')[0].split('#')[0].replace(/\/$/, '');
  return cleaned || '/';
}

/**
 * SPA Navigation state hook.
 *
 * @function useNavigationRoute
 * @returns {{
 *   currentPath: string,
 *   isPageTransitioning: boolean,
 *   setIsPageTransitioning: React.Dispatch<React.SetStateAction<boolean>>,
 *   handleNavigateRoute: (targetPath: string) => void
 * }} Router navigation state object.
 */
export function useNavigationRoute() {
  const [currentPath, setCurrentPath] = useState(() => getCleanPath());
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  const handleNavigateRoute = (targetPath) => {
    const cleanTarget = getCleanPath(targetPath);
    if (window.location.pathname !== cleanTarget) {
      window.history.pushState(null, '', cleanTarget);
    }
    setCurrentPath(cleanTarget);
    setIsPageTransitioning(true);
    synth.playHover();
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = getCleanPath(window.location.pathname);
      setCurrentPath(newPath);
      setIsPageTransitioning(true);
      synth.playHover();
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  return {
    currentPath,
    isPageTransitioning,
    setIsPageTransitioning,
    handleNavigateRoute
  };
}
