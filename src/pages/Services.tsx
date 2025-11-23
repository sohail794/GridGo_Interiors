import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../lib/supabase';
import { Wrench, Square, Gem, Armchair, Palette, Paintbrush } from 'lucide-react';
import { services } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        service: formData.service,
        form_type: 'service_quote',
      });
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const processSteps = [
    {
      number: '01',
      title: 'Idea Gathering',
      description: 'Understanding your vision, requirements, and preferences',
    },
    {
      number: '02',
      title: 'Concept Development',
      description: 'Creating detailed designs and material selections',
    },
    {
      number: '03',
      title: 'Build & Install',
      description: 'Expert execution with quality materials and craftsmanship',
    },
    {
      number: '04',
      title: 'Final Reveal',
      description: 'Handover your transformed space with complete satisfaction',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 to-black/50" />

        <div className="relative z-10 text-center">
          <Container maxWidth="lg">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Tailored Interior
              <br />
              <span className="gradient-text">Mastery</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Comprehensive solutions for every vision
            </p>
          </Container>
        </div>
      </section>

      <Section spacing="lg" background="none">
        <Container>
          <div className="text-center mb-16">
            <SectionHeader 
              title="Our Services"
              subtitle="End-to-end interior solutions with expert execution"
              align="center"
            />
          </div>

          <div className="space-y-4">
            {services.map((service) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap] || Wrench;
              const isExpanded = expandedService === service.id;

              return (
                <GlassCard
                  key={service.id}
                  hover={false}
                  className={`transition-all duration-300 ${
                    isExpanded ? 'border-brand-emerald/50' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center flex-1">
                      <div className="w-16 h-16 rounded-xl bg-brand-emerald/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon className="text-brand-emerald" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-text-secondary">{service.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-brand-emerald ml-4 flex-shrink-0" size={28} />
                    ) : (
                      <ChevronDown className="text-brand-emerald ml-4 flex-shrink-0" size={28} />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in">
                      <p className="text-text-secondary mb-6 leading-relaxed">
                        {service.details}
                      </p>
                      <h4 className="font-bold text-white mb-4">Key Features:</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle
                              className="text-brand-emerald mr-3 flex-shrink-0 mt-1"
                              size={20}
                            />
                            <span className="text-text-secondary">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="secondary">
        <Container>
          <div className="text-center mb-16">
            <SectionHeader 
              title="Our Process"
              subtitle="A proven approach to perfection"
              align="center"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-brand-emerald to-brand-emerald/60 rounded-full flex items-center justify-center shadow-3d">
                  <span className="text-2xl font-bold text-background-primary">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-text-secondary">{step.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="none">
        <Container maxWidth="md">
          <div className="text-center mb-12">
            <SectionHeader 
              title="Request a Service Quote"
              subtitle="Let's discuss your project requirements"
              align="center"
            />
          </div>

          <Card padding="lg" glass>
            {submitSuccess && (
              <div className="mb-6 p-4 bg-brand-emerald/10 border border-brand-emerald/30 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-brand-emerald" size={24} />
                <div>
                  <p className="text-white font-semibold">Request submitted successfully!</p>
                  <p className="text-sm text-text-secondary">We'll contact you soon to discuss your project.</p>
                </div>
              </div>
            )}
            {submitError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <p className="text-red-400">{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none min-h-[44px]"
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none min-h-[44px]"
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none min-h-[44px]"
                    placeholder="Enter your phone number"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none min-h-[44px]"
                    disabled={isSubmitting}
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

              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-brand-emerald focus:ring-2 focus:ring-brand-emerald/20 transition-all outline-none resize-none"
                  placeholder="Tell us about your project..."
                  disabled={isSubmitting}
                />
              </div>

              <Button variant="primary" type="submit" className="w-full py-3" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
