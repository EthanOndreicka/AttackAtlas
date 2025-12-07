'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Search, Unlock, Lock, Check, X } from 'lucide-react';

export default function SQLiVisualizer() {
  const [input, setInput] = useState('');
  const [queryResult, setQueryResult] = useState<'idle' | 'success' | 'failure' | 'bypassed'>('idle');

  const baseQuery = "SELECT * FROM users WHERE username = '";
  const endQuery = "' AND password = '...'";

  const checkQuery = (val: string) => {
    // Simple simulation of SQL injection logic
    if (val === "admin' OR '1'='1") {
      setQueryResult('bypassed');
    } else if (val === 'admin') {
      setQueryResult('success');
    } else if (val.length > 0) {
      setQueryResult('failure');
    } else {
      setQueryResult('idle');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    checkQuery(val);
  };

  const injectAttack = () => {
    const attackString = "admin' OR '1'='1";
    setInput(attackString);
    checkQuery(attackString);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      {/* Top Section: User Input */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-cyan-400" />
                Login Form Input
            </h3>
             <button 
                onClick={injectAttack}
                className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded hover:bg-red-500/30 transition-colors"
            >
                Auto-Fill Injection
            </button>
        </div>
        <div className="relative">
            <input
                type="text"
                value={input}
                onChange={handleInputChange}
                placeholder="Enter username..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white font-mono focus:outline-none focus:border-cyan-500 transition-colors"
            />
        </div>
      </div>

      {/* Middle Section: Backend Query Visualization */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-sm relative overflow-hidden">
        <div className="absolute top-2 right-2 text-xs text-slate-500 uppercase">Backend Database Query</div>
        <div className="pt-4 text-slate-400 break-words">
            <span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> users <span className="text-purple-400">WHERE</span> username = '
            <span className={`${queryResult === 'bypassed' ? 'text-red-500 font-bold' : 'text-white'}`}>
                {input}
            </span>
            '{endQuery}
        </div>
        
        {/* Logic Explanation Overlay */}
        <AnimatePresence>
            {queryResult === 'bypassed' && (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-2 bg-red-900/20 border border-red-500/30 rounded text-xs text-red-300"
                >
                    Logic Breakdown: <br/>
                    1. <code>username = 'admin'</code> (False/Unknown)<br/>
                    2. <code>OR '1'='1'</code> (ALWAYS TRUE)<br/>
                    Result: Query returns TRUE for all rows.
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Bottom Section: Database Response */}
      <div className="border-t border-slate-800 pt-4">
        <div className="flex items-center gap-2 mb-4">
            <Database className="w-5 h-5 text-slate-400" />
            <span className="text-slate-400 font-bold">Database Result</span>
        </div>
        
        <div className="bg-slate-800/50 rounded-lg p-4 min-h-[100px] flex items-center justify-center">
            <AnimatePresence mode="wait">
                {queryResult === 'idle' && (
                    <motion.p 
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-slate-500 italic"
                    >
                        Waiting for query...
                    </motion.p>
                )}
                {queryResult === 'failure' && (
                    <motion.div 
                        key="failure"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-slate-400"
                    >
                        <X className="w-8 h-8 mb-2" />
                        <span>No user found</span>
                    </motion.div>
                )}
                {queryResult === 'success' && (
                    <motion.div 
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center text-green-400"
                    >
                        <Check className="w-8 h-8 mb-2" />
                        <span>Valid User Found</span>
                    </motion.div>
                )}
                {queryResult === 'bypassed' && (
                    <motion.div 
                        key="bypassed"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full"
                    >
                        <div className="flex items-center justify-center gap-2 text-red-400 mb-3">
                            <Unlock className="w-6 h-6" />
                            <span className="font-bold">DATABASE DUMPED (Access Granted)</span>
                        </div>
                        <div className="bg-slate-900 rounded p-2 text-xs font-mono text-slate-300 max-h-32 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-4 border-b border-slate-700 pb-1 mb-1 font-bold">
                                <span>ID</span><span>USERNAME</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <span>1</span><span>admin</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <span>2</span><span>alice</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <span>3</span><span>bob</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 opacity-50">
                                <span>...</span><span>...</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

