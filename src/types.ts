export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'retail';
  image: string;
  description: string;
  scope: string;
  materials: string[];
  location: string;
  timeline: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string;
  features: string[];
  gallery?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  expertise: string;
  image?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budgetRange?: string;
  location?: string;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
}
