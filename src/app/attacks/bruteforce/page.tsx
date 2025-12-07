'use client';

import Link from 'next/link';
import { ArrowLeft, KeyRound, ShieldCheck, Timer, Cpu } from 'lucide-react';
import BruteForceVisualizer from '@/components/visualizations/BruteForceVisualizer';
import { motion } from 'framer-motion';

export default function BruteForcePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-orange-500 selection:text-black pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-orange-500">
              Brute Force Attack
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              A Brute Force attack consists of an attacker submitting many passwords or passphrases with the hope of eventually guessing correctly. The attacker systematically checks all possible passwords and passphrases until the correct one is found.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Cpu className="w-6 h-6 mr-2 text-orange-500" />
                Attack Simulation
              </h2>
              <BruteForceVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "Start Brute Force" to simulate a computer guessing a 4-digit PIN. Notice how fast it finds a simple numeric combination.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Timer className="w-5 h-5 mr-2" />
                  Time to Crack
                </h3>
                <p className="text-slate-300 mb-4">
                    The complexity of a password exponentially increases the time required to crack it.
                </p>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">4-digit PIN (0-9)</span>
                    <span className="text-red-400">Instantly</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">8 chars (a-z)</span>
                    <span className="text-orange-400">~5 Hours</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">8 chars (a-z, 0-9, !@#)</span>
                    <span className="text-green-400">~39 Years</span>
                  </div>
                </div>
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
                      <span className="font-bold block text-slate-200">Account Lockout Policies</span>
                      <span className="text-slate-400 text-sm">Lock the account after a certain number (e.g., 5) of failed login attempts.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Rate Limiting</span>
                      <span className="text-slate-400 text-sm">Slow down the response time for each failed login to make brute forcing impractically slow.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Strong Password Requirements</span>
                      <span className="text-slate-400 text-sm">Enforce long passwords with mixed characters to increase the search space.</span>
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

