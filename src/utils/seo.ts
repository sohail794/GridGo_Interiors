export const updatePageMeta = (title: string, description: string, url?: string, image?: string) => {
  document.title = `${title} | GridGo Interiors`;

  // Update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  } else {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    metaDescription.setAttribute('content', description);
    document.head.appendChild(metaDescription);
  }

  // Update Open Graph tags
  const ogTags = [
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url || window.location.href },
    { property: 'og:image', content: image || '' },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'GridGo Interiors' },
  ];

  ogTags.forEach(({ property, content }) => {
    let element = document.querySelector(`meta[property="${property}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  });

  // Update Twitter Card tags
  const twitterTags = [
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: image || '' },
  ];

  twitterTags.forEach(({ name, content }) => {
    let element = document.querySelector(`meta[name="${name}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('name', name);
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  });
};

// Add structured data (JSON-LD) for search engines
export const addStructuredData = (data: object) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
};

// Organization schema
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'GridGo Interiors',
  description: 'Premium interior design and fabrication services',
  image: 'https://gridgointeriors.com/images/hero-luxury-modular-kitchen.webp',
  telephone: '+91-8595007476',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
    addressRegion: 'Multiple Cities',
    addressLocality: 'Mumbai, Delhi, Bangalore',
  },
  sameAs: [
    'https://www.facebook.com/gridgointeriors',
    'https://www.instagram.com/gridgointeriors',
    'https://www.linkedin.com/company/gridgo-interiors',
  ],
  url: 'https://gridgointeriors.com',
};

export const pageMeta = {
  home: {
    title: 'Luxury Interior Design | Mumbai, Delhi, Bangalore',
    description: 'Premium interior design services in Mumbai, Delhi, Bangalore. Expert steel fabrication, glass work, marble craftsmanship. 20+ years of excellence.',
  },
  portfolio: {
    title: 'Portfolio - Interior Design Projects',
    description: 'View our stunning portfolio of residential, commercial, and retail interior design projects across India. 300+ completed projects.',
  },
  services: {
    title: 'Interior Design Services - Fabrication & Furniture',
    description: 'Complete interior services: steel fabrication, glass work, marble craftsmanship, bespoke furniture, décor & premium painting across India.',
  },
  about: {
    title: 'About Us - 20+ Years of Interior Excellence',
    description: 'GridGo Interiors brings 20+ years of experience in luxury interior design. Learn about our team, process, and commitment to excellence.',
  },
  blog: {
    title: 'Interior Design Insights & Tips',
    description: 'Expert interior design tips, trends, and insights from GridGo Interiors. Stay updated with the latest in luxury interiors.',
  },
  contact: {
    title: 'Contact Us - Get Your Free Consultation',
    description: 'Contact GridGo Interiors for premium interior design services in Mumbai, Delhi, Bangalore. Get a free consultation today.',
  },
};
