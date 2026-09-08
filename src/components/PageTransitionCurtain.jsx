import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function PageTransitionCurtain({ isTransitioning, onComplete }) {
  const containerRef = useRef(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (isTransitioning) {
      const container = containerRef.current;
      if (!container) return;

      const slats = container.querySelectorAll('.horizontal-slat');
      
      const tl = gsap.timeline({
        onComplete: () => {
          if (onCompleteRef.current) onCompleteRef.current();
        }
      });

      // 1. Cover stage (slats expand horizontally along height / rightward swipe cover)
      tl.fromTo(
        slats,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.35,
          stagger: 0.04,
          ease: 'power3.inOut'
        }
      )
      // 2. Reveal stage (slats collapse horizontally rightward)
      .to(slats, {
        scaleX: 0,
        transformOrigin: 'right center',
        duration: 0.45,
        stagger: 0.04,
        ease: 'power3.inOut',
        delay: 0.05
      });

      return () => {
        tl.kill();
      };
    }
  }, [isTransitioning]);

  if (!isTransitioning) return null;

  return (
    <div ref={containerRef} className="page-transition-curtain-overlay">
      <div className="horizontal-slats-grid">
        <div className="horizontal-slat slat-h-1"></div>
        <div className="horizontal-slat slat-h-2"></div>
        <div className="horizontal-slat slat-h-3"></div>
        <div className="horizontal-slat slat-h-4"></div>
        <div className="horizontal-slat slat-h-5"></div>
      </div>

      <style>{`
        .page-transition-curtain-overlay {
          position: fixed;
          inset: 0;
          z-index: 99998;
          pointer-events: none;
        }

        .horizontal-slats-grid {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          display: grid;
          grid-template-rows: repeat(5, 1fr);
        }

        .horizontal-slat {
          background: #121110;
          width: 100%;
          height: 100%;
          transform: scaleX(0);
        }
      `}</style>
    </div>
  );
}
