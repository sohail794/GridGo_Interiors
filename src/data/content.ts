import { Testimonial, Project, Service, BlogPost, TeamMember, TimelineEvent } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    quote: 'GridGo transformed our corporate office into a modern masterpiece. Their attention to detail and craftsmanship is unmatched!',
    image: '',
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Mumbai',
    quote: 'The marble work in our home is absolutely stunning. GridGo exceeded all our expectations with their bespoke solutions.',
    image: '',
  },
  {
    id: '3',
    name: 'Amit Patel',
    location: 'Bangalore',
    quote: 'Exceptional service from consultation to completion. The glass and steel work they delivered is truly world-class.',
    image: '',
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    quote: 'Our retail showroom looks incredible thanks to GridGo. They understood our vision perfectly and brought it to life beautifully.',
    image: '',
  },
];

export const featuredProjects: Project[] = [
  {
    id: '1',
    title: 'Modern Dining Space',
    category: 'residential',
    image: '/images/portfolio-dining-area-modern.webp',
    description: 'Elegant dining area with contemporary furniture, ambient lighting, and refined finishes',
    scope: 'Full interior design and execution',
    materials: ['Italian Marble', 'Teak Wood', 'Brass Fixtures', 'Designer Glass'],
    location: 'New Delhi',
    timeline: 'Completed in 4 months',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '2',
    title: 'Premium Kitchen Island',
    category: 'residential',
    image: '/images/portfolio-wood-kitchen-island.webp',
    description: 'Contemporary kitchen with custom wood island, premium finishes, and functional design',
    scope: 'Kitchen remodel and modernization',
    materials: ['Calacatta Marble', 'Walnut Cabinets', 'Stainless Steel', 'Quartz'],
    location: 'Mumbai',
    timeline: 'Completed in 3 months',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '3',
    title: 'Designer Bedroom Suite',
    category: 'residential',
    image: '/images/portfolio-bedroom-led-design.webp',
    description: 'Luxurious master bedroom with custom LED lighting, ambient design, and premium textiles',
    scope: 'Bedroom interior design',
    materials: ['Premium Fabrics', 'Oak Wood', 'Designer Wallpaper', 'LED Systems'],
    location: 'Bangalore',
    timeline: 'Completed in 2 months',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '4',
    title: 'Corporate Office Space',
    category: 'commercial',
    image: '/images/service-commercial-office-interiors.webp',
    description: 'Modern office with open layout, glass partitions, and ergonomic workspaces',
    scope: 'Commercial interior design',
    materials: ['Stainless Steel', 'Tempered Glass', 'Engineered Wood', 'Premium Paint'],
    location: 'Hyderabad',
    timeline: 'Completed in 3 months',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '5',
    title: 'Custom Vanity & Dresser',
    category: 'residential',
    image: '/images/portfolio-dresser-vanity-unit.webp',
    description: 'Bespoke dresser and vanity unit with premium wood finish and functional storage',
    scope: 'Custom furniture design',
    materials: ['Solid Wood', 'Mirror Glass', 'Brass Hardware', 'Premium Lacquer'],
    location: 'Chennai',
    timeline: 'Completed in 6 weeks',
    beforeImage: '',
    afterImage: '',
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
      '/images/luxury-staircase-metal-railing.webp',
      '/images/custom-cn-metal-partition-wall.webp',
      '/images/luxury-brass-room-partition.webp',
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
      '/images/brass-fluted-glass-room-divider.webp',
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
      '/images/colonial-style-staircase-interior.webp',
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
      '/images/service-custom-wardrobe-design.webp',
      '/images/portfolio-dresser-vanity-unit.webp',
      '/images/portfolio-wood-kitchen-island.webp',
    ],
  },
  {
    id: '5',
    title: 'Interior Design',
    icon: 'Palette',
    description: 'Complete interior design solutions',
    details: 'Transform your space with our comprehensive interior design services. We collaborate with talented designers to create unique environments that reflect your personality and elevate your lifestyle with curated aesthetics.',
    features: [
      'Space planning and layout',
      'Color and material consultation',
      'Lighting design',
      'Full project execution',
    ],
    gallery: [
      '/images/service-3d-space-planning.webp',
      '/images/service-bedroom-interior-hidden-door.webp',
      '/images/portfolio-bedroom-led-design.webp',
      '/images/portfolio-dining-area-modern.webp',
    ],
  },
  {
    id: '6',
    title: 'Bathroom Design',
    icon: 'Paintbrush',
    description: 'Luxurious bathroom spaces with premium finishes',
    details: 'Our bathroom design experts create spa-like retreats with custom vanities, premium fixtures, and elegant storage solutions. We combine functionality with luxury for the perfect bathroom experience.',
    features: [
      'Custom vanity units',
      'Premium storage solutions',
      'Designer fixtures',
      'Waterproof finishes',
    ],
    gallery: [
      '/images/designer-bathroom-vanity-unit.webp',
      '/images/service-bathroom-storage-unit.webp',
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: '2025 Interior Design Trends to Watch',
    excerpt: 'Discover the latest trends shaping interior design this year, from sustainable materials to bold color choices.',
    image: '/images/portfolio-dining-area-modern.webp',
    date: '2025-09-15',
    category: 'Trends',
  },
  {
    id: '2',
    title: 'Choosing the Right Marble for Your Home',
    excerpt: 'A comprehensive guide to selecting marble varieties, understanding quality grades, and maintenance tips.',
    image: '/images/colonial-style-staircase-interior.webp',
    date: '2025-09-10',
    category: 'Guide',
  },
  {
    id: '3',
    title: 'Modern Kitchen Design Ideas',
    excerpt: 'Explore contemporary kitchen layouts, wood finishes, and island designs that maximize both style and function.',
    image: '/images/portfolio-wood-kitchen-island.webp',
    date: '2025-09-05',
    category: 'Inspiration',
  },
  {
    id: '4',
    title: 'Smart Bedroom Lighting Design',
    excerpt: 'Expert tips on LED integration, ambient lighting, and creating the perfect mood in your bedroom.',
    image: '/images/portfolio-bedroom-led-design.webp',
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
    image: '',
  },
  {
    id: '2',
    name: 'Kavita Desai',
    title: 'Head of Design & Operations',
    expertise: 'Expert in project management and material sourcing with 18 years in the industry',
    image: '',
  },
  {
    id: '3',
    name: 'Vikram Singh',
    title: 'Master Craftsman',
    expertise: 'Specialist in marble work and traditional craftsmanship techniques with 30 years of experience',
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
