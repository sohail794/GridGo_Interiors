import { useState, useEffect } from 'react';
import { Quote } from 'lucide-react';
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
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-luxury animate-fade-in">
        <Quote size={48} className="text-emerald mb-6" />
        <p className="font-sans text-xl md:text-2xl text-charcoal mb-8 italic leading-relaxed">
          "{currentTestimonial.quote}"
        </p>
        <div className="flex items-center">
          {!currentTestimonial.image && (
            <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mr-4">
              <span className="text-2xl font-bold text-emerald">
                {currentTestimonial.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <p className="font-sans font-bold text-charcoal">{currentTestimonial.name}</p>
            <p className="font-sans text-silver">{currentTestimonial.location}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-emerald w-8' : 'bg-silver w-2'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
