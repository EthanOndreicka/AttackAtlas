'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

interface Threat {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
}

export default function ThreatMap() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      const newThreat = {
        id: Date.now(),
        x: Math.random() * width,
        y: Math.random() * height,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        color: Math.random() > 0.5 ? '#ef4444' : '#3b82f6' // Red or Blue
      };

      setThreats(prev => [...prev.slice(-10), newThreat]); // Keep last 10
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-0 opacity-20 overflow-hidden pointer-events-none"
    >
      {/* World Map Background Placeholder (Simple Dots) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <Globe className="w-[800px] h-[800px] text-slate-500" strokeWidth={0.5} />
      </div>

      {/* Attacks */}
      {threats.map(threat => (
        <svg key={threat.id} className="absolute inset-0 w-full h-full">
            <defs>
                <linearGradient id={`grad-${threat.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={threat.color} stopOpacity="0" />
                    <stop offset="100%" stopColor={threat.color} stopOpacity="1" />
                </linearGradient>
            </defs>
             <motion.circle 
                cx={threat.x} 
                cy={threat.y} 
                r="3" 
                fill={threat.color}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [1, 2, 0] }}
                transition={{ duration: 1 }}
            />
            <motion.circle 
                cx={threat.targetX} 
                cy={threat.targetY} 
                r="3" 
                fill={threat.color}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 0.8, duration: 0.5 }}
            />
            {/* Projectile Line */}
            <motion.line 
                x1={threat.x} y1={threat.y}
                x2={threat.targetX} y2={threat.targetY}
                stroke={`url(#grad-${threat.id})`}
                strokeWidth="1"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            />
        </svg>
      ))}
    </div>
  );
}

