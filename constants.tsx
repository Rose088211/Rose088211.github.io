
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nexus 全球电商架构',
    description: '我为大型跨国零售商设计的前端中台系统。采用了模块化架构，将加载速度提升了 40%。',
    tags: ['React', 'Next.js', 'System Design'],
    imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800',
    category: 'web'
  },
  {
    id: '2',
    title: 'AI 视觉分析中枢',
    description: '一个好玩的尝试。我把 TensorFlow 和 React 结合起来，做了一个可以实时分析城市街道拥堵的 Demo。',
    tags: ['TensorFlow', 'Real-time', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800',
    category: 'ai'
  },
  {
    id: '3',
    title: 'Lumina 冥想空间',
    description: '这是我最喜欢的个人项目。帮助用户在嘈杂的数字生活中找到片刻宁静，注重极致的动画细节。',
    tags: ['Mobile', 'Framer Motion', 'Wellness'],
    imageUrl: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800',
    category: 'mobile'
  }
];

export const SKILLS: Skill[] = [
  { name: '前端开发', level: 95, category: 'Engineering' },
  { name: '后端工程', level: 85, category: 'Engineering' },
  { name: 'UI/UX 设计', level: 90, category: 'Design' },
  { name: 'AI/数据科学', level: 75, category: 'Data' },
  { name: 'DevOps', level: 80, category: 'Engineering' }
];
