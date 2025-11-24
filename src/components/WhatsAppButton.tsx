import { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../config/contact';

interface WhatsAppButtonProps {
  menuOpen?: boolean;
}

export default function WhatsAppButton({ menuOpen = false }: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Delayed entrance for smooth UX
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!CONTACT.whatsappUrl) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi! I\'d like to discuss my interior design project with GridGo Interiors.');
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, '_blank');
  };

  return (
    <a
      href={`https://wa.me/${CONTACT.whatsappUrl.replace('https://wa.me/', '')}?text=${encodeURIComponent('Hi! I\'d like to discuss my interior design project with GridGo Interiors.')}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();
        handleWhatsAppClick();
      }}
      className={`
        fixed bottom-20 right-4 md:bottom-8 md:right-8
        z-40
        bg-[#25D366] hover:bg-[#20BA5A]
        text-white p-4 rounded-full
        shadow-xl hover:shadow-2xl
        transition-all duration-300 ease-out
        hover:scale-110 active:scale-95
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
        ${menuOpen ? 'opacity-0 pointer-events-none' : ''}
      `}
      aria-label="Chat with us on WhatsApp"
      title="WhatsApp Us - Quick Response!"
    >
      {/* Pulse animation ring */}
      <span 
        className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" 
        aria-hidden="true"
      />
      
      {/* WhatsApp Icon */}
      <MessageCircle className="w-6 h-6 relative z-10" strokeWidth={2} />
    </a>
  );
}
