import { Calendar, Tag } from 'lucide-react';
import { blogPosts } from '../data/content';

interface BlogProps {
  onNavigate: (page: string) => void;
}

export default function Blog({ onNavigate }: BlogProps) {
  return (
    <div className="pt-20">
      <section className="relative h-80 bg-gradient-to-r from-emerald-dark to-emerald">
        <div className="relative h-full flex items-center justify-center px-4">
          <div className="text-center text-white">
            <h1 className="font-serif italic text-5xl md:text-6xl mb-4">
              Expert Perspectives
            </h1>
            <p className="font-sans text-xl text-silver-light">
              on Interior Design & Craftsmanship
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-lg shadow-luxury hover:shadow-luxury-hover transition-all overflow-hidden group cursor-pointer"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald text-white px-3 py-1 rounded-full text-sm font-sans font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-silver mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span className="font-sans text-sm">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl text-charcoal mb-3 group-hover:text-emerald transition-colors">
                    {post.title}
                  </h2>
                  <p className="font-sans text-charcoal mb-4 leading-relaxed">{post.excerpt}</p>
                  <button className="text-emerald font-sans font-semibold hover:underline">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-silver-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-lg shadow-luxury text-center">
            <h2 className="font-serif text-3xl text-emerald mb-4">Stay Updated</h2>
            <p className="font-sans text-charcoal mb-6">
              Subscribe to our newsletter for the latest trends, tips, and project showcases
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-md border-2 border-silver focus:border-emerald outline-none transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-emerald hover:bg-emerald-dark text-white px-8 py-3 rounded-md font-sans font-bold transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl mb-6 italic">Have a Project in Mind?</h2>
          <p className="font-sans text-xl mb-8 text-silver-light">
            Let's discuss how we can bring your interior design vision to life
          </p>
          <button
            onClick={() => onNavigate('contact')}
            className="bg-white text-emerald px-8 py-4 rounded-md font-sans font-bold text-lg hover:bg-silver-light transition-colors"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
