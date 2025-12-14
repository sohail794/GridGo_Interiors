import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Layers, CheckCircle, Phone, Mail, MessageCircle } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data/content';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Breadcrumb from '../components/Breadcrumb';
import GlassCard from '../components/GlassCard';
import Button from '../components/ui/Button';
import { CONTACT } from '../config/contact';
import { useEffect } from 'react';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const project = projects.find((p: Project) => p.id === projectId);
  const prefersReducedMotion = useReducedMotion();
  const transition = { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const };

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background-primary">
        <Section spacing="lg" background="none">
          <Container>
            <div className="text-center py-20">
              <h1 className="text-4xl font-bold font-display text-text-primary mb-4">Project Not Found</h1>
              <p className="text-text-secondary text-lg mb-8">The project you're looking for doesn't exist.</p>
              <Button variant="primary" onClick={onBack}>
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Portfolio
              </Button>
            </div>
          </Container>
        </Section>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', page: 'home' },
    { label: 'Portfolio', page: 'portfolio' },
    { label: project.title, current: true },
  ];

  // Schema.org structured data for the project
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    creator: {
      '@type': 'Organization',
      name: 'GridGo Interiors',
    },
    locationCreated: {
      '@type': 'Place',
      address: project.location,
    },
    material: project.materials?.join(', '),
    dateCreated: project.timeline,
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      {/* Hero Section with Image */}
      <section className="relative h-[500px] md:h-[600px] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={project.image}
            alt={project.title}
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/60 to-transparent" />
        </div>

        {/* Hero Content */}
        <Container>
          <motion.div
            className="relative z-10 pb-12 md:pb-16"
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 30 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? undefined : transition}
          >
            <span className="inline-block px-4 py-2 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-sm font-semibold uppercase tracking-wider rounded-full mb-4 capitalize">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white mb-4 leading-tight">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-text-secondary">
              {project.location && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-brand-gold" />
                  <span className="text-lg">{project.location}</span>
                </span>
              )}
              {project.timeline && (
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-gold" />
                  <span className="text-lg">{project.timeline}</span>
                </span>
              )}
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Breadcrumb Navigation */}
      <Section spacing="sm" background="none">
        <Container>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Breadcrumb items={breadcrumbItems} onNavigate={() => onBack()} />
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-brand-gold hover:text-brand-gold-soft transition-colors font-medium group"
              aria-label="Go back to portfolio"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Back to Portfolio
            </button>
          </div>
        </Container>
      </Section>

      {/* Project Details */}
      <Section spacing="lg" background="none">
        <Container>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Overview */}
              <motion.div
                initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.1 }}
              >
                <GlassCard padding="lg">
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-6">
                    Project Overview
                  </h2>
                  <p className="text-text-secondary text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                  {project.scope && (
                    <div className="mt-8 pt-6 border-t border-white/10">
                      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-gold/10 flex items-center justify-center">
                          <Layers className="w-5 h-5 text-brand-gold" />
                        </div>
                        Scope of Work
                      </h3>
                      <p className="text-text-secondary text-lg leading-relaxed">{project.scope}</p>
                    </div>
                  )}
                </GlassCard>
              </motion.div>

              {/* Materials Used */}
              {project.materials && project.materials.length > 0 && (
                <motion.div
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.2 }}
                >
                  <GlassCard padding="lg">
                    <h3 className="text-2xl font-bold font-display text-white mb-6">
                      Materials & Finishes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.materials.map((material: string, index: number) => (
                        <motion.div
                          key={index}
                          className="flex items-center gap-4 bg-white/5 hover:bg-brand-gold/10 border border-white/10 hover:border-brand-gold/30 rounded-xl px-5 py-4 transition-all duration-300"
                          initial={prefersReducedMotion ? undefined : { opacity: 0, x: -10 }}
                          whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.1 * index }}
                        >
                          <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0" />
                          <span className="text-text-primary font-medium">{material}</span>
                        </motion.div>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Before/After Gallery (if available) */}
              {project.beforeImage && project.afterImage && (
                <motion.div
                  initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.3 }}
                >
                  <GlassCard padding="lg">
                    <h3 className="text-2xl font-bold font-display text-white mb-6">Transformation</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative rounded-xl overflow-hidden group">
                        <img
                          src={project.beforeImage}
                          alt={`${project.title} - Before`}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute bottom-4 left-4 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
                          Before
                        </span>
                      </div>
                      <div className="relative rounded-xl overflow-hidden group">
                        <img
                          src={project.afterImage}
                          alt={`${project.title} - After`}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute bottom-4 left-4 bg-brand-gold text-[#1a1a1a] px-4 py-2 rounded-full text-sm font-semibold">
                          After
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 space-y-6"
                initial={prefersReducedMotion ? undefined : { opacity: 0, x: 20 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={prefersReducedMotion ? undefined : { ...transition, delay: 0.2 }}
              >
                {/* Contact Card */}
                <GlassCard padding="lg" border="gold">
                  <h3 className="text-xl font-bold font-display text-white mb-3">
                    Interested in a Similar Project?
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    Let's discuss how we can transform your space with our expertise.
                  </p>
                  <div className="space-y-3">
                    {CONTACT.phone && (
                      <a
                        href={`tel:${CONTACT.phone.replace(/[^\d+]/g, '')}`}
                        className="flex items-center justify-center w-full bg-gradient-to-br from-brand-gold to-brand-gold-deep hover:from-brand-gold-soft hover:to-brand-gold text-[#1a1a1a] font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-luxury-gold"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    )}
                    {CONTACT.whatsappUrl && (
                      <a
                        href={`${CONTACT.whatsappUrl}?text=${encodeURIComponent(`Hi! I'm interested in a project similar to "${project.title}". Can we discuss?`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold py-3.5 px-4 rounded-xl transition-colors"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp Us
                      </a>
                    )}
                    {CONTACT.email && (
                      <a
                        href={`mailto:${CONTACT.email}?subject=Inquiry about ${project.title}`}
                        className="flex items-center justify-center w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/30 text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-300"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Email Us
                      </a>
                    )}
                  </div>
                </GlassCard>

                {/* Project Stats */}
                <GlassCard padding="lg">
                  <h3 className="text-lg font-bold font-display text-white mb-5">Project Details</h3>
                  <dl className="space-y-5">
                    <div className="flex justify-between items-start pb-4 border-b border-white/10">
                      <dt className="text-sm text-text-secondary uppercase tracking-wider">Category</dt>
                      <dd className="text-white font-medium capitalize text-right">{project.category}</dd>
                    </div>
                    {project.location && (
                      <div className="flex justify-between items-start pb-4 border-b border-white/10">
                        <dt className="text-sm text-text-secondary uppercase tracking-wider">Location</dt>
                        <dd className="text-white font-medium text-right">{project.location}</dd>
                      </div>
                    )}
                    {project.timeline && (
                      <div className="flex justify-between items-start pb-4 border-b border-white/10">
                        <dt className="text-sm text-text-secondary uppercase tracking-wider">Timeline</dt>
                        <dd className="text-white font-medium text-right">{project.timeline}</dd>
                      </div>
                    )}
                    {project.scope && (
                      <div className="flex justify-between items-start">
                        <dt className="text-sm text-text-secondary uppercase tracking-wider">Scope</dt>
                        <dd className="text-white font-medium text-right max-w-[180px]">{project.scope}</dd>
                      </div>
                    )}
                  </dl>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="gradient">
        <Container maxWidth="md">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold font-display mb-6">
              Ready to Start <span className="gradient-text">Your Project?</span>
            </h2>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
              Let's bring your vision to life with our expertise in interior design and fabrication.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg" onClick={onBack}>
                View More Projects
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
