'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQury';
import { trackVideoPlay, trackVideoPause } from '@/utils/analytics';

interface LazyVideoProps {
  mobileSrc?: string;
  tabletSrc?: string;
  desktopSrc?: string;
  fallbackSrc: string;
  poster: string;
  className?: string;
  'aria-label'?: string;
  autoPlay?: boolean;
}

export default function LazyVideo({
  mobileSrc,
  tabletSrc,
  desktopSrc,
  fallbackSrc,
  poster,
  className = '',
  'aria-label': ariaLabel = 'Video',
  autoPlay = true,
}: LazyVideoProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: true });

  // Detectar dispositivo (Mobile First)
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  useEffect(() => {
    if (!videoRef.current) return;

    // Solo cargar video cuando está en viewport (ahorro de datos)
    if (isInView && !isLoaded) {
      videoRef.current.load();
      setIsLoaded(true);
    }

    // Auto play/pause según visibilidad
    if (isLoaded && autoPlay) {
      if (isInView) {
        videoRef.current.play().catch(() => {
          // Autoplay puede fallar por políticas del navegador
        });
        setIsPlaying(true);
        // Track: Video comenzó a reproducirse
        trackVideoPlay('security_video');
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        // Track: Video en pausa (salió del viewport)
        trackVideoPause('security_video');
      }
    }
  }, [isInView, isLoaded, autoPlay]);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
      // Track: Usuario pausó manualmente
      trackVideoPause('security_video');
    } else {
      videoRef.current.play();
      setIsPlaying(true);
      // Track: Usuario reprodujo manualmente
      trackVideoPlay('security_video');
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Poster mientras carga */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${poster})` }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4" />
              <p className="text-white text-sm">Cargando video...</p>
            </div>
          </div>
        </div>
      )}

      {/* Video responsive con MP4 optimizado */}
      <video
        ref={videoRef}
        loop
        muted
        playsInline // IMPORTANTE para iOS
        preload="none" // No cargar hasta que sea necesario
        poster={poster}
        className={`w-full h-full rounded-lg transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label={ariaLabel}
        onLoadedData={() => setIsLoaded(true)}
      >
        {/* Mobile: Versión 480p optimizada */}
        {isMobile && mobileSrc && (
          <source src={mobileSrc} type="video/mp4" />
        )}

        {/* Tablet: Versión 720p optimizada */}
        {isTablet && tabletSrc && (
          <source src={tabletSrc} type="video/mp4" />
        )}

        {/* Desktop: Versión 1080p optimizada */}
        {!isMobile && !isTablet && desktopSrc && (
          <source src={desktopSrc} type="video/mp4" />
        )}

        {/* Fallback universal */}
        <source src={fallbackSrc} type="video/mp4" />

        Tu navegador no soporta la reproducción de video.
        {' '}
        <a href="/contacto" className="text-blue-500 underline">
          Contacta con nosotros
        </a>
        {' '}
        para más información.
      </video>

      {/* Controles manuales (opcional) */}
      {isLoaded && (
        <button
          onClick={handlePlayPause}
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? 'Pausar video' : 'Reproducir video'}
        >
          {isPlaying ? (
            // Icono Pause
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6"
              />
            </svg>
          ) : (
            // Icono Play
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          )}
        </button>
      )}

      {/* Badge de carga lazy (solo desarrollo) */}
      {process.env.NODE_ENV === 'development' && !isLoaded && (
        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          Lazy Loading
        </div>
      )}
    </div>
  );
}
