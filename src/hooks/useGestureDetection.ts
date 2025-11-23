import { useEffect, RefObject, useState } from 'react';

export interface GestureCallbacks {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down') => void;
  onLongPress?: () => void;
  onDoubleTap?: () => void;
  onPinch?: (scale: number) => void;
}

const SWIPE_THRESHOLD = 50;
const LONG_PRESS_DURATION = 500;

/**
 * Hook for detecting touch gestures (swipe, long-press, double-tap)
 * Provides mobile-friendly interaction feedback
 */
export const useGestureDetection = (
  ref: RefObject<HTMLElement>,
  callbacks: GestureCallbacks = {}
): { isPressed: boolean; scale: number } => {
  const [isPressed, setIsPressed] = useState(false);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTapTime = 0;
    let longPressTimer: ReturnType<typeof setTimeout> | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
      touchStartTime = Date.now();
      setIsPressed(true);

      // Long press detection
      longPressTimer = setTimeout(() => {
        if (callbacks.onLongPress) {
          callbacks.onLongPress();
        }
      }, LONG_PRESS_DURATION);

      // Double tap detection
      const now = Date.now();
      if (now - lastTapTime < 300) {
        if (callbacks.onDoubleTap) {
          callbacks.onDoubleTap();
        }
        lastTapTime = 0;
      } else {
        lastTapTime = now;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && callbacks.onPinch) {
        // Pinch detection
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];

        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        const currentDistance = Math.sqrt(dx * dx + dy * dy);

        // Store initial distance for scale calculation (simplified)
        const touchStartDistance = 100; // Baseline
        const newScale = currentDistance / touchStartDistance;
        setScale(Math.max(0.5, Math.min(newScale, 3))); // Constrain scale 0.5-3x
      }

      // Clear long press if moving
      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      setIsPressed(false);
      setScale(1);

      if (longPressTimer) {
        clearTimeout(longPressTimer);
        longPressTimer = null;
      }

      const touch = e.changedTouches[0];
      const touchEndX = touch.clientX;
      const touchEndY = touch.clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;
      const touchDuration = Date.now() - touchStartTime;

      // Swipe detection (only if not a long press)
      if (touchDuration < LONG_PRESS_DURATION) {
        if (Math.abs(deltaX) > SWIPE_THRESHOLD && Math.abs(deltaY) < SWIPE_THRESHOLD / 2) {
          // Horizontal swipe
          if (callbacks.onSwipe) {
            callbacks.onSwipe(deltaX > 0 ? 'right' : 'left');
          }
        } else if (Math.abs(deltaY) > SWIPE_THRESHOLD && Math.abs(deltaX) < SWIPE_THRESHOLD / 2) {
          // Vertical swipe
          if (callbacks.onSwipe) {
            callbacks.onSwipe(deltaY > 0 ? 'down' : 'up');
          }
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      if (longPressTimer) {
        clearTimeout(longPressTimer);
      }
    };
  }, [ref, callbacks]);

  return { isPressed, scale };
};
