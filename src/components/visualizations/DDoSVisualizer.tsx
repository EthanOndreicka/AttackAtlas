'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, Laptop, Shield, Activity, RefreshCw } from 'lucide-react';

interface Packet {
  id: number;
  startX: number;
  startY: number;
  delay: number;
}

export default function DDoSVisualizer() {
  const [isAttacking, setIsAttacking] = useState(false);
  const [requests, setRequests] = useState(0);
  const [serverHealth, setServerHealth] = useState(100);
  const [packets, setPackets] = useState<Packet[]>([]);
  const requestRef = useRef<number>(0);

  const attackers = [
    { id: 1, x: 20, y: 20 },
    { id: 2, x: 80, y: 20 },
    { id: 3, x: 20, y: 80 },
    { id: 4, x: 80, y: 80 },
    { id: 5, x: 50, y: 10 },
    { id: 6, x: 50, y: 90 },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAttacking) {
      interval = setInterval(() => {
        setRequests(prev => prev + Math.floor(Math.random() * 50) + 10);
        setServerHealth(prev => Math.max(0, prev - 2));
        
        // Spawn packets
        const newPackets = attackers.map(attacker => ({
          id: Math.random(),
          startX: attacker.x,
          startY: attacker.y,
          delay: Math.random() * 0.5
        }));
        
        setPackets(prev => [...prev.slice(-20), ...newPackets]); // Keep only recent packets to avoid DOM overload
      }, 100);
    } else {
      // Recovery
      interval = setInterval(() => {
        setServerHealth(prev => Math.min(100, prev + 5));
        if (serverHealth >= 100) setRequests(0);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [isAttacking, serverHealth]);

  const toggleAttack = () => {
    setIsAttacking(!isAttacking);
  };

  const reset = () => {
    setIsAttacking(false);
    setServerHealth(100);
    setRequests(0);
    setPackets([]);
  };

  const getServerStatus = () => {
    if (serverHealth > 70) return { color: 'text-green-500', text: 'Online' };
    if (serverHealth > 30) return { color: 'text-yellow-500', text: 'Under Load' };
    return { color: 'text-red-500', text: 'Critical / Offline' };
  };

  const status = getServerStatus();

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Live Traffic Monitor
          </h3>
          <p className="text-slate-400 text-sm">Requests/sec: {isAttacking ? (requests * 12).toLocaleString() : '124'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={toggleAttack}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isAttacking 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
          >
            {isAttacking ? 'Stop Attack' : 'Start Attack'}
          </button>
          <button
            onClick={reset}
            className="p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Visualization Area */}
      <div className="relative h-96 bg-slate-950/50 rounded-lg border border-slate-800/50 overflow-hidden">
        
        {/* Attacker Nodes */}
        {attackers.map((attacker) => (
          <div
            key={attacker.id}
            className="absolute p-2 bg-slate-800 rounded-full border border-slate-700 z-10"
            style={{ left: `${attacker.x}%`, top: `${attacker.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <Laptop className={`w-6 h-6 ${isAttacking ? 'text-red-500' : 'text-slate-500'}`} />
          </div>
        ))}

        {/* Central Server */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={isAttacking ? {
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
              filter: ['brightness(1)', 'brightness(1.5)', 'brightness(1)']
            } : {}}
            transition={{ duration: 0.2, repeat: isAttacking ? Infinity : 0 }}
            className={`p-4 rounded-xl border-2 ${
              serverHealth < 30 ? 'bg-red-900/50 border-red-500' : 
              serverHealth < 70 ? 'bg-yellow-900/50 border-yellow-500' : 
              'bg-cyan-900/50 border-cyan-500'
            } transition-colors duration-300`}
          >
            <Server className={`w-12 h-12 ${status.color}`} />
          </motion.div>
          
          {/* Health Bar */}
          <div className="mt-4 w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${
                serverHealth < 30 ? 'bg-red-500' : 
                serverHealth < 70 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
              animate={{ width: `${serverHealth}%` }}
            />
          </div>
          <p className={`mt-2 text-sm font-bold ${status.color}`}>{status.text}</p>
        </div>

        {/* Flying Packets */}
        <AnimatePresence>
          {isAttacking && packets.map((packet) => (
             <motion.div
               key={packet.id}
               initial={{ left: `${packet.startX}%`, top: `${packet.startY}%`, opacity: 1, scale: 1 }}
               animate={{ left: '50%', top: '50%', opacity: 0, scale: 0.5 }}
               transition={{ duration: 0.8, ease: "linear" }}
               className="absolute w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]"
               style={{ transform: 'translate(-50%, -50%)' }}
             />
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-lg text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider">Total Requests</p>
          <p className="text-2xl font-bold text-white">{requests.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-lg text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider">Server Load</p>
          <p className={`text-2xl font-bold ${serverHealth > 80 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.max(0, 100 - serverHealth)}%
          </p>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-lg text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider">Status</p>
          <p className={`text-xl font-bold ${status.color}`}>{status.text}</p>
        </div>
      </div>
    </div>
  );
}

