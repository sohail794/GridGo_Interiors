import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { submitContactForm } from '../lib/supabase';
import { Wrench, Square, Gem, Armchair, Palette, Paintbrush } from 'lucide-react';
import { services } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';

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

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Tailored Interior
            <br />
            <span className="gradient-text">Mastery</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#b4b4b4]">
            Comprehensive solutions for every vision
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">
              End-to-end interior solutions with expert execution
            </p>
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
                    isExpanded ? 'border-[#00ff88]/50' : ''
                  }`}
                >
                  <button
                    onClick={() => toggleService(service.id)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <div className="flex items-center flex-1">
                      <div className="w-16 h-16 rounded-xl bg-[#00ff88]/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Icon className="text-[#00ff88]" size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {service.title}
                        </h3>
                        <p className="text-[#b4b4b4]">{service.description}</p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="text-[#00ff88] ml-4 flex-shrink-0" size={28} />
                    ) : (
                      <ChevronDown className="text-[#00ff88] ml-4 flex-shrink-0" size={28} />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in">
                      <p className="text-[#b4b4b4] mb-6 leading-relaxed">
                        {service.details}
                      </p>
                      <h4 className="font-bold text-white mb-4">Key Features:</h4>
                      <ul className="space-y-3">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle
                              className="text-[#00ff88] mr-3 flex-shrink-0 mt-1"
                              size={20}
                            />
                            <span className="text-[#b4b4b4]">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#141b2d]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">A proven approach to perfection</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#00ff88] to-[#00b894] rounded-full flex items-center justify-center shadow-3d">
                  <span className="text-2xl font-bold text-[#0a0e27]">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-[#b4b4b4]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-3xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Request a <span className="gradient-text">Service Quote</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">Let's discuss your project requirements</p>
          </div>

          <GlassCard>
            {submitSuccess && (
              <div className="mb-6 p-4 bg-[#00ff88]/10 border border-[#00ff88]/30 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-[#00ff88]" size={24} />
                <div>
                  <p className="text-white font-semibold">Request submitted successfully!</p>
                  <p className="text-sm text-[#b4b4b4]">We'll contact you soon to discuss your project.</p>
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
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    minLength={2}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none min-h-[44px]"
                    placeholder="Your name"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none min-h-[44px]"
                    placeholder="your@email.com"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none min-h-[44px]"
                    placeholder="+91 XXXXX XXXXX"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                    Service of Interest
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none min-h-[44px]"
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
                <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                  Project Details
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none resize-none"
                  placeholder="Tell us about your project..."
                  disabled={isSubmitting}
                />
              </div>

              <Button3D type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </Button3D>
            </form>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
