'use client';

import Link from 'next/link';
import { ArrowLeft, FileWarning, ShieldCheck, Database, HardDrive } from 'lucide-react';
import RansomwareVisualizer from '@/components/visualizations/RansomwareVisualizer';
import { motion } from 'framer-motion';

export default function RansomwarePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-red-900 selection:text-white pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-red-600">
              Ransomware
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Ransomware is a type of malicious software designed to block access to a computer system or files until a sum of money is paid.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileWarning className="w-6 h-6 mr-2 text-red-500" />
                Attack Simulation
              </h2>
              <RansomwareVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "Download Attachment" to see how malware encrypts your files and locks you out.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <HardDrive className="w-5 h-5 mr-2" />
                  Impact
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Encryption</span>
                    <span>The malware uses strong encryption algorithms (like AES-256) to make files unreadable without a unique key.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Extortion</span>
                    <span>Attackers demand payment (usually in cryptocurrency like Bitcoin) for the decryption key.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Exfiltration</span>
                    <span>Modern ransomware ("Double Extortion") also steals data before encrypting it, threatening to leak it if you don't pay.</span>
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
                      <span className="font-bold block text-slate-200">Offline Backups</span>
                      <span className="text-slate-400 text-sm">The most effective defense. If you can restore your data from a backup that the ransomware couldn't reach, you don't need to pay.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Email Filtering</span>
                      <span className="text-slate-400 text-sm">Block malicious attachments and links before they reach the inbox.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Endpoint Protection</span>
                      <span className="text-slate-400 text-sm">Use modern antivirus/EDR solutions that can detect ransomware behavior (like mass file modification).</span>
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

