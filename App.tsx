import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { BLOG_POSTS, BLOG_NAME, AUTHOR_NAME, AUTHOR_BIO } from './constants';
import { BlogPost, ViewState } from './types';
import { PostCard } from './components/PostCard';
import { PostDetail } from './components/PostDetail';
import { AIChatWidget } from './components/AIChatWidget';
import { Github, Twitter, Linkedin, Menu, X } from 'lucide-react';

// ScrollToTop component to handle scroll position on route change
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                         <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-serif italic">Z</div>
                         {BLOG_NAME}
                    </Link>
                    
                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
                        <Link to="/" className="hover:text-primary transition-colors">Articles</Link>
                        <Link to="/about" className="hover:text-primary transition-colors">About</Link>
                    </nav>

                    <div className="flex items-center gap-4">
                         <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors">
                             <Github className="w-5 h-5" />
                         </a>
                         {/* Mobile Menu Button */}
                         <button 
                            className="md:hidden p-2 text-gray-600"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                         </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 p-4 animate-fade-in">
                    <nav className="flex flex-col gap-4 text-center">
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-700 py-2 hover:bg-gray-50 rounded">Articles</Link>
                        <Link to="/about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-700 py-2 hover:bg-gray-50 rounded">About</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

const Footer = () => (
    <footer className="bg-white border-t border-gray-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{BLOG_NAME}</h3>
                <p className="text-gray-500 text-sm">© {new Date().getFullYear()} {AUTHOR_NAME}. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
                 <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                 <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                 <a href="#" className="text-gray-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
        </div>
    </footer>
);

const HomePage = () => {
    const navigate = useNavigate();
    
    return (
        <div className="py-12 animate-fade-in">
             <div className="text-center max-w-2xl mx-auto mb-16 px-4">
                 <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">Thoughts, stories, and ideas.</h1>
                 <p className="text-lg text-gray-600 leading-relaxed">
                     Welcome to my digital garden. Here I write about software engineering, design patterns, and the intersection of creativity and logic.
                 </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {BLOG_POSTS.map(post => (
                     <PostCard 
                        key={post.id} 
                        post={post} 
                        onClick={() => navigate(`/post/${post.slug}`)} 
                    />
                 ))}
             </div>
        </div>
    );
};

const AboutPage = () => (
    <div className="py-12 max-w-3xl mx-auto animate-fade-in px-4">
         <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-center md:text-left">
             <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                 <img src="https://picsum.photos/200/200?random=99" alt="Author" className="w-32 h-32 rounded-full object-cover ring-4 ring-indigo-50" />
                 <div>
                     <h1 className="text-3xl font-bold text-gray-900 mb-2">{AUTHOR_NAME}</h1>
                     <p className="text-indigo-600 font-medium">Senior Frontend Engineer</p>
                 </div>
             </div>
             
             <div className="prose prose-lg text-gray-600">
                 <p>{AUTHOR_BIO}</p>
                 <p>
                    I built this blog using React, TypeScript, and Tailwind CSS. 
                    It's deployed as a static site, but it features dynamic AI capabilities powered by Google's Gemini API.
                 </p>
                 <p>
                    Feel free to use the chat widget in the bottom right corner to ask questions about my posts or my background!
                 </p>
             </div>
         </div>
    </div>
);

const PostPageWrapper = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const slug = pathname.split('/').pop();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    if (!post) {
        return <div className="text-center py-20 text-gray-500">Post not found.</div>;
    }

    return (
        <>
            <PostDetail post={post} onBack={() => navigate('/')} />
            {/* Inject current post into Chat Widget context explicitly for this route */}
        </>
    );
};

const MainLayout = () => {
    const location = useLocation();
    // Determine current post for AI context
    const currentSlug = location.pathname.startsWith('/post/') ? location.pathname.split('/').pop() : null;
    const currentPost = currentSlug ? BLOG_POSTS.find(p => p.slug === currentSlug) : undefined;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
            <Header />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/post/:slug" element={<PostPageWrapper />} />
                </Routes>
            </main>
            <Footer />
            <AIChatWidget allPosts={BLOG_POSTS} currentPost={currentPost} />
        </div>
    );
};

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <MainLayout />
    </HashRouter>
  );
}