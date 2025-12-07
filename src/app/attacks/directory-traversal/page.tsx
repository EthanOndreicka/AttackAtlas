'use client';

import Link from 'next/link';
import { ArrowLeft, Folder, ShieldCheck, FileText, Search } from 'lucide-react';
import DirectoryTraversalVisualizer from '@/components/visualizations/DirectoryTraversalVisualizer';
import { motion } from 'framer-motion';

export default function DirectoryTraversalPage() {
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
              Directory Traversal
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Directory Traversal (or Path Traversal) allows an attacker to read files on the server that are outside of the website's root directory, potentially exposing sensitive system files or credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Folder className="w-6 h-6 mr-2 text-yellow-500" />
                Attack Simulation
              </h2>
              <DirectoryTraversalVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "Inject Attack Payload" to insert `../` sequences that navigate up the file system tree to reach `/etc/passwd`.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Search className="w-5 h-5 mr-2" />
                  How it Works
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Dot-Dot-Slash</span>
                    <span>The sequence `../` tells the operating system to move "up" one directory level.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Root Escape</span>
                    <span>By chaining enough `../`, an attacker can escape the web folder (e.g., `/var/www/html`) and reach the system root `/`.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Sensitive Access</span>
                    <span>Files like `/etc/passwd` (user list) or configuration files with passwords become accessible.</span>
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
                      <span className="font-bold block text-slate-200">Input Validation</span>
                      <span className="text-slate-400 text-sm">Validate that user input contains only expected characters (alphanumeric) and strictly filter out `..` or `/`.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Use Indirect References</span>
                      <span className="text-slate-400 text-sm">Instead of using filenames directly (e.g., `?file=report.pdf`), use an ID map (e.g., `?id=1` maps to `report.pdf` on the server).</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">File System Permissions</span>
                      <span className="text-slate-400 text-sm">Run the web server with limited permissions so it cannot read system files even if the code is vulnerable.</span>
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

