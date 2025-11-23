import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Card from './ui/Card';
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
      <Card padding="none" glass hover className="overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div
            className="h-96 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundImage: `url(${currentProject.image})` }}
            role="img"
            aria-label={`Project image: ${currentProject.title}`}
          />
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <span className="inline-block bg-brand-emerald text-background-primary px-4 py-2 rounded-radius-md text-sm font-semibold mb-4 w-fit">
              {currentProject.category.charAt(0).toUpperCase() + currentProject.category.slice(1)}
            </span>
            <h3 className="text-3xl font-bold text-text-primary mb-4">{currentProject.title}</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">{currentProject.description}</p>
            <div className="space-y-3 mb-8">
              <p className="text-sm text-text-tertiary">
                <span className="font-semibold text-text-primary">Location:</span>{' '}
                {currentProject.location}
              </p>
              <p className="text-sm text-text-tertiary">
                <span className="font-semibold text-text-primary">Timeline:</span>{' '}
                {currentProject.timeline}
              </p>
            </div>
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-brand-emerald font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 focus-ring rounded px-1 py-1"
            >
              Explore Portfolio
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Card>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 tap-target bg-background-secondary/80 hover:bg-brand-emerald/20 text-brand-emerald p-3 rounded-radius-lg border border-brand-emerald/30 hover:border-brand-emerald/60 shadow-lg transition-all duration-300 focus-ring z-10"
        aria-label="Previous project"
      >
        <ChevronLeft size={24} aria-hidden="true" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 tap-target bg-background-secondary/80 hover:bg-brand-emerald/20 text-brand-emerald p-3 rounded-radius-lg border border-brand-emerald/30 hover:border-brand-emerald/60 shadow-lg transition-all duration-300 focus-ring z-10"
        aria-label="Next project"
      >
        <ChevronRight size={24} aria-hidden="true" />
      </button>

      <div className="flex justify-center mt-8 gap-3" role="tablist" aria-label="Project slides">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-radius-md transition-all duration-300 focus-ring ${
              index === currentIndex 
                ? 'bg-brand-emerald w-8' 
                : 'bg-text-tertiary/50 w-2 hover:bg-text-tertiary'
            }`}
            aria-label={`Go to project ${index + 1}`}
            role="tab"
            aria-selected={index === currentIndex}
          />
        ))}
      </div>
    </div>
  );

