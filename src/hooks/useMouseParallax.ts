import { useEffect, RefObject, useState } from 'react';

export interface ParallaxOffset {
  x: number;
  y: number;
}

/**
 * Hook for mouse parallax effect on elements
 * Creates depth effect as mouse moves across the element
 */
export const useMouseParallax = (
  ref: RefObject<HTMLElement>,
  intensity: number = 15
): ParallaxOffset => {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        
        // Check if element is visible in viewport
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          setOffset({ x: 0, y: 0 });
          return;
        }

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Normalize to -1 to 1 range
        const normalizedX = (mouseX / rect.width) * 2;
        const normalizedY = (mouseY / rect.height) * 2;

        const offsetX = normalizedX * intensity;
        const offsetY = normalizedY * intensity;

        setOffset({ x: offsetX, y: offsetY });
      });
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    // Use capture phase for better performance
    element.addEventListener('mousemove', handleMouseMove, false);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ref, intensity]);

  return offset;
};
