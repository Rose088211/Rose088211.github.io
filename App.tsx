
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
// Fixed: Added missing User and Globe icon imports from lucide-react
import { Menu, X, Shield, Lock, Search, Github, Twitter, Linkedin, ExternalLink, User, Globe } from 'lucide-react';
import { CATEGORIES, MOCK_POSTS, NAV_LINKS } from './constants';
import PostCard from './components/PostCard';
import Terminal from './components/Terminal';
import { BlogPost } from './types';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-500 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
              <Shield className="text-slate-950" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              CypherGuard
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-emerald-400 ${
                  pathname === link.href.replace('#', '') ? 'text-emerald-500' : 'text-slate-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
             <button className="p-2 text-slate-400 hover:text-emerald-400 transition-colors">
               <Search size={20} />
             </button>
             <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95">
               Deploy Tool
             </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 py-4 px-4 space-y-3">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block text-base font-medium text-slate-300 hover:text-emerald-400 py-2"
            >
              {link.name}
            </a>
          ))}
          <button className="w-full bg-emerald-500 text-slate-950 px-4 py-3 rounded-lg text-sm font-bold">
            Deploy Tool
          </button>
        </div>
      )}
    </nav>
  );
};

// Home Page
const HomePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const filteredPosts = activeCategory === 'All' 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-16 py-12">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Lock size={12} /> Encrypted Knowledge Base
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Deciphering the <span className="text-emerald-500 underline decoration-emerald-500/30">Dark Web</span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Professional insights into penetration testing, network forensics, and offensive security research. Stay ahead of the threat actors.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
             <Link to="/articles" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold transition-all transform hover:-translate-y-1">
               Explore Articles
             </Link>
             <Link to="/lab" className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
               Security Lab
             </Link>
          </div>
        </div>
        
        {/* Background visual element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[600px] h-[600px] bg-emerald-500/5 blur-[120px] rounded-full"></div>
      </header>

      {/* Featured Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Vulnerability Analysis</h2>
            <p className="text-slate-500">Regularly updated security research and whitepapers.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === 'All' ? 'bg-slate-800 text-emerald-400 border border-emerald-500/50' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              All Threads
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat ? 'bg-slate-800 text-emerald-400 border border-emerald-500/50' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onClick={(id) => window.location.hash = `/post/${id}`} 
            />
          ))}
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
            <div>
              <h3 className="text-3xl font-bold mb-4">Security Advisory Alerts</h3>
              <p className="text-slate-400 mb-8">Get critical vulnerability patches and threat intelligence delivered directly to your secure inbox.</p>
              <form className="flex gap-2 max-w-md" onSubmit={e => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="admin@secure-corp.com"
                  className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500"
                />
                <button className="bg-emerald-500 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="hidden md:flex justify-center">
              <div className="w-48 h-48 bg-emerald-500/10 rounded-full border border-emerald-500/20 flex items-center justify-center animate-pulse">
                <Lock size={64} className="text-emerald-500" />
              </div>
            </div>
          </div>
          {/* Background grid */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>
      </section>
    </div>
  );
};

// Lab Page
const LabPage = () => (
  <div className="py-12 px-4 max-w-7xl mx-auto space-y-8">
    <div className="text-center max-w-3xl mx-auto mb-12">
       <h1 className="text-4xl font-extrabold mb-4">The Security Lab</h1>
       <p className="text-slate-400 text-lg">
         Interact with our AI Security Advisor. Analyze code snippets, query vulnerability databases, or get defensive recommendations.
       </p>
    </div>
    <Terminal />
    <div className="grid md:grid-cols-3 gap-6 mt-12">
       {[
         { title: "Vulnerability Scan", desc: "Identify common OWASP Top 10 vectors in your architecture." },
         { title: "Payload Generator", desc: "Safely generate security testing payloads for sanctioned audits." },
         { title: "Traffic Forensics", desc: "Automated analysis of PCAP data streams for anomaly detection." }
       ].map((tool, i) => (
         <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-all cursor-not-allowed opacity-60">
           <h4 className="font-bold mb-2 text-slate-200">{tool.title}</h4>
           <p className="text-xs text-slate-500 leading-relaxed">{tool.desc}</p>
           <div className="mt-4 inline-flex items-center text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">COMING SOON</div>
         </div>
       ))}
    </div>
  </div>
);

// Post Detail Page
const PostDetailPage = () => {
  const { pathname } = useLocation();
  const id = pathname.split('/').pop();
  const post = MOCK_POSTS.find(p => p.id === id);

  if (!post) return <div className="text-center py-24 text-slate-400">Entry not found. Check parameters.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <Link to="/" className="text-slate-500 hover:text-emerald-400 flex items-center gap-2 mb-8 transition-colors">
        <X size={20} /> Back to Nexus
      </Link>
      
      <div className="mb-10">
        <span className="bg-emerald-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold uppercase mb-4 inline-block">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-6 text-slate-400 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
               {/* Fixed: User icon now correctly imported */}
               <User size={16} />
            </div>
            {post.author}
          </div>
          <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
          <div>{post.date}</div>
        </div>
      </div>

      <img src={post.imageUrl} className="w-full h-96 object-cover rounded-3xl mb-12 shadow-2xl" alt={post.title} />

      <div className="prose prose-invert prose-emerald max-w-none">
        <p className="text-xl text-slate-300 leading-relaxed font-medium mb-8">
          {post.excerpt}
        </p>
        <div className="text-slate-400 leading-relaxed space-y-6">
          {post.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className="bg-slate-900 border-l-4 border-emerald-500 p-6 rounded-r-xl italic text-slate-300">
            "Cybersecurity is not just about perimeter defense; it's about persistent monitoring and assuming breach." - Lead Research at CypherGuard
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-slate-800">
        <h3 className="text-xl font-bold mb-6">Related Tags</h3>
        <div className="flex flex-wrap gap-3">
          {post.tags.map(tag => (
            <span key={tag} className="bg-slate-900 border border-slate-800 text-slate-400 px-4 py-2 rounded-xl text-sm hover:border-emerald-500 hover:text-emerald-400 cursor-pointer transition-all">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => (
  <footer className="bg-slate-950 border-t border-slate-800 py-12">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="bg-emerald-500 p-1.5 rounded-lg">
              <Shield className="text-slate-950" size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">CypherGuard</span>
          </Link>
          <p className="text-slate-500 max-w-sm mb-6 leading-relaxed text-sm">
            Providing high-end security intelligence and training since 2024. Committed to the ethical discovery and mitigation of digital threats.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 border border-slate-800 transition-all">
              <Github size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 border border-slate-800 transition-all">
              <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-emerald-400 border border-slate-800 transition-all">
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Resources</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">API References</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Cheat Sheets</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">CTF Platforms</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Legal</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Ethics Guidelines</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Bug Bounty</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 text-xs">
          © 2024 CypherGuard Research Group. All rights reserved. 
        </p>
        <div className="flex items-center gap-1 text-slate-600 text-xs">
          {/* Fixed: Globe icon now correctly imported */}
          <Globe size={12} />
          Distributed via GitHub Pages
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-emerald-500/30">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/articles" element={<HomePage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="*" element={<div className="text-center py-24">Error 404: Node not found in decentralized network.</div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
