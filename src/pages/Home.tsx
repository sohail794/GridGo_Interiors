import { ArrowRight } from 'lucide-react';
import { testimonials, featuredProjects, services } from '../data/content';
import ServiceCard from '../components/ServiceCard';
import ProjectSlider from '../components/ProjectSlider';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { Helmet } from 'react-helmet';
import { COMPANY } from '../config/company';

interface HomeProps {
  onNavigate: (page: string) => void;
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
        className="relative h-screen bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600)',
        }}
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
            <button
              onClick={() => onNavigate('contact')}
              className="bg-emerald hover:bg-emerald-dark text-white px-8 py-4 rounded-md font-sans font-bold text-lg transition-all shadow-luxury hover:shadow-luxury-hover inline-flex items-center"
            >
              Schedule Your Consultation
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-emerald mb-4">
              Our Expertise
            </h2>
            <p className="font-sans text-lg text-charcoal">
              Comprehensive interior solutions tailored to your unique vision
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <ServiceCard key={service.id} service={service} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-silver-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-emerald mb-4">
              Client Voices
            </h2>
            <p className="font-sans text-lg text-charcoal">
              Hear from those who experienced our excellence
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className="py-20 bg-emerald text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 italic">
            Transform Your Environment Today
          </h2>
          <p className="font-sans text-xl mb-8 text-silver-light">
            Let's bring your vision to life with our expertise and craftsmanship
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-white text-emerald px-8 py-4 rounded-md font-sans font-bold text-lg hover:bg-silver-light transition-colors"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
