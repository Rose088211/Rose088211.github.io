import React from 'react';
import { BlogPost } from '../types';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface PostCardProps {
  post: BlogPost;
  onClick: (post: BlogPost) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={() => onClick(post)}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full transform hover:-translate-y-1"
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
            {post.tags.slice(0, 2).map(tag => (
                <span key={tag} className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-primary rounded-full shadow-sm">
                    {tag}
                </span>
            ))}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-gray-500 mb-3 gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
            Read Article <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </div>
  );
};