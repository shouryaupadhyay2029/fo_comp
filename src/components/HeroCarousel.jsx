import React, { useState, useEffect, useRef } from 'react';

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: 'ACOUSTIC MINDSCAPE',
    subtitle: 'SPATIAL THOUGHT MAPPING',
    image: '/carousel/hero1.png',
    angle: 0
  },
  {
    id: 2,
    title: 'SPATIAL RESONANCE',
    subtitle: 'QUALITATIVE HUM',
    image: '/carousel/hero2.png',
    angle: 45
  },
  {
    id: 3,
    title: 'PERSPECTIVE WEAVING',
    subtitle: 'INTERACTIVE EVOLUTION',
    image: '/carousel/hero3.png',
    angle: 90
  },
  {
    id: 4,
    title: 'MINDFUL SANCTUARY',
    subtitle: 'SKEW-FREE CO-PRESENCE',
    image: '/carousel/hero4.png',
    angle: 135
  },
  {
    id: 5,
    title: 'SILENT PRESENCE',
    subtitle: '432HZ FREQUENCY',
    image: '/carousel/hero1.png',
    angle: 180
  },
  {
    id: 6,
    title: 'VIBE SPHERES',
    subtitle: 'ATMOSPHERIC REALMS',
    image: '/carousel/hero2.png',
    angle: 225
  },
  {
    id: 7,
    title: 'SERENDIPITY',
    subtitle: 'CURIOUS DISCOVERY',
    image: '/carousel/hero3.png',
    angle: 270
  },
  {
    id: 8,
    title: 'THOUGHT EVOLUTION',
    subtitle: 'ORGANIC GROWTH',
    image: '/carousel/hero4.png',
    angle: 315
  }
];

