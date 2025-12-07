'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Cookie, Wifi, Laptop, ArrowRight, ShieldAlert } from 'lucide-react';

export default function SessionHijackingVisualizer() {
  const [sessionState, setSessionState] = useState<'secure' | 'stealing' | 'hijacked'>('secure');
  
  const startHijack = () => {
    setSessionState('stealing');
    setTimeout(() => {
      setSessionState('hijacked');
    }, 2000);
  };

  const reset = () => {
    setSessionState('secure');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold flex items-center gap-2">
            <Wifi className="w-5 h-5 text-cyan-400" />
            Unsecured Network
        </h3>
        <button 
            onClick={sessionState === 'secure' ? startHijack : reset}
            className={`px-4 py-2 rounded font-bold text-sm transition-colors ${
                sessionState === 'secure' 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-slate-700 hover:bg-slate-600 text-white'
            }`}
        >
            {sessionState === 'secure' ? 'Sniff Packet (Steal Cookie)' : 'Reset Simulation'}
        </button>
      </div>

      <div className="relative h-64 bg-slate-950 rounded-lg border border-slate-800 p-8 flex justify-between items-center">
        
        {/* Victim */}
        <div className="flex flex-col items-center gap-2 z-10 relative">
            <div className="bg-blue-600/20 p-4 rounded-full border border-blue-500">
                <Laptop className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-xs font-bold text-slate-400">Victim</div>
            <div className="bg-slate-800 px-2 py-1 rounded text-[10px] font-mono text-green-400 flex items-center gap-1">
                <Cookie className="w-3 h-3" />
                SID: abc123xyz
            </div>
        </div>

        {/* Server */}
        <div className="flex flex-col items-center gap-2 z-10 relative">
            <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
                <div className="w-8 h-8 grid grid-cols-2 gap-1">
                    <div className="bg-slate-500 rounded-sm animate-pulse" />
                    <div className="bg-slate-500 rounded-sm" />
                    <div className="bg-slate-500 rounded-sm" />
                    <div className="bg-slate-500 rounded-sm animate-pulse" />
                </div>
            </div>
            <div className="text-xs font-bold text-slate-400">Web Server</div>
        </div>

        {/* Connection Line */}
        <div className="absolute top-1/2 left-20 right-20 h-0.5 bg-slate-700 -z-0" />

        {/* Attacker */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className={`p-3 rounded-full border-2 transition-colors ${
                sessionState !== 'secure' ? 'bg-red-900/30 border-red-500' : 'bg-slate-800 border-slate-700'
            }`}>
                <User className={`w-6 h-6 ${sessionState !== 'secure' ? 'text-red-500' : 'text-slate-600'}`} />
            </div>
            <div className="text-xs font-bold text-slate-400">Attacker</div>
             <AnimatePresence>
                {sessionState === 'hijacked' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-900/50 border border-red-500 px-2 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1"
                    >
                        <Cookie className="w-3 h-3" />
                        SID: abc123xyz (Stolen)
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Floating Cookie Animation */}
        <AnimatePresence>
            {sessionState === 'stealing' && (
                <motion.div
                    initial={{ top: '35%', left: '20%' }}
                    animate={{ top: '60%', left: '50%' }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute z-20"
                >
                    <div className="bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Cookie className="w-3 h-3" />
                        SessionID
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>

      <div className="bg-slate-800 rounded p-4 text-sm font-mono min-h-[100px] flex items-center justify-center text-center">
        {sessionState === 'secure' && <span className="text-slate-500">Waiting to intercept traffic...</span>}
        {sessionState === 'stealing' && <span className="text-yellow-400">Packet Sniffer: Intercepting HTTP traffic... Found Session Cookie!</span>}
        {sessionState === 'hijacked' && (
            <div className="flex flex-col items-center gap-2">
                <div className="text-red-400 font-bold flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5" />
                    SESSION HIJACKED
                </div>
                <div className="text-slate-300">
                    Attacker is now logged in as "John Doe" without needing a password.
                </div>
            </div>
        )}
      </div>

    </div>
  );
}

