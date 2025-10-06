import { Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/gridgointeriors/',
      label: 'Instagram',
      name: 'Instagram'
    },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/company/gridgo-interiors/',
      label: 'LinkedIn',
      name: 'LinkedIn'
    },
    {
      icon: () => <span className="text-xl">𝕏</span>,
      href: 'https://x.com/GridGoInteriors',
      label: 'X (Twitter)',
      name: 'X'
    },
  ];

  return (
    <footer className="bg-[#141b2d] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="gradient-text">GridGo</span>
            </h3>
            <p className="text-[#b4b4b4] text-sm mb-6 leading-relaxed">
              Crafting premium interiors since 2004. Transforming visions into reality across India.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-[#00ff88]/10 border border-white/10 hover:border-[#00ff88] flex items-center justify-center text-[#b4b4b4] hover:text-[#00ff88] transition-all duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {['Home', 'About', 'Services', 'Portfolio', 'Insights'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => onNavigate(item.toLowerCase() === 'insights' ? 'blog' : item.toLowerCase())}
                    className="text-[#b4b4b4] hover:text-[#00ff88] transition-colors min-h-[44px] flex items-center"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Our Services</h4>
            <ul className="space-y-3 text-sm text-[#b4b4b4]">
              <li>Interior Design</li>
              <li>Steel Fabrication</li>
              <li>Glass Applications</li>
              <li>Marble Craftsmanship</li>
              <li>Bespoke Furniture</li>
              <li>Turnkey Execution</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-lg">Contact Us</h4>
            <ul className="space-y-4 text-sm text-[#b4b4b4]">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-[#00ff88] flex-shrink-0 mt-0.5" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-[#00ff88] transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-[#00ff88] flex-shrink-0 mt-0.5" />
                <a
                  href="mailto:info@gridgointeriors.com"
                  className="hover:text-[#00ff88] transition-colors"
                >
                  info@gridgointeriors.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#00ff88] flex-shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#6b7280]">
            &copy; {currentYear} GridGo Interiors. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <button
              onClick={() => onNavigate('contact')}
              className="text-[#b4b4b4] hover:text-[#00ff88] transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-[#6b7280]">|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-[#b4b4b4] hover:text-[#00ff88] transition-colors"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
