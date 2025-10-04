import { useState } from 'react';
import { CheckCircle, Award, Clock, Shield, Wrench, Sparkles } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
import TestimonialCarousel from '../components/TestimonialCarousel';
import { featuredProjects, testimonials } from '../data/content';

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
    { icon: Award, text: '20+ Years Experience' },
    { icon: CheckCircle, text: '300+ Projects Completed' },
    { icon: Sparkles, text: '15 Cities Across India' },
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
            <Button3D size="lg" onClick={() => onNavigate('portfolio')}>
              View All Projects
            </Button3D>
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
            <Button3D size="lg" onClick={onOpenModal}>
              Get a Free Quote
            </Button3D>
            <Button3D size="lg" variant="secondary" onClick={() => onNavigate('contact')}>
              Contact Us
            </Button3D>
          </div>

          <div className="text-center">
  <p className="text-sm text-[#6b7280] mb-4">or reach us via</p>
                        <div className="text-center">
            <p className="text-sm text-[#6b7280] mb-6">or reach us via</p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/918595007476"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#101622] border border-[#00ff88] rounded-2xl px-6 py-4 min-w-[200px] shadow-lg hover:scale-105 hover:border-[#06b6d4] transition-all"
              >
                <div className="bg-[#00ff88] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 32 32" fill="white" width="24" height="24">
                    <path d="M27.5 16c0 6.351-5.149 11.5-11.5 11.5a11.466 11.466 0 0 1-5.527-1.409l-5.653 1.585 1.705-5.512A11.512 11.512 0 0 1 4.5 16c0-6.351 5.149-11.5 11.5-11.5S27.5 9.649 27.5 16zm-11.5 9.5c2.025 0 3.965-.619 5.626-1.78l.401-.256 3.065.86-.79-3.057.258-.405c1.148-1.798 1.765-3.728 1.765-5.62 0-5.238-4.262-9.5-9.5-9.5s-9.5 4.262-9.5 9.5c0 1.858.597 3.767 1.7 5.557l.245.386-.761 2.463 2.454-.759.384.242A9.477 9.477 0 0 0 16 25.5zm5.259-7.28c-.139-.069-1.125-.555-1.298-.618-.173-.064-.298-.096-.424.097-.125.193-.486.617-.597.748-.112.131-.223.147-.413.05-.194-.096-.823-.308-1.565-.982-.579-.517-.972-1.157-1.087-1.351-.113-.193-.012-.298.085-.393.087-.086.194-.222.29-.333.097-.111.128-.193.192-.322.063-.129.032-.237-.017-.333-.049-.096-.428-1.017-.586-1.393-.154-.366-.311-.315-.427-.322-.109-.005-.235-.007-.36-.007-.125 0-.326.047-.497.247-.172.199-.655.741-.655 1.81 0 1.067.757 2.098.864 2.247.107.149 1.51 2.444 3.657 3.425.51.221.908.355 1.218.454.512.164.978.141 1.347.085.413-.061 1.273-.518 1.452-1.018.18-.501.18-.931.126-1.025-.054-.094-.199-.149-.418-.262z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-[#00ff88]">WhatsApp</span>
              </a>
              
              {/* Email */}
              <a
                href="mailto:sohailsaifi561@gmail.com"
                className="flex items-center gap-4 bg-[#101622] border border-[#00ff88] rounded-2xl px-6 py-4 min-w-[200px] shadow-lg hover:scale-105 hover:border-[#06b6d4] transition-all"
              >
                <div className="bg-[#00ff88] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 32 32" fill="white" width="24" height="24">
                    <path d="M4 8C4 6.89543 4.89543 6 6 6H26C27.1046 6 28 6.89543 28 8V24C28 25.1046 27.1046 26 26 26H6C4.89543 26 4 25.1046 4 24V8ZM6 8V8.0024L16 15.5L26 8.0024V8H6ZM26 10.6976L16.9442 18.2787C16.3992 18.7233 15.6008 18.7233 15.0558 18.2787L6 10.6976V24H26V10.6976Z"/>
                  </svg>
                </div>
                <span className="text-lg font-semibold text-[#00ff88]">Email</span>
              </a>
              
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#101622] border border-[#00ff88] rounded-2xl px-6 py-4 min-w-[200px] shadow-lg hover:scale-105 hover:border-[#06b6d4] transition-all"
              >
                <div className="bg-[#00ff88] rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 32 32" fill="white" width="24" height="24">
                    <path d="M27 4H5C5 4 4 4 4 5V27C4 27 4 28 5 28H27C27 28 28 27 28 27V5C28 4 27 4 27 4ZM11.334 23.334H8.667V13.334H11.334V23.334ZM10 12.088C9.112 12.088 8.4 11.34 8.4 10.513C8.4 9.687 9.128 8.946 10 8.946C10.872 8.946 11.6 9.7 11.6 10.513C11.6 11.34 10.888 12.088 10 12.088ZM23.334 23.334H20.667V18.667C20.667 17.522 19.778 17.667 19.334 17.667C18.89 17.667 17.667 17.767 17.667 18.667V23.334H15V13.334H17.667V14.192C18.295 13.333 18.92 13.333 19.334 13.333C20.238 13.333 21 13.92 21 15.209V23.334Z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-[#00ff88]">LinkedIn</span>
              </a>
            </div>
          </div>        {/* closes text-center wrapper */}
      </section>      {/* closes section */}          
  );                  {/* closes return() */}
}