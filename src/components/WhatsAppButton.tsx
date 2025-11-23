import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../config/contact';

interface WhatsAppButtonProps {
  menuOpen?: boolean;
}

export default function WhatsAppButton({ menuOpen = false }: WhatsAppButtonProps) {
  if (!CONTACT.whatsappUrl) {
    return null;
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi! I am interested in GridGo Interiors services.');
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`
        fixed bottom-4 right-4 z-[9998]
        bg-green-500 hover:bg-green-600 text-white 
        p-3.5 rounded-full 
        shadow-luxury hover:shadow-luxury-hover 
        transition-all duration-300
        ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
      `}
      aria-label="Contact us on WhatsApp"
      title="WhatsApp Us"
    >
      <MessageCircle size={24} />
    </button>
  );
}
