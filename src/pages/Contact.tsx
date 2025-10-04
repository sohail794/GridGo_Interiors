import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Award, Users, CheckCircle2 } from 'lucide-react';
import { ContactFormData } from '../types';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budgetRange: '',
    location: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Contact form submission:', formData);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        budgetRange: '',
        location: '',
        message: '',
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="relative h-80 bg-gradient-to-br from-emerald-dark via-emerald to-emerald-light">
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="font-serif italic text-5xl md:text-6xl mb-4">
              Begin Your Transformation
            </h1>
            <p className="font-sans text-xl text-silver-light">
              Let's create something extraordinary together
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-4xl text-emerald mb-8">Get in Touch</h2>

              {submitted && (
                <div className="bg-emerald/10 border-2 border-emerald rounded-lg p-4 mb-6 flex items-start animate-fade-in">
                  <CheckCircle2 className="text-emerald mr-3 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-sans font-bold text-emerald mb-1">Thank you!</p>
                    <p className="font-sans text-charcoal">
                      Your inquiry has been received. Our team will contact you within 24 hours.
                    </p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Your full name"
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
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans font-semibold text-charcoal mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                      placeholder="+91 XXX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label className="block font-sans font-semibold text-charcoal mb-2">
                      Project Type
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                    >
                      <option value="">Select type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="retail">Retail</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans font-semibold text-charcoal mb-2">
                      Budget Range
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                    >
                      <option value="">Select range</option>
                      <option value="under-10">Under ₹10 Lakhs</option>
                      <option value="10-25">₹10-25 Lakhs</option>
                      <option value="25-50">₹25-50 Lakhs</option>
                      <option value="50-plus">₹50 Lakhs+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans font-semibold text-charcoal mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans font-semibold text-charcoal mb-2">
                    Project Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors resize-none"
                    placeholder="Tell us about your project, requirements, and vision..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald hover:bg-emerald-dark text-white px-8 py-4 rounded-md font-sans font-bold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-serif text-3xl text-emerald mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Phone className="text-emerald mr-4 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-sans font-semibold text-charcoal">Phone</p>
                      <p className="font-sans text-charcoal">+91 859 500 7476</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Mail className="text-emerald mr-4 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-sans font-semibold text-charcoal">Email</p>
                      <p className="font-sans text-charcoal">info@gridgointeriors.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-emerald mr-4 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-sans font-semibold text-charcoal">Office Address</p>
                      <p className="font-sans text-charcoal">
                        Your Street Address
                        <br />
                        Your City, State - PIN
                        <br />
                        India
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-emerald mr-4 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="font-sans font-semibold text-charcoal">Business Hours</p>
                      <p className="font-sans text-charcoal">
                        Monday - Saturday: 9:00 AM - 7:00 PM
                        <br />
                        Sunday: By Appointment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-silver-light p-6 rounded-lg">
                <h4 className="font-serif text-2xl text-emerald mb-4">Why Choose GridGo?</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Award className="text-emerald mr-3 flex-shrink-0 mt-1" size={20} />
                    <p className="font-sans text-charcoal text-sm">
                      20+ years of excellence in luxury interiors
                    </p>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="text-emerald mr-3 flex-shrink-0 mt-1" size={20} />
                    <p className="font-sans text-charcoal text-sm">
                      200+ successful projects nationwide
                    </p>
                  </div>
                  <div className="flex items-start">
                    <Users className="text-emerald mr-3 flex-shrink-0 mt-1" size={20} />
                    <p className="font-sans text-charcoal text-sm">
                      Expert team of designers and craftsmen
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-luxury h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.2914536316566!2d77.2090212!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2daa9eb4d0b%3A0x717971125923e5d!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="GridGo Interiors Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
