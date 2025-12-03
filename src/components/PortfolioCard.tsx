import { useRef, useState } from 'react';
import { Project } from '../types';
import GlassCard from './GlassCard';

interface PortfolioCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export default function PortfolioCard({
  project,
  onSelect,
}: PortfolioCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
    });
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      style={{ ...tiltStyle, transition: 'transform 0.15s ease-out' }}
    >
      <GlassCard
        padding="sm"
        className="group cursor-pointer touch-manipulation transition-shadow duration-200 ease-out hover:shadow-xl"
      >
        <div className="relative overflow-hidden rounded-lg mb-4 h-64">
          {project.image ? (
            <img
              src={project.image}
              alt={`${project.title} - ${project.category} interior design project`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-neutral-900/30 flex items-center justify-center">
              <span className="text-text-tertiary text-sm">Image placeholder</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <span className="inline-flex items-center gap-1 text-brand-emerald font-semibold text-sm">
              View Project Details →
            </span>
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
