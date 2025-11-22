import { ArrowDown } from 'lucide-react';
import Button3D from './Button3D';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%)',
        }}
      />

      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#00ff88]/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#00d9ff]/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-left space-y-8">
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s', animationDuration: '0.8s' }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Crafting Premium
              <br />
              <span className="gradient-text">Interiors Since 2004</span>
            </h1>
          </div>

          <p
            className="text-lg md:text-xl text-[#b4b4b4] max-w-xl animate-slide-up"
            style={{ animationDelay: '0.4s', animationDuration: '0.8s' }}
          >
            Full-service design & fabrication across India. Transform your space with 20+ years of interior mastery.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-slide-up"
            style={{ animationDelay: '0.6s', animationDuration: '0.8s' }}
          >
            <Button3D size="lg" onClick={onOpenModal}>
              Start Your Project
            </Button3D>
            <Button3D size="lg" variant="ghost" onClick={scrollToPortfolio}>
              View Portfolio
            </Button3D>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative w-full h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-[#00d9ff]/10 rounded-3xl blur-3xl animate-pulse-glow" />
            <div className="relative z-10 w-full h-full rounded-2xl overflow-hidden shadow-card-hover">
              <img
                src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Luxury interior design showcasing modern furniture and decor."
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToPortfolio}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 animate-bounce text-[#00ff88] hover:text-[#00d9ff] transition-colors"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm uppercase tracking-wide">Scroll</span>
          <ArrowDown size={24} />
        </div>
      </button>
    </section>
  );
}
