'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Server, ArrowRight, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function DNSSpoofingVisualizer() {
  const [isSpoofed, setIsSpoofed] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'resolving' | 'connected'>('idle');
  const [resolvedIP, setResolvedIP] = useState('');

  const visitSite = () => {
    setRequestStatus('resolving');
    setResolvedIP('');
    
    setTimeout(() => {
        setResolvedIP(isSpoofed ? '192.168.6.66 (Attacker)' : '203.0.113.1 (Legit)');
        setTimeout(() => {
            setRequestStatus('connected');
        }, 1000);
    }, 1500);
  };

  const reset = () => {
    setRequestStatus('idle');
    setResolvedIP('');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="flex items-center gap-2">
             <div className="text-sm font-bold text-slate-400">DNS Cache Status:</div>
             <button 
                onClick={() => setIsSpoofed(!isSpoofed)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    isSpoofed ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-green-500/20 text-green-500 border border-green-500/50'
                }`}
            >
                {isSpoofed ? 'POISONED (Spoofed)' : 'SECURE (Clean)'}
            </button>
        </div>
        <button 
            onClick={visitSite}
            disabled={requestStatus !== 'idle'}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-sm disabled:opacity-50 transition-colors"
        >
            Visit bank.com
        </button>
      </div>

      <div className="relative h-64 bg-slate-950 rounded-lg border border-slate-800 flex justify-between items-center px-12 overflow-hidden">
        
        {/* User */}
        <div className="z-10 flex flex-col items-center gap-2 relative">
             <div className="bg-slate-800 p-4 rounded-full border border-slate-600">
                <Globe className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-xs font-bold text-slate-400">User Browser</div>
            <div className="absolute -top-8 bg-slate-800 px-2 py-1 rounded text-[10px] text-slate-300 whitespace-nowrap opacity-0 animate-[fadeIn_0.5s_ease-out_forwards]" style={{ display: requestStatus === 'resolving' ? 'block' : 'none' }}>
                Where is bank.com?
            </div>
        </div>

        {/* DNS Server (Middleman) */}
        <div className="z-10 flex flex-col items-center gap-2">
            <div className={`p-4 rounded-lg border-2 transition-colors ${
                isSpoofed ? 'bg-red-900/20 border-red-500' : 'bg-slate-800 border-slate-600'
            }`}>
                <Server className={`w-8 h-8 ${isSpoofed ? 'text-red-500' : 'text-slate-400'}`} />
            </div>
            <div className="text-xs font-bold text-slate-400">DNS Resolver</div>
            {requestStatus === 'resolving' && (
                 <div className="absolute mt-20 text-[10px] font-mono text-slate-500 animate-pulse">
                    Looking up IP...
                 </div>
            )}
        </div>

        {/* Destination */}
        <div className="z-10 flex flex-col items-center gap-2 relative">
             <div className={`p-4 rounded-full border-2 transition-colors ${
                 requestStatus === 'connected' 
                    ? isSpoofed ? 'bg-red-900/20 border-red-500' : 'bg-green-900/20 border-green-500'
                    : 'bg-slate-800 border-slate-600'
             }`}>
                {isSpoofed && requestStatus === 'connected' ? <AlertTriangle className="w-8 h-8 text-red-500" /> : <ShieldCheck className="w-8 h-8 text-green-500" />}
            </div>
            <div className="text-xs font-bold text-slate-400">Destination</div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* User to DNS */}
            <line x1="15%" y1="50%" x2="50%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />
            {/* DNS to Dest */}
            <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#334155" strokeWidth="2" strokeDasharray="5,5" />

            {/* Animation Dot */}
            <AnimatePresence>
                {requestStatus === 'resolving' && (
                    <motion.circle 
                        r="4" fill="#60a5fa"
                        initial={{ cx: "15%", cy: "50%" }}
                        animate={{ cx: "50%", cy: "50%" }}
                        transition={{ duration: 1 }}
                    />
                )}
                {requestStatus === 'connected' && (
                     <motion.circle 
                        r="4" fill={isSpoofed ? "#ef4444" : "#22c55e"}
                        initial={{ cx: "50%", cy: "50%" }}
                        animate={{ cx: "85%", cy: "50%" }}
                        transition={{ duration: 0.5 }}
                    />
                )}
            </AnimatePresence>
        </svg>

      </div>

      {/* Result Display */}
      <div className="bg-slate-800 rounded p-4 flex flex-col items-center justify-center min-h-[100px] text-center gap-2">
        {requestStatus === 'idle' && <span className="text-slate-500">Ready to resolve DNS...</span>}
        {requestStatus === 'resolving' && <span className="text-blue-400 font-mono animate-pulse">Querying DNS Server for "bank.com"...</span>}
        {requestStatus === 'connected' && (
            <>
                <div className="font-bold text-lg text-white">
                    Resolved IP: <span className="font-mono">{resolvedIP}</span>
                </div>
                {isSpoofed ? (
                    <div className="text-red-400 font-bold text-sm bg-red-900/20 px-4 py-2 rounded">
                        ⚠️ WARNING: Traffic redirected to Fake Site!
                    </div>
                ) : (
                    <div className="text-green-400 font-bold text-sm bg-green-900/20 px-4 py-2 rounded">
                         ✅ SUCCESS: Connected to Legitimate Site
                    </div>
                )}
            </>
        )}
      </div>

    </div>
  );
}

