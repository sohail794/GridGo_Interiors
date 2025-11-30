import { useState } from 'react';
import { CheckCircle, Award, Clock, Shield, Wrench, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
import Button from '../components/ui/Button';
import TestimonialCarousel from '../components/TestimonialCarousel';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import { featuredProjects, testimonials } from '../data/content';
import { COMPANY } from '../config/company';

interface HomeNewProps {
  onNavigate: (page: string) => void;
  onOpenModal: () => void;
}

export default function HomeNew({ onNavigate, onOpenModal }: HomeNewProps) {
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all'
    ? featuredProjects.slice(0, 6)
    : featuredProjects.filter((p) => p.category === filter).slice(0, 6);

  const trustIndicators = [
    { icon: Award, text: COMPANY.yearsExperienceLabel },
    { icon: CheckCircle, text: COMPANY.projectsCompletedLabel },
    { icon: Sparkles, text: `${COMPANY.citiesServedLabel} Across India` },
    { icon: Wrench, text: 'In-House Fabrication' },
    { icon: Clock, text: '24-Hour Response Time' },
  ];

  const services = [
    {
      title: 'Interior Design',
      icon: '🎨',
      description: 'Complete design solutions from concept to completion',
      features: ['3D Visualization', 'Space Planning', 'Material Selection', 'Project Management'],
    },
    {
      title: 'Custom Fabrication',
      icon: '🔨',
      description: 'In-house fabrication for steel, glass, and custom furniture',
      features: ['Steel Structures', 'Glass Applications', 'Marble Work', 'Bespoke Furniture'],
    },
    {
      title: 'Turnkey Execution',
      icon: '🏗️',
      description: 'End-to-end project delivery with complete peace of mind',
      features: ['Design + Build', 'Quality Control', 'Timely Delivery', 'Post-Project Support'],
    },
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Consultation',
      description: 'We understand your vision, requirements, and budget to create a tailored solution',
    },
    {
      number: '02',
      title: 'Design',
      description: '3D visualizations and detailed plans bringing your space to life',
    },
    {
      number: '03',
      title: 'Fabrication',
      description: 'In-house manufacturing ensuring quality control and timely delivery',
    },
    {
      number: '04',
      title: 'Installation',
      description: 'Expert installation and final touches for a perfect finish',
    },
  ];

  const whyChoose = [
    {
      icon: Wrench,
      title: 'In-House Fabrication',
      description: 'Complete control over quality with no middlemen, ensuring premium results',
    },
    {
      icon: Award,
      title: '20+ Years Experience',
      description: 'Proven track record with 300+ successful projects across India',
    },
    {
      icon: CheckCircle,
      title: 'End-to-End Solutions',
      description: 'From design to installation, we handle everything for a seamless experience',
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Post-project support and maintenance with transparent pricing always',
    },
  ];

  return (
    <div className="min-h-screen">
      <HeroSection onOpenModal={onOpenModal} />

      <Section spacing="md" background="secondary">
        <Container>
          <div className="flex flex-col sm:flex-row flex-wrap justify-around items-center gap-4 sm:gap-6 md:gap-8">
            {trustIndicators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <Icon size={28} className="text-brand-emerald drop-shadow-[0_0_10px_rgba(0,255,136,0.5)] flex-shrink-0" />
                  <span className="text-sm sm:text-base md:text-lg font-semibold text-text-primary">{item.text}</span>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="none" id="portfolio-section">
        <Container>
          <SectionHeader 
            title="Featured Projects"
            subtitle="From concept to completion, explore our finest work"
          />

          <div className="flex flex-wrap justify-center gap-3 mb-12 mt-12">
            {['all', 'residential', 'commercial', 'retail'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`
                  px-6 py-3 min-h-[44px] rounded-radius-md font-semibold uppercase tracking-wide text-sm
                  transition-all duration-200 focus-ring active:scale-95
                  ${
                    filter === category
                      ? 'bg-gradient-to-br from-brand-emerald to-brand-emerald-dark text-background-primary shadow-3d'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-text-primary'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <GlassCard key={project.id} padding="sm" className="group cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ease-out">
                <div className="relative overflow-hidden rounded-radius-lg mb-4">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 bg-neutral-900/30 flex items-center justify-center">
                      <span className="text-text-tertiary text-sm">Image placeholder</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button3D size="sm" variant="ghost" onClick={() => onNavigate('portfolio')}>
                      View Project
                    </Button3D>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-emerald/10 text-brand-emerald rounded-radius-md">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-text-primary">{project.title}</h3>
                  <p className="text-sm text-text-secondary">{project.location}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" size="lg" onClick={() => onNavigate('portfolio')}>
              View All Projects
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="gradient">
        <Container>
          <SectionHeader 
            title="What We Do"
            subtitle="End-to-end solutions for your space"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <GlassCard key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-radius-lg bg-brand-emerald/10 flex items-center justify-center text-5xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-text-primary mb-4">{service.title}</h3>
                <p className="text-text-secondary mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3 text-left">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-text-secondary">
                      <CheckCircle size={16} className="text-brand-emerald flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button3D size="sm" variant="ghost" className="mt-6 w-full" onClick={() => onNavigate('services')}>
                  Learn More
                </Button3D>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="none">
        <Container>
          <SectionHeader 
            title="Our Process"
            subtitle="From vision to reality in four stages"
          />

          <div className="relative mt-12">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-brand-emerald to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-brand-emerald bg-background-secondary flex items-center justify-center mb-6 z-10 relative">
                      <span className="text-2xl font-bold gradient-text">{step.number}</span>
                    </div>
                    <GlassCard padding="sm" className="w-full">
                      <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
                    </GlassCard>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="secondary">
        <Container>
          <SectionHeader 
            title="Why Choose GridGo"
            subtitle="What sets us apart"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-radius-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-brand-emerald/30 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <Icon size={32} className="text-brand-emerald drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section spacing="lg" background="none">
        <Container maxWidth="md">
          <div className="text-center">
            <SectionHeader 
              title="What Clients Say"
              subtitle="Real experiences from real clients"
            />

            <div className="mt-12">
              <TestimonialCarousel testimonials={testimonials} />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="xl" background="gradient">
        <Container maxWidth="md">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Ready to Transform <span className="gradient-text">Your Space?</span>
            </h2>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
              Let's discuss your project and bring your vision to life
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-10">
              <Button variant="primary" size="lg" onClick={onOpenModal}>
                Get a Free Quote
              </Button>
              <Button variant="secondary" size="lg" onClick={() => onNavigate('contact')}>
                Contact Us
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-text-tertiary mb-6">or reach us via</p>
              <div className="flex justify-center gap-6 flex-wrap">
                <a
                  href="https://wa.me/918595007476"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-emerald transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-ring rounded px-3 py-2 min-h-[44px] flex items-center font-semibold"
                >
                  WhatsApp
                </a>
                <a
                  href="mailto:sohailsaifi561@gmail.com"
                  className="text-text-secondary hover:text-brand-emerald transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-ring rounded px-3 py-2 min-h-[44px] flex items-center font-semibold"
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-emerald transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer focus-ring rounded px-3 py-2 min-h-[44px] flex items-center font-semibold"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
  </div>
);
}