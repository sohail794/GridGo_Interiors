import { Mail, Phone, MapPin } from 'lucide-react';
import { CONTACT } from '../config/contact';
import { COMPANY } from '../config/company';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-serif font-bold italic mb-4">
              GridGo <span className="text-silver">Interiors</span>
            </h3>
            <p className="text-silver-light text-sm mb-4">
              Crafting Dreams into Enduring Spaces for over 20 years.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://x.com/GridGoInteriors"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-emerald transition-colors"
                aria-label="X (Twitter)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {['Home', 'About', 'Services', 'Portfolio', 'Insights', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase())}
                    className="text-silver-light hover:text-emerald transition-colors duration-200 hover:opacity-90"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-silver-light">
              <li>Steel Fabrication</li>
              <li>Glass Applications</li>
              <li>Marble Craftsmanship</li>
              <li>Bespoke Furniture</li>
              <li>Artistic Décor</li>
              <li>Premium Painting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm text-silver-light">
              {CONTACT.phone && (
                <li className="flex items-start">
                  <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                  <a href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`} className="hover:text-emerald transition-colors">
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <a href="mailto:info@gridgointeriors.com" className="hover:text-emerald transition-colors">
                  info@gridgointeriors.com
                </a>
              </li>
              {CONTACT.addressLabel && (
                <li className="flex items-start">
                  <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                  {CONTACT.mapsUrl ? (
                    <a href={CONTACT.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-emerald transition-colors">
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

        <div className="border-t border-silver-dark mt-8 pt-8 text-center text-sm text-silver-light">
          <p>&copy; {currentYear} GridGo Interiors. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <button className="hover:text-emerald transition-colors">Privacy Policy</button>
            <span>|</span>
            <button className="hover:text-emerald transition-colors">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
