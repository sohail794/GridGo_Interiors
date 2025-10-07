import { Instagram, Linkedin, Share2, Mail, Phone, MapPin } from 'lucide-react';

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
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-emerald transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-emerald transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-silver hover:text-emerald transition-colors"
                aria-label="Pinterest"
              >
                <Share2 size={24} />
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
                    className="text-silver-light hover:text-emerald transition-colors"
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
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>+91 XXX XXX XXXX</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>info@gridgointeriors.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
                <span>Your City, India</span>
              </li>
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
