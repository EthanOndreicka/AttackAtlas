'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldAlert, CheckCircle, Clock } from 'lucide-react';
import IncidentResponseVisualizer from '@/components/visualizations/IncidentResponseVisualizer';
import { motion } from 'framer-motion';

export default function IncidentResponsePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-orange-500 selection:text-white pb-20">
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
              Incident Response Simulator
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Incident Response is the organized approach to addressing and managing the aftermath of a security breach or cyberattack. The goal is to handle the situation in a way that limits damage and reduces recovery time and costs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <ShieldAlert className="w-6 h-6 mr-2 text-orange-500" />
                Live Scenario
              </h2>
              <IncidentResponseVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Make critical decisions during a simulated ransomware outbreak. Choose wisely to contain the threat!
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  The PICERL Framework
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Preparation</span>
                    <span>Before an incident happens: Training, policy creation, and setting up tools.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Identification</span>
                    <span>Detecting the incident, determining its scope, and classifying the threat.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Containment</span>
                    <span>Stopping the spread. Short-term (disconnecting cable) and long-term (patching systems).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Eradication</span>
                    <span>Removing the root cause: Deleting malware, disabling breached accounts.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Recovery</span>
                    <span>Restoring systems to normal operation and monitoring for re-infection.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Lessons Learned</span>
                    <span>Documenting what happened and improving processes for next time.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

