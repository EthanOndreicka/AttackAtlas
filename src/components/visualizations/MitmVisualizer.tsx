'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Server, UserX, Lock, Unlock, ArrowRight } from 'lucide-react';

export default function MitmVisualizer() {
  const [isIntercepting, setIsIntercepting] = useState(false);
  const [messageStatus, setMessageStatus] = useState<'idle' | 'sending' | 'intercepted' | 'delivered'>('idle');
  const [messageContent, setMessageContent] = useState('Password: 12345');

  const sendMessage = () => {
    if (messageStatus !== 'idle' && messageStatus !== 'delivered') return;
    
    setMessageStatus('sending');
    setMessageContent('Password: 12345');

    if (isIntercepting) {
      setTimeout(() => {
        setMessageStatus('intercepted');
        setTimeout(() => {
          setMessageContent('Password: ***** (Stolen)');
          setTimeout(() => {
            setMessageStatus('delivered');
          }, 1500);
        }, 1000);
      }, 1000);
    } else {
      setTimeout(() => {
        setMessageStatus('delivered');
      }, 2000);
    }
  };

  const reset = () => {
    setMessageStatus('idle');
    setMessageContent('Password: 12345');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-12">
        <h3 className="text-xl font-bold text-white">Interceptor Simulation</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsIntercepting(!isIntercepting)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isIntercepting
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {isIntercepting ? 'Interceptor Active' : 'Interceptor Inactive'}
          </button>
          <button
            onClick={sendMessage}
            disabled={messageStatus === 'sending' || messageStatus === 'intercepted'}
            className="px-4 py-2 bg-cyan-500 text-cyan-950 font-bold rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send Data
          </button>
        </div>
      </div>

      <div className="relative h-64 bg-slate-950/50 rounded-lg border border-slate-800/50 flex justify-between items-center px-16">
        
        {/* Connection Lines */}
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-slate-800 -z-10 mx-20" />
        
        {/* Attacker Connection Lines (only visible when intercepting) */}
        <AnimatePresence>
          {isIntercepting && (
            <motion.svg 
              className="absolute left-0 top-0 w-full h-full -z-10 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <path d="M 20% 50% Q 50% 20% 50% 35%" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
              <path d="M 50% 35% Q 50% 20% 80% 50%" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" />
            </motion.svg>
          )}
        </AnimatePresence>

        {/* User (Client) */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-4 bg-slate-800 rounded-full border border-slate-700">
            <User className="w-8 h-8 text-cyan-400" />
          </div>
          <span className="text-sm font-mono text-slate-400">User</span>
        </div>

        {/* Attacker (Man in the Middle) */}
        <div className={`relative z-10 flex flex-col items-center gap-2 transition-opacity duration-500 ${isIntercepting ? 'opacity-100' : 'opacity-20 grayscale'}`}>
          <div className="absolute -top-12 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
            {messageStatus === 'intercepted' ? 'Capturing Data...' : 'Eavesdropping'}
          </div>
          <div className={`p-4 rounded-full border-2 ${isIntercepting ? 'bg-red-900/20 border-red-500' : 'bg-slate-800 border-transparent'}`}>
            <UserX className={`w-8 h-8 ${isIntercepting ? 'text-red-500' : 'text-slate-600'}`} />
          </div>
          <span className="text-sm font-mono text-slate-400">Attacker</span>
        </div>

        {/* Server */}
        <div className="relative z-10 flex flex-col items-center gap-2">
          <div className="p-4 bg-slate-800 rounded-full border border-slate-700">
            <Server className="w-8 h-8 text-green-400" />
          </div>
          <span className="text-sm font-mono text-slate-400">Server</span>
        </div>

        {/* Packet Animation */}
        <AnimatePresence>
          {(messageStatus === 'sending' || messageStatus === 'intercepted') && (
            <motion.div
              className="absolute z-20 flex flex-col items-center"
              initial={{ left: '15%', top: '50%' }}
              animate={
                isIntercepting 
                  ? messageStatus === 'intercepted' 
                    ? { left: '50%', top: '35%' } // At attacker
                    : { left: '85%', top: '50%' } // To server
                  : { left: '85%', top: '50%' } // Direct to server
              }
              transition={{ duration: isIntercepting ? 1 : 2, ease: "easeInOut" }}
            >
              <div className={`px-3 py-1 rounded shadow-lg text-xs font-mono font-bold whitespace-nowrap ${
                 messageStatus === 'intercepted' || (isIntercepting && messageContent.includes('Stolen')) 
                  ? 'bg-red-500 text-white' 
                  : 'bg-cyan-500 text-cyan-950'
              }`}>
                {isIntercepting && messageStatus !== 'intercepted' && messageStatus !== 'sending' ? 'DATA COMPROMISED' : 'DATA PACKET'}
              </div>
              <div className={`w-3 h-3 mt-1 rounded-full ${
                messageStatus === 'intercepted' || (isIntercepting && messageContent.includes('Stolen')) ? 'bg-red-500' : 'bg-cyan-500'
              }`} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <div className="mt-8 bg-slate-950 p-4 rounded-lg font-mono text-sm border border-slate-800">
        <div className="flex justify-between text-slate-500 mb-2 text-xs uppercase">
          <span>Log Output</span>
          <span>{messageStatus === 'delivered' ? 'Transmission Complete' : 'Waiting...'}</span>
        </div>
        <div className="space-y-1">
          <div className="text-green-500">{'>'} Client: Initiating secure connection...</div>
          {messageStatus !== 'idle' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-cyan-400">{'>'} Sending: </span>
              <span className="text-slate-300">Password: 12345</span>
            </motion.div>
          )}
          {isIntercepting && messageStatus === 'intercepted' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-red-500">{'>'} WARNING: Unknown certificate authority detected.</span>
            </motion.div>
          )}
           {isIntercepting && (messageStatus === 'intercepted' || messageStatus === 'delivered') && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} delay={0.5}>
              <span className="text-red-500">{'>'} Attacker: Decrypted payload: "Password: 12345"</span>
            </motion.div>
          )}
          {messageStatus === 'delivered' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <span className="text-green-500">{'>'} Server: Payload received.</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

