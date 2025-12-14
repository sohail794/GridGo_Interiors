import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Clock, Layers, CheckCircle, Phone, Mail } from 'lucide-react';
import { Project } from '../types';
import { projects } from '../data/content';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Breadcrumb from '../components/Breadcrumb';
import GlassCard from '../components/GlassCard';
import Button from '../components/ui/Button';
import { CONTACT } from '../config/contact';
import { useEffect } from 'react';

interface ProjectDetailProps {
  projectId: string;
  onBack: () => void;
}

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
  const project = projects.find((p: Project) => p.id === projectId);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  if (!project) {
    return (
      <Section className="min-h-screen pt-24">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <p className="text-gray-600 mb-8">The project you're looking for doesn't exist.</p>
            <Button onClick={onBack}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Portfolio
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  const relatedProjects = projects
    .filter((p: Project) => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: project.title },
  ];

  // Schema.org structured data for the project
  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    image: project.image,
    creator: {
      '@type': 'Organization',
      name: 'GridGo Interiors',
    },
    locationCreated: {
      '@type': 'Place',
      address: project.location,
    },
    material: project.materials?.join(', '),
    dateCreated: project.timeline,
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-gray-50">
        <Container>
          <Breadcrumb items={breadcrumbItems} />
        </Container>
      </div>

      {/* Back Button */}
      <Section className="py-4">
        <Container>
          <button
            onClick={onBack}
            className="flex items-center text-amber-600 hover:text-amber-700 transition-colors font-medium"
            aria-label="Go back to portfolio"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Portfolio
          </button>
        </Container>
      </Section>

      {/* Hero Image */}
      <Section className="py-8">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.image}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-[50vh] md:h-[60vh] object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-block px-4 py-1 bg-amber-500 text-white text-sm font-medium rounded-full mb-4 capitalize">
                  {project.category}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  {project.location && (
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </span>
                  )}
                  {project.timeline && (
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {project.timeline}
                    </span>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Project Details */}
      <Section className="py-12">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {project.description}
                </p>
                {project.scope && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                      <Layers className="w-5 h-5 mr-2 text-amber-500" />
                      Scope of Work
                    </h3>
                    <p className="text-gray-700">{project.scope}</p>
                  </div>
                )}
              </motion.div>

              {/* Materials Used */}
              {project.materials && project.materials.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-gray-50 rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Materials & Finishes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.materials.map((material: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm"
                      >
                        <CheckCircle className="w-5 h-5 text-amber-500 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{material}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Before/After Gallery (if available) */}
              {project.beforeImage && project.afterImage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Transformation</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={project.beforeImage}
                        alt={`${project.title} - Before`}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-4 left-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-sm">
                        Before
                      </span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={project.afterImage}
                        alt={`${project.title} - After`}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                        loading="lazy"
                      />
                      <span className="absolute bottom-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm">
                        After
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="sticky top-24 space-y-6"
              >
                {/* Contact Card */}
                <GlassCard className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Interested in a Similar Project?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Let's discuss how we can transform your space with our expertise.
                  </p>
                  <div className="space-y-4">
                    {CONTACT.phone && (
                      <a
                        href={`tel:${CONTACT.phone}`}
                        className="flex items-center justify-center w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                      >
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    )}
                    {CONTACT.email && (
                      <a
                        href={`mailto:${CONTACT.email}?subject=Inquiry about ${project.title}`}
                        className="flex items-center justify-center w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Email Us
                      </a>
                    )}
                  </div>
                </GlassCard>

                {/* Project Stats */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Project Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-gray-500">Category</dt>
                      <dd className="text-gray-900 font-medium capitalize">{project.category}</dd>
                    </div>
                    {project.location && (
                      <div>
                        <dt className="text-sm text-gray-500">Location</dt>
                        <dd className="text-gray-900 font-medium">{project.location}</dd>
                      </div>
                    )}
                    {project.timeline && (
                      <div>
                        <dt className="text-sm text-gray-500">Timeline</dt>
                        <dd className="text-gray-900 font-medium">{project.timeline}</dd>
                      </div>
                    )}
                    {project.scope && (
                      <div>
                        <dt className="text-sm text-gray-500">Scope</dt>
                        <dd className="text-gray-900 font-medium">{project.scope}</dd>
                      </div>
                    )}
                  </dl>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <Section className="py-16 bg-gray-50">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                Similar Projects
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((relatedProject: Project, index: number) => (
                  <motion.div
                    key={relatedProject.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="group cursor-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  >
                    <div className="relative rounded-xl overflow-hidden shadow-lg">
                      <img
                        src={relatedProject.image}
                        alt={relatedProject.title}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-bold text-lg">{relatedProject.title}</h3>
                        <p className="text-white/80 text-sm capitalize">{relatedProject.category}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>
      )}
    </>
  );
}
