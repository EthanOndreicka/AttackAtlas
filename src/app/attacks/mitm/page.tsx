'use client';

import Link from 'next/link';
import { ArrowLeft, Lock, Wifi, ShieldAlert, Globe } from 'lucide-react';
import MitmVisualizer from '@/components/visualizations/MitmVisualizer';
import { motion } from 'framer-motion';

export default function MitmPage() {
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
            <h1 className="text-5xl font-bold mb-4 text-blue-500">
              Man-in-the-Middle (MitM)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              A Man-in-the-Middle attack occurs when an attacker secretly relays and possibly alters the communications between two parties who believe they are directly communicating with each other.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ShieldAlert className="w-6 h-6 mr-2 text-blue-500" />
                Attack Simulation
              </h2>
              <MitmVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Toggle the interceptor and send data to see how it can be captured.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Common Scenarios
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">WiFi</span>
                    <span><strong>Rogue Access Points:</strong> Attackers set up free WiFi spots (e.g., "Free Airport WiFi") to intercept traffic of connected users.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Email</span>
                    <span><strong>Email Hijacking:</strong> Attackers compromise an email account and silently monitor communications to intercept sensitive data or reset passwords.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">DNS</span>
                    <span><strong>DNS Spoofing:</strong> Rerouting a user from a legitimate site (like a bank) to a fake site that looks identical to steal credentials.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Prevention & Defense
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Encryption (HTTPS/TLS)</span>
                      <span className="text-slate-400 text-sm">Always ensure websites use HTTPS. This encrypts traffic, making it unreadable even if intercepted.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Virtual Private Network (VPN)</span>
                      <span className="text-slate-400 text-sm">Encrypts your entire internet connection, creating a secure tunnel through public networks.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Avoid Public WiFi</span>
                      <span className="text-slate-400 text-sm">Be cautious on unsecured public networks. Avoid accessing sensitive accounts (banking) on them.</span>
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

