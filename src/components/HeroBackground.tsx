import { useState, useEffect } from 'react';

interface HeroBackgroundProps {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
}

// Tiny base64 blur placeholder (10x6 navy gradient)
const BLUR_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMCA2Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwQTBFMjciLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxMjE4MzUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2cpIiB3aWR0aD0iMTAiIGhlaWdodD0iNiIvPjwvc3ZnPg==';

export default function HeroBackground({ 
  src, 
  alt = 'Hero background', 
  priority = false,
  className = '' 
}: HeroBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(priority ? src : '');

  // Lazy load for non-priority images
  useEffect(() => {
    if (!priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImgSrc(src);
        setIsLoaded(true);
      };
    }
  }, [src, priority]);

  // Handle priority image load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <>
      {/* Blur placeholder layer - always visible initially */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${BLUR_PLACEHOLDER})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(20px)',
          transform: 'scale(1.1)', // Prevent blur edge artifacts
        }}
        aria-hidden="true"
      />

      {/* Main image layer */}
      <div
        className={`absolute inset-0 z-0 transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        aria-hidden="true"
      >
        <img
          src={imgSrc || src}
          alt={alt}
          width={1920}
          height={1080}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={handleLoad}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'brightness(0.75) contrast(1.1) saturate(1.05)',
          }}
        />
      </div>

      {/* Navy overlay for brand consistency and text contrast */}
      <div 
        className="absolute inset-0 z-[1] bg-[#0A0E27]/55" 
        style={{ mixBlendMode: 'multiply' }}
        aria-hidden="true"
      />

      {/* Text shadow layer for additional contrast */}
      <div 
        className="absolute inset-0 z-[2] bg-gradient-to-t from-[#0A0E27]/60 via-transparent to-[#0A0E27]/30"
        aria-hidden="true"
      />
    </>
  );
}
