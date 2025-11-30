import { Calendar, Tag } from 'lucide-react';
import { blogPosts } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import SectionHeader from '../components/ui/SectionHeader';
import Card from '../components/ui/Card';
import FormInput from '../components/ui/FormInput';

interface BlogProps {
  onNavigate: (page: string) => void;
}

export default function Blog({ onNavigate }: BlogProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section spacing="lg" background="secondary">
        <Container>
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Expert <span className="gradient-text">Perspectives</span>
            </h1>
            <p className="text-xl text-text-secondary">
              on Interior Design & Craftsmanship
            </p>
          </div>
        </Container>
      </Section>

      {/* Blog Posts Section */}
      <Section spacing="lg" background="none">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <GlassCard key={post.id} padding="sm" className="group cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ease-out">
                <div className="relative overflow-hidden rounded-lg mb-4" style={{ aspectRatio: '16/10' }}>
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={`${post.title} - ${post.category} article on interior design`}
                      width={800}
                      height={500}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 bg-neutral-900/30 flex items-center justify-center">
                      <span className="text-text-tertiary text-sm">Image placeholder</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-emerald/10 text-brand-emerald rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-text-secondary">
                    <Calendar size={16} className="mr-2 text-brand-emerald" />
                    <span className="text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold text-white group-hover:text-brand-emerald transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-text-secondary leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Button variant="secondary" className="mt-4">
                    Read More →
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Newsletter Section */}
      <Section spacing="lg" background="secondary">
        <Container maxWidth="md">
          <Card padding="lg" glass>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Stay <span className="gradient-text">Updated</span>
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Subscribe to our newsletter for the latest trends, tips, and project showcases
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                <FormInput
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1"
                />
                <Button variant="primary" size="md" type="submit" className="w-full sm:w-auto">
                  Subscribe
                </Button>
              </form>
            </div>
          </Card>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section spacing="xl" background="gradient">
        <Container maxWidth="md">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-text-secondary mb-10">
              Let's discuss how we can bring your interior design vision to life
            </p>

            <Button variant="primary" onClick={() => onNavigate('contact')} size="lg">
              Contact Us
            </Button>

            <div className="text-center mt-10">
              <p className="text-sm text-text-tertiary mb-6">or reach us via</p>
              <div className="flex justify-center gap-6">
                <a
                  href="https://wa.me/918595007476"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-emerald transition-all hover:scale-110 cursor-pointer"
                >
                  <span className="text-sm">WhatsApp</span>
                </a>
                <a
                  href="mailto:sohailsaifi561@gmail.com"
                  className="text-text-secondary hover:text-brand-emerald transition-all hover:scale-110 cursor-pointer"
                >
                  <span className="text-sm">Email</span>
                </a>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-emerald transition-all hover:scale-110 cursor-pointer"
                >
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}