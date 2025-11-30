import { ArrowRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { testimonials, featuredProjects, services } from '../data/content';
import ServiceCard from '../components/ServiceCard';
import ProjectSlider from '../components/ProjectSlider';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Helmet } from 'react-helmet';
import { COMPANY } from '../config/company';
import Button from '../components/ui/Button';
import { useCountUpInView } from '../hooks/useCountUp';

interface HomeProps {
  onNavigate: (page: string) => void;
}

// Stats component with scroll counters
function StatsSection() {
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);
  const stat4Ref = useRef<HTMLDivElement>(null);

  const { displayValue: projects } = useCountUpInView(200, stat1Ref, { threshold: 0.4, duration: 2000 });
  const { displayValue: experience } = useCountUpInView(8, stat2Ref, { threshold: 0.4, duration: 2000 });
  const { displayValue: cities } = useCountUpInView(25, stat3Ref, { threshold: 0.4, duration: 2000 });
  const { displayValue: clients } = useCountUpInView(500, stat4Ref, { threshold: 0.4, duration: 2000 });

  return (
      <section className="py-section-sm md:py-section-md bg-gradient-to-r from-emerald/10 to-emerald/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          <div ref={stat1Ref} className="text-center p-6" style={{ animation: 'fadeInUp 600ms ease-out forwards' }}>
            <div className="text-5xl md:text-6xl font-bold text-emerald mb-2" style={{ animation: 'countUp 2s ease-out forwards' }}>
              {projects}+
            </div>
            <p className="font-serif text-xl text-charcoal">Projects Completed</p>
            <p className="text-sm text-gray-600 mt-2">Across residential and commercial spaces</p>
          </div>

          <div ref={stat2Ref} className="text-center p-6" style={{ animation: 'fadeInUp 600ms ease-out forwards', animationDelay: '100ms' }}>
            <div className="text-5xl md:text-6xl font-bold text-emerald mb-2" style={{ animation: 'countUp 2s ease-out forwards', animationDelay: '100ms' }}>
              {experience}+
            </div>
            <p className="font-serif text-xl text-charcoal">Years of Excellence</p>
            <p className="text-sm text-gray-600 mt-2">Crafting luxury interiors since 2016</p>
          </div>

          <div ref={stat3Ref} className="text-center p-6" style={{ animation: 'fadeInUp 600ms ease-out forwards', animationDelay: '200ms' }}>
            <div className="text-5xl md:text-6xl font-bold text-emerald mb-2" style={{ animation: 'countUp 2s ease-out forwards', animationDelay: '200ms' }}>
              {cities}+
            </div>
            <p className="font-serif text-xl text-charcoal">Cities Served</p>
            <p className="text-sm text-gray-600 mt-2">Nationwide presence across India</p>
          </div>

          <div ref={stat4Ref} className="text-center p-6" style={{ animation: 'fadeInUp 600ms ease-out forwards', animationDelay: '300ms' }}>
            <div className="text-5xl md:text-6xl font-bold text-emerald mb-2" style={{ animation: 'countUp 2s ease-out forwards', animationDelay: '300ms' }}>
              {clients}+
            </div>
            <p className="font-serif text-xl text-charcoal">Happy Clients</p>
            <p className="text-sm text-gray-600 mt-2">Satisfied customers worldwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <div className="pt-20">
      <Helmet>
        <title>GridGo Interiors - Luxury Interior Design</title>
        <meta
          name="description"
          content="Transform your space with GridGo Interiors. Offering premium interior design and fabrication services across India."
        />
        <meta
          property="og:title"
          content="GridGo Interiors - Luxury Interior Design"
        />
        <meta
          property="og:description"
          content="Transform your space with GridGo Interiors. Offering premium interior design and fabrication services across India."
        />
        <meta property="og:image" content="/path-to-og-image.jpg" />
        <meta property="og:url" content="https://gridgo-interiors.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section
        className="relative h-screen bg-neutral-900/50"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/50" />
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white max-w-4xl animate-fade-in">
            <h1 className="font-serif italic text-5xl md:text-7xl mb-6 leading-tight">
              Crafting Dreams into
              <br />
              <span className="text-silver">Enduring Spaces</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl mb-8 text-silver-light">
              {COMPANY.yearsExperienceLabel}
            </p>
            <Button
              variant="primary"
              onClick={() => onNavigate('contact')}
              className="font-sans text-lg shadow-luxury hover:shadow-luxury-hover"
            >
              Schedule Your Consultation
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-section-sm md:py-section-md bg-ivory">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-emerald mb-6">
              Excellence in Every Detail
            </h2>
            <p className="font-sans text-lg text-charcoal leading-relaxed">
              GridGo Interiors excels in steel fabrication, glass applications, marble
              craftsmanship, bespoke furniture, artistic décor, and premium painting. We offer
              complete design-to-delivery services across India, transforming visions into
              exquisite realities.
            </p>
          </div>
        </div>
      </section>

      <StatsSection />

      <section className="py-section-sm md:py-section-md bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-emerald mb-4">
              Our Expertise
            </h2>
            <p className="font-sans text-lg text-charcoal">
              Comprehensive interior solutions tailored to your unique vision
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-section-sm md:py-section-md bg-silver-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-emerald mb-4">
              Featured Works
            </h2>
            <p className="font-sans text-lg text-charcoal">
              Discover our portfolio of transformative projects
            </p>
          </div>
          <ProjectSlider projects={featuredProjects} onNavigate={onNavigate} />
        </div>
      </section>

      <section className="py-section-sm md:py-section-md bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-emerald mb-4">
              What <span className="text-charcoal">Our Clients</span> Say
            </h2>
            <p className="font-sans text-lg text-charcoal max-w-2xl mx-auto leading-relaxed">
              Don't just take our word for it. Hear from homeowners and businesses 
              who've trusted GridGo Interiors to transform their spaces.
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className="py-section-md md:py-section-lg bg-emerald text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 italic">
            Transform Your Environment Today
          </h2>
          <p className="font-sans text-xl mb-8 text-silver-light">
            Let's bring your vision to life with our expertise and craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => onNavigate('contact')}
              className="font-sans text-lg hover:bg-emerald"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
