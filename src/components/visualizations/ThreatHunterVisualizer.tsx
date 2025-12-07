'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, ShieldCheck, Play, Pause, RefreshCw } from 'lucide-react';

interface LogEntry {
  id: number;
  timestamp: string;
  ip: string;
  method: string;
  path: string;
  status: number;
  userAgent: string;
  isMalicious: boolean;
  type?: 'sql' | 'xss' | 'scan' | 'brute';
}

export default function ThreatHunterVisualizer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generators
  const generateIP = () => `192.168.1.${Math.floor(Math.random() * 255)}`;
  const generateTime = () => new Date().toISOString().split('T')[1].split('.')[0];
  
  const normalPaths = ['/index.html', '/about', '/contact', '/css/style.css', '/js/app.js', '/images/logo.png', '/api/data'];
  const maliciousPaths = [
    { path: '/admin.php?id=1 OR 1=1', type: 'sql' },
    { path: '/search?q=<script>alert(1)</script>', type: 'xss' },
    { path: '/../../../etc/passwd', type: 'scan' },
    { path: '/wp-login.php', type: 'brute' },
    { path: '/shell.php', type: 'scan' }
  ];

  const addLog = () => {
    const isAttack = Math.random() > 0.8; // 20% chance of attack
    const id = Date.now();
    
    let entry: LogEntry;

    if (isAttack) {
      const attack = maliciousPaths[Math.floor(Math.random() * maliciousPaths.length)];
      entry = {
        id,
        timestamp: generateTime(),
        ip: generateIP(),
        method: Math.random() > 0.5 ? 'GET' : 'POST',
        path: attack.path,
        status: Math.random() > 0.5 ? 200 : 403,
        userAgent: 'Mozilla/5.0 (Unknown; Linux x86_64)',
        isMalicious: true,
        type: attack.type as any
      };
    } else {
      entry = {
        id,
        timestamp: generateTime(),
        ip: generateIP(),
        method: 'GET',
        path: normalPaths[Math.floor(Math.random() * normalPaths.length)],
        status: 200,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        isMalicious: false
      };
    }

    setLogs(prev => [...prev.slice(-15), entry]); // Keep last 15
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !gameOver) {
      interval = setInterval(addLog, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, gameOver]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleLogClick = (log: LogEntry) => {
    if (gameOver) return;

    if (log.isMalicious) {
      setScore(prev => prev + 100);
      setLogs(prev => prev.filter(l => l.id !== log.id)); // Remove the threat
    } else {
      setScore(prev => Math.max(0, prev - 50));
      // Maybe flash red for penalty
    }
  };

  const startGame = () => {
    setLogs([]);
    setScore(0);
    setIsRunning(true);
    setGameOver(false);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="flex items-center gap-4">
            <div className="text-white font-bold flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                SIEM Console
            </div>
            <div className="bg-slate-900 px-3 py-1 rounded border border-slate-700 font-mono text-cyan-400">
                Score: {score}
            </div>
        </div>
        <button 
            onClick={() => isRunning ? setIsRunning(false) : startGame()}
            className={`px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-colors ${
                isRunning ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
        >
            {isRunning ? <><Pause className="w-4 h-4" /> Pause Analysis</> : <><Play className="w-4 h-4" /> Start Monitoring</>}
        </button>
      </div>

      <div className="relative min-h-[300px] bg-black rounded-lg border border-slate-800 font-mono text-xs overflow-hidden flex flex-col">
        <div className="flex bg-slate-800 text-slate-400 p-2 font-bold border-b border-slate-700">
            <div className="w-20">TIME</div>
            <div className="w-24">METHOD</div>
            <div className="w-16">STATUS</div>
            <div className="flex-1">REQUEST PATH</div>
            <div className="w-24 text-center">ACTION</div>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 space-y-1 relative">
            {!isRunning && logs.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                    <div className="text-center">
                        <ShieldCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>System Idle. Start monitoring to detect threats.</p>
                        <p className="text-[10px] mt-2">Click on suspicious logs (SQLi, XSS, etc) to block them.</p>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {logs.map((log) => (
                    <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, backgroundColor: '#1e293b' }}
                        onClick={() => handleLogClick(log)}
                        className={`flex items-center p-2 rounded cursor-pointer transition-colors border border-transparent hover:border-slate-600 ${
                            log.isMalicious ? 'hover:bg-red-900/10' : 'hover:bg-slate-800'
                        }`}
                    >
                        <div className="w-20 text-slate-500">{log.timestamp}</div>
                        <div className={`w-24 font-bold ${log.method === 'POST' ? 'text-yellow-500' : 'text-blue-400'}`}>
                            {log.method}
                        </div>
                        <div className={`w-16 ${log.status >= 400 ? 'text-red-400' : 'text-green-400'}`}>
                            {log.status}
                        </div>
                        <div className="flex-1 text-slate-300 truncate pr-4">
                            {log.path}
                        </div>
                        <div className="w-24 text-center">
                            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-1 rounded hover:bg-red-600 hover:text-white transition-colors">
                                BLOCK IP
                            </span>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </div>

      <div className="text-xs text-slate-500">
        <span className="font-bold text-slate-400">Tip:</span> Look for abnormal characters (', &lt;, &gt;), directory traversal (../), or admin access attempts.
      </div>

    </div>
  );
}

