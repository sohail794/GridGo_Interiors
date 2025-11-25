import { useState, useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import Card from './ui/Card';
import { Testimonial } from '../types';
import { useScrollRevealItem } from '../hooks/useScrollReveal';
import { useGestureDetection } from '../hooks/useGestureDetection';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);
  
  // Use scroll reveal for testimonial card
  useScrollRevealItem(cardRef, 0, { threshold: 0.4, duration: 600, distance: 30 });

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <div ref={cardRef} className="gesture-interactive">
        <Card padding="lg" glass hover style={{ animation: 'fadeInUp 600ms ease-out forwards' }}>
          <Quote size={48} className="text-brand-emerald mb-6 hover:scale-110 transition-transform duration-300" style={{ animation: 'fadeIn 600ms ease-out 200ms forwards, glowPulse 3s ease-in-out 500ms infinite' }} aria-hidden="true" />
          <p className="text-xl md:text-2xl text-text-primary mb-8 italic leading-relaxed" style={{ animation: 'fadeInUp 600ms ease-out 300ms forwards' }}>
            "{currentTestimonial.quote}"
          </p>
          <div className="flex items-center gap-4" style={{ animation: 'fadeInUp 600ms ease-out 400ms forwards' }}>
            {currentTestimonial.image && (
              <img
                src={currentTestimonial.image}
                alt={currentTestimonial.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-radius-xl object-cover flex-shrink-0 border-2 border-brand-emerald/30 hover:scale-110 hover:border-brand-emerald transition-all duration-300"
                loading="lazy"
              />
            )}
            <div>
              <p className="font-bold text-text-primary text-lg">{currentTestimonial.name}</p>
              <p className="text-text-secondary text-sm">{currentTestimonial.location}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center mt-8 gap-3" ref={indicatorsRef} role="tablist" aria-label="Testimonial slides" style={{ animation: 'fadeInUp 600ms ease-out 500ms forwards' }}>
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-radius-md transition-all duration-300 focus-ring hover:scale-125 active:scale-95 ${
              index === currentIndex 
                ? 'bg-brand-emerald w-8 shadow-lg shadow-brand-emerald/50' 
                : 'bg-text-tertiary/50 w-2 hover:bg-text-tertiary'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
            style={{ animation: 'fadeInUp 600ms ease-out forwards', animationDelay: `${550 + index * 50}ms` }}
          />
        ))}
      </div>
    </div>
  );
}