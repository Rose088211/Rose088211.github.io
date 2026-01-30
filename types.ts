
export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  link?: string;
  category: 'web' | 'mobile' | 'ai' | 'design';
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
