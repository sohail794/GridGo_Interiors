import { useRef, useEffect, useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const updateSliderPosition = (e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const newPosition = ((clientX - rect.left) / rect.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener('mousemove', updateSliderPosition);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', updateSliderPosition);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', updateSliderPosition);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', updateSliderPosition);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full overflow-hidden rounded-lg select-none cursor-ew-resize group"
      style={{ aspectRatio: '16 / 10' }}
    >
      {/* After Image (Background) */}
      <img
        src={afterImage}
        alt={`${alt} - ${afterLabel}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${alt} - ${beforeLabel}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Slider Handle */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 w-1 bg-brand-emerald cursor-ew-resize transition-opacity duration-200 group-hover:w-2"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Arrow indicators */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          {/* Left arrow */}
          <svg
            className="w-6 h-6 text-brand-emerald drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M10 18l-6-6 6-6v12z" />
          </svg>

          {/* Right arrow */}
          <svg
            className="w-6 h-6 text-brand-emerald drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14 6l6 6-6 6V6z" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-sm font-semibold">
        {beforeLabel}
      </div>

      <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded text-white text-sm font-semibold">
        {afterLabel}
      </div>
    </div>
  );
}
