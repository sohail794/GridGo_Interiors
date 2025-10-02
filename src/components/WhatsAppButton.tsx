import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '91XXXXXXXXXX';
    const message = encodeURIComponent('Hi! I am interested in GridGo Interiors services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 bg-emerald hover:bg-emerald-dark text-white p-4 rounded-full shadow-luxury hover:shadow-luxury-hover transition-all animate-pulse-slow"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
}
