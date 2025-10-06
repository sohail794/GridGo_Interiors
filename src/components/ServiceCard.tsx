import { Wrench, Square, Gem, Armchair, Palette, Paintbrush, ArrowRight } from 'lucide-react';
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
    <div className="bg-white p-8 rounded-lg shadow-luxury hover:shadow-luxury-hover transition-all duration-300 group cursor-pointer">
      <div className="text-emerald mb-4 group-hover:scale-110 transition-transform">
        <Icon size={48} />
      </div>
      <h3 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-emerald transition-colors">
        {service.title}
      </h3>
      <p className="font-sans text-charcoal mb-6">{service.description}</p>
      <button
        onClick={() => onNavigate('services')}
        className="text-emerald font-sans font-semibold inline-flex items-center group-hover:gap-2 transition-all"
      >
        Learn More
        <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
