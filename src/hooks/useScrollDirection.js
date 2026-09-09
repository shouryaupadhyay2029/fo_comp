import { useEffect } from 'react';

/**
 * Custom hook that tracks scroll direction (up vs down)
 * and sets `data-scroll-dir` attribute on document.body for dynamic header & reveal CSS styling.
 */
export function useScrollDirection() {
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScrollDir = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY + 2) {
        document.body.setAttribute('data-scroll-dir', 'down');
      } else if (currentScrollY < lastScrollY - 2) {
        document.body.setAttribute('data-scroll-dir', 'up');
      }
      lastScrollY = currentScrollY;
    };

    document.body.setAttribute('data-scroll-dir', 'down');
    window.addEventListener('scroll', handleScrollDir, { passive: true });

    return () => window.removeEventListener('scroll', handleScrollDir);
  }, []);
}
