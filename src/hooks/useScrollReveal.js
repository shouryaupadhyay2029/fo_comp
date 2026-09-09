/**
 * @fileoverview High-Performance IntersectionObserver Scroll Reveal Hook.
 * @module useScrollReveal
 * @description Triggers CSS entrance transitions when elements with `data-scroll-reveal` enter the viewport.
 * @author Frontend Odyssey Team
 */

import { useEffect } from 'react';

/**
 * Custom Hook for IntersectionObserver scroll reveals.
 *
 * @function useScrollReveal
 * @param {*} [dependencyKey] Optional dependency key to reset observer on route changes.
 * @returns {void}
 */
export function useScrollReveal(dependencyKey) {
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-delay');
          if (delay) {
            entry.target.style.transitionDelay = delay;
          }
          entry.target.classList.add('is-revealed');
        } else {
          entry.target.classList.remove('is-revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.05,
      rootMargin: '60px 0px -40px 0px'
    });

    const observeAll = () => {
      const elements = document.querySelectorAll('[data-scroll-reveal]');
      const viewHeight = window.innerHeight;
      elements.forEach((el) => {
        observer.observe(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < viewHeight && rect.bottom > 0) {
          el.classList.add('is-revealed');
        }
      });
    };

    observeAll();

    let timeoutId = null;
    const mutationObserver = new MutationObserver(() => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(observeAll, 100);
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [dependencyKey]);
}
