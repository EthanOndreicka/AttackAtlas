'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, Server, Filter } from 'lucide-react';
import FirewallVisualizer from '@/components/visualizations/FirewallVisualizer';
import { motion } from 'framer-motion';

export default function FirewallPage() {
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
              Firewall Configuration
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              A Firewall is a network security device that monitors and controls incoming and outgoing network traffic based on predetermined security rules.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Filter className="w-6 h-6 mr-2 text-blue-500" />
                Packet Filter Simulation
              </h2>
              <FirewallVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Add or remove rules to control the flow of traffic. Try adding a rule to ALLOW TCP port 8080 or DENY port 80.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Key Concepts
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Default Deny</span>
                    <span>The most secure policy is to block EVERYTHING by default, and only explicitly allow what is necessary.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Stateful Inspection</span>
                    <span>Modern firewalls track the state of active connections, allowing return traffic automatically if the outbound request was allowed.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Order Matters</span>
                    <span>Rules are processed top-down. If a packet matches rule #1 (Allow), it is let through immediately, even if rule #2 says (Deny).</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <Server className="w-5 h-5 mr-2" />
                  Common Ports
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Port 80 (HTTP)</span>
                      <span className="text-slate-400 text-sm">Unencrypted web traffic. Often allowed for public web servers.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Port 443 (HTTPS)</span>
                      <span className="text-slate-400 text-sm">Encrypted web traffic. The standard for secure browsing.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Port 22 (SSH)</span>
                      <span className="text-slate-400 text-sm">Secure Shell for remote administration. Should usually be restricted to specific IPs.</span>
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

