import { Lightbulb, Leaf, Target } from 'lucide-react';
import { teamMembers } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import { COMPANY } from '../config/company';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export default function About({ onNavigate }: AboutProps) {
  
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
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
        >
          <img 
            src="/images/colonial-style-staircase-interior.webp" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/60" />
        </div>
        
        {/* Navy overlay for brand consistency */}
        <div 
          className="absolute inset-0 z-0 bg-[#0A0E27]/50" 
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden="true"
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
        </Container>
      </Section>

      {/* Principles Section */}
      <Section spacing="lg" background="none">
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

      {/* Leadership Section */}
      <Section spacing="lg" background="secondary">
        <Container>
          <SectionHeader 
            title="Meet Our Leadership"
            subtitle="Visionaries driving excellence"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mt-12">
            {teamMembers.map((member) => (
              <GlassCard key={member.id} padding="sm" className="text-center group">
                <div className="relative overflow-hidden rounded-radius-lg mb-6" style={{ aspectRatio: '3/4' }}>
                  {member.image ? (
                    <>
                      <img
                        src={member.image}
                        alt={`${member.name} - ${member.title}`}
                        width={400}
                        height={533}
                        className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </>
                  ) : (
                    <div className="w-full h-80 bg-neutral-900/30 flex items-center justify-center">
                      <span className="text-text-tertiary text-sm">Image placeholder</span>
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-2">{member.name}</h3>
                <p className="text-brand-emerald font-semibold mb-3">{member.title}</p>
                <p className="text-sm text-text-secondary leading-relaxed">{member.expertise}</p>
              </GlassCard>
            ))}
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
