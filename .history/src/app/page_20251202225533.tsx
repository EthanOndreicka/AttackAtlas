'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Users, Server, Lock, Database, Code, KeyRound, FileWarning, Keyboard, Repeat, Send, Wifi, Route, Folder, MousePointer, Terminal } from 'lucide-react';
import ThreatMap from '@/components/ThreatMap';

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
  },
  {
    id: 'ransomware',
    title: 'Ransomware',
    description: 'Malware that encrypts your files and demands payment.',
    icon: FileWarning,
    color: 'bg-red-700',
    href: '/attacks/ransomware'
  },
  {
    id: 'keylogger',
    title: 'Keylogger',
    description: 'Recording every keystroke to steal passwords and messages.',
    icon: Keyboard,
    color: 'bg-pink-600',
    href: '/attacks/keylogger'
  },
  {
    id: 'credential-stuffing',
    title: 'Credential Stuffing',
    description: 'Using leaked passwords to hack into other accounts.',
    icon: Repeat,
    color: 'bg-indigo-500',
    href: '/attacks/credential-stuffing'
  },
  {
    id: 'csrf',
    title: 'CSRF',
    description: 'Tricking a user into performing unwanted actions on a site.',
    icon: Send,
    color: 'bg-pink-400',
    href: '/attacks/csrf'
  },
  {
    id: 'session-hijacking',
    title: 'Session Hijacking',
    description: 'Stealing a session cookie to take over a user account.',
    icon: Wifi,
    color: 'bg-orange-600',
    href: '/attacks/session-hijacking'
  },
  {
    id: 'dns-spoofing',
    title: 'DNS Spoofing',
    description: 'Redirecting traffic by corrupting the domain name system.',
    icon: Route,
    color: 'bg-cyan-600',
    href: '/attacks/dns-spoofing'
  },
  {
    id: 'directory-traversal',
    title: 'Directory Traversal',
    description: 'Accessing restricted files by manipulating file paths.',
    icon: Folder,
    color: 'bg-yellow-600',
    href: '/attacks/directory-traversal'
  },
  {
    id: 'clickjacking',
    title: 'Clickjacking',
    description: 'Tricking users into clicking invisible buttons or overlays.',
    icon: MousePointer,
    color: 'bg-purple-600',
    href: '/attacks/clickjacking'
  },
  {
    id: 'command-injection',
    title: 'Command Injection',
    description: 'Executing arbitrary operating system commands on the server.',
    icon: Terminal,
    color: 'bg-green-600',
    href: '/attacks/command-injection'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-cyan-900 relative">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute inset-0 -z-10 overflow-hidden h-96 -mt-20">
             <ThreatMap />
          </div>
          <h1 className="text-6xl font-bold mb-6 text-cyan-400 relative z-10">
            Attack Atlas
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto relative z-10">
            Interactive visualizations to help you understand how cyber attacks work and how to prevent them.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attacks.map((attack, index) => (
            <motion.div
              key={attack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
