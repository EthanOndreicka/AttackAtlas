'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key, Send, User, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

type EncryptionType = 'SYMMETRIC' | 'ASYMMETRIC';

export default function EncryptionVisualizer() {
  const [type, setType] = useState<EncryptionType>('SYMMETRIC');
  const [message, setMessage] = useState('Hello World');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [step, setStep] = useState<number>(0); // 0: Idle, 1: Encrypting, 2: Sending, 3: Decrypting, 4: Done
  const [isAnimating, setIsAnimating] = useState(false);

  // Reset when type changes
  useEffect(() => {
    setStep(0);
    setEncrypted('');
    setDecrypted('');
    setIsAnimating(false);
  }, [type, message]);

  const simulateProcess = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setStep(1);

    // Step 1: Encrypt
    setTimeout(() => {
      setEncrypted(btoa(message).substring(0, 12) + '...');
      setStep(2);
      
      // Step 2: Send
      setTimeout(() => {
        setStep(3);
        
        // Step 3: Decrypt
        setTimeout(() => {
          setDecrypted(message);
          setStep(4);
          setIsAnimating(false);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-8">

      {/* Control Panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
            <button
                onClick={() => setType('SYMMETRIC')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                    type === 'SYMMETRIC' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
            >
                Symmetric (AES)
            </button>
            <button
                onClick={() => setType('ASYMMETRIC')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-all ${
                    type === 'ASYMMETRIC' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
            >
                Asymmetric (RSA)
            </button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message..."
                className="bg-slate-800 text-white text-sm px-3 py-2 rounded border border-slate-700 focus:border-indigo-500 outline-none w-full"
            />
            <button
                onClick={simulateProcess}
                disabled={isAnimating || !message}
                className="bg-green-600 hover:bg-green-500 text-white p-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Send className="w-4 h-4" />
            </button>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative min-h-[300px] flex items-center justify-between px-4 md:px-12 py-8 bg-slate-950/50 rounded-xl border border-slate-800/50">
        
        {/* Alice */}
        <div className="flex flex-col items-center gap-4 relative z-10 w-32">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-indigo-500 relative">
                <User className="w-8 h-8 text-white" />
                <div className="absolute -bottom-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">ALICE</div>
            </div>
            <div className="text-center">
                <div className="text-xs text-slate-500 font-bold mb-1">DATA</div>
                <div className="bg-slate-800 px-3 py-2 rounded text-sm font-mono text-white border border-slate-700">
                    {message}
                </div>
            </div>
            <div className="flex flex-col items-center gap-1">
                {type === 'SYMMETRIC' ? (
                    <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-mono bg-yellow-900/20 px-2 py-1 rounded border border-yellow-500/30">
                        <Key className="w-3 h-3" /> Shared Key
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-[10px] text-green-400 font-mono bg-green-900/20 px-2 py-1 rounded border border-green-500/30">
                        <Key className="w-3 h-3" /> Bob's Public Key
                    </div>
                )}
            </div>
        </div>

        {/* Transmission Path */}
        <div className="flex-1 relative h-32 flex items-center justify-center">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2" />

            {/* Moving Packet */}
            <AnimatePresence mode="wait">
                {step > 0 && step < 4 && (
                    <motion.div
                        className="absolute bg-slate-900 p-3 rounded-lg border border-slate-700 shadow-xl z-20 flex flex-col items-center gap-2"
                        initial={{ x: "-120%" }}
                        animate={{ 
                            x: step === 1 ? "-120%" : step === 2 ? "0%" : "120%",
                            scale: step === 2 ? 1.2 : 1
                        }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    >
                        <div className={`p-2 rounded-full ${step === 2 ? 'bg-red-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                            {step >= 1 ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                        </div>
                        <div className="text-[10px] font-mono text-slate-300 whitespace-nowrap">
                            {step >= 1 ? encrypted || 'Encrypting...' : message}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Animation Status Text */}
            <div className="absolute -top-8 text-xs font-bold text-slate-500">
                {step === 1 && "Encrypting Message..."}
                {step === 2 && "Transmitting over Internet..."}
                {step === 3 && "Decrypting Message..."}
            </div>
        </div>

        {/* Bob */}
        <div className="flex flex-col items-center gap-4 relative z-10 w-32">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-indigo-500 relative">
                <User className="w-8 h-8 text-white" />
                <div className="absolute -bottom-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">BOB</div>
            </div>
            <div className="text-center">
                <div className="text-xs text-slate-500 font-bold mb-1">RECEIVED</div>
                <div className={`bg-slate-800 px-3 py-2 rounded text-sm font-mono border transition-colors ${step === 4 ? 'text-green-400 border-green-500/50' : 'text-slate-600 border-slate-700'}`}>
                    {step === 4 ? decrypted : 'Waiting...'}
                </div>
            </div>
            <div className="flex flex-col items-center gap-1">
                {type === 'SYMMETRIC' ? (
                     <div className="flex items-center gap-1 text-[10px] text-yellow-500 font-mono bg-yellow-900/20 px-2 py-1 rounded border border-yellow-500/30">
                        <Key className="w-3 h-3" /> Shared Key
                    </div>
                ) : (
                    <div className="flex items-center gap-1 text-[10px] text-red-400 font-mono bg-red-900/20 px-2 py-1 rounded border border-red-500/30">
                        <Key className="w-3 h-3" /> Bob's Private Key
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* Explanation Footer */}
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-sm">
        <h4 className="font-bold text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            How it works:
        </h4>
        <p className="text-slate-400 leading-relaxed">
            {type === 'SYMMETRIC' 
                ? "In Symmetric Encryption, Alice and Bob use the SAME key to lock and unlock the box. This is fast, but they must somehow safely share the key first."
                : "In Asymmetric Encryption, Bob gives Alice his Public Key (Green). Anyone can use it to lock a message, but ONLY Bob's Private Key (Red) can unlock it. No secret key needs to be shared!"}
        </p>
      </div>

    </div>
  );
}

