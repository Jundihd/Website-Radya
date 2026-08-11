export type Language = 'ID' | 'EN';

export interface StatItem {
  id: string;
  value: string;
  numberValue: number;
  suffix: string;
  label: { ID: string; EN: string };
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: { ID: string; EN: string };
  description: { ID: string; EN: string };
  iconName: string;
  tags: string[];
  gradient: string;
  features: { ID: string; EN: string }[];
}

export interface CaseStudy {
  id: string;
  slug?: string;
  client: string;
  logo: string;
  image: string;
  category: { ID: string; EN: string };
  title: { ID: string; EN: string };
  summary: { ID: string; EN: string };
  challenge: { ID: string; EN: string };
  solution: { ID: string; EN: string };
  metrics: { value: string; label: { ID: string; EN: string } }[];
  tags: string[];
  industry: string;
  featuresList?: { name: { ID: string; EN: string }; description: { ID: string; EN: string } }[];
  deliverables?: string[];
  screenshots?: string[];
  backgroundColor?: string;
}

export interface CoreValue {
  title: { ID: string; EN: string };
  description: { ID: string; EN: string };
  iconName: string;
}

export interface IndustryItem {
  id: string;
  name: { ID: string; EN: string };
  iconName: string;
  description: { ID: string; EN: string };
  useCases: { ID: string; EN: string }[];
  metrics: string;
}

export interface TechCategory {
  category: string;
  title: { ID: string; EN: string };
  items: { name: string; logo: string; highlight?: boolean }[];
}

export interface ProcessStep {
  step: string;
  title: { ID: string; EN: string };
  description: { ID: string; EN: string };
  duration: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: { ID: string; EN: string };
  rating: number;
}

export interface InsightArticle {
  id: string;
  title: { ID: string; EN: string };
  summary: { ID: string; EN: string };
  content: { ID: string; EN: string };
  category: { ID: string; EN: string } | string;
  date: string;
  readTime: string;
  image: string;
  slug?: string;
  originalUrl?: string;
  tags?: string[];
}

export interface FaqItem {
  question: { ID: string; EN: string };
  answer: { ID: string; EN: string };
}

export interface ArchitectureBlueprint {
  title: string;
  executiveSummary: string;
  architectureComponents: {
    name: string;
    category: string;
    description: string;
  }[];
  implementationPhases: {
    phase: string;
    duration: string;
    deliverables: string[];
  }[];
  expectedMetrics: {
    metric: string;
    label: string;
  }[];
  recommendedTechStack: string[];
  estimatedTimeline: string;
}
