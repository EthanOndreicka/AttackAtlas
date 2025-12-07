'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, User, Landmark, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function CSRFVisualizer() {
  const [bankBalance, setBankBalance] = useState(1000);
  const [isLoggedIntoBank, setIsLoggedIntoBank] = useState(true);
  const [currentTab, setCurrentTab] = useState<'malicious' | 'bank'>('malicious');
  const [attackStatus, setAttackStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const executeCSRF = () => {
    if (!isLoggedIntoBank) return;
    
    setAttackStatus('sending');
    setTimeout(() => {
        setBankBalance(prev => Math.max(0, prev - 500));
        setAttackStatus('success');
        setTimeout(() => setAttackStatus('idle'), 3000);
    }, 1500);
  };

  const reset = () => {
    setBankBalance(1000);
    setAttackStatus('idle');
    setIsLoggedIntoBank(true);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      {/* Browser Tabs Simulation */}
      <div className="flex gap-2 border-b border-slate-700 pb-2">
        <button 
            onClick={() => setCurrentTab('malicious')}
            className={`px-4 py-2 rounded-t-lg text-sm font-bold flex items-center gap-2 transition-colors ${
                currentTab === 'malicious' ? 'bg-slate-800 text-red-400' : 'bg-slate-900 text-slate-500 hover:bg-slate-800/50'
            }`}
        >
            <AlertTriangle className="w-4 h-4" />
            FreePrize.com (Malicious)
        </button>
        <button 
            onClick={() => setCurrentTab('bank')}
            className={`px-4 py-2 rounded-t-lg text-sm font-bold flex items-center gap-2 transition-colors ${
                currentTab === 'bank' ? 'bg-slate-800 text-blue-400' : 'bg-slate-900 text-slate-500 hover:bg-slate-800/50'
            }`}
        >
            <Landmark className="w-4 h-4" />
            MyBank.com
        </button>
      </div>

      {/* Browser Content Area */}
      <div className="bg-white rounded-lg min-h-[300px] relative overflow-hidden">
        
        <AnimatePresence mode="wait">
            {currentTab === 'malicious' && (
                <motion.div 
                    key="malicious"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center text-slate-900 flex flex-col items-center justify-center h-full bg-yellow-50"
                >
                    <h2 className="text-3xl font-extrabold text-red-600 mb-4 animate-bounce">
                        YOU WON $1,000,000!
                    </h2>
                    <p className="mb-8 font-bold text-slate-600">
                        Click the button below to claim your prize instantly!
                    </p>
                    <button 
                        onClick={executeCSRF}
                        disabled={!isLoggedIntoBank || attackStatus !== 'idle'}
                        className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-4 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {attackStatus === 'sending' ? 'Claiming...' : 'CLAIM PRIZE NOW'}
                    </button>
                    
                    {!isLoggedIntoBank && (
                        <p className="mt-4 text-red-500 text-sm font-bold">
                            (Simulation: Log into the bank first to see the attack work)
                        </p>
                    )}

                    {/* Hidden Request Visualization */}
                    {attackStatus === 'sending' && (
                         <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="absolute bottom-4 right-4 bg-slate-800 text-white p-3 rounded text-xs font-mono text-left w-64 shadow-xl border border-slate-600"
                        >
                            <div className="text-red-400 font-bold mb-1">Hidden Background Request:</div>
                            <div className="text-slate-300">POST mybank.com/transfer</div>
                            <div className="text-slate-300">amount: 500</div>
                            <div className="text-slate-300">to: attacker_account</div>
                            <div className="text-green-400 mt-1">Cookie: session_id=valid ✅</div>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {currentTab === 'bank' && (
                <motion.div 
                    key="bank"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 text-slate-900 h-full bg-slate-50"
                >
                    <div className="flex justify-between items-center mb-8 border-b pb-4">
                        <div className="flex items-center gap-2 text-blue-700 font-bold text-xl">
                            <Landmark className="w-8 h-8" />
                            MyBank
                        </div>
                        <div className="flex items-center gap-4">
                             <div className="text-right">
                                <div className="text-xs text-slate-500">Welcome back,</div>
                                <div className="font-bold">John Doe</div>
                             </div>
                             <button 
                                onClick={() => setIsLoggedIntoBank(!isLoggedIntoBank)}
                                className={`text-xs px-3 py-1 rounded-full font-bold ${isLoggedIntoBank ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}
                             >
                                {isLoggedIntoBank ? 'Logout' : 'Login'}
                             </button>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="text-slate-500 text-sm uppercase font-bold mb-1">Current Balance</div>
                        <div className="text-4xl font-mono font-bold text-slate-800">
                            ${bankBalance.toLocaleString()}
                        </div>
                    </div>

                    <div className="mt-8">
                        <h4 className="font-bold text-slate-700 mb-4">Recent Transactions</h4>
                        <div className="space-y-3">
                            {attackStatus === 'success' && (
                                <motion.div 
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    className="flex justify-between items-center p-3 bg-red-50 border-l-4 border-red-500 rounded"
                                >
                                    <div>
                                        <div className="font-bold text-slate-800">Transfer Out</div>
                                        <div className="text-xs text-slate-500">To: Attacker Account</div>
                                    </div>
                                    <div className="font-mono font-bold text-red-600">-$500.00</div>
                                </motion.div>
                            )}
                             <div className="flex justify-between items-center p-3 bg-white border border-slate-100 rounded opacity-50">
                                <div>
                                    <div className="font-bold text-slate-800">Grocery Store</div>
                                    <div className="text-xs text-slate-500">Debit Card Purchase</div>
                                </div>
                                <div className="font-mono font-bold text-slate-600">-$124.50</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between items-center text-xs text-slate-400">
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoggedIntoBank ? 'bg-green-500' : 'bg-slate-500'}`} />
            Bank Session: {isLoggedIntoBank ? 'Active (Cookie Valid)' : 'Inactive'}
        </div>
        <button onClick={reset} className="hover:text-white underline">Reset Demo</button>
      </div>

    </div>
  );
}

