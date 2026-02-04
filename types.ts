export interface TimelineEvent {
  id: number;
  title: string;
  description: string;
  icon: string; // Using string identifiers for Lucide icons
  year: string;
}

export interface GalleryItem {
  id: number;
  src: string;
  caption: string;
  date: string;
}

export interface FloatingParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  emoji: string;
}

export interface KissMark {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
}