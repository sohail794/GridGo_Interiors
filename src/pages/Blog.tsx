import { Calendar, Tag } from 'lucide-react';
import { blogPosts } from '../data/content';
import GlassCard from '../components/GlassCard';
import Button3D from '../components/Button3D';

interface BlogProps {
  onNavigate: (page: string) => void;
}

export default function Blog({ onNavigate }: BlogProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-[#141b2d] to-[#1a1f3a]">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Expert <span className="gradient-text">Perspectives</span>
          </h1>
          <p className="text-xl text-[#b4b4b4]">
            on Interior Design & Craftsmanship
          </p>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-24 bg-[#0a0e27]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <GlassCard key={post.id} padding="sm" className="group cursor-pointer overflow-hidden">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={post.image}
                    alt={`${post.title} - ${post.category} article on interior design`}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wide bg-[#00ff88]/10 text-[#00ff88] rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center text-[#b4b4b4]">
                    <Calendar size={16} className="mr-2 text-[#00ff88]" />
                    <span className="text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  <h2 className="text-2xl font-semibold text-white group-hover:text-[#00ff88] transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-[#b4b4b4] leading-relaxed">
                    {post.excerpt}
                  </p>

                  <Button3D size="sm" variant="ghost" className="mt-4">
                    Read More →
                  </Button3D>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-[#141b2d]">
        <div className="max-w-[800px] mx-auto px-8">
          <GlassCard className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stay <span className="gradient-text">Updated</span>
            </h2>
            <p className="text-lg text-[#b4b4b4] mb-8">
              Subscribe to our newsletter for the latest trends, tips, and project showcases
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-[#6b7280] focus:border-[#00ff88] focus:bg-white/10 outline-none transition-all"
                required
              />
              <Button3D size="md" type="submit">
                Subscribe
              </Button3D>
            </form>
          </GlassCard>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#141b2d] to-[#1a1f3a]">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Have a Project in Mind?
          </h2>
          <p className="text-xl text-[#b4b4b4] mb-10">
            Let's discuss how we can bring your interior design vision to life
          </p>

          <Button3D size="lg" onClick={() => onNavigate('contact')}>
            Contact Us
          </Button3D>

          <div className="text-center mt-10">
            <p className="text-sm text-[#6b7280] mb-6">or reach us via</p>
            <div className="flex justify-center gap-6">
              <a
                href="https://wa.me/918595007476"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b4b4b4] hover:text-[#00ff88] transition-all hover:scale-110 cursor-pointer"
              >
                <span className="text-sm">WhatsApp</span>
              </a>
              <a
                href="mailto:sohailsaifi561@gmail.com"
                className="text-[#b4b4b4] hover:text-[#00ff88] transition-all hover:scale-110 cursor-pointer"
              >
                <span className="text-sm">Email</span>
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#b4b4b4] hover:text-[#00ff88] transition-all hover:scale-110 cursor-pointer"
              >
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}