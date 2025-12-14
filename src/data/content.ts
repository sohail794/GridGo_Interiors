import { Testimonial, Project, Service, BlogPost, TeamMember, TimelineEvent } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    location: 'Delhi',
    quote: 'GridGo transformed our corporate office into a modern masterpiece. Their attention to detail and craftsmanship is unmatched! The team was professional, punctual, and delivered exactly what they promised.',
    image: '',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Sharma',
    location: 'Mumbai',
    quote: 'The marble work in our home is absolutely stunning. GridGo exceeded all our expectations with their bespoke solutions. From the initial 3D designs to the final installation, everything was perfect.',
    image: '',
    rating: 5,
  },
  {
    id: '3',
    name: 'Amit Patel',
    location: 'Bangalore',
    quote: 'Exceptional service from consultation to completion. The glass and steel work they delivered is truly world-class. Their in-house fabrication ensured top quality at competitive prices.',
    image: '',
    rating: 5,
  },
  {
    id: '4',
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    quote: 'Our retail showroom looks incredible thanks to GridGo. They understood our vision perfectly and brought it to life beautifully. Highly recommend for commercial projects!',
    image: '',
    rating: 5,
  },
  {
    id: '5',
    name: 'Vikram Singh',
    location: 'Pune',
    quote: 'Outstanding work on our bedroom renovation. The custom furniture and lighting design completely transformed the space. GridGo\'s team was responsive and professional throughout.',
    image: '',
    rating: 5,
  },
  {
    id: '6',
    name: 'Ananya Desai',
    location: 'Chennai',
    quote: 'We hired GridGo for our kitchen remodel and couldn\'t be happier. The modular design is both beautiful and functional. Their warranty and after-service support is excellent.',
    image: '',
    rating: 4,
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
  {
    id: '6',
    title: 'Luxury Bathroom Suite',
    category: 'residential',
    image: '/images/designer-bathroom-vanity-unit.webp',
    description: 'High-end bathroom renovation with custom vanity, premium fixtures, and elegant tile work',
    scope: 'Complete bathroom remodel',
    materials: ['Porcelain Tiles', 'Chrome Fixtures', 'Quartz Countertop', 'Custom Cabinetry'],
    location: 'Pune',
    timeline: 'Completed in 6 weeks',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '7',
    title: 'Modern Living Room',
    category: 'residential',
    image: '/images/portfolio-modern-living-room.webp',
    description: 'Spacious contemporary living room with sleek furniture, natural light, and sophisticated design elements',
    scope: 'Living room interior design',
    materials: ['Engineered Wood', 'LED Lighting', 'Designer Fabrics', 'Glass Accents'],
    location: 'Ahmedabad',
    timeline: 'Completed in 2 months',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '8',
    title: 'Corporate Conference Room',
    category: 'commercial',
    image: '/images/portfolio-conference-room.webp',
    description: 'Professional meeting space with modern furnishings, AV integration, and acoustic treatment for enhanced productivity',
    scope: 'Conference room design',
    materials: ['Acoustic Panels', 'Smart Glass', 'Premium Carpeting', 'LED Displays'],
    location: 'Gurgaon',
    timeline: 'Completed in 5 weeks',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '9',
    title: 'Boutique Retail Store',
    category: 'retail',
    image: '/images/luxury-brass-room-partition.webp',
    description: 'Upscale retail interior with custom displays and ambient lighting',
    scope: 'Full retail interior',
    materials: ['Brass Fixtures', 'Mirror Panels', 'LED Systems', 'Display Units'],
    location: 'Mumbai',
    timeline: 'Completed in 3 months',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '10',
    title: 'Executive Office Suite',
    category: 'commercial',
    image: '/images/service-bedroom-interior-hidden-door.webp',
    description: 'Premium office design with integrated storage and sophisticated finishes',
    scope: 'Executive office interior',
    materials: ['Walnut Veneer', 'Leather Upholstery', 'Brass Details', 'Smart Lighting'],
    location: 'Bangalore',
    timeline: 'Completed in 6 weeks',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '11',
    title: 'Contemporary Staircase',
    category: 'residential',
    image: '/images/colonial-style-staircase-interior.webp',
    description: 'Elegant staircase design with custom metal railing and premium finishes',
    scope: 'Staircase renovation',
    materials: ['Metal Fabrication', 'Wooden Treads', 'Glass Panels', 'LED Strip Lighting'],
    location: 'Chennai',
    timeline: 'Completed in 8 weeks',
    beforeImage: '',
    afterImage: '',
  },
  {
    id: '12',
    title: 'Custom Wardrobe Design',
    category: 'residential',
    image: '/images/service-custom-wardrobe-design.webp',
    description: 'Bespoke wardrobe with optimized storage and premium hardware',
    scope: 'Bedroom storage solution',
    materials: ['Laminated Board', 'Soft-Close Hardware', 'Mirror Panels', 'LED Interior Lighting'],
    location: 'Kolkata',
    timeline: 'Completed in 4 weeks',
    beforeImage: '',
    afterImage: '',
  },
];

