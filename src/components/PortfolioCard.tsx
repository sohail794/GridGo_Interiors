import { useRef } from 'react';
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
