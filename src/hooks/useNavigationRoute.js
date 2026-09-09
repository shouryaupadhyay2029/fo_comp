import { useState, useEffect } from 'react';
import { synth } from '../utils/audio';

export function getCleanPath(p) {
  const raw = (typeof p === 'string' ? p : window.location.pathname).toLowerCase();
  const cleaned = raw.split('?')[0].split('#')[0].replace(/\/$/, '');
  return cleaned || '/';
}

/**
 * Custom hook providing SPA route management with transition state.
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
