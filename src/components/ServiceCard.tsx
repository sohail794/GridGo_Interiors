import { Wrench, Square, Gem, Armchair, Palette, Paintbrush, ArrowRight } from 'lucide-react';
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

  return (
    <Card padding="lg" glass hover className="group cursor-pointer flex flex-col h-full transition-all duration-200 ease-out hover:-translate-y-2 hover:shadow-xl">
      <div className="text-brand-emerald mb-6 group-hover:scale-110 group-hover:text-brand-cyan transition-all duration-200">
        <Icon size={48} aria-hidden="true" />
      </div>
      <h3 className="text-2xl font-bold text-text-primary mb-3 group-hover:text-brand-emerald transition-colors duration-200">
        {service.title}
      </h3>
      <p className="text-text-secondary mb-8 leading-relaxed flex-grow">{service.description}</p>
      <button
        onClick={() => onNavigate('services')}
        className="text-brand-emerald font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all duration-200 focus-ring rounded px-1 py-1 hover:scale-105"
        aria-label={`Learn more about ${service.title}`}
      >
        Learn More
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
      </button>
    </Card>
  );
}
