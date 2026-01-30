
import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import ProjectGallery from './components/ProjectGallery';
import AIChatAssistant from './components/AIChatAssistant';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString('zh-CN', { hour12: false }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('zh-CN', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen pb-32">
      {/* 顶部个人标志 */}
      <header className="pt-12 pb-6 px-6 container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          <span className="font-bold text-xl tracking-tighter">ALEX.LOG</span>
        </div>
        <div className="flex items-center space-x-4 glass px-4 py-2 rounded-full border border-white/5 text-xs font-medium text-gray-400">
          <span className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
            正在创作新项目中
          </span>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-8">
        {/* Bento Grid 布局 */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-4 h-auto md:h-[800px]">
          
          {/* 个人简介卡片 - 占据 2x2 */}
          <div className="md:col-span-2 md:row-span-2 bento-card p-8 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8">
              <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                <span className="text-4xl">👋</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              你好，我是 <span className="text-blue-500">Alex</span>。<br />
              <span className="text-gray-500">不仅是代码，更是数字世界的艺术表达。</span>
            </h1>
            <p className="text-gray-400 max-w-md">
              拥有 8 年经验的前端架构师。擅长用 React 构建极其流畅的用户界面，并对比特币和生成式 AI 充满热情。
            </p>
          </div>

          {/* 所在地卡片 - 占据 1x1 */}
          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-widest">所在地</div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold">上海, 中国</span>
              <span className="text-4xl font-mono mt-2 text-blue-400">{time}</span>
            </div>
          </div>

          {/* 社交/链接卡片 - 占据 1x1 */}
          <div className="bento-card p-6 grid grid-cols-2 gap-3">
            {['GitHub', 'Twitter', 'Bilibili', 'Blog'].map(link => (
              <a key={link} href="#" className="flex items-center justify-center glass rounded-xl text-xs font-bold hover:bg-white hover:text-black transition-all">
                {link}
              </a>
            ))}
          </div>

          {/* 技术栈卡片 - 占据 2x1 */}
          <div className="md:col-span-2 bento-card p-6">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-6">我的数字工具箱</div>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'Three.js', 'Solidity', 'PyTorch'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full border border-white/5 bg-white/5 text-sm font-medium hover:border-blue-500/50 transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 音乐/近期状态卡片 - 占据 1x2 */}
          <div className="md:row-span-2 bento-card p-6 relative overflow-hidden flex flex-col justify-between">
             <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">近期思考</div>
             <p className="text-lg italic text-gray-300 leading-relaxed">
               "好的架构应该是隐形的，就像呼吸一样自然，只有在它出问题时你才会察觉。"
             </p>
             <div className="mt-8 pt-6 border-t border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-900/30 rounded-lg flex items-center justify-center animate-pulse-soft">
                    🎵
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">正在播放</div>
                    <div className="text-sm font-bold">Lofi Girl - Study Beat</div>
                  </div>
                </div>
             </div>
          </div>

          {/* 工作经历/数据卡片 - 占据 1x2 */}
          <div className="md:row-span-2 bento-card p-6 flex flex-col justify-between">
            <div className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-4">职业数据</div>
            <div className="space-y-6">
              {[
                { label: '项目实战', val: '42+' },
                { label: '代码贡献', val: '12K+' },
                { label: '技术文章', val: '150+' }
              ].map(item => (
                <div key={item.label}>
                  <div className="text-3xl font-bold">{item.val}</div>
                  <div className="text-xs text-gray-500 uppercase">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 简历下载卡片 - 占据 2x1 */}
          <div className="md:col-span-2 bento-card p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 flex items-center justify-between group cursor-pointer">
            <div>
              <h3 className="text-xl font-bold mb-1">获取我的完整简历</h3>
              <p className="text-sm text-gray-400">PDF 格式，最后更新于 2024年12月</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>
        </div>

        {/* 项目展示区 */}
        <div className="mt-20">
          <div className="flex items-center space-x-4 mb-12">
             <h2 className="text-4xl font-bold">精选作品集</h2>
             <div className="h-px flex-1 bg-white/5"></div>
          </div>
          <ProjectGallery />
        </div>
      </main>

      <Navigation />
      <AIChatAssistant />
      
      <footer className="mt-32 py-12 text-center text-gray-600 text-xs tracking-widest uppercase">
        Designed & Coded by Alex © 2024
      </footer>
    </div>
  );
};

export default App;
