'use client';

import Link from 'next/link';
import { ArrowLeft, ShieldCheck, AlertTriangle, Info } from 'lucide-react';
import DDoSVisualizer from '@/components/visualizations/DDoSVisualizer';
import { motion } from 'framer-motion';

export default function DDoSPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-red-500 selection:text-white pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-red-500">
              DDoS Attack
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              A Distributed Denial-of-Service (DDoS) attack is a malicious attempt to disrupt the normal traffic of a targeted server, service or network by overwhelming the target or its surrounding infrastructure with a flood of Internet traffic.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <AlertTriangle className="w-6 h-6 mr-2 text-red-500" />
                Live Simulation
              </h2>
              <DDoSVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "Start Attack" to simulate a botnet overwhelming the server.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  How it Works
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">1</span>
                    <span>An attacker gains control of a network of online machines (Botnet).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">2</span>
                    <span>The attacker instructs the botnet to send massive amounts of requests to a single target IP address.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">3</span>
                    <span>The target server becomes overwhelmed, unable to process legitimate requests, leading to denial of service.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <ShieldCheck className="w-5 h-5 mr-2" />
                  Prevention & Mitigation
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Content Delivery Networks (CDN)</span>
                      <span className="text-slate-400 text-sm">Distribute traffic across many servers globally to absorb the load.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Rate Limiting</span>
                      <span className="text-slate-400 text-sm">Restrict the number of requests a user can make in a given timeframe.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Web Application Firewall (WAF)</span>
                      <span className="text-slate-400 text-sm">Filter and monitor HTTP traffic between a web application and the Internet.</span>
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

