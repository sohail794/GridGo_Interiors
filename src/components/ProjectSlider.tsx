import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectSliderProps {
  projects: Project[];
  onNavigate: (page: string) => void;
}

export default function ProjectSlider({ projects, onNavigate }: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative">
      <div className="bg-white rounded-lg shadow-luxury overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="h-96 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentProject.image})` }}
          />
          <div className="p-8 flex flex-col justify-center">
            <span className="inline-block bg-emerald text-white px-3 py-1 rounded-full text-sm font-sans font-semibold mb-4 w-fit">
              {currentProject.category.charAt(0).toUpperCase() +
                currentProject.category.slice(1)}
            </span>
            <h3 className="font-serif text-3xl text-charcoal mb-4">{currentProject.title}</h3>
            <p className="font-sans text-charcoal mb-4">{currentProject.description}</p>
            <div className="space-y-2 mb-6">
              <p className="font-sans text-sm text-silver">
                <span className="font-semibold text-charcoal">Location:</span>{' '}
                {currentProject.location}
              </p>
              <p className="font-sans text-sm text-silver">
                <span className="font-semibold text-charcoal">Timeline:</span>{' '}
                {currentProject.timeline}
              </p>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-emerald font-sans font-semibold inline-flex items-center hover:gap-2 transition-all"
            >
              Explore Portfolio
              <ArrowRight size={18} className="ml-1" />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-emerald p-3 rounded-full shadow-luxury transition-all"
        aria-label="Previous project"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-emerald p-3 rounded-full shadow-luxury transition-all"
        aria-label="Next project"
      >
        <ChevronRight size={24} />
      </button>

      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-emerald w-8' : 'bg-silver w-2'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
