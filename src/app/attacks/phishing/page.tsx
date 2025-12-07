'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Lock, ShieldCheck, AlertOctagon, HelpCircle } from 'lucide-react';
import PhishingVisualizer from '@/components/visualizations/PhishingVisualizer';
import { motion } from 'framer-motion';

export default function PhishingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-yellow-500 selection:text-black pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-yellow-500">
              Phishing
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Phishing is a cybercrime in which a target is contacted by email, telephone or text message by someone posing as a legitimate institution to lure individuals into providing sensitive data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-2 text-yellow-500" />
                Attack Simulation
              </h2>
              <PhishingVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click on the suspicious email to see the flow of a phishing attack.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <AlertOctagon className="w-5 h-5 mr-2" />
                  Red Flags to Watch For
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Urgency</span>
                    <span><strong>Sense of Urgency:</strong> Messages claiming you must act immediately to avoid penalties or account suspension.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Domain</span>
                    <span><strong>Mismatched URLs:</strong> Hover over links. Does `bank.com` point to `secure-update-bank.net`?</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Generic</span>
                    <span><strong>Generic Greetings:</strong> "Dear Customer" instead of your actual name.</span>
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
                      <span className="font-bold block text-slate-200">Verify the Sender</span>
                      <span className="text-slate-400 text-sm">Check the actual email address, not just the display name.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Enable 2FA</span>
                      <span className="text-slate-400 text-sm">Two-Factor Authentication protects your account even if they get your password.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Don't Click, Navigate</span>
                      <span className="text-slate-400 text-sm">Instead of clicking a link in an email, go to the service's website directly through your browser.</span>
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

