export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  date: string;
  readTime: string;
  tags: string[];
  coverImage: string;
  author: {
    name: string;
    avatar: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum ViewState {
  HOME = 'HOME',
  POST = 'POST',
  ABOUT = 'ABOUT'
}