'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCw, Shield, Server, AlertTriangle } from 'lucide-react';
import PatchManagementVisualizer from '@/components/visualizations/PatchManagementVisualizer';
import { motion } from 'framer-motion';

export default function PatchManagementPage() {
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
              Vulnerability Management (Patching)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Patch Management is the process of distributing and applying updates to software. These patches are often necessary to correct security vulnerabilities (CVEs) and bugs in the software.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <RefreshCw className="w-6 h-6 mr-2 text-purple-500" />
                System Scanner
              </h2>
              <PatchManagementVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Run a scan to find vulnerable servers. Click "Deploy Patch" to update the OS and fix the critical security flaws.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  The Risk Window
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Disclosure</span>
                    <span>A vulnerability is found and publicly announced (e.g., Log4Shell). Hackers start scanning immediately.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Gap Analysis</span>
                    <span>The time between the vulnerability announcement and when you apply the patch is your "Window of Exposure."</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Exploitation</span>
                    <span>Unpatched systems are easy targets. Automated bots can compromise thousands of servers in hours.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Best Practices
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Asset Inventory</span>
                      <span className="text-slate-400 text-sm">You can't patch what you don't know you have. Maintain a complete list of all hardware and software.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Prioritization</span>
                      <span className="text-slate-400 text-sm">Focus on Critical/High severity CVEs on internet-facing systems first.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Test Before Deploy</span>
                      <span className="text-slate-400 text-sm">Patches can break things. Test in a staging environment before rolling out to production.</span>
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

