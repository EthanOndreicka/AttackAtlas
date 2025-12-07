'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer, Layers, Check, Trash2, Gift } from 'lucide-react';

export default function ClickjackingVisualizer() {
  const [opacity, setOpacity] = useState(0); // Invisible by default in attack
  const [isProtectionEnabled, setIsProtectionEnabled] = useState(false);
  const [actionResult, setActionResult] = useState<'idle' | 'won' | 'deleted'>('idle');

  const handleClick = () => {
    if (isProtectionEnabled) {
      setActionResult('won');
    } else {
      setActionResult('deleted');
    }
  };

  const reset = () => {
    setActionResult('idle');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-white font-bold">
            <Layers className="w-5 h-5 text-purple-500" />
            Hidden Overlay Demo
        </div>
        <div className="flex gap-2">
            <button 
                onClick={() => setIsProtectionEnabled(!isProtectionEnabled)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    isProtectionEnabled ? 'bg-green-500/20 text-green-500 border border-green-500/50' : 'bg-red-500/20 text-red-500 border border-red-500/50'
                }`}
            >
                {isProtectionEnabled ? 'X-Frame-Options: DENY' : 'Protection: OFF'}
            </button>
            <button onClick={reset} className="text-xs text-slate-400 hover:text-white">Reset</button>
        </div>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center gap-4">
        
        <div className="w-full flex justify-between items-center px-4">
            <label className="text-xs text-slate-500 uppercase font-bold">Attacker's Transparency Control</label>
            <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.1" 
                value={opacity}
                onChange={(e) => setOpacity(parseFloat(e.target.value))}
                className="w-32"
            />
        </div>
        <div className="text-xs text-slate-500 text-center -mt-2">
            (Slide to reveal the hidden iframe)
        </div>

        {/* The Container for the Attack */}
        <div className="relative w-full max-w-sm h-64 border-4 border-slate-800 rounded-xl bg-white overflow-hidden shadow-2xl">
            
            {/* Layer 1: The "Lure" (What the user sees) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-200 to-yellow-400 z-10 pointer-events-none">
                <Gift className="w-16 h-16 text-red-500 mb-2 animate-bounce" />
                <h3 className="text-2xl font-black text-slate-900 uppercase">Win a PS5!</h3>
                <p className="text-slate-800 font-bold mb-4">Click below to claim instantly!</p>
                <div className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg transform scale-110">
                    CLAIM PRIZE
                </div>
            </div>

            {/* Layer 2: The "Target" (Hidden iframe) */}
            {/* In a real attack, this would be an iframe. Here we simulate it with a div */}
            <div 
                className="absolute inset-0 bg-slate-100 flex flex-col items-center justify-center transition-opacity duration-300 z-20"
                style={{ opacity: opacity }}
            >
                 {!isProtectionEnabled ? (
                    <div className="w-full h-full flex flex-col">
                        <div className="bg-slate-800 text-white p-2 text-xs flex justify-between items-center">
                            <span>account.settings.com</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500"/>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"/>
                                <div className="w-2 h-2 rounded-full bg-green-500"/>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col items-center justify-center p-6 border-2 border-red-500 m-2 rounded bg-white text-slate-900">
                             <h4 className="font-bold text-lg mb-2">Delete Account?</h4>
                             <p className="text-xs text-center mb-6 text-slate-500">This action cannot be undone.</p>
                             {/* The button is positioned exactly where the "Claim Prize" button is visually */}
                             <button 
                                onClick={handleClick}
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-bold shadow-lg w-full"
                            >
                                CONFIRM DELETE
                             </button>
                        </div>
                    </div>
                 ) : (
                     <div className="flex flex-col items-center justify-center h-full bg-slate-200 text-slate-500 p-4 text-center">
                         <div className="mb-2 text-4xl">🚫</div>
                         <div className="font-bold">Connection Refused</div>
                         <div className="text-xs">The website refused to connect via iframe (X-Frame-Options).</div>
                         {/* Fallback click handler if protection is on (user clicks the lure which has no listener, but we simulate the 'win') */}
                         <button onClick={handleClick} className="absolute inset-0 opacity-0 cursor-pointer" />
                     </div>
                 )}
            </div>

        </div>

      </div>

      <div className="bg-slate-800 rounded p-4 text-center min-h-[80px] flex items-center justify-center">
         {actionResult === 'idle' && (
             <span className="text-slate-500">Click the "CLAIM PRIZE" button above...</span>
         )}
         {actionResult === 'deleted' && (
             <motion.div 
                initial={{ scale: 0.5 }} 
                animate={{ scale: 1 }}
                className="text-red-400 font-bold flex items-center gap-2"
            >
                 <Trash2 className="w-6 h-6" />
                 ACCOUNT DELETED! You clicked the hidden button.
             </motion.div>
         )}
         {actionResult === 'won' && (
              <motion.div 
                initial={{ scale: 0.5 }} 
                animate={{ scale: 1 }}
                className="text-green-400 font-bold flex items-center gap-2"
            >
                 <Check className="w-6 h-6" />
                 SAFE! The browser blocked the hidden iframe. You just clicked a harmless div.
             </motion.div>
         )}
      </div>

    </div>
  );
}

