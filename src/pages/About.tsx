import { useState } from 'react';
import { CheckCircle, Award, Target, Lightbulb, Leaf } from 'lucide-react';
import { teamMembers, timeline } from '../data/content';
import GlassCard from '../components/GlassCard';
import HeroBackground from '../components/HeroBackground';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import { COMPANY } from '../config/company';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  const [workshopImageLoaded, setWorkshopImageLoaded] = useState(false);
  
  const principles = [
    {
      icon: Lightbulb,
      title: 'Creativity & Innovation',
      description: 'We push boundaries to create unique, inspiring spaces that reflect your vision while incorporating the latest design trends and technologies.',
    },
    {
      icon: Leaf,
      title: 'Eco-Conscious Practices',
      description: 'Sustainability is at the heart of our operations. We source eco-friendly materials and implement practices that minimize environmental impact.',
    },
    {
      icon: Target,
      title: 'Client Dedication',
      description: 'Your satisfaction is our priority. We maintain transparent communication, respect timelines, and ensure every detail meets your expectations.',
    },
  ];

  const stats = [
    { value: '20+', label: 'Years of Excellence' },
    { value: '300+', label: 'Projects Delivered' },
    { value: '15', label: 'Cities Covered' },
    { value: '98%', label: 'Client Satisfaction' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Optimized Hero Background with blur placeholder */}
        <HeroBackground
          src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=80"
          alt="GridGo workshop crafting premium interiors"
        />

        <Container>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Two Decades of
              <br />
              <span className="gradient-text">Inspired Craftsmanship</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Transforming visions into reality since {COMPANY.foundingYear}
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <Section spacing="lg" background="none">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-16 md:mb-24 pb-12 border-b border-white/5">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 md:p-8">
                <div className="text-4xl sm:text-5xl md:text-display-md font-bold gradient-text mb-3">
                  {stat.value}
                </div>
                <div className="text-body-sm text-text-tertiary uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-10">
              <div>
                <p className="text-label-sm text-brand-emerald uppercase tracking-widest mb-3">Our Journey</p>
                <h2 className="text-h1 md:text-display-md font-bold mb-4">
                  Our <span className="gradient-text">Story</span>
                </h2>
                <p className="text-body-lg text-text-secondary leading-relaxed">
                  From a vision of transforming spaces to becoming India's premier integrated interior services provider — our journey spans over two decades of dedication to excellence.
                </p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-emerald/20 transition-colors">
                  <h3 className="text-h4 font-semibold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={20} className="text-brand-emerald" />
                    </div>
                    How GridGo Began
                  </h3>
                  <p className="text-body-base text-text-secondary leading-relaxed pl-[52px]">
                    Founded in {COMPANY.foundingYear}, GridGo Interiors emerged from a vision to transform ordinary spaces
                    into extraordinary environments. What started as a small team of passionate craftsmen 
                    has grown into a comprehensive design powerhouse.
                  </p>
                </div>

                <div className="space-y-4 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-emerald/20 transition-colors">
                  <h3 className="text-h4 font-semibold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 flex items-center justify-center flex-shrink-0">
                      <Award size={20} className="text-brand-emerald" />
                    </div>
                    Our Design Philosophy
                  </h3>
                  <p className="text-body-base text-text-secondary leading-relaxed pl-[52px]">
                    We believe that every space tells a story. Our philosophy centers on understanding 
                    your unique vision and translating it into environments that inspire, function 
                    beautifully, and stand the test of time.
                  </p>
                </div>

                <div className="space-y-4 p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-brand-emerald/20 transition-colors">
                  <h3 className="text-h4 font-semibold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-emerald/10 flex items-center justify-center flex-shrink-0">
                      <Target size={20} className="text-brand-emerald" />
                    </div>
                    Comprehensive Expertise
                  </h3>
                  <p className="text-body-base text-text-secondary leading-relaxed pl-[52px]">
                    What sets GridGo apart is our end-to-end approach: from steel fabrication and glass
                    applications to marble craftsmanship, bespoke furniture, artistic décor, and premium 
                    painting — we bring every element together seamlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative order-first lg:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/20 to-brand-cyan/20 rounded-2xl blur-3xl" />
              <div className="relative" style={{ aspectRatio: '4/5' }}>
                {/* Blur placeholder */}
                {!workshopImageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse rounded-2xl z-10" />
                )}
                <img
                  src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="GridGo Workshop - Crafting premium interiors"
                  width={800}
                  height={1000}
                  className={`relative z-10 w-full h-[450px] lg:h-[550px] object-cover rounded-2xl shadow-2xl transition-opacity duration-300 ${workshopImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => setWorkshopImageLoaded(true)}
                />
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 z-20 bg-background-secondary/90 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-xl hidden md:block">
                  <div className="text-3xl font-bold gradient-text mb-1">300+</div>
                  <div className="text-body-sm text-text-secondary">Projects Completed</div>
                </div>
                {/* Corner accent */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-emerald/40 rounded-tr-2xl hidden lg:block" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section spacing="lg" background="secondary">
        <Container>
          <SectionHeader 
            title="Our Journey"
            subtitle="Milestones that shaped our legacy"
          />

          <div className="relative mt-12">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-brand-emerald via-brand-cyan to-transparent hidden md:block" />

            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div
                  key={event.year}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="w-full md:w-5/12">
                    {index % 2 === 0 && (
                      <GlassCard hover={false}>
                        <h3 className="text-2xl font-bold text-text-primary mb-3">{event.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{event.description}</p>
                      </GlassCard>
                    )}
                  </div>

                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-brand-emerald to-brand-emerald-dark rounded-full shadow-3d flex-shrink-0 z-10">
                    <span className="text-xl font-bold text-background-primary">{event.year}</span>
                  </div>

                  <div className="w-full md:w-5/12">
                    {index % 2 !== 0 && (
                      <GlassCard hover={false}>
                        <h3 className="text-2xl font-bold text-text-primary mb-3">{event.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{event.description}</p>
                      </GlassCard>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership Section */}
      <Section spacing="lg" background="none">
        <Container>
          <SectionHeader 
            title="Meet Our Leadership"
            subtitle="Visionaries driving excellence"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {teamMembers.map((member) => (
              <GlassCard key={member.id} padding="sm" className="text-center group">
                {member.image && (
                  <div className="relative overflow-hidden rounded-radius-lg mb-6" style={{ aspectRatio: '3/4' }}>
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      width={400}
                      height={533}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-text-primary mb-2">{member.name}</h3>
                <p className="text-brand-emerald font-semibold mb-3">{member.title}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{member.expertise}</p>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Principles Section */}
      <Section spacing="lg" background="secondary">
        <Container>
          <SectionHeader 
            title="Our Core Principles"
            subtitle="Values that guide every project"
          />

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <GlassCard key={index} className="text-center p-6 md:p-8 group hover:border-brand-emerald/30 transition-colors">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-brand-emerald/10 flex items-center justify-center group-hover:bg-brand-emerald/20 transition-colors">
                    <Icon size={40} className="text-brand-emerald" />
                  </div>
                  <h3 className="text-h3 font-bold text-text-primary mb-4">{principle.title}</h3>
                  <p className="text-body-base text-text-secondary leading-relaxed">{principle.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="gradient">
        <Container maxWidth="md">
          <div className="text-center">
            <p className="text-label-sm text-brand-emerald uppercase tracking-widest mb-4">Ready to Begin?</p>
            <h2 className="text-h1 md:text-display-md font-bold mb-6">
              <span className="gradient-text">Partner with Us</span>
            </h2>
            <p className="text-body-lg text-text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
              Ready to transform your space? Let's discuss your vision and create something
              extraordinary together.
            </p>
            <Button variant="primary" size="lg" onClick={() => onNavigate('contact')}>
              Start Your Project
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
