'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Users, Server, Lock, Database, Code, KeyRound } from 'lucide-react';

const attacks = [
  {
    id: 'ddos',
    title: 'DDoS Attack',
    description: 'Distributed Denial of Service - Overwhelming a target with traffic.',
    icon: Server,
    color: 'bg-red-500',
    href: '/attacks/ddos'
  },
  {
    id: 'mitm',
    title: 'Man-in-the-Middle',
    description: 'Intercepting communication between two parties secretly.',
    icon: Users,
    color: 'bg-blue-500',
    href: '/attacks/mitm'
  },
  {
    id: 'phishing',
    title: 'Phishing',
    description: 'Deceptive attempts to steal sensitive information.',
    icon: Lock,
    color: 'bg-yellow-500',
    href: '/attacks/phishing'
  },
  {
    id: 'sqli',
    title: 'SQL Injection',
    description: 'Manipulating database queries to access unauthorized data.',
    icon: Database,
    color: 'bg-purple-500',
    href: '/attacks/sqli'
  },
  {
    id: 'xss',
    title: 'Cross-Site Scripting',
    description: 'Injecting malicious scripts into trusted websites.',
    icon: Code,
    color: 'bg-green-500',
    href: '/attacks/xss'
  },
  {
    id: 'bruteforce',
    title: 'Brute Force',
    description: 'Systematically guessing passwords to gain access.',
    icon: KeyRound,
    color: 'bg-orange-500',
    href: '/attacks/bruteforce'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-cyan-900">
      <div className="container mx-auto px-4 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
            Attack Atlas
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Interactive visualizations to help you understand how cyber attacks work and how to prevent them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attacks.map((attack, index) => (
            <motion.div
              key={attack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <Link href={attack.href} className="block group h-full">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 hover:border-cyan-500/50 transition-colors duration-300 h-full relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${attack.color} blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity`} />
                  
                  <div className="mb-6 inline-block p-4 rounded-lg bg-slate-800 group-hover:bg-slate-700 transition-colors">
                    <attack.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {attack.title}
                  </h2>
                  <p className="text-slate-400">
                    {attack.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
