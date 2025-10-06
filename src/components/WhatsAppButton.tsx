import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    const phoneNumber = '919876543210';
    const message = encodeURIComponent('Hi! I am interested in GridGo Interiors services.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-24 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-card-hover hover:shadow-3d-hover transition-all min-w-[56px] min-h-[56px] flex items-center justify-center"
      aria-label="Contact us on WhatsApp"
      title="WhatsApp Us"
    >
      <MessageCircle size={28} />
    </button>
  );
}
