'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Search, FileText } from 'lucide-react';
import ThreatHunterVisualizer from '@/components/visualizations/ThreatHunterVisualizer';
import { motion } from 'framer-motion';

export default function ThreatHunterPage() {
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
              Log Analysis (Threat Hunting)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Threat Hunting involves proactively searching through networks and server logs to detect and isolate advanced threats that evade existing security solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Search className="w-6 h-6 mr-2 text-blue-500" />
                Live Simulation
              </h2>
              <ThreatHunterVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "Start Monitoring" and watch the logs. Click on suspicious entries (like SQL injection attempts) to block them and score points.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  What to Look For
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Injections</span>
                    <span>Look for SQL keywords (`SELECT`, `UNION`, `OR 1=1`) or script tags (`&lt;script&gt;`) in URL parameters.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Traversal</span>
                    <span>Repeated `../` sequences indicating attempts to access system files like `/etc/passwd`.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Scanning</span>
                    <span>Requests for sensitive files that shouldn't exist publicly, like `.env`, `wp-login.php` (on non-WP sites), or `backup.sql`.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Blue Team Skills
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">SIEM Proficiency</span>
                      <span className="text-slate-400 text-sm">Security Information and Event Management (SIEM) tools aggregate logs. Knowing how to query them is a core skill.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Pattern Recognition</span>
                      <span className="text-slate-400 text-sm">Ability to distinguish between normal user traffic and malicious probing.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Incident Response</span>
                      <span className="text-slate-400 text-sm">Identifying a breach is only step one. Containing it (e.g., blocking the IP) quickly is critical.</span>
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

