
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
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-500 to-emerald-500 shadow-lg shadow-indigo-500/20"></div>
          <span className="font-bold text-xl tracking-tighter">探索者 · 空间</span>
        </div>
        <div className="flex items-center space-x-4 glass px-5 py-2.5 rounded-2xl border border-white/5 text-[10px] font-bold tracking-widest text-gray-400 uppercase">
          <span className="flex items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2.5 animate-pulse"></span>
            当前状态：正在构建未来
          </span>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-12">
        {/* 便当盒布局 */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 gap-5 h-auto md:h-[850px]">
          
          {/* 核心介绍 - 2x2 */}
          <div className="md:col-span-2 md:row-span-2 bento-card p-10 flex flex-col justify-end relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-[120px]">👨‍💻</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              我是 <span className="text-emerald-400">Alex</span>。<br />
              <span className="text-gray-500">在逻辑与美学之间<br />寻找最优解。</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              八年前端深耕者。热爱开源，热衷于将复杂的技术挑战转化为优雅的用户体验。目前专注于 AI 驱动的前端架构探索。
            </p>
          </div>

          {/* 时钟卡片 - 1x1 */}
          <div className="bento-card p-8 flex flex-col justify-between">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">我的所在地</div>
            <div className="flex flex-col">
              <span className="text-xl font-bold">上海 · 中国</span>
              <span className="text-5xl font-mono mt-3 text-emerald-400 tracking-tighter">{time}</span>
            </div>
          </div>

          {/* 链接卡片 - 1x1 */}
          <div className="bento-card p-4 grid grid-cols-2 gap-4">
            {[
              { n: '代码', l: 'GitHub' },
              { n: '思想', l: '博客' },
              { n: '联系', l: '微信' },
              { n: '动态', l: '即刻' }
            ].map(item => (
              <a key={item.l} href="#" className="flex flex-col items-center justify-center glass rounded-2xl p-4 hover:bg-white/5 transition-all group">
                <span className="text-[10px] text-gray-500 font-bold mb-1 uppercase">{item.n}</span>
                <span className="text-xs font-bold text-white group-hover:text-emerald-400">{item.l}</span>
              </a>
            ))}
          </div>

          {/* 技能标签 - 2x1 */}
          <div className="md:col-span-2 bento-card p-8">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-8">精通的工具与领域</div>
            <div className="flex flex-wrap gap-3">
              {['React 生态', 'TypeScript', 'Node.js 服务端', '云原生架构', '三维可视化', '区块链技术', 'AI 模型集成'].map(tag => (
                <span key={tag} className="px-5 py-2.5 rounded-2xl border border-white/5 bg-white/5 text-sm font-medium hover:bg-white hover:text-black transition-all cursor-default shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 灵感卡片 - 1x2 */}
          <div className="md:row-span-2 bento-card p-8 relative overflow-hidden flex flex-col justify-between">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6">今日寄语</div>
             <p className="text-2xl font-bold leading-relaxed gradient-text">
               “代码的终极目标不是运行，而是被理解和被信赖。”
             </p>
             <div className="mt-10 pt-8 border-t border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center animate-pulse">
                    ☕
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase">正在享用</div>
                    <div className="text-sm font-bold">冰滴咖啡 · 埃塞俄比亚</div>
                  </div>
                </div>
             </div>
          </div>

          {/* 数据统计 - 1x2 */}
          <div className="md:row-span-2 bento-card p-8 flex flex-col justify-between">
            <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">成长足迹</div>
            <div className="space-y-8">
              {[
                { label: '交付项目', val: '50+' },
                { label: 'Star 数量', val: '2.4K' },
                { label: '累计提交', val: '8000+' }
              ].map(item => (
                <div key={item.label}>
                  <div className="text-4xl font-bold tracking-tighter">{item.val}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 下载简历 - 2x1 */}
          <div className="md:col-span-2 bento-card p-8 bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20 flex items-center justify-between group cursor-pointer">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                📄
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">查阅我的详细履历</h3>
                <p className="text-sm text-gray-400">PDF 文档 · 包含完整的项目细节与技术深度</p>
              </div>
            </div>
            <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center group-hover:rotate-45 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth="3" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>

        {/* 项目部分 */}
        <div id="projects" className="mt-32">
          <div className="flex flex-col mb-16">
             <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em] mb-4">案例展示 / SELECTED CASE STUDIES</div>
             <h2 className="text-5xl font-bold">这些年我所热衷的事。</h2>
          </div>
          <ProjectGallery />
        </div>
      </main>

      <Navigation />
      <AIChatAssistant />
      
      <footer className="mt-40 py-16 text-center border-t border-white/5">
        <div className="text-[10px] text-gray-600 font-bold tracking-[0.5em] uppercase">
          独立设计与开发 · Alex 2024
        </div>
      </footer>
    </div>
  );
};

export default App;
