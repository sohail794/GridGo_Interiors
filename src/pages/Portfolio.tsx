import { useState } from 'react';
import { X } from 'lucide-react';
import { featuredProjects } from '../data/content';
import { Project } from '../types';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export default function Portfolio({ onNavigate }: PortfolioProps) {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial' | 'retail'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all'
    ? featuredProjects
    : featuredProjects.filter(p => p.category === filter);

  return (
    <div className="pt-20">
      <section className="relative h-80 bg-gradient-to-br from-emerald via-emerald-light to-emerald">
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="font-serif italic text-5xl md:text-6xl mb-4">
              Timeless Creations
            </h1>
            <p className="font-sans text-xl text-silver-light">
              Design Excellence in Action
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['all', 'residential', 'commercial', 'retail'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category as typeof filter)}
                className={`px-6 py-3 rounded-full font-sans font-semibold transition-all ${
                  filter === category
                    ? 'bg-emerald text-white shadow-luxury'
                    : 'bg-silver-light text-charcoal hover:bg-silver'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-luxury hover:shadow-luxury-hover transition-all">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} interior design project in ${project.location}`}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <div className="text-white">
                      <span className="inline-block bg-emerald px-3 py-1 rounded-full text-xs font-sans font-semibold mb-2">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                      <h3 className="font-serif text-2xl">{project.title}</h3>
                      <p className="font-sans text-sm text-silver-light mt-2">
                        {project.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl mb-6 italic">Envision Your Project</h2>
          <p className="font-sans text-xl mb-8 text-silver-light">
            Ready to create something extraordinary? Let's bring your vision to life.
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-emerald px-8 py-4 rounded-md font-sans font-bold text-lg hover:bg-silver-light transition-colors"
          >
            Start Your Journey
          </button>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="sticky top-0 bg-white border-b-2 border-silver-light p-4 flex justify-between items-center">
              <h2 className="font-serif text-2xl text-emerald">{selectedProject.title}</h2>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-charcoal hover:text-emerald transition-colors"
                aria-label="Close modal"
              >
                <X size={28} />
              </button>
            </div>
            <div className="p-6">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} - ${selectedProject.category} interior design project in ${selectedProject.location}`}
                className="w-full h-96 object-cover rounded-lg mb-6"
                loading="lazy"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-sans font-bold text-charcoal mb-2">Category</h3>
                  <p className="font-sans text-charcoal capitalize">{selectedProject.category}</p>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-charcoal mb-2">Location</h3>
                  <p className="font-sans text-charcoal">{selectedProject.location}</p>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-charcoal mb-2">Scope</h3>
                  <p className="font-sans text-charcoal">{selectedProject.scope}</p>
                </div>
                <div>
                  <h3 className="font-sans font-bold text-charcoal mb-2">Timeline</h3>
                  <p className="font-sans text-charcoal">{selectedProject.timeline}</p>
                </div>
              </div>
              <div className="mb-6">
                <h3 className="font-sans font-bold text-charcoal mb-2">Description</h3>
                <p className="font-sans text-charcoal leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
              <div>
                <h3 className="font-sans font-bold text-charcoal mb-2">Materials Used</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.materials.map((material, index) => (
                    <span
                      key={index}
                      className="bg-emerald/10 text-emerald px-3 py-1 rounded-full text-sm font-sans"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
