import { BlogPost } from './types';

export const BLOG_NAME = "ZenBlog";
export const AUTHOR_NAME = "Alex Dev";
export const AUTHOR_BIO = "Senior Frontend Engineer passionate about React, AI, and minimalist design. Building the future one component at a time.";

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-react-development',
    title: 'The Future of React Development in 2025',
    excerpt: 'Exploring Server Components, the new compiler, and how AI tools are reshaping our workflows.',
    date: 'Oct 15, 2024',
    readTime: '5 min read',
    tags: ['React', 'Frontend', 'Tech'],
    coverImage: 'https://picsum.photos/800/400?random=1',
    author: { name: AUTHOR_NAME, avatar: 'https://picsum.photos/100/100?random=10' },
    content: `
# The Future of React Development

React has evolved significantly over the years. As we move into 2025, the landscape is shifting towards even more performance-oriented architectures.

## Server Components

React Server Components (RSC) have fundamentally changed how we think about data fetching. By moving logic to the server, we reduce bundle sizes and improve First Contentful Paint (FCP).

## The AI Revolution

With tools like Gemini directly integrated into our IDEs and workflows, writing boilerplate code is a thing of the past. We can now focus on architecture and user experience.

### Key Takeaways
1. **Performance first:** Defaults are shifting to server-side rendering.
2. **AI Integration:** Coding assistants are becoming mandatory.
3. **Simplicity:** Libraries are stripping back complexity.
    `
  },
  {
    id: '2',
    slug: 'mastering-tailwind-css',
    title: 'Mastering Tailwind CSS for Scalable Apps',
    excerpt: 'Why utility-first CSS is not just a trend, but a paradigm shift for maintainable codebases.',
    date: 'Oct 22, 2024',
    readTime: '4 min read',
    tags: ['CSS', 'Tailwind', 'Design'],
    coverImage: 'https://picsum.photos/800/400?random=2',
    author: { name: AUTHOR_NAME, avatar: 'https://picsum.photos/100/100?random=10' },
    content: `
# Mastering Tailwind CSS

Many developers initially resist Tailwind, finding the class strings messy. However, once you embrace the utility-first workflow, it's hard to go back.

## The Token System

Tailwind's greatest strength is its design token system. By constraining your choices to a set of predefined colors, spacing, and typography, you ensure consistency across your application without trying.

## Mobile First

Building for mobile first isn't just a buzzword; it's a necessity. Tailwind makes this intuitive with prefixes like \`md:\`, \`lg:\`, and \`xl:\`.

\`\`\`html
<div class="p-4 md:p-8 lg:p-12">
  Responsive padding!
</div>
\`\`\`
    `
  },
  {
    id: '3',
    slug: 'digital-minimalism',
    title: 'Digital Minimalism for Developers',
    excerpt: 'How decluttering your digital workspace can lead to clearer thinking and better code.',
    date: 'Nov 01, 2024',
    readTime: '3 min read',
    tags: ['Lifestyle', 'Productivity'],
    coverImage: 'https://picsum.photos/800/400?random=3',
    author: { name: AUTHOR_NAME, avatar: 'https://picsum.photos/100/100?random=10' },
    content: `
# Digital Minimalism

In a world of constant notifications, focus is our most valuable asset.

## The Clean Desk Policy

Just as a clean physical desk helps focus, a clean digital environment is crucial. Close those unused tabs. Archive old repositories. 

## Tools that disappear

The best developer tools are the ones you don't notice. They work in the background, assisting you without demanding attention. This is the philosophy I try to bring to my UI designs.
    `
  }
];