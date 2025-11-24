import { Testimonial, Project, Service, BlogPost, TeamMember, TimelineEvent } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    quote: 'GridGo transformed our corporate office into a modern masterpiece. Their attention to detail and craftsmanship is unmatched!',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Mumbai',
    quote: 'The marble work in our home is absolutely stunning. GridGo exceeded all our expectations with their bespoke solutions.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '3',
    name: 'Amit Patel',
    location: 'Bangalore',
    quote: 'Exceptional service from consultation to completion. The glass and steel work they delivered is truly world-class.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    quote: 'Our retail showroom looks incredible thanks to GridGo. They understood our vision perfectly and brought it to life beautifully.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

export const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'Luxury Residential Villa',
    category: 'residential',
    image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Complete interior transformation with custom marble flooring, bespoke furniture, and artistic décor',
    scope: 'Full interior design and execution',
    materials: ['Italian Marble', 'Teak Wood', 'Brass Fixtures', 'Designer Glass'],
    location: 'New Delhi',
    timeline: 'Completed in 4 months',
  },
  {
    id: '2',
    title: 'Modern Corporate Office',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Sleek office space with steel partitions, glass conference rooms, and contemporary furniture',
    scope: 'Commercial interior design',
    materials: ['Stainless Steel', 'Tempered Glass', 'Engineered Wood', 'Premium Paint'],
    location: 'Mumbai',
    timeline: 'Completed in 3 months',
  },
  {
    id: '3',
    title: 'Designer Retail Showroom',
    category: 'retail',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Eye-catching retail space with custom displays, ambient lighting, and luxurious finishes',
    scope: 'Retail interior design',
    materials: ['Decorative Glass', 'Luxury Flooring', 'LED Systems', 'Custom Furniture'],
    location: 'Bangalore',
    timeline: 'Completed in 2 months',
  },
  {
    id: '4',
    title: 'Heritage Home Restoration',
    category: 'residential',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Careful restoration blending traditional craftsmanship with modern amenities',
    scope: 'Restoration and modernization',
    materials: ['Reclaimed Wood', 'Heritage Marble', 'Brass Fittings', 'Traditional Décor'],
    location: 'Jaipur',
    timeline: 'Completed in 5 months',
  },
  {
    id: '5',
    title: 'Boutique Hotel Interiors',
    category: 'commercial',
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Elegant hotel interiors featuring custom furniture, artistic décor, and premium finishes',
    scope: 'Hospitality interior design',
    materials: ['Designer Fabrics', 'Marble Accents', 'Custom Lighting', 'Artistic Installations'],
    location: 'Goa',
    timeline: 'Completed in 6 months',
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
    gallery: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&q=80',
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80',
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
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
      'https://images.unsplash.com/photo-1582821261290-91b90f643fe1?w=500&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
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
    gallery: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd905b578db1?w=500&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&q=80',
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
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
      'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
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
    gallery: [
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&q=80',
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&q=80',
      'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&q=80',
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
    gallery: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&q=80',
      'https://images.unsplash.com/photo-1565636192335-14c46fa1120d?w=500&q=80',
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&q=80',
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
    name: 'Arjun Malhotra',
    title: 'Founder & Principal Designer',
    expertise: 'Over 25 years of experience in luxury interior design, specializing in residential and commercial projects',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '2',
    name: 'Kavita Desai',
    title: 'Head of Design & Operations',
    expertise: 'Expert in project management and material sourcing with 18 years in the industry',
    image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    title: 'Master Craftsman',
    expertise: 'Specialist in marble work and traditional craftsmanship techniques with 30 years of experience',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400',
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
