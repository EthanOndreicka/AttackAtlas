'use client';

import Link from 'next/link';
import { ArrowLeft, Lock, Key, Shield } from 'lucide-react';
import EncryptionVisualizer from '@/components/visualizations/EncryptionVisualizer';
import { motion } from 'framer-motion';

export default function EncryptionPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white pb-20">
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
              Encryption (Symmetric vs Asymmetric)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Encryption is the process of encoding information so that only authorized parties can access it. It is the backbone of internet privacy, securing everything from passwords to credit card numbers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Lock className="w-6 h-6 mr-2 text-indigo-500" />
                Crypto Lab
              </h2>
              <EncryptionVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Switch between Symmetric and Asymmetric modes. Send a message to see how different keys are used to secure the data in transit.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Key className="w-5 h-5 mr-2" />
                  Key Concepts
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Symmetric (AES)</span>
                    <span>
                        <strong className="text-white block mb-1">Same Key for Lock & Unlock</strong>
                        Like a house key. You give a copy to your friend. Fast and efficient, but risky—how do you get the key to them safely without a spy intercepting it?
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Asymmetric (RSA/ECC)</span>
                    <span>
                        <strong className="text-white block mb-1">Public Key & Private Key</strong>
                        Like a mailbox. Anyone can drop a letter in (Public Key), but only the owner with the key can open it (Private Key). Solves the key sharing problem.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Real World Use (HTTPS)
                </h3>
                <div className="space-y-4">
                  <p className="text-slate-300">
                    When you visit a secure website (HTTPS), your browser actually uses <strong>BOTH</strong> methods!
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-400 text-sm">
                    <li>Browser uses <strong>Asymmetric Encryption</strong> to safely send a random "Session Key" to the server.</li>
                    <li>Once both sides have this "Session Key", they switch to <strong>Symmetric Encryption</strong> (AES) because it's much faster for loading webpages.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