// Alias for backward compatibility with project detail pages
export const projects = featuredProjects;

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
    content: `
## The Future of Interior Design in 2025

Interior design continues to evolve, blending timeless elegance with modern innovation. This year, we're seeing exciting shifts in how homeowners approach their living spaces.

### 1. Sustainable Materials Take Center Stage

Eco-conscious design isn't just a trend—it's becoming the standard. From reclaimed wood flooring to recycled glass countertops, sustainable materials are making their way into luxury homes without compromising on aesthetics.

**Key sustainable materials trending in 2025:**
- Bamboo and cork flooring
- Recycled metal fixtures
- VOC-free paints and finishes
- Locally sourced natural stone

### 2. Bold Color Choices

While neutrals remain popular, 2025 is seeing a resurgence of rich, saturated colors. Deep forest greens, warm terracotta, and sophisticated navy blues are making statements in accent walls and furniture pieces.

### 3. Biophilic Design Elements

Bringing nature indoors goes beyond houseplants. Designers are incorporating water features, living walls, and natural light optimization to create healthier, more harmonious living environments.

### 4. Smart Home Integration

Technology seamlessly blends into interior design with hidden speakers, motorized blinds, and lighting systems that adapt to your daily routines.

### How GridGo Incorporates These Trends

At GridGo Interiors, we stay ahead of design trends while maintaining our commitment to quality craftsmanship. Our design team carefully selects materials and techniques that ensure your space remains beautiful and relevant for years to come.
    `,
    image: '/images/blog-sustainable-interior.webp',
    date: '2025-09-15',
    category: 'Trends',
  },
  {
    id: '2',
    title: 'Choosing the Right Marble for Your Home',
    excerpt: 'A comprehensive guide to selecting marble varieties, understanding quality grades, and maintenance tips.',
    content: `
## Your Complete Guide to Marble Selection

Marble has been synonymous with luxury and elegance for centuries. At GridGo Interiors, we've helped hundreds of homeowners select the perfect marble for their spaces.

### Understanding Marble Varieties

**Carrara Marble**
Classic Italian marble with soft gray veining on a white background. Perfect for bathrooms and kitchen countertops.

**Calacatta Marble**
More dramatic veining with bold gray and gold patterns. Often used as statement pieces in entryways and living areas.

**Statuario Marble**
The most prestigious Italian marble with distinctive gray veining. Ideal for high-end applications.

**Indian Marble Options**
- Makrana White: India's answer to Carrara
- Green Marble: Unique forest tones
- Pink Marble: Warm, inviting aesthetics

### Quality Grades Explained

1. **Grade A**: Minimal veining, consistent color
2. **Grade B**: Moderate veining, slight variations
3. **Grade C**: Heavy veining, more character

### Maintenance Tips

- Seal your marble annually
- Clean spills immediately
- Use pH-neutral cleaners only
- Avoid acidic substances
- Use coasters and cutting boards

### Cost Considerations

Budget ₹150-500 per sq. ft. for Indian marble and ₹500-2000+ for imported varieties. Installation typically adds 30-50% to material costs.
    `,
    image: '/images/blog-marble-luxury.webp',
    date: '2025-09-10',
    category: 'Guide',
  },
  {
    id: '3',
    title: 'Modern Kitchen Design Ideas',
    excerpt: 'Explore contemporary kitchen layouts, wood finishes, and island designs that maximize both style and function.',
    content: `
## Designing Your Dream Kitchen

The kitchen is the heart of every home. Here's how to create a space that's both beautiful and functional.

### Popular Layout Options

**L-Shaped Kitchen**
Ideal for open-plan living, offering plenty of counter space and a natural work triangle.

**U-Shaped Kitchen**
Maximum storage and counter space, perfect for serious home cooks.

**Island Kitchen**
Creates a social hub for entertaining while adding prep space and storage.

### Wood Finish Trends

- **Walnut**: Rich, warm tones that add sophistication
- **Oak**: Timeless grain patterns for classic appeal
- **Ash**: Light, contemporary feel
- **Teak**: Durability with natural beauty

### Kitchen Island Design Tips

1. **Size**: Allow at least 90cm of clearance around all sides
2. **Height**: Standard 90cm or bar height at 105cm
3. **Seating**: Plan for 60cm per seat
4. **Utilities**: Consider adding a sink or cooktop

### Smart Kitchen Features

- Soft-close drawers and cabinets
- Pull-out pantry systems
- Under-cabinet lighting
- Integrated appliance garages
- Motion-sensor faucets

### Materials We Recommend

For countertops, consider quartz for durability or granite for natural beauty. Backsplashes in ceramic, glass, or natural stone add personality to your space.
    `,
    image: '/images/blog-modern-kitchen.webp',
    date: '2025-09-05',
    category: 'Inspiration',
  },
  {
    id: '4',
    title: 'Smart Bedroom Lighting Design',
    excerpt: 'Expert tips on LED integration, ambient lighting, and creating the perfect mood in your bedroom.',
    content: `
## Mastering Bedroom Lighting

Proper lighting transforms a bedroom from a simple sleeping space into a sanctuary. Here's our expert guide to bedroom lighting design.

### The Three Layers of Bedroom Lighting

**Ambient Lighting**
General illumination that fills the room. Consider:
- Recessed ceiling lights
- Pendant lights
- Cove lighting

**Task Lighting**
Focused light for specific activities:
- Reading lamps with adjustable arms
- Vanity lighting for grooming
- Closet lighting

**Accent Lighting**
Decorative elements that add depth:
- LED strip lighting behind headboards
- Picture lights for artwork
- Shelf lighting

### LED Integration Best Practices

1. **Color Temperature**: 2700-3000K for warm, relaxing ambiance
2. **Dimmability**: Always install dimmers for flexibility
3. **Hidden Sources**: Cove and indirect lighting creates sophistication
4. **Smart Controls**: Voice or app-controlled systems for convenience

### Bedroom Lighting Ideas

**Behind the Headboard**
LED strips create a floating effect and gentle ambient glow perfect for winding down.

**Under-Bed Lighting**
Motion-sensor LEDs provide safe navigation at night without fully waking you.

**Closet Illumination**
Automatic lights help you find what you need quickly.

### Creating the Perfect Mood

- Morning: Bright, cool light to energize
- Evening: Warm, dim light to relax
- Night: Minimal accent lighting only
    `,
    image: '/images/blog-bedroom-lighting.webp',
    date: '2025-08-28',
    category: 'Tips',
  },
  {
    id: '5',
    title: 'The Art of Steel Fabrication in Modern Interiors',
    excerpt: 'How custom steel work transforms spaces with elegant railings, partitions, and architectural features.',
    content: `
## Steel Fabrication: Where Art Meets Engineering

Steel has become a cornerstone of contemporary interior design, offering both structural integrity and aesthetic appeal.

### Applications in Modern Homes

**Custom Railings**
From minimalist designs to ornate patterns, steel railings add safety without sacrificing style.

**Room Dividers**
Perforated steel panels and geometric patterns create visual interest while maintaining openness.

**Furniture Frames**
Tables, chairs, and shelving with steel frames offer durability and modern appeal.

### Types of Steel Finishes

1. **Polished**: Reflective, contemporary look
2. **Brushed**: Subtle texture, fingerprint-resistant
3. **Powder-coated**: Any color, weather-resistant
4. **Blackened**: Industrial, dramatic aesthetic
5. **Brass-plated**: Warm, luxurious appeal

### The GridGo Advantage

Our in-house fabrication workshop allows us to:
- Create custom designs to exact specifications
- Ensure quality control at every stage
- Deliver faster turnaround times
- Offer competitive pricing

### Maintenance Guide

- Clean with mild soap and water
- Dry immediately to prevent water spots
- Apply protective wax coating annually
- Address scratches promptly to prevent rust
    `,
    image: '/images/blog-steel-interior.webp',
    date: '2025-08-20',
    category: 'Guide',
  },
  {
    id: '6',
    title: 'Small Space Design Solutions',
    excerpt: 'Maximize your compact home with clever storage ideas, multi-functional furniture, and visual tricks.',
    content: `
## Making the Most of Limited Space

Living in a compact home doesn't mean compromising on style or functionality. Here are our top strategies for small space design.

### Storage Solutions

**Vertical Space**
- Floor-to-ceiling wardrobes
- Tall bookshelves
- Wall-mounted cabinets
- Overhead storage

**Hidden Storage**
- Ottoman beds with storage
- Built-in window seats
- Under-stair drawers
- Hollow coffee tables

**Multi-Functional Furniture**
- Sofa beds
- Extendable dining tables
- Nesting tables
- Murphy beds

### Visual Tricks

**Mirrors**
Strategically placed mirrors can double the perceived size of a room.

**Light Colors**
White and pale tones reflect light and create an airy feel.

**Vertical Lines**
Striped wallpaper and tall furniture draw the eye upward.

**Minimal Furniture**
Fewer, larger pieces create less visual clutter than many small items.

### Room-Specific Tips

**Small Bedrooms**
- Platform beds with drawers
- Wall-mounted nightstands
- Sliding wardrobe doors

**Compact Kitchens**
- Pull-out pantry systems
- Under-cabinet hooks
- Magnetic knife strips

**Tiny Bathrooms**
- Wall-mounted vanities
- Recessed medicine cabinets
- Over-toilet storage
    `,
    image: '/images/blog-small-space.webp',
    date: '2025-08-15',
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

export const faqs = [
  {
    id: 'faq-1',
    question: 'What services does GridGo Interiors offer?',
    answer: 'We offer comprehensive interior design services including steel fabrication, glass work, custom marble craftsmanship, bespoke furniture design, décor solutions, and premium painting services. We handle everything from initial consultation and 3D visualization to final installation.',
  },
  {
    id: 'faq-2',
    question: 'Which cities do you serve?',
    answer: 'We serve major cities across India including Mumbai, Delhi NCR, Bangalore, Hyderabad, Chennai, Pune, and 9+ other cities. We have successfully completed projects across 15 cities nationwide with our in-house fabrication and installation teams.',
  },
  {
    id: 'faq-3',
    question: 'How long does a typical project take?',
    answer: 'Project timelines vary based on scope and complexity. A typical residential project takes 2-4 months, while commercial projects may take 3-6 months. We provide detailed timelines during consultation and maintain transparent communication throughout the project.',
  },
  {
    id: 'faq-4',
    question: 'Do you provide 3D visualization before starting work?',
    answer: 'Yes, we provide detailed 3D visualizations and renderings for all projects. This allows you to see and approve the design before we begin fabrication and installation, ensuring the final result matches your vision perfectly.',
  },
  {
    id: 'faq-5',
    question: 'What is your pricing structure?',
    answer: 'Our pricing is customized based on project scope, materials, and complexity. We offer transparent pricing with detailed quotations after the initial consultation. We work with various budgets and provide options to suit your requirements without compromising on quality.',
  },
  {
    id: 'faq-6',
    question: 'Do you offer post-installation support?',
    answer: 'Absolutely! We provide comprehensive post-installation support including warranty coverage, maintenance guidance, and prompt assistance for any issues. Our relationship with clients extends beyond project completion.',
  },
  {
    id: 'faq-7',
    question: 'Can you work with my existing furniture and décor?',
    answer: 'Yes, we can incorporate your existing furniture and décor into the new design. During consultation, we assess your current items and create a cohesive design that blends old and new elements harmoniously.',
  },
  {
    id: 'faq-8',
    question: 'What makes GridGo different from other interior designers?',
    answer: 'We have in-house fabrication facilities for steel, glass, and furniture, ensuring complete quality control and eliminating middlemen. With 20+ years of experience and 300+ completed projects, we offer end-to-end solutions from design to installation with transparent pricing and timely delivery.',
  },
];
