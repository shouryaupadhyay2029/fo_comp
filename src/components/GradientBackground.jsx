/**
 * @fileoverview High-Performance Atmospheric Gradient Background and Noise Canvas.
 * @module GradientBackground
 * @description Renders a hardware-accelerated ambient backdrop with optimized noise canvas generation.
 * @author Frontend Odyssey Team
 */

import React, { useRef, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

/**
 * Animated Grain/Noise Canvas overlay.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {number} [props.patternSize=100] Size of the square noise canvas tile in pixels.
 * @param {number} [props.patternScaleX=1] X-axis scaling ratio.
 * @param {number} [props.patternScaleY=1] Y-axis scaling ratio.
 * @param {number} [props.patternRefreshInterval=6] Frame interval for generating new noise seeds.
 * @param {number} [props.patternAlpha=45] Alpha transparency of grain particles (0-255).
 * @param {number} [props.intensity=1] Intensity multiplier for noise grain contrast.
 * @returns {JSX.Element} Canvas element rendering continuous background grain.
 */
export const Noise = memo(function Noise({
  patternSize = 100,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 6,
  patternAlpha = 45,
  intensity = 1,
}) {
  const grainRef = useRef(null);
  const canvasCssSizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let frame = 0;
    const patternCanvas = document.createElement('canvas');
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;

    const patternCtx = patternCanvas.getContext('2d');
    if (!patternCtx) return;
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let newCssWidth = window.innerWidth;
      let newCssHeight = window.innerHeight;

      if (canvas.parentElement) {
        const parentRect = canvas.parentElement.getBoundingClientRect();
        newCssWidth = parentRect.width;
        newCssHeight = parentRect.height;
      }

      canvasCssSizeRef.current = { width: newCssWidth, height: newCssHeight };

      canvas.width = newCssWidth * dpr;
      canvas.height = newCssHeight * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255 * intensity;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      const { width: cssWidth, height: cssHeight } = canvasCssSizeRef.current;
      if (cssWidth === 0 || cssHeight === 0) return;

      ctx.clearRect(0, 0, cssWidth, cssHeight);
      ctx.save();

      const safePatternScaleX = Math.max(0.001, patternScaleX);
      const safePatternScaleY = Math.max(0.001, patternScaleY);
      ctx.scale(safePatternScaleX, safePatternScaleY);

      const fillPattern = ctx.createPattern(patternCanvas, 'repeat');
      if (fillPattern) {
        ctx.fillStyle = fillPattern;
        ctx.fillRect(0, 0, cssWidth / safePatternScaleX, cssHeight / safePatternScaleY);
      }

      ctx.restore();
    };

    let animationFrameId;
    const loop = () => {
      if (document.hidden) {
        animationFrameId = window.requestAnimationFrame(loop);
        return;
      }

      if (canvasCssSizeRef.current.width > 0 && canvasCssSizeRef.current.height > 0) {
        if (frame % patternRefreshInterval === 0) {
          updatePattern();
          drawGrain();
        }
      }
      frame++;
      animationFrameId = window.requestAnimationFrame(loop);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();
    updatePattern();
    drawGrain();

    if (patternRefreshInterval > 0) {
      loop();
    }

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [patternSize, patternScaleX, patternScaleY, patternRefreshInterval, patternAlpha, intensity]);

  return (
    <canvas
      ref={grainRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    />
  );
});

Noise.propTypes = {
  patternSize: PropTypes.number,
  patternScaleX: PropTypes.number,
  patternScaleY: PropTypes.number,
  patternRefreshInterval: PropTypes.number,
  patternAlpha: PropTypes.number,
  intensity: PropTypes.number
};

/**
 * Main Ambient Gradient Backdrop component.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {string} [props.gradientType='radial-gradient'] Gradient function type ('radial-gradient', 'linear-gradient', 'conic-gradient').
 * @param {string} [props.gradientSize='125% 125%'] Size string for radial gradient.
 * @param {string} [props.gradientOrigin='bottom-middle'] Anchor origin position.
 * @param {Array<{color: string, stop: string}>} [props.colors] Array of color stop definitions.
 * @param {boolean} [props.enableNoise=true] Whether noise overlay is enabled.
 * @param {number} [props.noisePatternSize=90] Noise tile size.
 * @param {number} [props.noisePatternScaleX=1] X scaling for noise canvas.
 * @param {number} [props.noisePatternScaleY=1] Y scaling for noise canvas.
 * @param {number} [props.noisePatternRefreshInterval=6] Frame skip interval for noise updates.
 * @param {number} [props.noisePatternAlpha=45] Alpha transparency of noise.
 * @param {number} [props.noiseIntensity=1.0] Noise intensity contrast multiplier.
 * @param {string} [props.className=''] Optional additional CSS classes.
 * @param {Object} [props.style={}] Optional inline style overrides.
 * @param {React.ReactNode} [props.children] Children elements to render inside wrapper.
 * @param {string|null} [props.customGradient=null] Override custom gradient string.
 * @returns {JSX.Element} Ambient full-viewport fixed backdrop.
 */
export const GradientBackground = memo(function GradientBackground({
  gradientType = 'radial-gradient',
  gradientSize = '125% 125%',
  gradientOrigin = 'bottom-middle',
  colors = [
    { color: 'rgba(252, 236, 238, 1)', stop: '0%' },
    { color: 'rgba(248, 222, 226, 1)', stop: '25%' },
    { color: 'rgba(242, 208, 214, 1)', stop: '50%' },
    { color: 'rgba(250, 228, 232, 1)', stop: '75%' },
    { color: 'rgba(252, 236, 238, 1)', stop: '100%' }
  ],
  enableNoise = true,
  noisePatternSize = 90,
  noisePatternScaleX = 1,
  noisePatternScaleY = 1,
  noisePatternRefreshInterval = 6,
  noisePatternAlpha = 45,
  noiseIntensity = 1.0,
  className = '',
  style = {},
  children,
  customGradient = null
}) {
  const generateGradient = () => {
    if (customGradient) return customGradient;

    const getGradientPosition = (origin) => {
      const positions = {
        'bottom-middle': '50% 101%',
        'bottom-left': '0% 101%',
        'bottom-right': '100% 101%',
        'top-middle': '50% -1%',
        'top-left': '0% -1%',
        'top-right': '100% -1%',
        'left-middle': '-1% 50%',
        'right-middle': '101% 50%',
        'center': '50% 50%'
      };
      return positions[origin] || positions['bottom-middle'];
    };

    const position = getGradientPosition(gradientOrigin);
    const colorStops = colors.map(({ color, stop }) => `${color} ${stop}`).join(',');

    if (gradientType === 'radial-gradient') {
      return `radial-gradient(${gradientSize} at ${position},${colorStops})`;
    } else if (gradientType === 'linear-gradient') {
      const angleMap = {
        'bottom-middle': '0deg',
        'bottom-left': '45deg',
        'bottom-right': '315deg',
        'top-middle': '180deg',
        'top-left': '135deg',
        'top-right': '225deg',
        'left-middle': '90deg',
        'right-middle': '270deg',
        'center': '0deg'
      };
      const angle = angleMap[gradientOrigin] || angleMap['bottom-middle'];
      return `linear-gradient(${angle},${colorStops})`;
    } else if (gradientType === 'conic-gradient') {
      return `conic-gradient(from 0deg at ${position},${colorStops})`;
    }

    return `${gradientType}(${colorStops})`;
  };

  const gradientStyle = {
    background: generateGradient(),
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    pointerEvents: 'none',
    zIndex: 0,
    willChange: 'transform',
    transform: 'translateZ(0)',
    ...style
  };

  return (
    <div className={`gradient-bg-wrapper ${className}`} style={gradientStyle}>
      {enableNoise && (
        <Noise
          patternSize={noisePatternSize}
          patternScaleX={noisePatternScaleX}
          patternScaleY={noisePatternScaleY}
          patternRefreshInterval={noisePatternRefreshInterval}
          patternAlpha={noisePatternAlpha}
          intensity={noiseIntensity}
        />
      )}
      {children}
    </div>
  );
});

GradientBackground.propTypes = {
  gradientType: PropTypes.string,
  gradientSize: PropTypes.string,
  gradientOrigin: PropTypes.string,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      stop: PropTypes.string.isRequired
    })
  ),
  enableNoise: PropTypes.bool,
  noisePatternSize: PropTypes.number,
  noisePatternScaleX: PropTypes.number,
  noisePatternScaleY: PropTypes.number,
  noisePatternRefreshInterval: PropTypes.number,
  noisePatternAlpha: PropTypes.number,
  noiseIntensity: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
  customGradient: PropTypes.string
};
