/**
 * @fileoverview Scroll Direction Observer Hook.
 * @module useScrollDirection
 * @description Tracks scroll direction (up vs down) and updates `data-scroll-dir` attribute on document.body for dynamic header hiding and reveal styling.
 * @author Frontend Odyssey Team
 */

import { useEffect } from 'react';

/**
 * Custom Hook to observe vertical scroll direction.
 *
 * @function useScrollDirection
 * @returns {void}
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
