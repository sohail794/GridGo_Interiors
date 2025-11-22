import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../config/contact';

export default function WhatsAppButton() {
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
      className="fixed bottom-6 right-24 z-40 bg-green-500 hover:bg-green-600 text-white p-3.5 rounded-full shadow-luxury hover:shadow-luxury-hover transition-all"
      aria-label="Contact us on WhatsApp"
      title="WhatsApp Us"
    >
      <MessageCircle size={24} />
    </button>
  );
}
