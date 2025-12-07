'use client';

import Link from 'next/link';
import { ArrowLeft, Users, ShieldCheck, Repeat, Key } from 'lucide-react';
import CredentialStuffingVisualizer from '@/components/visualizations/CredentialStuffingVisualizer';
import { motion } from 'framer-motion';

export default function CredentialStuffingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-indigo-500">
              Credential Stuffing
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Credential Stuffing is a cyberattack where stolen account credentials (usernames/passwords) from one breach are used to gain unauthorized access to user accounts on other systems.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Repeat className="w-6 h-6 mr-2 text-purple-400" />
                Attack Simulation
              </h2>
              <CredentialStuffingVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "Launch Automated Attack" to see how a single leaked password can compromise multiple accounts if you reuse passwords.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Why it Works
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Reuse</span>
                    <span>Most users reuse the same password across multiple services (email, banking, social media).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Automation</span>
                    <span>Attackers use bots to test millions of username/password pairs against hundreds of websites in minutes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Scale</span>
                    <span>Billions of credentials are available on the dark web from past data breaches.</span>
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
                      <span className="font-bold block text-slate-200">Unique Passwords</span>
                      <span className="text-slate-400 text-sm">Use a Password Manager to generate and store unique, complex passwords for every site.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Multi-Factor Authentication (MFA)</span>
                      <span className="text-slate-400 text-sm">Stops credential stuffing dead in its tracks. Even if they have your password, they can't get in.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Breach Monitoring</span>
                      <span className="text-slate-400 text-sm">Use services like "Have I Been Pwned" to check if your email has appeared in a breach.</span>
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

