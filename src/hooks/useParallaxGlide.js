import { useEffect } from 'react';

/**
 * Custom hook managing 60fps requestAnimationFrame image parallax glide effects.
 */
export function useParallaxGlide(dependencyKey) {
  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const viewHeight = window.innerHeight;
      const parallaxTargets = [
        { containerSel: '.manifesto-pure-video-container', imgSel: '.manifesto-clean-video', scale: 1.24, factor: -0.12 },
        { containerSel: '.card-image-wrapper', imgSel: '.discover-hero-img', scale: 1.25, factor: -0.14 },
        { containerSel: '.inline-mask-frame', imgSel: '.inline-visual-img', scale: 1.28, factor: -0.15 }
      ];

      parallaxTargets.forEach(({ containerSel, imgSel, scale, factor }) => {
        const containers = document.querySelectorAll(containerSel);
        containers.forEach((container) => {
          const rect = container.getBoundingClientRect();
          if (rect.top < viewHeight && rect.bottom > 0) {
            const img = container.querySelector(imgSel);
            if (img) {
              const centerY = rect.top + rect.height / 2;
              const screenCenterY = viewHeight / 2;
              const glideY = (centerY - screenCenterY) * factor;
              img.style.transform = `scale(${scale}) translate3d(0, ${glideY}px, 0)`;
            }
          }
        });
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dependencyKey]);
}