export default function HeroCarousel({ onSelectCard }) {
  const [activeCard, setActiveCard] = useState(null);
  const [isStageHovered, setIsStageHovered] = useState(false);
  const ringRef = useRef(null);
  const rotationRef = useRef(0);
  const speedRef = useRef(0.18);

  useEffect(() => {
    let animId;
    const updateRotation = () => {
      const targetSpeed = isStageHovered ? 0 : 0.18;
      speedRef.current += (targetSpeed - speedRef.current) * 0.045;
      rotationRef.current = (rotationRef.current + speedRef.current) % 360;

      if (ringRef.current) {
        ringRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
      }
      animId = requestAnimationFrame(updateRotation);
    };

    animId = requestAnimationFrame(updateRotation);
    return () => cancelAnimationFrame(animId);
  }, [isStageHovered]);

  return (
    <div
      className="hero-2d-wheel-stage"
      onMouseEnter={() => setIsStageHovered(true)}
      onMouseLeave={() => setIsStageHovered(false)}
    >
      {/* Center Circular Brand Seal with Central Dot */}
      <div className="wheel-center-seal">
        <svg viewBox="0 0 160 160" className="seal-rotating-text-svg">
          <path
            id="heroSealTextPath"
            d="M 80, 80 m -56, 0 a 56,56 0 1,1 112,0 a 56,56 0 1,1 -112,0"
            fill="none"
          />
          <text className="seal-text-path">
            <textPath href="#heroSealTextPath" startOffset="0%" textLength="351" lengthAdjust="spacingAndGlyphs">
              • ARCHITECTURAL EQUILIBRIUM • SILENT HARMONY •
            </textPath>
          </text>
        </svg>

        <div className="seal-center-content">
          <div className="seal-center-dot"></div>
        </div>
      </div>

      <div className="wheel-rotating-ring" ref={ringRef}>
        {CAROUSEL_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`wheel-squircle-card ${activeCard === item.id ? 'hovered' : ''}`}
            style={{
              '--angle': `${item.angle}deg`,
              '--id': item.id
            }}
            onMouseEnter={() => setActiveCard(item.id)}
            onMouseLeave={() => setActiveCard(null)}
            onClick={() => onSelectCard && onSelectCard(item)}
          >
            <div className="squircle-image-wrap">
              <img src={item.image} alt={item.title} className="squircle-img" />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .hero-2d-wheel-stage {
          position: relative;
          width: 540px;
          height: 540px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          user-select: none;
        }

        /* Center Circular Compact Brand Seal */
        .wheel-center-seal {
          position: absolute;
          width: 98px;
          height: 98px;
          border-radius: 50%;
          background: rgba(246, 242, 236, 0.94);
          border: 1.5px solid rgba(18, 17, 16, 0.18);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
          pointer-events: none;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease;
        }

        .hero-2d-wheel-stage:hover .wheel-center-seal {
          transform: scale(1.06);
          border-color: #d94e00;
        }

        .seal-rotating-text-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          animation: spinSeal 24s linear infinite;
        }

        .seal-text-path {
          font-family: var(--font-gondens);
          font-size: 7.8px;
          font-weight: 800;
          letter-spacing: 0.16em;
          fill: #121110;
          text-transform: uppercase;
        }

        .seal-center-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          z-index: 2;
        }

        .seal-center-dot {
          width: 8px;
          height: 8px;
          background: #d94e00;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(217, 78, 0, 0.6);
          animation: dotPulse 2s ease-in-out infinite;
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes spinSeal {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .wheel-rotating-ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform;
        }

        .wheel-squircle-card {
          position: absolute;
          width: 130px;
          height: 165px;
          transform: rotate(var(--angle)) translateY(-220px) rotate(calc(var(--angle) * -0.2));
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
          cursor: pointer;
          z-index: 5;
        }

        .wheel-squircle-card.hovered {
          transform: rotate(var(--angle)) translateY(-235px) rotate(calc(var(--angle) * -0.2)) scale(1.15);
          z-index: 20;
        }

        .squircle-image-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 38px 18px 38px 18px;
          overflow: hidden;
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.15);
          border: 2px solid rgba(255, 255, 255, 0.85);
          background: #1a1917;
          transition: border-color 0.4s ease, box-shadow 0.4s ease, border-radius 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          animation: cardShapeMorph 9s ease-in-out infinite alternate;
          animation-delay: calc(var(--id) * -1.15s);
        }

        @keyframes cardShapeMorph {
          0% {
            border-radius: 38px 18px 38px 18px;
          }
          25% {
            border-radius: 24px 36px 20px 34px;
          }
          50% {
            border-radius: 36px 22px 34px 20px;
          }
          75% {
            border-radius: 20px 34px 24px 36px;
          }
          100% {
            border-radius: 18px 38px 18px 38px;
          }
        }

        .wheel-squircle-card.hovered .squircle-image-wrap {
          border-color: #d94e00;
          box-shadow: 0 20px 40px rgba(217, 78, 0, 0.25);
        }

        .squircle-img {
          width: 122%;
          height: 122%;
          max-width: none;
          object-fit: cover;
          display: block;
          margin-top: -11%;
          margin-left: -11%;
          filter: grayscale(100%) contrast(105%) brightness(0.92);
          opacity: 0.88;
          animation: innerImagePan 10s ease-in-out infinite alternate;
          animation-delay: calc(var(--id) * -1.25s);
          transition: filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .wheel-squircle-card:hover .squircle-img,
        .wheel-squircle-card.hovered .squircle-img {
          filter: grayscale(0%) contrast(105%) brightness(1.02);
          opacity: 1;
          transform: scale(1.15) translate(-3%, -4%);
          animation-play-state: paused;
        }

        @keyframes innerImagePan {
          0% {
            transform: scale(1.05) translate(0%, 0%);
          }
          50% {
            transform: scale(1.12) translate(-4%, -3%);
          }
          100% {
            transform: scale(1.08) translate(2%, -2%);
          }
        }

        @media (max-width: 1150px) {
          .hero-2d-wheel-stage {
            width: 440px;
            height: 440px;
          }
          .wheel-squircle-card {
            width: 110px;
            height: 140px;
            transform: rotate(var(--angle)) translateY(-175px) rotate(calc(var(--angle) * -0.2));
          }
          .wheel-squircle-card.hovered {
            transform: rotate(var(--angle)) translateY(-185px) rotate(calc(var(--angle) * -0.2)) scale(1.12);
          }
        }
      `}</style>
    </div>
  );
}
