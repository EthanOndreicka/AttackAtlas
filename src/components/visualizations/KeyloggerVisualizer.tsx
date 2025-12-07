'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, FileText, Globe, Eye, EyeOff, Lock } from 'lucide-react';

export default function KeyloggerVisualizer() {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [isSpying, setIsSpying] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const logsRef = useRef<HTMLDivElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const char = val.slice(val.length - 1);
    
    // Only log new characters if growing (simple simulation)
    if (val.length > input.length && isSpying) {
       const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
       setLogs(prev => [...prev, `[${timestamp}] Key Pressed: "${char}"`]);
    } else if (val.length < input.length && isSpying) {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });
       setLogs(prev => [...prev, `[${timestamp}] Key Pressed: [BACKSPACE]`]);
    }

    setInput(val);
  };

  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = () => {
    setLogs([]);
    setInput('');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col md:flex-row gap-6 min-h-[400px]">
      
      {/* Left Side: Victim View */}
      <div className="flex-1 flex flex-col">
        <div className="mb-4 flex items-center gap-2 text-white font-bold">
            <Globe className="w-5 h-5 text-blue-400" />
            Victim's Browser (Banking Login)
        </div>
        
        <div className="bg-white rounded-lg p-6 flex-1 text-slate-900 border-4 border-slate-200">
            <div className="flex justify-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">$</span>
                </div>
            </div>
            <h3 className="text-center font-bold text-xl mb-6">Secure Bank Login</h3>
            
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">USERNAME</label>
                    <input type="text" className="w-full border border-slate-300 rounded p-2 text-sm" placeholder="john.doe" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">PASSWORD</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"}
                            value={input}
                            onChange={handleInput}
                            className="w-full border border-slate-300 rounded p-2 text-sm pr-8"
                            placeholder="••••••••"
                        />
                        <button 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    <p className="text-[10px] text-green-600 mt-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Connection is secure (HTTPS)
                    </p>
                </div>
                <button className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-colors">
                    Sign In
                </button>
            </div>
        </div>
      </div>

      {/* Right Side: Attacker View */}
      <div className="flex-1 flex flex-col border-l border-slate-800 pl-6 border-dashed md:border-l-2 md:pl-6 pt-6 md:pt-0 border-t md:border-t-0">
         <div className="mb-4 flex justify-between items-center text-white font-bold">
            <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-400" />
                Attacker's Log File
            </div>
            <div className="flex gap-2">
                 <button 
                    onClick={() => setIsSpying(!isSpying)}
                    className={`text-xs px-2 py-1 rounded border ${isSpying ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
                >
                    {isSpying ? 'Active' : 'Paused'}
                </button>
                <button onClick={clearLogs} className="text-xs text-slate-400 hover:text-white">Clear</button>
            </div>
        </div>

        <div 
            ref={logsRef}
            className="flex-1 bg-black rounded-lg p-4 font-mono text-xs text-green-500 overflow-y-auto max-h-[300px] border border-slate-800 shadow-inner"
        >
            <div className="text-slate-500 mb-2"># listening for input events...</div>
            {logs.map((log, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-1"
                >
                    {log}
                </motion.div>
            ))}
            {logs.length === 0 && <span className="text-slate-700">waiting for keystrokes...</span>}
        </div>
        
        <div className="mt-4 bg-slate-800 p-3 rounded text-xs text-slate-400">
            <h4 className="font-bold text-white mb-1 flex items-center gap-2">
                <Keyboard className="w-3 h-3" />
                Captured String
            </h4>
            <div className="bg-slate-900 p-2 rounded break-all font-mono text-red-400 min-h-[2rem]">
                {input}
            </div>
            <p className="mt-2 italic opacity-70">
                Note: HTTPS encryption protects data in transit, but keyloggers capture data at the endpoint (your keyboard) before it's encrypted.
            </p>
        </div>
      </div>

    </div>
  );
}

