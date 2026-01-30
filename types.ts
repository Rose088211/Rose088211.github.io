
export type Category = 'Web Security' | 'Network' | 'Pentesting' | 'Malware' | 'CTF';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

export interface SecurityTool {
  name: string;
  description: string;
  icon: string;
}
