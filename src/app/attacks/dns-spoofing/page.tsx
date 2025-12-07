'use client';

import Link from 'next/link';
import { ArrowLeft, Server, ShieldCheck, Globe, Route } from 'lucide-react';
import DNSSpoofingVisualizer from '@/components/visualizations/DNSSpoofingVisualizer';
import { motion } from 'framer-motion';

export default function DNSSpoofingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-500 selection:text-white pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-cyan-500">
              DNS Spoofing (Cache Poisoning)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              DNS Spoofing is an attack where corrupt Domain Name System data is introduced into the DNS resolver's cache, causing the name server to return an incorrect result record (e.g., an attacker's IP address).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Route className="w-6 h-6 mr-2 text-blue-500" />
                Attack Simulation
              </h2>
              <DNSSpoofingVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Toggle between "Secure" and "Poisoned" DNS cache. Then try to visit the bank and see where you end up.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  How it Works
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">The Phonebook</span>
                    <span>DNS is like a phonebook for the internet, translating names (bank.com) into numbers (IP addresses).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">The Lie</span>
                    <span>Attackers trick the DNS server into saving a fake entry (e.g., "bank.com is at 6.6.6.6" instead of the real IP).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">The Redirect</span>
                    <span>When users type "bank.com", their computer asks the poisoned server and is silently sent to the attacker's fake site.</span>
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
                      <span className="font-bold block text-slate-200">DNSSEC</span>
                      <span className="text-slate-400 text-sm">DNS Security Extensions add cryptographic signatures to DNS records, proving they are authentic and haven't been tampered with.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">End-to-End Encryption (HTTPS)</span>
                      <span className="text-slate-400 text-sm">Even if redirected, the browser will likely show a certificate error because the attacker doesn't have the real bank's TLS certificate.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Short TTL</span>
                      <span className="text-slate-400 text-sm">Using shorter Time-To-Live settings on DNS records reduces the duration a poisoned entry stays in cache.</span>
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

