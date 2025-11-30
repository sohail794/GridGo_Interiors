import { useRef, useState } from 'react';
import { Project } from '../types';
import { useMouseParallax } from '../hooks/useMouseParallax';
import GlassCard from './GlassCard';

interface PortfolioCardProps {
  project: Project;
  isImageLoading: boolean;
  onSelect: (project: Project) => void;
  onImageLoad: (projectId: string) => void;
}

export default function PortfolioCard({
  project,
  onSelect,
  onImageLoad,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const parallaxOffset = useMouseParallax(cardRef, 8);

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoad(project.id);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelect(project)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
    >
      <GlassCard
        padding="sm"
        className="group cursor-pointer touch-manipulation hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ease-out"
      >
        <div className="relative overflow-hidden rounded-lg mb-4" style={{ aspectRatio: '4/3' }}>
          <div
            ref={imageRef}
            className="transition-transform duration-300 ease-out h-full"
            style={{
              transform: `perspective(1000px) rotateX(${parallaxOffset.y * 0.5}deg) rotateY(${parallaxOffset.x * 0.5}deg)`,
            }}
          >
            {/* Blur placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse z-10 flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-brand-emerald/20 border-t-brand-emerald rounded-full animate-spin" />
              </div>
            )}
            <img
              src={project.image}
              alt={`${project.title} - ${project.category} interior design project`}
              width={800}
              height={600}
              className={`w-full h-80 object-cover group-hover:scale-110 transition-all duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={handleImageLoad}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 group-active:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-6">
              <span className="inline-flex items-center gap-1 text-brand-emerald font-semibold text-sm">
                View Project Details →
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-emerald/10 text-brand-emerald rounded-full">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
          <p className="text-text-secondary flex items-center gap-2">
            📍 {project.location}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
