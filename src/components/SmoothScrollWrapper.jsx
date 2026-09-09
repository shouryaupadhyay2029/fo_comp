/**
 * @fileoverview Lenis Inertial Smooth Scrolling Wrapper.
 * @module SmoothScrollWrapper
 * @description Provides smooth inertial momentum scrolling using Lenis engine with RAF lifecycle cleanup and visibility management.
 * @author Frontend Odyssey Team
 */

import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import Lenis from 'lenis';

/**
 * Smooth Scroll Container Component.
 *
 * @component
 * @param {Object} props Component properties.
 * @param {React.ReactNode} props.children Child elements to wrap with smooth scrolling behavior.
 * @returns {JSX.Element} Children wrapped with smooth scrolling lifecycle.
 */
function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5
    });

    let animId;
    function raf(time) {
      if (!document.hidden) {
        lenis.raf(time);
      }
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

SmoothScrollWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default memo(SmoothScrollWrapper);
