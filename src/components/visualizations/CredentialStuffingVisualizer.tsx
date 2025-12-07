'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Lock, Unlock, Users, Database, RefreshCw } from 'lucide-react';

interface Account {
  id: number;
  service: string;
  username: string;
  status: 'locked' | 'checking' | 'breached' | 'safe';
}

export default function CredentialStuffingVisualizer() {
  const [leakedPassword] = useState('password123');
  const [accounts, setAccounts] = useState<Account[]>([
    { id: 1, service: 'Social Media', username: 'user@email.com', status: 'locked' },
    { id: 2, service: 'Online Bank', username: 'user@email.com', status: 'locked' },
    { id: 3, service: 'Streaming', username: 'user@email.com', status: 'locked' },
    { id: 4, service: 'Shopping', username: 'user@email.com', status: 'locked' },
  ]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const startAttack = () => {
    setIsAttacking(true);
    setLog(prev => [...prev, 'Starting automated stuffing attack...']);
    setLog(prev => [...prev, `Loaded 1 leaked credential: user@email.com / ${leakedPassword}`]);

    accounts.forEach((account, index) => {
      setTimeout(() => {
        setAccounts(prev => prev.map(a => a.id === account.id ? { ...a, status: 'checking' } : a));
        
        setTimeout(() => {
            // Simulate that the user re-used passwords on all except maybe one
            const isReused = account.id !== 4; // Let's say shopping is safe
            
            setAccounts(prev => prev.map(a => 
                a.id === account.id ? { ...a, status: isReused ? 'breached' : 'safe' } : a
            ));
            
            if (isReused) {
                setLog(prev => [...prev, `[SUCCESS] ${account.service}: Logged in successfully!`]);
            } else {
                setLog(prev => [...prev, `[FAILED] ${account.service}: Password incorrect.`]);
            }

            if (index === accounts.length - 1) setIsAttacking(false);
        }, 1000);

      }, index * 1500 + 1000);
    });
  };

  const reset = () => {
    setIsAttacking(false);
    setLog([]);
    setAccounts(accounts.map(a => ({ ...a, status: 'locked' })));
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      {/* Top: The Leak Source */}
      <div className="bg-slate-950 p-4 rounded-lg border border-red-900/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/20 rounded-full">
                <Database className="w-6 h-6 text-red-500" />
            </div>
            <div>
                <h4 className="text-white font-bold text-sm">Dark Web Breach Database</h4>
                <p className="text-slate-500 text-xs">Source: Leaked Forum Dump (2023)</p>
            </div>
        </div>
        <div className="text-right">
            <div className="text-xs text-slate-500 uppercase font-bold">Credential Found</div>
            <div className="font-mono text-white text-sm">user@email.com : {leakedPassword}</div>
        </div>
      </div>

      <div className="flex justify-center">
         {!isAttacking && accounts.every(a => a.status === 'locked') ? (
            <button 
                onClick={startAttack}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded-full transition-colors animate-pulse"
            >
                Launch Automated Attack
            </button>
         ) : (
            <button 
                onClick={reset}
                className="text-slate-400 hover:text-white text-sm"
                disabled={isAttacking}
            >
                {isAttacking ? 'Attack in Progress...' : 'Reset Simulation'}
            </button>
         )}
      </div>

      {/* Targets Grid */}
      <div className="grid grid-cols-2 gap-4">
        {accounts.map((account) => (
            <div 
                key={account.id}
                className={`p-4 rounded-lg border-2 transition-all duration-300 relative overflow-hidden ${
                    account.status === 'breached' ? 'bg-red-950/30 border-red-500' :
                    account.status === 'safe' ? 'bg-green-950/30 border-green-500' :
                    account.status === 'checking' ? 'bg-slate-800 border-yellow-500' :
                    'bg-slate-800 border-slate-700'
                }`}
            >
                <div className="flex justify-between items-start mb-2">
                    <Globe className={`w-5 h-5 ${
                        account.status === 'breached' ? 'text-red-500' : 
                        account.status === 'safe' ? 'text-green-500' : 'text-slate-400'
                    }`} />
                    {account.status === 'locked' && <Lock className="w-4 h-4 text-slate-500" />}
                    {account.status === 'checking' && <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />}
                    {account.status === 'breached' && <Unlock className="w-4 h-4 text-red-500" />}
                    {account.status === 'safe' && <Lock className="w-4 h-4 text-green-500" />}
                </div>
                <div className="font-bold text-white text-sm">{account.service}</div>
                <div className="text-xs text-slate-500 font-mono mt-1">{account.username}</div>
                
                {account.status === 'breached' && (
                    <div className="mt-2 text-xs font-bold text-red-400 bg-red-900/20 py-1 px-2 rounded inline-block">
                        ACCESS GRANTED
                    </div>
                )}
                 {account.status === 'safe' && (
                    <div className="mt-2 text-xs font-bold text-green-400 bg-green-900/20 py-1 px-2 rounded inline-block">
                        ACCESS DENIED
                    </div>
                )}
            </div>
        ))}
      </div>
        
      {/* Logs */}
      <div className="bg-black p-3 rounded font-mono text-xs text-slate-400 h-32 overflow-y-auto border border-slate-800">
         {log.map((l, i) => <div key={i}>{'>'} {l}</div>)}
         {log.length === 0 && <span className="opacity-50">System ready...</span>}
      </div>

    </div>
  );
}

