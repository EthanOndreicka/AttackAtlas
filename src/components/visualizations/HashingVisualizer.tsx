'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Hash, Database, Shuffle, Check, X } from 'lucide-react';

export default function HashingVisualizer() {
  const [password, setPassword] = useState('password123');
  const [salt, setSalt] = useState('');
  const [hash, setHash] = useState('');
  const [crackedStatus, setCrackedStatus] = useState<'idle' | 'cracked' | 'failed'>('idle');

  // Simple pseudo-hash function for visual purposes (Not real SHA-256)
  const pseudoHash = (input: string) => {
    let h = 0xdeadbeef;
    for (let i = 0; i < input.length; i++) {
      h = Math.imul(h ^ input.charCodeAt(i), 2654435761);
    }
    return ((h ^ h >>> 16) >>> 0).toString(16).padStart(8, '0');
  };

  useEffect(() => {
    const input = salt ? `${password}${salt}` : password;
    setHash(pseudoHash(input));
    setCrackedStatus('idle'); // Reset cracker when hash changes
  }, [password, salt]);

  const generateSalt = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setSalt(result);
  };

  const clearSalt = () => setSalt('');

  const attemptCrack = () => {
    // Simulate Rainbow Table Attack
    // Ideally, a rainbow table has pre-computed hashes for common passwords ONLY.
    // If salt is present, the hash is unique and likely not in the table.
    
    setTimeout(() => {
        if (salt) {
            setCrackedStatus('failed');
        } else {
            setCrackedStatus('cracked');
        }
    }, 1000);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      {/* Input Section */}
      <div className="space-y-4">
        <div>
            <label className="text-xs text-slate-500 uppercase font-bold">User Password</label>
            <input 
                type="text" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-3 py-2 font-mono text-white focus:outline-none focus:border-purple-500"
            />
        </div>

        <div className="flex items-center gap-4">
            <div className="flex-1">
                <label className="text-xs text-slate-500 uppercase font-bold flex justify-between">
                    <span>Salt (Random Data)</span>
                    {salt && <button onClick={clearSalt} className="text-red-400 hover:text-white text-[10px]">Remove</button>}
                </label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={salt}
                        readOnly
                        placeholder="No Salt"
                        className={`w-full border rounded px-3 py-2 font-mono text-sm ${salt ? 'bg-purple-900/20 border-purple-500 text-purple-300' : 'bg-slate-800 border-slate-700 text-slate-500'}`}
                    />
                    <button 
                        onClick={generateSalt}
                        className="bg-purple-600 hover:bg-purple-500 text-white px-3 py-2 rounded"
                    >
                        <Shuffle className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
      </div>

      {/* Hashing Process Visualization */}
      <div className="relative flex flex-col items-center justify-center py-4">
        <div className="h-8 w-0.5 bg-slate-700"></div>
        <div className="bg-slate-800 rounded-full p-2 border border-slate-700 z-10">
            <Hash className="w-6 h-6 text-slate-400" />
        </div>
        <div className="h-8 w-0.5 bg-slate-700"></div>
        
        {/* Output Hash */}
        <div className="w-full bg-black rounded p-4 text-center border border-slate-800">
            <div className="text-xs text-slate-500 mb-1 uppercase font-bold">Database Stored Hash</div>
            <div className="font-mono text-xl font-bold text-green-400 tracking-wider">
                {hash}
            </div>
        </div>
      </div>

      {/* Cracker Simulation */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="flex justify-between items-center mb-4">
            <h4 className="font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-red-500" />
                Rainbow Table Attack
            </h4>
            <button 
                onClick={attemptCrack}
                className="text-xs bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded text-white transition-colors"
            >
                Simulate Hack
            </button>
        </div>

        <div className="h-12 flex items-center justify-center">
            <AnimatePresence mode="wait">
                {crackedStatus === 'idle' && <span className="text-slate-600 italic text-sm">Ready to attack...</span>}
                {crackedStatus === 'cracked' && (
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-red-500 font-bold flex items-center gap-2 bg-red-900/10 px-4 py-2 rounded"
                    >
                        <Unlock className="w-5 h-5" />
                        CRACKED! (Hash found in table)
                    </motion.div>
                )}
                {crackedStatus === 'failed' && (
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-green-500 font-bold flex items-center gap-2 bg-green-900/10 px-4 py-2 rounded"
                    >
                        <Lock className="w-5 h-5" />
                        FAILED (Salt made hash unique)
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
      </div>

    </div>
  );
}

