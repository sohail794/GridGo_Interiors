import { useState } from 'react';
import { X, MapPin, Calendar, Tag } from 'lucide-react';
import { featuredProjects } from '../data/content';
import { Project } from '../types';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'retail'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const filteredProjects = filter === 'all'
    ? featuredProjects
    : featuredProjects.filter(p => p.category === filter);

  const handleImageLoad = (projectId: string) => {
    setImageLoading(prev => ({ ...prev, [projectId]: false }));
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 to-black/50" />

        <div className="relative z-10 text-center">
          <Container maxWidth="lg">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Timeless Creations</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary">
              Design excellence in action
            </p>
          </Container>
        </div>
      </section>

      <Section spacing="lg" background="none">
        <Container>
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['all', 'residential', 'commercial', 'retail'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as typeof filter)}
                className={`
                  px-8 py-3 rounded-full font-semibold uppercase tracking-wide text-sm
                  transition-all duration-300
                  ${
                    filter === category
                      ? 'bg-gradient-to-br from-brand-emerald to-brand-emerald/60 text-background-primary shadow-3d hover:scale-[1.02]'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10 hover:text-white hover:scale-[1.02] border border-white/10 transition-all duration-200'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <GlassCard
                key={project.id}
                padding="sm"
                className="group cursor-pointer touch-manipulation hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ease-out"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  {imageLoading[project.id] !== false && (
                    <div className="absolute inset-0 bg-white/5 animate-pulse rounded-lg flex items-center justify-center">
                      <div className="w-12 h-12 border-4 border-brand-emerald/20 border-t-brand-emerald rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} interior design project`}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    onLoad={() => handleImageLoad(project.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Button3D size="sm" variant="ghost">
                      View Details
                    </Button3D>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-emerald/10 text-brand-emerald rounded-full">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                  <p className="text-text-secondary flex items-center gap-2">
                    <MapPin size={16} />
                    {project.location}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="xl" background="gradient">
        <Container maxWidth="md">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Envision Your Project</span>
            </h2>
            <p className="text-xl text-text-secondary mb-10">
              Ready to create something extraordinary? Let's bring your vision to life.
            </p>
            <Button variant="primary" onClick={() => onNavigate('contact')} size="lg">
              Start Your Journey
            </Button>
          </div>
        </Container>
      </Section>

      {selectedProject && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedProject(null)} />

          <div className="relative z-10 w-full my-8">
            <Container maxWidth="lg">
              <GlassCard className="relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full border-2 border-white/10 hover:border-brand-coral text-white hover:text-brand-coral transition-all flex items-center justify-center z-10"
              >
                <X size={20} />
              </button>

              <div className="space-y-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-96 object-cover rounded-lg mb-6"
                  loading="lazy"
                />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-4 py-2 text-sm font-semibold uppercase tracking-wide bg-brand-emerald/10 text-brand-emerald rounded-full">
                      {selectedProject.category}
                    </span>
                  </div>

                  <h2 className="text-4xl font-bold text-white">
                    {selectedProject.title}
                  </h2>

                  <div className="flex flex-wrap gap-6 text-text-secondary">
                    <div className="flex items-center gap-2">
                      <MapPin size={20} className="text-brand-emerald" />
                      <span>{selectedProject.location}</span>
                    </div>
                    {selectedProject.year && (
                      <div className="flex items-center gap-2">
                        <Calendar size={20} className="text-brand-emerald" />
                        <span>{selectedProject.year}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-lg text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>

                  {selectedProject.features && selectedProject.features.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">Project Highlights</h3>
                      <ul className="grid grid-cols-2 gap-3">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-text-secondary">
                            <Tag size={16} className="text-brand-emerald" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Button3D onClick={() => onNavigate('contact')} className="w-full">
                    Request Similar Design
                  </Button3D>
                </div>
              </div>
            </GlassCard>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}
