'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, AlertTriangle, Wifi } from 'lucide-react';

export default function CommandInjectionVisualizer() {
  const [ipAddress, setIpAddress] = useState('8.8.8.8');
  const [output, setOutput] = useState<string[]>([]);
  const [isVulnerable, setIsVulnerable] = useState(true);

  const executePing = () => {
    setOutput(['> Initializing ping utility...', `> Pinging ${ipAddress}...`]);
    
    setTimeout(() => {
        // Check for injection
        if (ipAddress.includes(';') || ipAddress.includes('|') || ipAddress.includes('&&')) {
            if (!isVulnerable) {
                 setOutput(prev => [...prev, `PING ${ipAddress} (56 data bytes)`, '64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms', 'Error: Invalid characters detected in input.']);
                 return;
            }

            // Simulate command execution
            const parts = ipAddress.split(/[;|&]+/);
            const injectedCommand = parts[1]?.trim();

            setOutput(prev => [...prev, `PING ${parts[0]} (56 data bytes)`, '64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms']);
            
            setTimeout(() => {
                if (injectedCommand === 'ls') {
                    setOutput(prev => [...prev, '$ ls', 'index.php', 'config.php', 'users.db', 'passwords.txt']);
                } else if (injectedCommand === 'whoami') {
                    setOutput(prev => [...prev, '$ whoami', 'root']);
                } else if (injectedCommand === 'cat /etc/passwd') {
                    setOutput(prev => [...prev, '$ cat /etc/passwd', 'root:x:0:0:root:/root:/bin/bash', 'daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin', '...']);
                } else {
                    setOutput(prev => [...prev, `$ ${injectedCommand}`, 'command not found']);
                }
            }, 500);
            return;
        }

        // Normal execution
        setOutput(prev => [...prev, `PING ${ipAddress} (56 data bytes)`, '64 bytes from 8.8.8.8: icmp_seq=1 ttl=117 time=14.2 ms', '64 bytes from 8.8.8.8: icmp_seq=2 ttl=117 time=14.1 ms', '--- 8.8.8.8 ping statistics ---', '2 packets transmitted, 2 received, 0% packet loss']);
    }, 800);
  };

  const injectAttack = () => {
    setIpAddress('8.8.8.8; cat /etc/passwd');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-white font-bold">
            <Wifi className="w-5 h-5 text-green-500" />
            Network Ping Tool
        </div>
        <button 
            onClick={() => setIsVulnerable(!isVulnerable)}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                isVulnerable ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-green-500/20 text-green-500 border border-green-500/50'
            }`}
        >
            {isVulnerable ? 'VULNERABLE' : 'SECURE'}
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
        <label className="text-xs text-slate-500 uppercase font-bold flex justify-between">
            <span>Enter IP Address to Ping</span>
            <button onClick={injectAttack} className="text-red-400 hover:text-red-300 text-[10px] bg-red-900/20 px-2 py-0.5 rounded">
                Try Injection
            </button>
        </label>
        <div className="flex gap-2">
            <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">$ ping</span>
                <input 
                    type="text" 
                    value={ipAddress}
                    onChange={(e) => setIpAddress(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded px-3 py-2 pl-16 font-mono text-sm text-white focus:outline-none focus:border-cyan-500"
                />
            </div>
            <button 
                onClick={executePing}
                className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold text-xs"
            >
                Execute
            </button>
        </div>
      </div>

      <div className="relative min-h-[200px] bg-black rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-hidden">
        <div className="flex items-center gap-2 text-slate-500 border-b border-slate-800 pb-2 mb-2">
            <Terminal className="w-4 h-4" />
            <span>Server Console Output</span>
        </div>
        <div className="space-y-1">
             <AnimatePresence>
                {output.map((line, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`${line.includes('root:') || line.includes('$') ? 'text-red-400 font-bold' : 'text-slate-300'}`}
                    >
                        {line}
                    </motion.div>
                ))}
            </AnimatePresence>
            {output.length === 0 && <span className="text-slate-600 italic">Waiting for input...</span>}
        </div>
        
        {output.some(l => l.includes('root:')) && (
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-2 right-2 bg-red-900 text-red-100 px-3 py-1 rounded text-[10px] font-bold border border-red-500 flex items-center gap-1"
            >
                <AlertTriangle className="w-3 h-3" />
                RCE SUCCESSFUL (Arbitrary Code Executed)
            </motion.div>
        )}
      </div>

    </div>
  );
}

