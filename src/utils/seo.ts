export const updatePageMeta = (title: string, description: string) => {
  document.title = `${title} | GridGo Interiors`;

  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }
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
