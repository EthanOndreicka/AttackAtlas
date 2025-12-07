'use client';

import Link from 'next/link';
import { ArrowLeft, FileJson, Shield, Lock, ShieldAlert } from 'lucide-react';
import JWTVisualizer from '@/components/visualizations/JWTVisualizer';
import { motion } from 'framer-motion';

export default function JWTPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-pink-500 selection:text-white pb-20">
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
              JSON Web Tokens (JWT)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              JWTs are a standard method for securely representing claims between two parties. They are widely used for authentication in modern web applications (Stateless Auth).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <FileJson className="w-6 h-6 mr-2 text-pink-500" />
                Token Inspector
              </h2>
              <JWTVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Edit the payload on the right. Notice how the Signature (Cyan) changes. If you don't have the correct secret key, the signature won't match, and the token is invalid.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Structure of a JWT
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-red-400">Header</span>
                    <span>Contains metadata about the token, such as the signing algorithm (e.g., HS256).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-purple-400">Payload</span>
                    <span>The actual data (Claims). User ID, Role, Expiration time. <strong className="text-pink-400">Warning:</strong> This is only encoded, not encrypted! Anyone can read it.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-400">Signature</span>
                    <span>The security part. Created by hashing the Header + Payload + Secret Key. Verifies that the token hasn't been changed.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-orange-400 flex items-center">
                  <ShieldAlert className="w-5 h-5 mr-2" />
                  Common Vulnerabilities
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">None Algorithm</span>
                      <span className="text-slate-400 text-sm">Attackers change the header `alg` to `none` and remove the signature. If the server isn't patched, it might accept it!</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Secret Brute Force</span>
                      <span className="text-slate-400 text-sm">If your secret key is weak (e.g., "secret123"), attackers can guess it offline and forge their own admin tokens.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-orange-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Sensitive Data Exposure</span>
                      <span className="text-slate-400 text-sm">Never put passwords or private info in the Payload. It's readable by anyone who intercepts the token.</span>
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

