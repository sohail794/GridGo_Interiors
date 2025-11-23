import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
import Button from '../components/ui/Button';
import { submitContactForm } from '../lib/supabase';
import { CONTACT } from '../config/contact';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import FormLabel from '../components/ui/FormLabel';
import FormInput from '../components/ui/FormInput';
import FormTextarea from '../components/ui/FormTextarea';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitContactForm({
        ...formData,
        form_type: 'contact',
      });
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    ...(CONTACT.phone ? [{
      icon: Phone,
      title: 'Phone',
      content: CONTACT.phone,
      link: `tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`,
    }] : []),
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@gridgointeriors.com',
      link: 'mailto:hello@gridgointeriors.com',
    },
    ...(CONTACT.addressLabel ? [{
      icon: MapPin,
      title: 'Location',
      content: CONTACT.addressLabel,
      link: CONTACT.mapsUrl || null,
    }] : []),
    {
      icon: Clock,
      title: 'Working Hours',
      content: 'Mon-Sat: 9AM - 7PM',
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 to-black/50" />

        <div className="relative z-10 text-center">
          <Container maxWidth="lg">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Ready to transform your space? We're here to help
            </p>
          </Container>
        </div>
      </section>

      <Section spacing="lg" background="none">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  <span className="gradient-text">Get in Touch</span>
                </h2>
                <p className="text-lg text-text-secondary">
                  Have a project in mind? Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <GlassCard key={index} hover={false} padding="sm">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={24} className="text-brand-emerald" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-text-secondary hover:text-brand-emerald transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-text-secondary">{info.content}</p>
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>

              <div className="relative h-64 rounded-2xl overflow-hidden shadow-card-hover">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709658!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra%2C%20India!5e0!3m2!1sen!2sus!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="GridGo Interiors Location"
                />
              </div>
            </div>

            <div>
              <Card padding="lg" glass>
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-brand-emerald/10 border border-brand-emerald/30 rounded-lg flex items-center gap-3">
                    <CheckCircle className="text-brand-emerald" size={24} />
                    <div>
                      <p className="text-white font-semibold">Thank you for reaching out!</p>
                      <p className="text-sm text-text-secondary">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
                {submitError && (
                  <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <p className="text-red-400">{submitError}</p>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <FormLabel htmlFor="email" required>
                        Email
                      </FormLabel>
                      <FormInput
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <FormLabel htmlFor="phone">
                        Phone
                      </FormLabel>
                      <FormInput
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Enter your phone number"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div>
                    <FormLabel htmlFor="subject">
                      Subject
                    </FormLabel>
                    <FormInput
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="How can we help?"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <FormLabel htmlFor="message" required>
                      Message
                    </FormLabel>
                    <FormTextarea
                      id="message"
                      required
                      minLength={10}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      disabled={isSubmitting}
                    />
                  </div>

                  <Button variant="primary" size="lg" type="submit" className="w-full" loading={isSubmitting} disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
