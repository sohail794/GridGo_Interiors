import { useState } from 'react';
import { CheckCircle, Award, Clock, Shield, Wrench, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
import Button from '../components/ui/Button';
import TestimonialCarousel from '../components/TestimonialCarousel';
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
      <HeroSection onNavigate={onNavigate} onOpenModal={onOpenModal} />

      <section className="py-12 bg-[#141b2d] border-y border-white/5">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-wrap justify-around items-center gap-8">
            {trustIndicators.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 hover:-translate-y-1 transition-all duration-300 cursor-default"
                >
                  <Icon size={32} className="text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
                  <span className="text-lg font-semibold text-white">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio-section" className="py-24 bg-[#0a0e27]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">
              From concept to completion, explore our finest work
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'residential', 'commercial', 'retail'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`
                  px-6 py-3 rounded-full font-semibold uppercase tracking-wide text-sm
                  transition-all duration-300
                  ${
                    filter === category
                      ? 'bg-gradient-to-br from-[#00ff88] to-[#00b894] text-[#0a0e27] shadow-3d'
                      : 'bg-white/5 text-[#b4b4b4] hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <GlassCard key={project.id} padding="sm" className="group cursor-pointer overflow-hidden">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <Button3D size="sm" variant="ghost" onClick={() => onNavigate('portfolio')}>
                      View Project
                    </Button3D>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-[#00ff88]/10 text-[#00ff88] rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-[#b4b4b4]">{project.location}</p>
                </div>
              </GlassCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="primary" onClick={() => onNavigate('portfolio')} className="text-lg px-10 py-5">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-[#141b2d] to-[#0a0e27]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              What We <span className="gradient-text">Do</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">End-to-end solutions for your space</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <GlassCard key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center text-5xl">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-[#b4b4b4] mb-6">{service.description}</p>
                <ul className="space-y-3 text-left">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#b4b4b4]">
                      <CheckCircle size={16} className="text-[#00ff88] flex-shrink-0" />
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
        </div>
      </section>

      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">From vision to reality in four stages</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full border-2 border-[#00ff88] bg-[#141b2d] flex items-center justify-center mb-6 z-10 relative">
                      <span className="text-2xl font-bold gradient-text">{step.number}</span>
                    </div>
                    <GlassCard padding="sm" className="w-full">
                      <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                      <p className="text-sm text-[#b4b4b4]">{step.description}</p>
                    </GlassCard>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#141b2d]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Why Choose <span className="gradient-text">GridGo</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">What sets us apart</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex gap-4 p-6 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="flex-shrink-0">
                    <Icon size={32} className="text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.5)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-[#b4b4b4]">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-[900px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              What Clients <span className="gradient-text">Say</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">Real experiences from real clients</p>
          </div>

          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-[#141b2d] to-[#1a1f3a]">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-[#b4b4b4] mb-10">
            Let's discuss your project and bring your vision to life
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Button variant="primary" onClick={onOpenModal} className="text-lg px-10 py-5">
              Get a Free Quote
            </Button>
            <Button variant="secondary" onClick={() => onNavigate('contact')} className="text-lg px-10 py-5">
              Contact Us
            </Button>
          </div>

<div className="text-center">
  <p className="text-sm text-[#6b7280] mb-6">or reach us via</p>
  <div className="flex justify-center gap-6">
    <a
      href="https://wa.me/918595007476"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#b4b4b4] hover:text-[#00ff88] transition-all hover:scale-110 cursor-pointer"
    >
      <span className="text-sm">WhatsApp</span>
    </a>
    <a
      href="mailto:sohailsaifi561@gmail.com"
      className="text-[#b4b4b4] hover:text-[#00ff88] transition-all hover:scale-110 cursor-pointer"
    >
                    <span className="text-sm">Email</span>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b4b4b4] hover:text-[#00ff88] transition-all hover:scale-110 cursor-pointer"
            >
              <span className="text-sm">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
);
}