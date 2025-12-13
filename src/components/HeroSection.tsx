import { motion, useReducedMotion } from 'framer-motion';
import Button3D from './Button3D';
import Container from './ui/Container';
import { COMPANY } from '../config/company';

interface HeroSectionProps {
  onOpenModal: () => void;
}

export default function HeroSection({ onOpenModal }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio-section');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  const fadeUp = (delaySeconds: number) =>
    prefersReducedMotion
      ? undefined
      : {
          initial: { opacity: 0, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { ...transition, delay: delaySeconds },
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
          className="absolute inset-0 z-0 bg-[#1a1a1a]/50" 
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
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-gold/18 rounded-full blur-[120px] animate-slow-float" style={{ animationDuration: '15s' }} />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-brand-gold-soft/14 rounded-full blur-[120px] animate-slow-float" 
          style={{ animationDelay: prefersReducedMotion ? '0s' : '2s', animationDuration: '18s' }} 
        />
      </div>

      {/* Content Container */}
      <Container>
        <div className="relative z-10 py-12 md:py-20 flex items-center justify-center lg:justify-start">
          {/* Text Content - Centered on mobile, left on desktop */}
          <div className="text-center lg:text-left space-y-8 max-w-2xl">
            <motion.div className="space-y-4" {...(fadeUp(0.3) || {})}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Crafting Premium
                <br />
                <span className="gradient-text">Interiors Since {COMPANY.foundingYear}</span>
              </h1>
            </motion.div>

            <motion.p
              className="text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed mx-auto lg:mx-0"
              {...(fadeUp(0.4) || {})}
            >
              Full-service design & fabrication across India. Transform your space with {COMPANY.yearsExperienceLabel.toLowerCase()}.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              {...(fadeUp(0.5) || {})}
            >
              <Button3D size="lg" onClick={onOpenModal}>
                Start Your Project
              </Button3D>
              <Button3D size="lg" variant="ghost" onClick={scrollToPortfolio}>
                View Portfolio
              </Button3D>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
