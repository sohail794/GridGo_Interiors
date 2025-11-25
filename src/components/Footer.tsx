import { useState } from 'react';
import { Instagram, Linkedin, Share2, Mail, Phone, MapPin, CheckCircle, Loader2, MessageCircle, ArrowRight } from 'lucide-react';
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
    <footer className="bg-[#0A0E27] text-ivory border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
          {/* Brand & Social */}
          <div className="space-y-5">
            <div>
              <h3 className="text-2xl font-serif font-bold italic">
                GridGo <span className="text-brand-emerald">Interiors</span>
              </h3>
              <p className="text-sm text-gray-300 mt-2 leading-relaxed">
                Crafting Dreams into Enduring Spaces. Premium interior design & fabrication services across India.
              </p>
            </div>
            
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-400 mb-3 font-semibold">Follow Us</p>
              <div className="flex space-x-3">
                <a
                  href="https://x.com/GridGoInteriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-emerald/20 text-gray-300 hover:text-brand-emerald transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27]"
                  aria-label="Follow us on X (Twitter)"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com/gridgointeriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-emerald/20 text-gray-300 hover:text-brand-emerald transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27]"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://linkedin.com/company/gridgointeriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-emerald/20 text-gray-300 hover:text-brand-emerald transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27]"
                  aria-label="Follow us on LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://pinterest.com/gridgointeriors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand-emerald/20 text-gray-300 hover:text-brand-emerald transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27]"
                  aria-label="Follow us on Pinterest"
                >
                  <Share2 size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Services - Simplified */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('services')} className="text-gray-300 hover:text-brand-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded">
                  Steel Fabrication
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-gray-300 hover:text-brand-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded">
                  Glass Applications
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-gray-300 hover:text-brand-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded">
                  Marble Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="text-gray-300 hover:text-brand-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded">
                  Bespoke Furniture
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => onNavigate('services')} 
                  className="text-brand-emerald hover:text-brand-cyan font-medium inline-flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded"
                >
                  View All Services <ArrowRight size={14} />
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              {CONTACT.addressLabel && (
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0 text-brand-emerald" />
                  {CONTACT.mapsUrl ? (
                    <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-emerald transition-colors leading-relaxed">
                      {CONTACT.addressLabel}
                    </a>
                  ) : (
                    <span className="text-gray-300 leading-relaxed">{CONTACT.addressLabel}</span>
                  )}
                </li>
              )}
              {CONTACT.phone && (
                <li className="flex items-center gap-3">
                  <Phone size={16} className="flex-shrink-0 text-brand-emerald" />
                  <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="text-gray-300 hover:text-brand-emerald transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0 text-brand-emerald" />
                <a href="mailto:info@gridgointeriors.com" className="text-gray-300 hover:text-brand-emerald transition-colors">
                  info@gridgointeriors.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="flex-shrink-0 text-brand-emerald" />
                <a href="https://wa.me/918595007476" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-brand-emerald transition-colors">
                  WhatsApp Chat
                </a>
              </li>
            </ul>
            
            {/* Newsletter Form */}
            <div className="mt-6 pt-5 border-t border-white/10">
              <h5 className="font-semibold text-white mb-2 text-sm">Stay Updated</h5>
              <p className="text-xs text-gray-300 mb-3">Get design tips & exclusive offers.</p>
              
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
                        flex-1 px-3 py-2 text-sm bg-white/5 border rounded-lg text-white placeholder:text-gray-400
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
                      className="px-4 py-2 bg-brand-emerald text-[#0A0E27] font-semibold text-sm rounded-lg hover:bg-brand-emerald/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[40px] flex items-center justify-center"
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

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-300">&copy; {currentYear} GridGo Interiors. All rights reserved.</p>
            <div className="flex items-center gap-6 text-sm">
              <button className="text-gray-300 hover:text-brand-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded px-2 py-1">
                Privacy Policy
              </button>
              <span className="text-gray-600">|</span>
              <button className="text-gray-300 hover:text-brand-emerald transition-colors focus:outline-none focus:ring-2 focus:ring-brand-emerald focus:ring-offset-2 focus:ring-offset-[#0A0E27] rounded px-2 py-1">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
