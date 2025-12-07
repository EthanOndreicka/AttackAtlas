'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MousePointer, AlertTriangle, CheckCircle, XCircle, Globe, Lock } from 'lucide-react';

export default function PhishingVisualizer() {
  const [step, setStep] = useState<'inbox' | 'email' | 'fake-site' | 'success' | 'compromised'>('inbox');
  const [url, setUrl] = useState('https://bank-login-secure.com'); // Subtle typo or weird domain
  
  const reset = () => {
    setStep('inbox');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden h-[400px] flex flex-col">
      <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
           <div className="flex gap-1.5">
             <div className="w-3 h-3 rounded-full bg-red-500"/>
             <div className="w-3 h-3 rounded-full bg-yellow-500"/>
             <div className="w-3 h-3 rounded-full bg-green-500"/>
           </div>
           <div className="bg-slate-800 px-3 py-1 rounded text-xs text-slate-400 font-mono flex items-center gap-2 w-64">
             <Lock className="w-3 h-3" />
             {step === 'inbox' || step === 'email' ? 'mail.client.com' : 
              step === 'fake-site' || step === 'compromised' ? 'secure-bank-login.net' : 'bank.com'}
           </div>
        </div>
        <button onClick={reset} className="text-xs text-slate-400 hover:text-white">Reset Demo</button>
      </div>

      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {step === 'inbox' && (
            <motion.div 
              key="inbox"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="h-full"
            >
              <h3 className="text-slate-400 text-sm mb-2">Inbox (1 Unread)</h3>
              <div 
                onClick={() => setStep('email')}
                className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition-colors border-l-4 border-red-500"
              >
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white">Security Alert</span>
                  <span className="text-xs text-slate-500">10:42 AM</span>
                </div>
                <div className="text-sm text-slate-300">URGENT: Your account has been compromised. Verify now...</div>
              </div>
              <div className="mt-2 bg-slate-800/50 p-4 rounded-lg opacity-50">
                <div className="flex justify-between mb-1">
                  <span className="font-bold text-white">Newsletter</span>
                  <span className="text-xs text-slate-500">Yesterday</span>
                </div>
                <div className="text-sm text-slate-300">Weekly digest: New features available...</div>
              </div>
            </motion.div>
          )}

          {step === 'email' && (
            <motion.div 
              key="email"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="h-full flex flex-col"
            >
              <div className="bg-white text-slate-900 p-6 rounded-lg h-full relative">
                <div className="flex items-center gap-2 mb-4 border-b pb-2">
                   <AlertTriangle className="text-red-600 w-5 h-5" />
                   <span className="font-bold text-red-600">Urgent Action Required</span>
                </div>
                <p className="text-sm mb-4">
                  Dear User,<br/><br/>
                  We detected unusual activity on your account. Please verify your identity immediately to prevent account suspension.
                </p>
                <button 
                  onClick={() => setStep('fake-site')}
                  className="bg-red-600 text-white px-4 py-2 rounded text-sm font-bold w-full hover:bg-red-700 transition-colors"
                >
                  Verify Account Now
                </button>
                <div className="mt-4 text-xs text-slate-500 text-center">
                  Official Security Team (Actually fake-email@scam.com)
                </div>
              </div>
            </motion.div>
          )}

          {step === 'fake-site' && (
            <motion.div 
              key="fake-site"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center bg-white rounded-lg text-slate-900"
            >
              <div className="w-full max-w-xs p-6 border rounded shadow-lg">
                <div className="flex justify-center mb-4">
                   <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                     <Globe className="text-white w-8 h-8" />
                   </div>
                </div>
                <h2 className="text-center font-bold text-xl mb-4">Bank Login</h2>
                <input type="text" placeholder="Username" className="w-full border p-2 rounded mb-2 text-sm" />
                <input type="password" placeholder="Password" className="w-full border p-2 rounded mb-4 text-sm" />
                <button 
                  onClick={() => setStep('compromised')}
                  className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700"
                >
                  Sign In
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-400">URL: secure-bank-login.net (Not bank.com!)</p>
            </motion.div>
          )}

          {step === 'compromised' && (
             <motion.div 
              key="compromised"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold text-red-500 mb-2">Credentials Stolen!</h2>
              <p className="text-slate-400 max-w-xs">
                You entered your details on a fake site. The attacker now has your username and password.
              </p>
              <button onClick={reset} className="mt-6 text-cyan-400 hover:underline">Try Again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

