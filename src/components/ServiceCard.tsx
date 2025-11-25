import { useState } from 'react';
import { Wrench, Square, Gem, Armchair, Palette, Paintbrush, ArrowRight, X } from 'lucide-react';
import Card from './ui/Card';
import { Service } from '../types';

const iconMap = {
  Wrench,
  Square,
  Gem,
  Armchair,
  Palette,
  Paintbrush,
};

interface ServiceCardProps {
  service: Service;
  onNavigate: (page: string) => void;
}

export default function ServiceCard({ service, onNavigate }: ServiceCardProps) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    if (service.gallery) {
      setLightboxIndex((prev) => (prev + 1) % service.gallery!.length);
    }
  };

  const handlePrevImage = () => {
    if (service.gallery) {
      setLightboxIndex((prev) => (prev - 1 + service.gallery!.length) % service.gallery!.length);
    }
  };

  return (
    <>
      <Card padding="lg" glass hover className="group cursor-pointer flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-xl">
        {/* Gallery Grid */}
        {service.gallery && service.gallery.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6 rounded-lg overflow-hidden">
            {service.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className="relative aspect-square group/img cursor-pointer"
                onClick={() => handleImageClick(idx)}
                aria-label={`View ${service.title} image ${idx + 1}`}
              >
                <img
                  src={img}
                  alt={`${service.title} example ${idx + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover/img:scale-110"
                  style={{
                    filter: 'brightness(0.9) contrast(1.05) saturate(1.1)',
                  }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-[11px] text-white font-semibold">View</span>
                </div>
              </button>
            ))}
          </div>
        )}

        <div className="text-brand-emerald mb-6 group-hover:scale-110 group-hover:text-brand-cyan transition-all duration-200">
          <Icon size={48} aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-brand-emerald transition-colors duration-200">
          {service.title}
        </h3>
        <p className="text-text-secondary mb-6 leading-relaxed flex-grow">{service.description}</p>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={() => onNavigate('services')}
            className="text-brand-emerald font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-200 focus-ring rounded px-1 py-1 hover:scale-105"
            aria-label={`Learn more about ${service.title}`}
          >
            Learn More
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </button>
          
          {service.gallery && service.gallery.length > 0 && (
            <button
              onClick={() => onNavigate('portfolio')}
              className="text-text-tertiary text-sm font-medium inline-flex items-center gap-2 hover:text-brand-cyan transition-all duration-200 focus-ring rounded px-1 py-1"
              aria-label={`View ${service.title} projects`}
            >
              View {service.title} Projects
              <ArrowRight size={14} aria-hidden="true" />
            </button>
          )}
        </div>
      </Card>

      {/* Lightbox Modal */}
      {lightboxOpen && service.gallery && service.gallery.length > 0 && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full border border-white/20 hover:border-white text-white hover:text-white transition-all flex items-center justify-center"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <img
              src={service.gallery[lightboxIndex]}
              alt={`${service.title} ${lightboxIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {/* Navigation */}
            {service.gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all flex items-center justify-center"
                  aria-label="Next image"
                >
                  →
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                  {lightboxIndex + 1} / {service.gallery.length}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
