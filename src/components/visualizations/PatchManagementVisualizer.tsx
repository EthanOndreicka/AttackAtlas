'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, RefreshCw, AlertTriangle, CheckCircle, Search, ShieldCheck } from 'lucide-react';

interface System {
  id: number;
  name: string;
  os: string;
  status: 'secure' | 'vulnerable' | 'patching' | 'scanning';
  cve?: string;
  riskScore: number;
}

export default function PatchManagementVisualizer() {
  const [systems, setSystems] = useState<System[]>([
    { id: 1, name: 'Web Server 01', os: 'Ubuntu 20.04', status: 'secure', riskScore: 0 },
    { id: 2, name: 'DB Cluster', os: 'CentOS 7', status: 'secure', riskScore: 0 },
    { id: 3, name: 'Load Balancer', os: 'Nginx 1.18', status: 'secure', riskScore: 0 },
    { id: 4, name: 'Dev Workstation', os: 'Windows 10', status: 'secure', riskScore: 0 },
  ]);

  const [scanResult, setScanResult] = useState<string>('Ready to scan...');

  const runScan = () => {
    setScanResult('Scanning network for vulnerabilities...');
    setSystems(prev => prev.map(s => ({ ...s, status: 'scanning' })));

    setTimeout(() => {
        setSystems(prev => prev.map(s => {
            // Simulate finding vulnerabilities on some systems
            if (s.id === 1 || s.id === 3) {
                return { 
                    ...s, 
                    status: 'vulnerable', 
                    cve: s.id === 1 ? 'CVE-2023-XXXX (Critical)' : 'CVE-2021-YYYY (High)', 
                    riskScore: s.id === 1 ? 9.8 : 7.5 
                };
            }
            return { ...s, status: 'secure' };
        }));
        setScanResult('Scan Complete. Vulnerabilities detected.');
    }, 2000);
  };

  const patchSystem = (id: number) => {
    setSystems(prev => prev.map(s => s.id === id ? { ...s, status: 'patching' } : s));
    
    setTimeout(() => {
        setSystems(prev => prev.map(s => s.id === id ? { ...s, status: 'secure', cve: undefined, riskScore: 0 } : s));
    }, 1500);
  };

  const patchAll = () => {
    const vulnerableIds = systems.filter(s => s.status === 'vulnerable').map(s => s.id);
    vulnerableIds.forEach((id, index) => {
        setTimeout(() => patchSystem(id), index * 500);
    });
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="flex items-center gap-4">
            <h3 className="font-bold text-white flex items-center gap-2">
                <Search className="w-5 h-5 text-purple-500" />
                Vulnerability Scanner
            </h3>
            <span className="text-xs text-slate-400 border-l border-slate-700 pl-4">
                {scanResult}
            </span>
        </div>
        <div className="flex gap-2">
            <button 
                onClick={runScan}
                disabled={systems.some(s => s.status === 'scanning')}
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded font-bold text-xs disabled:opacity-50 transition-colors"
            >
                Start Scan
            </button>
            {systems.some(s => s.status === 'vulnerable') && (
                <button 
                    onClick={patchAll}
                    className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded font-bold text-xs animate-pulse transition-colors"
                >
                    Patch All
                </button>
            )}
        </div>
      </div>

      <div className="grid gap-3">
        {systems.map((system) => (
            <div 
                key={system.id} 
                className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-300 ${
                    system.status === 'vulnerable' ? 'bg-red-900/10 border-red-500/50' : 
                    system.status === 'secure' ? 'bg-slate-800 border-slate-700' :
                    'bg-slate-800 border-yellow-500/50'
                }`}
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${
                        system.status === 'vulnerable' ? 'bg-red-900/20 text-red-500' : 
                        system.status === 'secure' ? 'bg-slate-700 text-slate-400' :
                        'bg-yellow-900/20 text-yellow-500'
                    }`}>
                        <Server className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="font-bold text-white text-sm">{system.name}</div>
                        <div className="text-xs text-slate-500 font-mono">{system.os}</div>
                    </div>
                </div>

                <div className="flex-1 px-8">
                    {system.status === 'scanning' && (
                        <div className="text-xs text-yellow-500 flex items-center gap-2">
                            <RefreshCw className="w-3 h-3 animate-spin" /> Scanning...
                        </div>
                    )}
                    {system.status === 'patching' && (
                        <div className="w-full bg-slate-700 rounded-full h-1.5 overflow-hidden">
                            <motion.div 
                                className="h-full bg-green-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.5 }}
                            />
                        </div>
                    )}
                    {system.status === 'vulnerable' && (
                        <div>
                            <div className="text-xs font-bold text-red-400 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" /> {system.cve}
                            </div>
                            <div className="text-[10px] text-slate-500 mt-0.5">CVSS Score: {system.riskScore}/10</div>
                        </div>
                    )}
                    {system.status === 'secure' && system.riskScore === 0 && (
                        <div className="text-xs font-bold text-green-500 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> System Secure
                        </div>
                    )}
                </div>

                <div>
                    {system.status === 'vulnerable' ? (
                        <button 
                            onClick={() => patchSystem(system.id)}
                            className="bg-slate-700 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded transition-colors"
                        >
                            Deploy Patch
                        </button>
                    ) : system.status === 'secure' ? (
                        <div className="text-green-500">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                    ) : null}
                </div>
            </div>
        ))}
      </div>

    </div>
  );
}

