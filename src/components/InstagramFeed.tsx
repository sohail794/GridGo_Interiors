import { Instagram } from 'lucide-react';

interface InstagramFeedProps {
  username?: string;
  limit?: number;
}

export default function InstagramFeed({ username = 'gridgointeriors', limit = 6 }: InstagramFeedProps) {
  // Mock Instagram posts for demo - in production, use Instagram API
  const mockPosts = [
    {
      id: '1',
      image: '/images/portfolio/modern-living-room.jpg',
      caption: 'Stunning modern living room transformation ✨',
      likes: 234,
      comments: 12,
    },
    {
      id: '2',
      image: '/images/portfolio/luxury-kitchen.jpg',
      caption: 'Luxury modular kitchen design 🏡',
      likes: 189,
      comments: 8,
    },
    {
      id: '3',
      image: '/images/portfolio/bedroom-interior.jpg',
      caption: 'Serene bedroom retreat 💤',
      likes: 156,
      comments: 5,
    },
    {
      id: '4',
      image: '/images/portfolio/office-space.jpg',
      caption: 'Contemporary office interior 💼',
      likes: 145,
      comments: 7,
    },
    {
      id: '5',
      image: '/images/portfolio/bathroom-design.jpg',
      caption: 'Elegant bathroom makeover 🛁',
      likes: 178,
      comments: 9,
    },
    {
      id: '6',
      image: '/images/portfolio/dining-room.jpg',
      caption: 'Modern dining space design 🍽️',
      likes: 203,
      comments: 11,
    },
  ].slice(0, limit);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold flex items-center gap-2">
          <Instagram className="w-6 h-6 text-brand-gold" />
          Follow Us on Instagram
        </h3>
        <a
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-gold hover:underline"
        >
          @{username}
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {mockPosts.map((post) => (
          <a
            key={post.id}
            href={`https://instagram.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-lg aspect-square"
          >
            <img
              src={post.image}
              alt={post.caption}
              width="400"
              height="400"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-sm font-semibold mb-2">❤️ {post.likes}</p>
                <p className="text-sm">💬 {post.comments}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="text-center">
        <a
          href={`https://instagram.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all"
        >
          <Instagram className="w-5 h-5" />
          Follow on Instagram
        </a>
      </div>
    </div>
  );
}
