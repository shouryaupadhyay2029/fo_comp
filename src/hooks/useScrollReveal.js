import { useEffect } from 'react';

/**
 * Custom hook providing IntersectionObserver scroll reveal behavior
 * for any DOM element annotated with `data-scroll-reveal`.
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

    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [dependencyKey]);
}
