import { useRef } from 'react';
import { Project } from '../types';
import { useMouseParallax } from '../hooks/useMouseParallax';
import GlassCard from './GlassCard';
import Button3D from './Button3D';

interface PortfolioCardProps {
  project: Project;
  isImageLoading: boolean;
  onSelect: (project: Project) => void;
  onImageLoad: (projectId: string) => void;
}

export default function PortfolioCard({
  project,
  isImageLoading,
  onSelect,
  onImageLoad,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const parallaxOffset = useMouseParallax(cardRef, 8);

  return (
    <div ref={cardRef} onClick={() => onSelect(project)}>
      <GlassCard
        padding="sm"
        className="group cursor-pointer touch-manipulation hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ease-out"
      >
        <div className="relative overflow-hidden rounded-lg mb-4">
          <div
            ref={imageRef}
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${parallaxOffset.y * 0.5}deg) rotateY(${parallaxOffset.x * 0.5}deg)`,
            }}
          >
            {isImageLoading && (
              <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg flex items-center justify-center z-10">
                <div className="w-12 h-12 border-4 border-brand-emerald/20 border-t-brand-emerald rounded-full animate-spin" />
              </div>
            )}
            <img
              src={project.image}
              alt={`${project.title} - ${project.category} interior design project`}
              className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
              onLoad={() => onImageLoad(project.id)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
              <Button3D size="sm" variant="ghost">
                View Details
              </Button3D>
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
