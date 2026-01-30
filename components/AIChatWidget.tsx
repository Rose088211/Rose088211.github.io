import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2, Minimize2 } from 'lucide-react';
import { BlogPost, ChatMessage } from '../types';
import { chatWithAuthor } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface AIChatWidgetProps {
  allPosts: BlogPost[];
  currentPost?: BlogPost;
}

export const AIChatWidget: React.FC<AIChatWidgetProps> = ({ allPosts, currentPost }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I can answer questions about the articles on this blog. Ask me anything!', timestamp: Date.now() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: inputValue, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await chatWithAuthor(userMsg.text, allPosts, currentPost);

    const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Render minimized state
  if (isOpen && isMinimized) {
    return (
        <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
             <button
                onClick={() => setIsMinimized(false)}
                className="bg-primary hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
            >
                <Sparkles className="w-6 h-6" />
                <span className="font-semibold hidden sm:inline">AI Chat</span>
            </button>
        </div>
    );
  }

  // Render open state
  if (isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-200 animate-slide-up overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-indigo-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold">Blog Assistant</span>
          </div>
          <div className="flex items-center gap-1">
             <button onClick={() => setIsMinimized(true)} className="p-1 hover:bg-white/20 rounded transition-colors">
                 <Minimize2 className="w-4 h-4" />
             </button>
             <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded transition-colors">
                 <X className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-primary text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                }`}
              >
                {msg.role === 'model' ? (
                   <div className="prose prose-sm max-w-none prose-p:my-1 prose-a:text-blue-600">
                     <ReactMarkdown>{msg.text}</ReactMarkdown>
                   </div>
                ) : (
                    msg.text
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-500 rounded-2xl rounded-bl-none px-4 py-2 border border-gray-100 shadow-sm flex items-center gap-2 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about the blog..."
            className="flex-grow bg-gray-100 text-gray-800 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            className="p-2 bg-primary text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Render default button (collapsed)
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-center w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500 text-[10px] items-center justify-center font-bold border border-white">?</span>
        </span>
      </button>
    </div>
  );
};