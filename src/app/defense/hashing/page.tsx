'use client';

import Link from 'next/link';
import { ArrowLeft, Hash, ShieldCheck, Database, Lock } from 'lucide-react';
import HashingVisualizer from '@/components/visualizations/HashingVisualizer';
import { motion } from 'framer-motion';

export default function HashingPage() {
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
            <h1 className="text-5xl font-bold mb-4 text-purple-500">
              Hashing & Salting
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Hashing is the process of converting data (like a password) into a fixed-size string of characters. It is a one-way function, meaning you cannot convert the hash back into the original password.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Hash className="w-6 h-6 mr-2 text-purple-500" />
                Crypto Lab
              </h2>
              <HashingVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Enter a password to see its hash. Try the "Simulate Hack" button. Then, add a "Salt" and try hacking it again to see why salts are crucial.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Why Salt?
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Rainbow Tables</span>
                    <span>Hackers use pre-computed tables of billions of common passwords and their hashes. If you use a simple hash (e.g., MD5 of "password123"), they can look it up instantly.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Uniqueness</span>
                    <span>A "Salt" is random data added to the password *before* hashing. Even if two users have the same password ("password123"), their salts will be different, so their hashes will be different.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Defense</span>
                    <span>Salting forces an attacker to crack each password individually, rather than using a pre-made table for all of them at once.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Best Practices
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Slow Hashing Algorithms</span>
                      <span className="text-slate-400 text-sm">Use algorithms designed to be slow (e.g., Argon2, Bcrypt, PBKDF2). This makes brute-force attacks computationally expensive.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Unique Salts</span>
                      <span className="text-slate-400 text-sm">Generate a new, random salt for every single user. Never reuse salts.</span>
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

