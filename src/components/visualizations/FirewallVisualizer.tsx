'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Settings, Plus, Trash2, Play, Square, Activity } from 'lucide-react';

interface Rule {
  id: number;
  type: 'ALLOW' | 'DENY';
  protocol: 'TCP' | 'UDP';
  port: string;
  source: string;
}

interface Packet {
  id: number;
  protocol: 'TCP' | 'UDP';
  port: number;
  source: string;
  isBlocked: boolean;
}

export default function FirewallVisualizer() {
  const [rules, setRules] = useState<Rule[]>([
    { id: 1, type: 'ALLOW', protocol: 'TCP', port: '80', source: 'ANY' },
    { id: 2, type: 'ALLOW', protocol: 'TCP', port: '443', source: 'ANY' },
    { id: 3, type: 'DENY', protocol: 'TCP', port: '22', source: 'ANY' } // Block SSH by default
  ]);
  
  const [packets, setPackets] = useState<Packet[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ allowed: 0, blocked: 0 });

  // New Rule State
  const [newRuleType, setNewRuleType] = useState<'ALLOW' | 'DENY'>('DENY');
  const [newRuleProto, setNewRuleProto] = useState<'TCP' | 'UDP'>('TCP');
  const [newRulePort, setNewRulePort] = useState('8080');

  const addRule = () => {
    setRules([...rules, {
      id: Date.now(),
      type: newRuleType,
      protocol: newRuleProto,
      port: newRulePort,
      source: 'ANY'
    }]);
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(r => r.id !== id));
  };

  const checkPacket = (packet: Packet) => {
    // Default Policy: DENY ALL (Implicit) usually, but for sim let's say ALLOW ALL unless blocked, 
    // OR standard firewall logic: First match wins.
    
    let action = 'DENY'; // Default deny policy
    
    // Find first matching rule
    const match = rules.find(r => 
      r.protocol === packet.protocol && 
      (r.port === 'ANY' || parseInt(r.port) === packet.port)
    );

    if (match) {
      action = match.type;
    } else {
        // Fallback default
        action = 'DENY'; 
    }

    return action === 'DENY';
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        const newPacket: Packet = {
          id: Date.now(),
          protocol: Math.random() > 0.3 ? 'TCP' : 'UDP',
          port: [80, 443, 22, 8080, 53, 3389][Math.floor(Math.random() * 6)],
          source: `192.168.1.${Math.floor(Math.random() * 255)}`,
          isBlocked: false
        };
        
        newPacket.isBlocked = checkPacket(newPacket);
        
        setStats(prev => ({
            allowed: prev.allowed + (newPacket.isBlocked ? 0 : 1),
            blocked: prev.blocked + (newPacket.isBlocked ? 1 : 0)
        }));

        setPackets(prev => [...prev.slice(-8), newPacket]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, rules]);

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      {/* Top Stats */}
      <div className="flex justify-between items-center bg-slate-950 p-4 rounded-lg border border-slate-800">
        <div className="flex gap-6">
            <div>
                <div className="text-xs text-slate-500 uppercase font-bold">Allowed</div>
                <div className="text-2xl font-mono text-green-500">{stats.allowed}</div>
            </div>
            <div>
                <div className="text-xs text-slate-500 uppercase font-bold">Blocked</div>
                <div className="text-2xl font-mono text-red-500">{stats.blocked}</div>
            </div>
        </div>
        <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`px-4 py-2 rounded font-bold text-sm flex items-center gap-2 transition-colors ${
                isRunning ? 'bg-yellow-600 hover:bg-yellow-500 text-white' : 'bg-green-600 hover:bg-green-500 text-white'
            }`}
        >
            {isRunning ? <><Square className="w-4 h-4 fill-current" /> Stop Traffic</> : <><Play className="w-4 h-4" /> Start Traffic</>}
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Rule Editor */}
        <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-4 h-4 text-cyan-400" />
                Firewall Rules (Top-Down)
            </h3>
            
            <div className="space-y-2 max-h-[300px] overflow-y-auto mb-4">
                {rules.map((rule, i) => (
                    <div key={rule.id} className="flex items-center gap-2 bg-slate-900 p-2 rounded border border-slate-700">
                        <span className="text-xs text-slate-500 font-mono w-6">{i+1}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${rule.type === 'ALLOW' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                            {rule.type}
                        </span>
                        <span className="text-xs font-mono text-slate-300 flex-1">
                            {rule.protocol} : {rule.port}
                        </span>
                        <button onClick={() => removeRule(rule.id)} className="text-slate-500 hover:text-red-400">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            <div className="flex gap-2 items-center bg-slate-900 p-2 rounded border border-slate-700">
                <select 
                    value={newRuleType}
                    onChange={(e) => setNewRuleType(e.target.value as any)}
                    className="bg-slate-800 text-white text-xs p-1 rounded"
                >
                    <option value="ALLOW">ALLOW</option>
                    <option value="DENY">DENY</option>
                </select>
                <select 
                    value={newRuleProto}
                    onChange={(e) => setNewRuleProto(e.target.value as any)}
                    className="bg-slate-800 text-white text-xs p-1 rounded"
                >
                    <option value="TCP">TCP</option>
                    <option value="UDP">UDP</option>
                </select>
                <input 
                    type="text" 
                    value={newRulePort}
                    onChange={(e) => setNewRulePort(e.target.value)}
                    className="bg-slate-800 text-white text-xs p-1 rounded w-16 text-center"
                    placeholder="Port"
                />
                <button onClick={addRule} className="bg-cyan-600 hover:bg-cyan-500 text-white p-1 rounded ml-auto">
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>

        {/* Live Traffic */}
        <div className="bg-black rounded-lg border border-slate-800 p-4 overflow-hidden relative min-h-[300px]">
            <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-slate-500">
                <Activity className="w-3 h-3" /> Live Packet Stream
            </div>
            
            <div className="space-y-2 mt-6">
                <AnimatePresence>
                    {packets.map((packet) => (
                        <motion.div
                            key={packet.id}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            className={`flex items-center justify-between p-2 rounded border-l-4 ${
                                packet.isBlocked 
                                    ? 'bg-red-900/10 border-red-500 text-red-400' 
                                    : 'bg-green-900/10 border-green-500 text-green-400'
                            }`}
                        >
                            <div className="flex flex-col">
                                <span className="font-bold text-xs">{packet.protocol} / {packet.port}</span>
                                <span className="text-[10px] text-slate-500">{packet.source}</span>
                            </div>
                            <div className="text-xs font-bold">
                                {packet.isBlocked ? 'BLOCKED 🛡️' : 'ALLOWED ✅'}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                {packets.length === 0 && (
                    <div className="text-center text-slate-600 italic text-sm mt-20">
                        No traffic detected...
                    </div>
                )}
            </div>
        </div>

      </div>
    </div>
  );
}

