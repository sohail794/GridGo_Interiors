import { useRef, useEffect, useState } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  alt?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  alt = 'Before and after comparison',
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [showHint, setShowHint] = useState(true);

  // Hide hint after first interaction
  useEffect(() => {
    if (isDragging && showHint) {
      setShowHint(false);
    }
  }, [isDragging, showHint]);

  // Auto-hide hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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
      className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl select-none cursor-ew-resize group"
      role="slider"
      aria-label="Before and after comparison slider"
      aria-valuenow={Math.round(sliderPosition)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* After Image (Background) - Enhanced styling */}
      <img
        src={afterImage}
        alt={`${alt} - ${afterLabel}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        style={{
          filter: 'brightness(1.05) saturate(1.1)',
        }}
      />

      {/* Before Image (Clipped) - Slightly muted to show contrast */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage}
          alt={`${alt} - ${beforeLabel}`}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{
            filter: 'brightness(0.85) sepia(0.15)',
          }}
        />
      </div>

      {/* Slider Handle - Mint green color (#00F5A0) with 3px width */}
      <div
        ref={sliderRef}
        className="absolute top-0 bottom-0 cursor-ew-resize z-10"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          width: '3px',
          backgroundColor: '#00F5A0',
          boxShadow: '0 0 10px rgba(0, 245, 160, 0.5)',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Handle Circle - Larger on mobile */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 md:w-10 md:h-10 rounded-full bg-[#00F5A0] flex items-center justify-center shadow-lg transition-transform duration-200 hover:scale-110"
          style={{
            boxShadow: '0 0 20px rgba(0, 245, 160, 0.4), 0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Arrow indicators */}
          <div className="flex items-center gap-0.5">
            <svg
              className="w-3 h-3 text-navy-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg
              className="w-3 h-3 text-navy-900"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-md text-white text-xs font-semibold uppercase tracking-wide">
        {beforeLabel}
      </div>

      <div 
        className="absolute top-3 right-3 px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide"
        style={{
          backgroundColor: '#00F5A0',
          color: '#0A0E27',
        }}
      >
        {afterLabel}
      </div>

      {/* Mobile hint - "Swipe to compare" */}
      {showHint && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-full text-white text-[11px] font-medium md:hidden animate-pulse">
          ← Swipe to compare →
        </div>
      )}
    </div>
  );
}
