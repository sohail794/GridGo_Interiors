import { Instagram, Linkedin, Share2, Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT } from '../config/contact';
import Container from './ui/Container';
import Section from './ui/Section';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
