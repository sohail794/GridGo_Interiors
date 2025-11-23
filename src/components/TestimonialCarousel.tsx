import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
import Card from './ui/Card';
import { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="max-w-4xl mx-auto">
      <Card padding="lg" glass hover className="animate-fade-in">
        <Quote size={48} className="text-brand-emerald mb-6" aria-hidden="true" />
        <p className="text-xl md:text-2xl text-text-primary mb-8 italic leading-relaxed">
          "{currentTestimonial.quote}"
        </p>
        <div className="flex items-center gap-4">
          {currentTestimonial.image && (
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              className="w-16 h-16 rounded-radius-xl object-cover flex-shrink-0 border-2 border-brand-emerald/30"
              loading="lazy"
            />
          )}
          <div>
            <p className="font-bold text-text-primary text-lg">{currentTestimonial.name}</p>
            <p className="text-text-secondary text-sm">{currentTestimonial.location}</p>
          </div>
        </div>
      </Card>

      <div className="flex justify-center mt-8 gap-3" role="tablist" aria-label="Testimonial slides">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-radius-md transition-all duration-300 focus-ring ${
              index === currentIndex 
                ? 'bg-brand-emerald w-8' 
                : 'bg-text-tertiary/50 w-2 hover:bg-text-tertiary'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );
}