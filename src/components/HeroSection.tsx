import { useEffect, useState } from 'react';
import Button3D from './Button3D';
import Container from './ui/Container';
import { COMPANY } from '../config/company';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion on mount
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden="true"
      >
        <img 
          src="/images/hero-luxury-modular-kitchen.webp" 
          alt="" 
          className="w-full h-full object-cover"
          width="1920"
          height="1080"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-neutral-900/60" />
      </div>
      
      {/* Navy overlay for brand consistency */}
      <div 
        className="absolute inset-0 z-0 bg-[#0A0E27]/50" 
        style={{ mixBlendMode: 'multiply' }}
        aria-hidden="true"
      />

      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0 bg-gradient-hero opacity-40"
        aria-hidden="true"
      />

      {/* Animated Gradient Orbs - Slow floating background layers */}
      <div className="absolute inset-0 z-0 opacity-30" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-emerald/20 rounded-full blur-[120px] animate-slow-float" style={{ animationDuration: '15s' }} />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[120px] animate-slow-float" 
          style={{ animationDelay: prefersReducedMotion ? '0s' : '2s', animationDuration: '18s' }} 
        />
      </div>

      {/* Content Container */}
      <Container>
        <div className="relative z-10 py-12 md:py-20 flex items-center justify-center lg:justify-start">
          {/* Text Content - Centered on mobile, left on desktop */}
          <div className="text-center lg:text-left space-y-8 max-w-2xl">
            <div 
              className="space-y-4 animate-fade-in-up" 
              style={{ 
                animationDelay: prefersReducedMotion ? '0s' : '0.1s', 
                animationDuration: '0.8s' 
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Crafting Premium
                <br />
                <span className="gradient-text">Interiors Since {COMPANY.foundingYear}</span>
              </h1>
            </div>

            <p
              className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed animate-fade-in-up mx-auto lg:mx-0"
              style={{ 
                animationDelay: prefersReducedMotion ? '0s' : '0.2s', 
                animationDuration: '0.8s' 
              }}
            >
              Full-service design & fabrication across India. Transform your space with {COMPANY.yearsExperienceLabel.toLowerCase()}.
            </p>

            <div
              className="flex flex-wrap gap-4 animate-fade-in-up justify-center lg:justify-start"
              style={{ 
                animationDelay: prefersReducedMotion ? '0s' : '0.3s', 
                animationDuration: '0.8s' 
              }}
            >
              <Button3D size="lg" onClick={onOpenModal}>
                Start Your Project
              </Button3D>
              <Button3D size="lg" variant="ghost" onClick={scrollToPortfolio}>
                View Portfolio
              </Button3D>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
