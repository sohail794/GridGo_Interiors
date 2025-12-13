import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Card from './ui/Card';
import { Testimonial } from '../types';
import { useGestureDetection } from '../hooks/useGestureDetection';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  const prefersReducedMotion = useReducedMotion();
  const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };
  
  // Handle swipe gestures
  useGestureDetection(cardRef, {
    onSwipe: (direction) => {
      if (direction === 'left') {
        // Swipe left = next testimonial
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      } else if (direction === 'right') {
        // Swipe right = previous testimonial
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      }
    },
  });

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }
    };

    const container = cardRef.current;
    if (container) {
      container.setAttribute('tabindex', '0');
      container.addEventListener('keydown', handleKeyDown);
      return () => container.removeEventListener('keydown', handleKeyDown);
    }
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length, isPaused]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div
        ref={cardRef}
        className="gesture-interactive"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
            transition={prefersReducedMotion ? undefined : transition}
          >
            <Card padding="lg" glass hover>
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.05 }}
                aria-hidden="true"
              >
                <Quote size={48} className="text-brand-gold mb-6 transition-transform duration-300" />
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-text-primary mb-8 italic leading-relaxed"
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.1 }}
              >
                "{currentTestimonial.quote}"
              </motion.p>

              <motion.div
                className="flex items-center gap-4"
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.15 }}
              >
                {currentTestimonial.image ? (
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-radius-xl object-cover flex-shrink-0 border-2 border-brand-gold/25 hover:scale-110 hover:border-brand-gold/50 transition-all duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-radius-xl flex-shrink-0 bg-gradient-to-br from-brand-gold to-brand-gold-deep flex items-center justify-center shadow-luxury-gold hover:scale-110 transition-transform duration-300">
                    <span className="text-xl font-bold text-background-primary">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-bold text-text-primary text-lg">{currentTestimonial.name}</p>
                  <p className="text-text-secondary text-sm">{currentTestimonial.location}</p>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center mt-8 gap-2" ref={indicatorsRef} role="tablist" aria-label="Testimonial slides">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center transition-all duration-300 focus-ring rounded-full active:scale-90 ${
              index === currentIndex 
                ? '' 
                : ''
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
          >
            <span className={`block rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-brand-gold w-8 h-2 shadow-luxury-gold' 
                : 'bg-text-tertiary/50 w-2 h-2 hover:bg-text-tertiary'
            }`} />
          </button>
        ))}
      </div>
    </div>
  );
}