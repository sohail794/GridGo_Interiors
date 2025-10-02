import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { Wrench, Square, Gem, Armchair, Palette, Paintbrush } from 'lucide-react';
import { services } from '../data/content';

const iconMap = {
  Wrench,
  Square,
  Gem,
  Armchair,
  Palette,
  Paintbrush,
};

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Service inquiry:', formData);
    alert('Thank you! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <div className="pt-20">
      <section className="relative h-80 bg-gradient-to-r from-emerald to-emerald-light">
        <div className="relative h-full flex items-center justify-center px-4">
          <h1 className="font-serif italic text-5xl md:text-6xl text-white text-center">
            Tailored Interior Mastery
            <br />
            <span className="text-silver-light">for Every Vision</span>
          </h1>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl text-emerald mb-4">Our Services</h2>
            <p className="font-sans text-lg text-charcoal">
              Comprehensive interior solutions with end-to-end execution
            </p>
          </div>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;
              const isExpanded = expandedService === service.id;

              return (
                <div
                  key={service.id}
                  className="bg-white border-2 border-silver-light rounded-lg overflow-hidden shadow-luxury hover:shadow-luxury-hover transition-all"
                >
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center flex-1">
                      <Icon className="text-emerald mr-4 flex-shrink-0" size={32} />
                      <div>
                        <h3 className="font-serif text-2xl text-charcoal mb-1">
                          {service.title}
                        </h3>
                        <p className="font-sans text-silver">{service.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-emerald ml-4 flex-shrink-0" size={28} />
                    ) : (
                      <ChevronDown className="text-emerald ml-4 flex-shrink-0" size={28} />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 border-t-2 border-silver-light pt-6 animate-fade-in">
                      <p className="font-sans text-charcoal mb-6 leading-relaxed">
                        {service.details}
                      </p>
                      <h4 className="font-sans font-bold text-charcoal mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle
                              className="text-emerald mr-2 flex-shrink-0 mt-1"
                              size={20}
                            />
                            <span className="font-sans text-charcoal">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-silver-light">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-emerald mb-12 text-center">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Idea Gathering</h3>
              <p className="font-sans text-sm text-charcoal">
                Understanding your vision, requirements, and preferences
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Concept Development</h3>
              <p className="font-sans text-sm text-charcoal">
                Creating detailed designs and material selections
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Build & Install</h3>
              <p className="font-sans text-sm text-charcoal">
                Expert execution with quality materials and craftsmanship
              </p>
            </div>
            <div className="text-center">
              <div className="bg-emerald text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-2">Final Reveal</h3>
              <p className="font-sans text-sm text-charcoal">
                Handover your transformed space with complete satisfaction
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl text-emerald mb-8 text-center">
            Request a Service Quote
          </h2>
          <form onSubmit={handleSubmit} className="bg-silver-light p-8 rounded-lg shadow-luxury">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-sans font-semibold text-charcoal mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans font-semibold text-charcoal mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-sans font-semibold text-charcoal mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block font-sans font-semibold text-charcoal mb-2">
                  Service of Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block font-sans font-semibold text-charcoal mb-2">
                Project Details
              </label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald hover:bg-emerald-dark text-white px-8 py-4 rounded-md font-sans font-bold text-lg transition-colors"
            >
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
