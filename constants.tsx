
import { Project, Skill } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: '星云电商架构体系',
    description: '我主导设计的全链路电商解决方案，通过自研的渲染引擎将首屏加载性能提升了 45%，支持百万级日活。',
    tags: ['架构设计', '性能优化', 'React'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    category: 'web'
  },
  {
    id: '2',
    title: '智瞳 AI 视觉中枢',
    description: '探索计算机视觉在前端的应用。利用机器学习模型实现网页端的实时手势追踪与交互。',
    tags: ['人工智能', '前端工程', '实验性'],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    category: 'ai'
  },
  {
    id: '3',
    title: '静谧空间 App',
    description: '一款专注于心理健康的跨端应用。通过极简的设计语言和细腻的动画效果，为用户提供沉浸式的冥想体验。',
    tags: ['移动开发', '交互设计', 'Flutter'],
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800',
    category: 'mobile'
  }
];

export const SKILLS: Skill[] = [
  { name: '前端开发', level: 95, category: '技术栈' },
  { name: '架构设计', level: 88, category: '核心能力' },
  { name: '产品思维', level: 92, category: '综合素质' },
  { name: '全栈开发', level: 85, category: '技术栈' },
  { name: '团队领导', level: 80, category: '核心能力' }
];
