import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { BlogPost } from '../types';
import { summarizePost } from '../services/geminiService';
import { ArrowLeft, Calendar, Clock, Sparkles, Loader2, Tag } from 'lucide-react';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

export const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await summarizePost(post);
    setSummary(result);
    setIsSummarizing(false);
  };

  // Scroll to top on mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [post.id]);

  return (
    <div className="animate-fade-in pb-12">
      <button 
        onClick={onBack}
        className="group flex items-center text-gray-600 hover:text-primary mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Articles
      </button>

      <article className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Image */}
        <div className="h-64 md:h-96 overflow-hidden relative">
            <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                 <div className="text-white max-w-4xl">
                     <div className="flex gap-2 mb-4">
                         {post.tags.map(tag => (
                             <span key={tag} className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-md text-xs font-semibold uppercase tracking-wider">
                                 {tag}
                             </span>
                         ))}
                     </div>
                     <h1 className="text-3xl md:text-5xl font-bold font-serif mb-4 leading-tight">
                         {post.title}
                     </h1>
                     <div className="flex items-center gap-6 text-sm font-medium text-gray-200">
                         <div className="flex items-center gap-2">
                             <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full border border-white/50" />
                             <span>{post.author.name}</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <Calendar className="w-4 h-4" />
                             <span>{post.date}</span>
                         </div>
                         <div className="flex items-center gap-2">
                             <Clock className="w-4 h-4" />
                             <span>{post.readTime}</span>
                         </div>
                     </div>
                 </div>
            </div>
        </div>

        {/* AI Summary Section */}
        <div className="px-6 md:px-12 py-8 bg-indigo-50/50 border-b border-indigo-100">
             <div className="max-w-3xl mx-auto">
                 {!summary ? (
                     <button 
                        onClick={handleSummarize}
                        disabled={isSummarizing}
                        className="flex items-center gap-2 text-indigo-700 font-semibold hover:text-indigo-900 transition-colors disabled:opacity-50"
                     >
                         {isSummarizing ? (
                             <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating summary with Gemini...
                             </>
                         ) : (
                             <>
                                <Sparkles className="w-5 h-5" />
                                Summarize this article with AI
                             </>
                         )}
                     </button>
                 ) : (
                     <div className="bg-white p-6 rounded-xl border border-indigo-100 shadow-sm animate-fade-in">
                         <div className="flex items-center gap-2 mb-2 text-indigo-700 font-bold text-sm uppercase tracking-wide">
                             <Sparkles className="w-4 h-4" /> AI Summary
                         </div>
                         <p className="text-gray-700 leading-relaxed italic">
                             {summary}
                         </p>
                     </div>
                 )}
             </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-12 py-12">
          <div className="prose prose-lg prose-indigo mx-auto text-gray-700 font-serif leading-loose">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
        
        {/* Footer of post */}
        <div className="px-6 md:px-12 py-8 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500">
                <Tag className="w-4 h-4" />
                <span className="text-sm">Tags:</span>
                <div className="flex gap-2">
                    {post.tags.map(tag => (
                        <span key={tag} className="text-sm font-medium text-gray-700 hover:text-primary cursor-pointer transition-colors">
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
      </article>
    </div>
  );
};