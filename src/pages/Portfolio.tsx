import { useState, useEffect } from 'react';
import FocusTrap from 'focus-trap-react';
import { X, MapPin, Calendar, Tag } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { featuredProjects } from '../data/content';
import { Project } from '../types';
import GlassCard from '../components/GlassCard';
import PortfolioCard from '../components/PortfolioCard';
import Button3D from '../components/Button3D';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import BeforeAfterSlider from '../components/BeforeAfterSlider';

interface PortfolioProps {
  onNavigate: (page: string) => void;
  onOpenModal?: (projectTitle?: string) => void;
}

export default function Portfolio({ onNavigate, onOpenModal }: PortfolioProps) {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'retail'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [visibleCount, setVisibleCount] = useState(6); // Load More pagination
  const prefersReducedMotion = useReducedMotion();

  // Handle Escape key and body scroll lock for lightbox
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };

    if (selectedProject) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  const allFilteredProjects = filter === 'all'
    ? featuredProjects
    : featuredProjects.filter(p => p.category === filter);
  
  const filteredProjects = allFilteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < allFilteredProjects.length;

  const transition = { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const };
  const cardVariants = prefersReducedMotion
    ? undefined
    : {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (index: number) => ({
          opacity: 1,
          scale: 1,
          transition: { ...transition, delay: index * 0.1 },
        }),
        exit: {
          opacity: 0,
          scale: 0.9,
          transition,
        },
      };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // Reset visible count when filter changes
  const handleFilterChange = (category: typeof filter) => {
    setFilter(category);
    setVisibleCount(6);
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
        >
          <img 
            src="/images/portfolio-bedroom-led-design.webp" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/60" />
        </div>
        
        {/* Navy overlay for brand consistency */}
        <div 
          className="absolute inset-0 z-0 bg-[#1a1a1a]/50" 
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center">
          <Container maxWidth="lg">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold font-display mb-6 leading-tight"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="gradient-text">Timeless Creations</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-text-secondary"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              Design excellence in action
            </motion.p>
          </Container>
        </div>
      </section>

      <Section spacing="lg" background="none">
        <Container>
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-16"
            role="tablist"
            aria-label="Filter projects by category"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={prefersReducedMotion ? undefined : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {['all', 'residential', 'commercial', 'retail'].map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category as typeof filter)}
                role="tab"
                aria-selected={filter === category}
                className={`
                  px-6 md:px-8 py-3 min-h-[48px] min-w-[48px] rounded-xl font-semibold uppercase tracking-wide text-sm
                  transition-all duration-300 active:scale-[0.98]
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]
                  border
                  ${
                    filter === category
                      ? 'bg-gradient-to-br from-brand-gold to-brand-gold-deep text-background-primary shadow-luxury-gold border-brand-gold/30'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white active:bg-white/15 border-white/10 hover:border-brand-gold/30'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout" initial={false}>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  variants={cardVariants}
                  initial={cardVariants ? 'hidden' : undefined}
                  animate={cardVariants ? 'visible' : undefined}
                  exit={cardVariants ? 'exit' : undefined}
                  custom={index}
                >
                  <PortfolioCard project={project} onSelect={setSelectedProject} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                className="bg-transparent border-2 border-brand-gold/70 text-brand-gold hover:bg-brand-gold hover:text-[#1a1a1a] active:scale-95 px-8 py-3 min-h-[48px] rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/60 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
              >
                Load More Projects ({allFilteredProjects.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </Container>
      </Section>

      <Section spacing="xl" background="gradient">
        <Container maxWidth="md">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Envision Your Project</span>
            </h2>
            <p className="text-xl text-text-secondary mb-10">
              Ready to create something extraordinary? Let's bring your vision to life.
            </p>
            <Button variant="primary" onClick={() => onNavigate('contact')} size="lg">
              Start Your Journey
            </Button>
          </div>
        </Container>
      </Section>

      {selectedProject && (
        <FocusTrap active={!!selectedProject}>
          <div className="fixed inset-0 z-[2000] overflow-y-auto">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />
          
          <div className="relative z-10 min-h-full flex items-start justify-center p-4 py-8">
            <Container maxWidth="lg">
              <GlassCard className="relative">
              {/* Close button - works on both mobile and desktop */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProject(null);
                }}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full border-2 border-white/20 bg-[#1a1a1a] hover:border-brand-coral text-white hover:text-brand-coral transition-all flex items-center justify-center"
                aria-label="Close project details"
                type="button"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                {selectedProject.beforeImage && selectedProject.afterImage ? (
                  <div className="rounded-lg overflow-hidden">
                    <BeforeAfterSlider 
                      beforeImage={selectedProject.beforeImage}
                      afterImage={selectedProject.afterImage}
                    />
                  </div>
                ) : selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={1200}
                    height={800}
                    className="w-full h-96 object-cover rounded-lg mb-6"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-96 bg-neutral-900/30 rounded-lg mb-6 flex items-center justify-center">
                    <span className="text-text-tertiary">Image placeholder</span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 text-sm font-semibold uppercase tracking-wide bg-brand-gold/10 text-brand-gold rounded-full">
                      {selectedProject.category}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold text-white">
                    {selectedProject.title}
                  </h2>

                  <div className="flex flex-wrap gap-6 text-text-secondary">
                    <div className="flex items-center gap-2">
                      <MapPin size={20} className="text-brand-gold" />
                      <span>{selectedProject.location}</span>
                    </div>
                    {selectedProject.year && (
                      <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-brand-gold" />
                        <span>{selectedProject.year}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-lg text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Project Highlights</h3>
                      <ul className="grid grid-cols-2 gap-3">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-text-secondary">
                            <Tag size={16} className="text-brand-gold" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Button3D onClick={() => {
                    setSelectedProject(null);
                    onOpenModal?.(selectedProject.title);
                  }} className="w-full">
                    Request Similar Design
                  </Button3D>
                </div>
              </div>
            </GlassCard>
            </Container>
          </div>
        </div>
        </FocusTrap>
      )}
    </div>
  );
}
