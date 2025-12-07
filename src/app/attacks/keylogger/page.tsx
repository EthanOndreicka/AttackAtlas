'use client';

import Link from 'next/link';
import { ArrowLeft, Keyboard, ShieldCheck, Bug, Eye } from 'lucide-react';
import KeyloggerVisualizer from '@/components/visualizations/KeyloggerVisualizer';
import { motion } from 'framer-motion';

export default function KeyloggerPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-red-500 selection:text-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Atlas
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12">
            <h1 className="text-5xl font-bold mb-4 text-pink-500">
              Keylogger
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              A Keylogger is a type of surveillance technology (software or hardware) used to monitor and record each keystroke typed on a specific computer's keyboard.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Keyboard className="w-6 h-6 mr-2 text-red-400" />
                Attack Simulation
              </h2>
              <KeyloggerVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Type into the fake banking login on the left. Watch the "Attacker's Log" on the right capture everything instantly.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Bug className="w-5 h-5 mr-2" />
                  How it Works
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Infection</span>
                    <span>Keyloggers often arrive as malware via phishing emails or infected downloads.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Stealth</span>
                    <span>They run quietly in the background, invisible to the user, recording everything (passwords, emails, chats).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Bypass</span>
                    <span>Because they sit on the device itself, they capture data <strong>before</strong> it gets encrypted by HTTPS/TLS.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Prevention & Defense
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Antivirus / Anti-Malware</span>
                      <span className="text-slate-400 text-sm">Regular scans can detect known keylogging software signatures.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Virtual Keyboards</span>
                      <span className="text-slate-400 text-sm">On-screen keyboards can sometimes bypass hardware keyloggers or simple software hooks.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Multi-Factor Authentication (MFA)</span>
                      <span className="text-slate-400 text-sm">Even if they steal your password, they can't log in without the second factor (like a phone code).</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

