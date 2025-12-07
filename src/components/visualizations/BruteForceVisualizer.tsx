'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, RefreshCcw, KeyRound, Timer } from 'lucide-react';

export default function BruteForceVisualizer() {
  const [targetPassword, setTargetPassword] = useState('4829');
  const [currentAttempt, setCurrentAttempt] = useState('0000');
  const [isCracking, setIsCracking] = useState(false);
  const [isCracked, setIsCracked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const animationRef = useRef<number>();

  const dictionary = ['1234', '0000', '1111', 'password', 'admin', '4829'];

  const startAttack = () => {
    setIsCracking(true);
    setIsCracked(false);
    setAttempts(0);
    setElapsed(0);
    setStartTime(performance.now());
    
    let current = 0;
    
    const crack = (timestamp: number) => {
      // Simulate checking multiple passwords per frame for visual speed
      const batchSize = 15; 
      let found = false;

      for (let i = 0; i < batchSize; i++) {
        current++;
        // Simple numeric increment simulation
        const attempt = current.toString().padStart(4, '0');
        setCurrentAttempt(attempt);
        
        if (attempt === targetPassword) {
          found = true;
          break;
        }
      }

      setAttempts(prev => prev + batchSize);
      setElapsed((performance.now() - startTime) / 1000);

      if (found) {
        setIsCracking(false);
        setIsCracked(true);
        setCurrentAttempt(targetPassword);
      } else if (current < 9999) {
        animationRef.current = requestAnimationFrame(() => crack(performance.now()));
      } else {
        setIsCracking(false); // Failed (shouldn't happen with 0-9999 logic)
      }
    };

    animationRef.current = requestAnimationFrame(() => crack(performance.now()));
  };

  const stopAttack = () => {
    setIsCracking(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
  };

  const reset = () => {
    stopAttack();
    setIsCracked(false);
    setAttempts(0);
    setCurrentAttempt('0000');
    setElapsed(0);
    // Randomize new target
    setTargetPassword(Math.floor(Math.random() * 10000).toString().padStart(4, '0'));
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-8">
      
      <div className="flex justify-between items-center">
        <div>
            <h3 className="font-bold text-white flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-orange-400" />
                PIN Cracker
            </h3>
            <p className="text-slate-500 text-xs mt-1">Target: 4-Digit PIN (0000-9999)</p>
        </div>
        <div className="flex gap-2">
            {!isCracking && !isCracked && (
                <button 
                    onClick={startAttack}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                    Start Brute Force
                </button>
            )}
            {isCracking && (
                <button 
                    onClick={stopAttack}
                    className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-bold transition-colors"
                >
                    Stop
                </button>
            )}
            <button 
                onClick={reset}
                className="bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-lg transition-colors"
            >
                <RefreshCcw className="w-5 h-5" />
            </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-8 relative">
        <div className={`text-6xl font-mono font-bold tracking-widest mb-4 ${
            isCracked ? 'text-green-500' : isCracking ? 'text-white' : 'text-slate-600'
        }`}>
            {currentAttempt}
        </div>
        
        <div className="flex items-center gap-2">
            {isCracked ? (
                <div className="flex items-center gap-2 text-green-500 font-bold bg-green-500/10 px-4 py-2 rounded-full">
                    <Unlock className="w-5 h-5" />
                    ACCESS GRANTED
                </div>
            ) : (
                <div className="flex items-center gap-2 text-slate-500 bg-slate-800/50 px-4 py-2 rounded-full">
                    <Lock className="w-4 h-4" />
                    LOCKED
                </div>
            )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between">
            <div className="text-slate-400 text-xs uppercase font-bold">Attempts</div>
            <div className="text-xl font-mono text-white">{attempts.toLocaleString()}</div>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg flex items-center justify-between">
            <div className="text-slate-400 text-xs uppercase font-bold flex items-center gap-1">
                <Timer className="w-3 h-3" />
                Time
            </div>
            <div className="text-xl font-mono text-white">{elapsed > 0 ? elapsed.toFixed(2) : '0.00'}s</div>
        </div>
      </div>

      <div className="text-xs text-slate-500 text-center">
        Simulating ~60 attempts per second (browser limited). Real tools can do millions/sec.
      </div>
    </div>
  );
}

