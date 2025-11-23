import { CheckCircle, Award, Users, Target, Lightbulb, Leaf } from 'lucide-react';
import { teamMembers, timeline } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
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
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 to-black/50" />

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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-text-tertiary uppercase tracking-wide font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-lg text-text-secondary leading-relaxed">
                <p>
                  Founded in {COMPANY.foundingYear}, GridGo Interiors emerged from a vision to transform ordinary spaces
                  into extraordinary environments. With over two decades of dedication to excellence, we
                  have established ourselves as India's premier integrated interior services provider.
                </p>
                <p>
                  Our journey began with a small team of passionate craftsmen and designers who believed
                  that every space tells a story. Today, we are proud to have completed over 300
                  projects across India, each one a testament to our commitment to quality,
                  innovation, and client satisfaction.
                </p>
                <p>
                  What sets GridGo apart is our comprehensive approach to interior design. We don't just
                  design spaces; we bring them to life through our expertise in steel fabrication, glass
                  applications, marble craftsmanship, bespoke furniture creation, artistic décor, and
                  premium painting.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-emerald/10 to-brand-cyan/10 rounded-radius-2xl blur-3xl" />
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="GridGo Workshop"
                className="relative z-10 w-full h-[400px] object-cover rounded-radius-2xl shadow-lg"
                loading="lazy"
              />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {teamMembers.map((member) => (
              <GlassCard key={member.id} padding="sm" className="text-center group">
                {member.image && (
                  <div className="relative overflow-hidden rounded-radius-lg mb-6">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
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

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <GlassCard key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-radius-lg bg-brand-emerald/10 flex items-center justify-center">
                    <Icon size={40} className="text-brand-emerald" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4">{principle.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{principle.description}</p>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Partner with Us</span>
            </h2>
            <p className="text-xl text-text-secondary mb-10 leading-relaxed">
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
