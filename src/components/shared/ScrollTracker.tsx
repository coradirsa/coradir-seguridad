'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '@/utils/analytics';

/**
 * Componente para trackear scroll depth
 * Registra eventos cuando el usuario llega al 25%, 50%, 75% y 100% de la página
 */
export default function ScrollTracker() {
  const trackedRef = useRef({
    '25': false,
    '50': false,
    '75': false,
    '100': false,
  });

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calcular porcentaje de scroll
      const scrollPercentage = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100
      );

      // Trackear hitos de scroll (solo una vez cada uno)
      if (scrollPercentage >= 25 && !trackedRef.current['25']) {
        trackScrollDepth(25);
        trackedRef.current['25'] = true;
      }

      if (scrollPercentage >= 50 && !trackedRef.current['50']) {
        trackScrollDepth(50);
        trackedRef.current['50'] = true;
      }

      if (scrollPercentage >= 75 && !trackedRef.current['75']) {
        trackScrollDepth(75);
        trackedRef.current['75'] = true;
      }

      if (scrollPercentage >= 100 && !trackedRef.current['100']) {
        trackScrollDepth(100);
        trackedRef.current['100'] = true;
      }
    };

    // Throttle para no ejecutar en cada scroll (performance)
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  // Componente sin UI (solo tracking)
  return null;
}
