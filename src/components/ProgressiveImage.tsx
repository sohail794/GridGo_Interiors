import { useState, useRef, useEffect } from 'react';
import SkeletonLoader from './SkeletonLoader';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
}

/**
 * Progressive image loader with skeleton placeholder
 * Loads low-res image first, then high-res image
 */
export default function ProgressiveImage({
  src,
  alt,
  placeholder,
  className = '',
  onLoad,
}: ProgressiveImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;

    const img = new Image();
    img.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = src;
        setImageLoaded(true);
        onLoad?.();
      }
    };
    img.onerror = () => {
      setError(true);
    };
    img.src = src;
  }, [src, onLoad]);

  if (error) {
    return (
      <div className={`${className} bg-white/5 flex items-center justify-center`}>
        <span className="text-text-secondary">Failed to load image</span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {!imageLoaded && <SkeletonLoader variant="image" />}
      <img
        ref={imgRef}
        src={placeholder || src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        loading="lazy"
        style={{
          animation: imageLoaded ? 'fadeIn 400ms ease-out forwards' : 'none',
        }}
      />
    </div>
  );
}
