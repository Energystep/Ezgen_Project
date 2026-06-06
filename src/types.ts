export type Page = 'home' | 'dashboard' | 'templates' | 'editor' | 'analytics' | 'pricing' | 'blog';

export interface AdElement {
  id: string;
  type: 'text' | 'image' | 'sticker';
  content: string; // Text string or image/sticker asset URL or source
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  fontSize?: number; // size in pixels/units
  color?: string; // hex color for text
  fontWeight?: string;
  width?: number; // width for images/stickers
  height?: number;
}

export interface AdTemplate {
  id: string;
  title: string;
  category: 'facebook' | 'tiktok' | 'instagram' | 'banner' | 'all';
  businessType: 'food' | 'fashion' | 'realestate' | 'general';
  image: string; // Predefined illustrative image or CSS mockup preview
  width: number; // custom canvas aspect width, e.g. 1080
  height: number; // custom canvas aspect height, e.g. 1080
  aspectRatio: string; // e.g. "1:1"
  bgGradient: string;
  elements: AdElement[];
  isPremium?: boolean;
}

export interface Project {
  id: string;
  title: string;
  templateId: string;
  lastModified: string;
  width: number;
  height: number;
  bgGradient: string;
  elements: AdElement[];
  playsCount?: number;
  clicksCount?: number;
  conversionsCount?: number;
}

export interface BlogArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  reads: number;
  date: string;
  image: string;
  author: string;
  featured?: boolean;
}

export interface ROIInputs {
  budget: number;
  cpc: number;
  conversionRate: number; // as percentage, e.g. 2%
  avgOrderValue: number;
}

export interface AdScheduleEvent {
  id: string;
  projectId: string;
  projectTitle: string;
  platform: 'facebook' | 'tiktok' | 'instagram' | 'google';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  budget: number;
  status: 'scheduled' | 'running' | 'completed';
}
