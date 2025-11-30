import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../lib/supabase';
import { Wrench, Square, Gem, Armchair, Palette, Paintbrush } from 'lucide-react';
import { services } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import FormLabel from '../components/ui/FormLabel';
import FormInput from '../components/ui/FormInput';
import FormSelect from '../components/ui/FormSelect';
import FormTextarea from '../components/ui/FormTextarea';
import { useScrollRevealStagger, useScrollRevealItem } from '../hooks/useScrollReveal';
import { useFormValidation } from '../hooks/useFormValidation';

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

export default function Services({ onNavigate: _onNavigate }: ServicesProps) {
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
  
  const { errors, validate, validateAll, clearError } = useFormValidation();
  
  // Scroll reveal refs
  const servicesGridRef = useRef<HTMLDivElement>(null);
  const processGridRef = useRef<HTMLDivElement>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);
  
  // Use scroll reveal hooks
  useScrollRevealStagger(servicesGridRef, {
    threshold: 0.2,
    staggerDelay: 75,
    duration: 600,
    distance: 30,
  });
  
  useScrollRevealStagger(processGridRef, {
    threshold: 0.2,
    staggerDelay: 100,
    duration: 600,
    distance: 30,
  });
  
  useScrollRevealItem(formSectionRef, 0, {
    threshold: 0.2,
    duration: 600,
    distance: 30,
    delay: 100,
  });

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const validationRules = {
      name: { required: true, minLength: 2, maxLength: 100 },
      email: { required: true, email: true },
      phone: { indianPhone: true },
      message: { required: true, minLength: 10, maxLength: 500 },
    };
    
    const validationErrors = validateAll(formData, validationRules);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
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
      setSubmitError('Failed to send. Please try again.');
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
        {/* Background Image Layer - Placeholder */}
        <div
          className="absolute inset-0 z-0 bg-neutral-900/50"
          aria-hidden="true"
        />
        
        {/* Navy overlay for brand consistency */}
        <div 
          className="absolute inset-0 z-0 bg-[#0A0E27]/50" 
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden="true"
        />

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

          <div className="space-y-4" ref={servicesGridRef}>
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
                    className="w-full flex items-center justify-between text-left py-1 min-h-[64px] transition-colors rounded-lg"
                    aria-expanded={isExpanded}
                    aria-controls={`service-content-${service.id}`}
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
                      {/* Service Gallery */}
                      {service.gallery && service.gallery.length > 0 && (
                        <div className="mb-8">
                          <h4 className="font-bold text-white mb-4">Project Gallery</h4>
                          <div className="grid grid-cols-3 gap-4 mb-6">
                            {service.gallery.map((image, idx) => (
                              <div
                                key={idx}
                                className="relative w-full h-24 rounded-lg overflow-hidden"
                              >
                                {image ? (
                                  <img
                                    src={image}
                                    alt={`${service.title} example ${idx + 1}`}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-neutral-900/30" />
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="border-b border-white/10 mb-6" />
                        </div>
                      )}
                      
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" ref={processGridRef}>
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
        <div ref={formSectionRef}>
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
              <div
                className="mb-6 p-4 bg-brand-emerald/10 border border-brand-emerald/30 rounded-lg flex items-center gap-3"
                role="status"
                aria-live="polite"
                aria-atomic="true"
              >
                <CheckCircle className="text-brand-emerald" size={24} />
                <div>
                  <p className="text-white font-semibold">Request submitted successfully!</p>
                  <p className="text-sm text-text-secondary">We'll contact you soon to discuss your project.</p>
                </div>
              </div>
            )}
            {submitError && (
              <div
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <p className="text-red-400">{submitError}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel htmlFor="name" required>
                    Name
                  </FormLabel>
                  <FormInput
                    id="name"
                    type="text"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      clearError('name');
                    }}
                    onBlur={() => validate('name', formData.name, { required: true, minLength: 2 })}
                    placeholder="Your name"
                    disabled={isSubmitting}
                    error={errors.name}
                    errorId="name-error"
                  />
                </div>
                <div>
                  <FormLabel htmlFor="email" required>
                    Email
                  </FormLabel>
                  <FormInput
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      clearError('email');
                    }}
                    onBlur={() => validate('email', formData.email, { required: true, email: true })}
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                    error={errors.email}
                    errorId="email-error"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FormLabel htmlFor="phone">
                    Phone (10-digit Indian mobile)
                  </FormLabel>
                  <FormInput
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      // Only allow digits
                      const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({ ...formData, phone: cleaned });
                      clearError('phone');
                    }}
                    onBlur={() => validate('phone', formData.phone, { indianPhone: true })}
                    placeholder="98765 43210"
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number starting with 6-9"
                    inputMode="numeric"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    error={errors.phone}
                    errorId="phone-error"
                  />
                </div>
                <div>
                  <FormLabel htmlFor="service">
                    Service of Interest
                  </FormLabel>
                  <FormSelect
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                  </FormSelect>
                </div>
              </div>

              <div>
                <FormLabel htmlFor="message" required>
                  Project Details
                </FormLabel>
                <FormTextarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    clearError('message');
                  }}
                  onBlur={() => validate('message', formData.message, { required: true, minLength: 10, maxLength: 500 })}
                  placeholder="Tell us about your project..."
                  disabled={isSubmitting}
                  error={errors.message}
                  errorId="message-error"
                  showCharCount
                  charLimit={500}
                />
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Submit Request'}
              </Button>
            </form>
          </Card>
        </Container>
        </div>
      </Section>
    </div>
  );
}
