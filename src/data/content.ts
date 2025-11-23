import { Testimonial, Project, Service, BlogPost, TeamMember, TimelineEvent } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh K.',
    location: 'Corporate Client, Delhi',
    quote: 'GridGo transformed our corporate office with exceptional attention to detail and craftsmanship.',
    image: '',
  },
  {
    id: '2',
    name: 'Priya S.',
    location: 'Residential Client, Mumbai',
    quote: 'The bespoke solutions and quality of work exceeded our expectations. Highly professional team.',
    image: '',
  },
];

export const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'Luxury Residential Living Concept',
    category: 'residential',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Design visualization showcasing custom marble flooring, bespoke furniture, and artistic décor elements',
    scope: 'Interior design concept visualization',
    materials: ['Italian Marble', 'Teak Wood', 'Brass Fixtures', 'Designer Glass'],
    location: '',
    timeline: '',
  },
  {
    id: '2',
    title: 'Modern Corporate Office Concept',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Contemporary office design with steel partitions, glass conference rooms, and modern furniture',
    scope: 'Commercial design concept',
    materials: ['Stainless Steel', 'Tempered Glass', 'Engineered Wood', 'Premium Paint'],
    location: '',
    timeline: '',
  },
  {
    id: '3',
    title: 'Designer Retail Space Concept',
    category: 'retail',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Inspiring retail design featuring custom displays, ambient lighting, and luxurious finishes',
    scope: 'Retail design visualization',
    materials: ['Decorative Glass', 'Luxury Flooring', 'LED Systems', 'Custom Furniture'],
    location: '',
    timeline: '',
  },
  {
    id: '4',
    title: 'Heritage-Inspired Home Concept',
    category: 'residential',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Design concept blending traditional craftsmanship with modern aesthetics and amenities',
    scope: 'Residential design concept',
    materials: ['Reclaimed Wood', 'Heritage Marble', 'Brass Fittings', 'Traditional Décor'],
    location: '',
    timeline: '',
  },
  {
    id: '5',
    title: 'Boutique Hospitality Concept',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Elegant hospitality design visualization with custom furniture, artistic décor, and premium finishes',
    scope: 'Hospitality design concept',
    materials: ['Designer Fabrics', 'Marble Accents', 'Custom Lighting', 'Artistic Installations'],
    location: '',
    timeline: '',
  },
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Steel Fabrication',
    icon: 'Wrench',
    description: 'Precision-engineered steel structures and fixtures',
    details: 'Our expert team delivers custom steel fabrication solutions including structural frameworks, decorative elements, railings, and architectural features. Using state-of-the-art equipment and premium materials, we ensure durability and aesthetic excellence.',
    features: [
      'Custom structural steel work',
      'Decorative metal elements',
      'Stainless steel fixtures',
      'Precision welding and finishing',
    ],
  },
  {
    id: '2',
    title: 'Glass Applications',
    icon: 'Square',
    description: 'Innovative glass solutions for modern spaces',
    details: 'From elegant glass partitions to stunning facades, we specialize in all types of glass applications. Our expertise includes tempered glass, frosted designs, decorative glass, and energy-efficient solutions that combine beauty with functionality.',
    features: [
      'Tempered and laminated glass',
      'Glass partitions and facades',
      'Decorative and frosted glass',
      'Custom glass installations',
    ],
  },
  {
    id: '3',
    title: 'Marble Craftsmanship',
    icon: 'Gem',
    description: 'Exquisite marble work with timeless appeal',
    details: 'Our master craftsmen bring decades of experience in marble selection, cutting, and installation. We work with premium marble varieties from around the world, creating stunning floors, countertops, wall cladding, and artistic installations.',
    features: [
      'Premium marble sourcing',
      'Custom flooring and cladding',
      'Intricate inlay work',
      'Restoration and polishing',
    ],
  },
  {
    id: '4',
    title: 'Bespoke Furniture',
    icon: 'Armchair',
    description: 'Custom furniture crafted to perfection',
    details: 'Every piece of furniture we create is a work of art, designed specifically for your space and style. From contemporary minimalist pieces to ornate traditional designs, our craftsmen deliver furniture that combines comfort, functionality, and aesthetic appeal.',
    features: [
      'Custom design and fabrication',
      'Premium wood and materials',
      'Ergonomic and functional',
      'Unique artistic pieces',
    ],
  },
  {
    id: '5',
    title: 'Artistic Décor',
    icon: 'Palette',
    description: 'Curated décor elements that inspire',
    details: 'Transform your space with our artistic décor solutions including wall art, sculptures, lighting fixtures, and decorative installations. We collaborate with talented artisans to create unique pieces that reflect your personality and elevate your interiors.',
    features: [
      'Custom wall installations',
      'Sculptural elements',
      'Designer lighting',
      'Unique art pieces',
    ],
  },
  {
    id: '6',
    title: 'Premium Painting',
    icon: 'Paintbrush',
    description: 'Professional painting services with flawless finishes',
    details: 'Our painting experts deliver impeccable results using premium paints and advanced techniques. Whether you need textured finishes, specialized coatings, or classic applications, we ensure long-lasting beauty and protection for your surfaces.',
    features: [
      'Premium quality paints',
      'Textured and specialty finishes',
      'Color consultation',
      'Protective coatings',
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '2025 Interior Design Trends to Watch',
    excerpt: 'Discover the latest trends shaping interior design this year, from sustainable materials to bold color choices.',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-09-15',
    category: 'Trends',
  },
  {
    id: '2',
    title: 'Choosing the Right Marble for Your Home',
    excerpt: 'A comprehensive guide to selecting marble varieties, understanding quality grades, and maintenance tips.',
    image: 'https://images.pexels.com/photos/6492398/pexels-photo-6492398.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-09-10',
    category: 'Guide',
  },
  {
    id: '3',
    title: 'Sustainable Interior Design Practices',
    excerpt: 'Learn how to create beautiful spaces while minimizing environmental impact through eco-friendly choices.',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-09-05',
    category: 'Sustainability',
  },
  {
    id: '4',
    title: 'Maximizing Small Spaces with Smart Design',
    excerpt: 'Expert tips on making the most of compact areas without compromising on style or functionality.',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600',
    date: '2025-08-28',
    category: 'Tips',
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Design Lead',
    title: 'Principal Designer',
    expertise: 'Leading luxury interior design projects with expertise in residential and commercial spaces',
    image: '',
  },
  {
    id: '2',
    name: 'Operations Lead',
    title: 'Head of Operations',
    expertise: 'Managing project execution, material sourcing, and quality control across all projects',
    image: '',
  },
  {
    id: '3',
    name: 'Fabrication Lead',
    title: 'Master Craftsman',
    expertise: 'Specialist in traditional and modern craftsmanship techniques with decades of experience',
    image: '',
  },
];

export const timeline: TimelineEvent[] = [
  {
    year: '2004',
    title: 'Foundation',
    description: 'GridGo Interiors was established with a vision to transform interior spaces',
  },
  {
    year: '2008',
    title: 'Expansion',
    description: 'Expanded services to include comprehensive steel fabrication and glass applications',
  },
  {
    year: '2012',
    title: 'Innovation',
    description: 'Introduced bespoke furniture design and artistic décor services',
  },
  {
    year: '2018',
    title: 'Recognition',
    description: 'Received industry awards for excellence in luxury interior design',
  },
  {
    year: '2024',
    title: 'Nationwide Reach',
    description: 'Established presence across major cities in India with 200+ successful projects',
  },
];
