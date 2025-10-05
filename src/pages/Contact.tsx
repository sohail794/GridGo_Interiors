import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form:', formData);
    alert('Thank you! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 (XXX) XXX-XXXX',
      link: 'tel:+91XXXXXXXXXX',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@gridgointeriors.com',
      link: 'mailto:hello@gridgointeriors.com',
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Mumbai, India',
      link: null,
    },
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

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Let's <span className="gradient-text">Connect</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#b4b4b4]">
            Ready to transform your space? We're here to help
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">
                  <span className="gradient-text">Get in Touch</span>
                </h2>
                <p className="text-lg text-[#b4b4b4]">
                  Have a project in mind? Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <GlassCard key={index} hover={false} padding="sm">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#00ff88]/10 flex items-center justify-center flex-shrink-0">
                          <Icon size={24} className="text-[#00ff88]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white mb-1">{info.title}</h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              className="text-[#b4b4b4] hover:text-[#00ff88] transition-colors"
                            >
                              {info.content}
                            </a>
                          ) : (
                            <p className="text-[#b4b4b4]">{info.content}</p>
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
              <GlassCard>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                        placeholder="+91 XXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-[#b4b4b4]">
                      Message *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/20 transition-all outline-none resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <Button3D type="submit" className="w-full" size="lg">
                    Send Message
                  </Button3D>
                </form>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
