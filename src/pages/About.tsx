import { CheckCircle, Award, Users, Target, Lightbulb, Leaf } from 'lucide-react';
import { teamMembers, timeline } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';

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

        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Two Decades of
            <br />
            <span className="gradient-text">Inspired Craftsmanship</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#b4b4b4]">
            Transforming visions into reality since 2004
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-[#6b7280] uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Our <span className="gradient-text">Story</span>
              </h2>
              <div className="space-y-4 text-lg text-[#b4b4b4] leading-relaxed">
                <p>
                  Founded in 2003, GridGo Interiors emerged from a vision to transform ordinary spaces
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
              <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-[#00d9ff]/10 rounded-3xl blur-3xl" />
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="GridGo Workshop"
                className="relative z-10 w-full h-[400px] object-cover rounded-2xl shadow-card-hover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#141b2d]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">Milestones that shaped our legacy</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#00ff88] via-[#00d9ff] to-transparent hidden md:block" />

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
                        <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                        <p className="text-[#b4b4b4]">{event.description}</p>
                      </GlassCard>
                    )}
                  </div>

                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#00ff88] to-[#00b894] rounded-full shadow-3d flex-shrink-0 z-10">
                    <span className="text-xl font-bold text-[#0a0e27]">{event.year}</span>
                  </div>

                  <div className="w-full md:w-5/12">
                    {index % 2 !== 0 && (
                      <GlassCard hover={false}>
                        <h3 className="text-2xl font-bold text-white mb-3">{event.title}</h3>
                        <p className="text-[#b4b4b4]">{event.description}</p>
                      </GlassCard>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Meet Our <span className="gradient-text">Leadership</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">Visionaries driving excellence</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <GlassCard key={member.id} padding="sm" className="text-center group">
                {member.image && (
                  <div className="relative overflow-hidden rounded-lg mb-6">
                    <img
                      src={member.image}
                      alt={`${member.name} - ${member.title}`}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-[#00ff88] font-semibold mb-3">{member.title}</p>
                <p className="text-sm text-[#b4b4b4]">{member.expertise}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#141b2d]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Our Core <span className="gradient-text">Principles</span>
            </h2>
            <p className="text-xl text-[#b4b4b4]">Values that guide every project</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <GlassCard key={index} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center">
                    <Icon size={40} className="text-[#00ff88]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">{principle.title}</h3>
                  <p className="text-[#b4b4b4] leading-relaxed">{principle.description}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-32 bg-gradient-to-br from-[#141b2d] to-[#1a1f3a]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Partner with Us</span>
          </h2>
          <p className="text-xl text-[#b4b4b4] mb-10">
            Ready to transform your space? Let's discuss your vision and create something
            extraordinary together.
          </p>
          <Button3D size="lg" onClick={() => onNavigate('contact')}>
            Start Your Project
          </Button3D>
        </div>
      </section>
    </div>
  );
}
