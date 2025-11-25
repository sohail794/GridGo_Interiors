import { useState, ImgHTMLAttributes } from 'react';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  showPlaceholder?: boolean;
  onLoad?: () => void;
}

/**
 * OptimizedImage - A performance-optimized image component
 * 
 * Features:
 * - Lazy loading by default (eager for priority/hero images)
 * - Blur placeholder while loading
 * - Prevents layout shift with aspect ratio
 * - Smooth fade-in transition
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  containerClassName = '',
  showPlaceholder = true,
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  // Calculate aspect ratio for placeholder
  const aspectRatio = width && height ? height / width : undefined;

  return (
    <div 
      className={`relative overflow-hidden ${containerClassName}`}
      style={aspectRatio ? { aspectRatio: `${width}/${height}` } : undefined}
    >
      {/* Blur placeholder */}
      {showPlaceholder && !isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse z-10"
          aria-hidden="true"
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-10">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        onLoad={handleLoad}
        onError={handleError}
        className={`
          transition-opacity duration-300 ease-out
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
          ${className}
        `}
        {...props}
      />
    </div>
  );
}
