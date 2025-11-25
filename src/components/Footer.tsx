import { useState } from 'react';
import { Instagram, Linkedin, Share2, Mail, Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import { CONTACT } from '../config/contact';
import Container from './ui/Container';
import Section from './ui/Section';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubscribeError('Email is required');
      return;
    }
    
    if (!validateEmail(email)) {
      setSubscribeError('Please enter a valid email address');
      return;
    }
    
    setIsSubscribing(true);
    setSubscribeError('');
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeSuccess(true);
      setEmail('');
      setTimeout(() => setSubscribeSuccess(false), 5000);
    } catch {
      setSubscribeError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-section-md pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Social */}
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-serif font-bold italic">
                GridGo <span className="text-brand-emerald">Interiors</span>
              </h3>
              <p className="text-sm text-silver-light mt-2">
                Crafting Dreams into Enduring Spaces for over 20 years.
              </p>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-wide text-silver mb-3 font-semibold">Follow Us</p>
              <div className="flex space-x-3">
                <a
                  href="https://x.com/GridGoInteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-silver/10 hover:bg-brand-emerald/20 text-silver hover:text-brand-emerald transition-all flex items-center justify-center"
                  aria-label="X (Twitter)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-silver/10 hover:bg-brand-emerald/20 text-silver hover:text-brand-emerald transition-all flex items-center justify-center"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-silver/10 hover:bg-brand-emerald/20 text-silver hover:text-brand-emerald transition-all flex items-center justify-center"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://pinterest.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-silver/10 hover:bg-brand-emerald/20 text-silver hover:text-brand-emerald transition-all flex items-center justify-center"
                  aria-label="Pinterest"
                >
                  <Share2 size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Navigation</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Blog', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-silver-light hover:text-brand-emerald transition-colors duration-200 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-brand-emerald rounded px-2 py-1"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Services</h4>
            <ul className="space-y-2 text-sm text-silver-light">
              <li className="hover:text-brand-emerald transition-colors">Steel Fabrication</li>
              <li className="hover:text-brand-emerald transition-colors">Glass Applications</li>
              <li className="hover:text-brand-emerald transition-colors">Marble Craftsmanship</li>
              <li className="hover:text-brand-emerald transition-colors">Bespoke Furniture</li>
              <li className="hover:text-brand-emerald transition-colors">Artistic Décor</li>
              <li className="hover:text-brand-emerald transition-colors">Premium Painting</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Get In Touch</h4>
            <ul className="space-y-3 text-sm text-silver-light">
              {CONTACT.phone && (
                <li className="flex items-start gap-2">
                  <Phone size={16} className="mt-0.5 flex-shrink-0 text-brand-emerald" />
                  <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="hover:text-brand-emerald transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 flex-shrink-0 text-brand-emerald" />
                <span>info@gridgointeriors.com</span>
              </li>
              {CONTACT.addressLabel && (
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-emerald" />
                  {CONTACT.mapsUrl ? (
                    <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-emerald transition-colors">
                      {CONTACT.addressLabel}
                    </a>
                  ) : (
                    <span>{CONTACT.addressLabel}</span>
                  )}
                </li>
              )}
            </ul>
            
            {/* Newsletter Form */}
            <div className="mt-6 pt-6 border-t border-silver-dark/30">
              <h5 className="font-semibold text-white mb-2 text-sm">Stay Updated</h5>
              <p className="text-xs text-silver-light mb-3">Get design tips and exclusive offers delivered to your inbox.</p>
              
              {subscribeSuccess ? (
                <div className="flex items-center gap-2 text-brand-emerald text-sm" role="status" aria-live="polite">
                  <CheckCircle size={16} />
                  <span>Subscribed! Check your email.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setSubscribeError('');
                      }}
                      placeholder="your@email.com"
                      disabled={isSubscribing}
                      className={`
                        flex-1 px-3 py-2 text-sm bg-white/5 border rounded-lg text-white placeholder:text-gray-500
                        transition-all duration-200 outline-none min-h-[40px]
                        focus-visible:border-brand-emerald focus-visible:ring-1 focus-visible:ring-brand-emerald/30
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${subscribeError ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}
                      `}
                      aria-label="Email for newsletter"
                      aria-invalid={!!subscribeError}
                      aria-describedby={subscribeError ? 'newsletter-error' : undefined}
                    />
                    <button
                      type="submit"
                      disabled={isSubscribing}
                      className="px-4 py-2 bg-brand-emerald text-charcoal font-semibold text-sm rounded-lg hover:bg-brand-emerald/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px] flex items-center justify-center"
                    >
                      {isSubscribing ? <Loader2 size={16} className="animate-spin" /> : 'Subscribe'}
                    </button>
                  </div>
                  {subscribeError && (
                    <p id="newsletter-error" className="text-red-400 text-xs" role="alert">
                      {subscribeError}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-silver-dark/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-silver-light">&copy; {currentYear} GridGo Interiors. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <button className="text-silver-light hover:text-brand-emerald transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-brand-emerald rounded px-2 py-1">
                Privacy Policy
              </button>
              <span className="text-silver-dark">|</span>
              <button className="text-silver-light hover:text-brand-emerald transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:ring-brand-emerald rounded px-2 py-1">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
