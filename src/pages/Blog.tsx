import { useState } from 'react';
import { Calendar, CheckCircle, Loader2, X } from 'lucide-react';
import FocusTrap from 'focus-trap-react';
import { blogPosts } from '../data/content';
import { BlogPost } from '../types';
import GlassCard from '../components/GlassCard';
import Button from '../components/ui/Button';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import FormInput from '../components/ui/FormInput';
import { CONTACT } from '../config/contact';

interface BlogProps {
  onNavigate: (page: string) => void;
}

export default function Blog({ onNavigate }: BlogProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);
  const [subscribeError, setSubscribeError] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newsletterEmail.trim()) {
      setSubscribeError('Email is required');
      return;
    }
    
    if (!validateEmail(newsletterEmail)) {
      setSubscribeError('Please enter a valid email address');
      return;
    }
    
    setIsSubscribing(true);
    setSubscribeError('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubscribeSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setSubscribeSuccess(false), 5000);
    } catch {
      setSubscribeError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image Layer */}
        <div
          className="absolute inset-0 z-0"
          aria-hidden="true"
        >
          <img 
            src="/images/portfolio-dining-area-modern.webp" 
            alt="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-neutral-900/60" />
        </div>
        
        {/* Navy overlay for brand consistency */}
        <div 
          className="absolute inset-0 z-0 bg-[#1a1a1a]/50" 
          style={{ mixBlendMode: 'multiply' }}
          aria-hidden="true"
        />

        <Container>
          <div className="relative z-10 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Expert <span className="gradient-text">Perspectives</span>
            </h1>
            <p className="text-xl text-text-secondary">
              on Interior Design & Craftsmanship
            </p>
          </div>
        </Container>
      </section>

      {/* Blog Posts Section */}
      <Section spacing="lg" background="none">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <GlassCard key={post.id} padding="sm" className="group cursor-pointer overflow-hidden hover:scale-[1.02] hover:shadow-lg transition-all duration-200 ease-out">
                <div className="relative overflow-hidden rounded-lg mb-4 h-64">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={`${post.title} - ${post.category} article on interior design`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-900/30 flex items-center justify-center">
                      <span className="text-text-tertiary text-sm">Image placeholder</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-gold/10 text-brand-gold rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-text-secondary">
                    <Calendar size={16} className="mr-2 text-brand-gold" />
                    <span className="text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold text-white group-hover:text-brand-gold transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-text-secondary leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Button 
                    variant="secondary" 
                    className="mt-4"
                    onClick={() => setSelectedPost(post)}
                  >
                    Read More →
                  </Button>
                </div>
              </GlassCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blog Post Modal */}
      {selectedPost && (
        <FocusTrap active={!!selectedPost}>
          <div className="fixed inset-0 z-[2000] overflow-y-auto">
            <div 
              className="fixed inset-0 bg-black/90 backdrop-blur-md" 
              onClick={() => setSelectedPost(null)} 
            />
          
            <div className="relative z-10 min-h-full flex items-start justify-center p-4 py-8">
              <Container maxWidth="lg">
                <GlassCard className="relative animate-fade-in">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full border-2 border-white/20 bg-[#1a1a1a] hover:border-brand-coral text-white hover:text-brand-coral transition-all flex items-center justify-center"
                    aria-label="Close article"
                    type="button"
                  >
                    <X size={20} />
                  </button>

                  <article className="space-y-6">
                    {selectedPost.image && (
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                        <img
                          src={selectedPost.image}
                          alt={selectedPost.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-brand-gold/10 text-brand-gold rounded-full">
                          {selectedPost.category}
                        </span>
                        <div className="flex items-center text-text-secondary">
                          <Calendar size={16} className="mr-2 text-brand-gold" />
                          {new Date(selectedPost.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </div>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-white">
                        {selectedPost.title}
                      </h2>

                      <div className="prose prose-invert max-w-none">
                        <p className="text-lg text-text-secondary leading-relaxed">
                          {selectedPost.excerpt}
                        </p>
                        
                        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
                          <p className="text-text-secondary text-center">
                            🚧 <strong className="text-brand-gold">Full article coming soon!</strong>
                            <br />
                            <span className="text-sm mt-2 block">
                              Subscribe to our newsletter to get notified when new content is published.
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10">
                        <Button 
                          variant="primary" 
                          onClick={() => {
                            setSelectedPost(null);
                            // Scroll to newsletter section
                            setTimeout(() => {
                              document.querySelector('#newsletter-section')?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                        >
                          Subscribe for Updates
                        </Button>
                        <Button 
                          variant="secondary" 
                          onClick={() => setSelectedPost(null)}
                        >
                          Back to Articles
                        </Button>
                      </div>
                    </div>
                  </article>
                </GlassCard>
              </Container>
            </div>
          </div>
        </FocusTrap>
      )}

      {/* Newsletter Section */}
      <Section spacing="lg" background="secondary" id="newsletter-section">
        <Container maxWidth="md">
          <Card padding="lg" glass>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Stay <span className="gradient-text">Updated</span>
              </h2>
              <p className="text-lg text-text-secondary mb-8">
                Subscribe to our newsletter for the latest trends, tips, and project showcases
              </p>
              {subscribeSuccess ? (
                <div className="flex items-center justify-center gap-2 text-brand-gold text-lg" role="status" aria-live="polite">
                  <CheckCircle size={24} />
                  <span>Subscribed! Check your email for confirmation.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                  <div className="flex-1">
                    <FormInput
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        setSubscribeError('');
                      }}
                      disabled={isSubscribing}
                      error={subscribeError}
                      aria-invalid={!!subscribeError}
                      aria-describedby={subscribeError ? 'blog-newsletter-error' : undefined}
                    />
                    {subscribeError && (
                      <p id="blog-newsletter-error" className="text-red-400 text-sm mt-1 text-left" role="alert">
                        {subscribeError}
                      </p>
                    )}
                  </div>
                  <Button variant="primary" size="md" type="submit" className="w-full sm:w-auto" disabled={isSubscribing}>
                    {isSubscribing ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Subscribing...
                      </>
                    ) : 'Subscribe'}
                  </Button>
                </form>
              )}
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
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-gold transition-all hover:scale-110 cursor-pointer focus-ring rounded px-2 py-1"
                >
                  <span className="text-sm">WhatsApp</span>
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-text-secondary hover:text-brand-gold transition-all hover:scale-110 cursor-pointer focus-ring rounded px-2 py-1"
                >
                  <span className="text-sm">Email</span>
                </a>
                <a
                  href={CONTACT.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-brand-gold transition-all hover:scale-110 cursor-pointer focus-ring rounded px-2 py-1"
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