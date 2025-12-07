'use client';

import Link from 'next/link';
import { ArrowLeft, UserCheck, Lock, Shield } from 'lucide-react';
import RBACVisualizer from '@/components/visualizations/RBACVisualizer';
import { motion } from 'framer-motion';

export default function RBACPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-cyan-500 selection:text-white pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-cyan-500">
              Access Control (RBAC)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Role-Based Access Control (RBAC) restricts network access based on a person's role within an organization. It ensures users access only the information they need to do their jobs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <UserCheck className="w-6 h-6 mr-2 text-cyan-500" />
                Live Simulation
              </h2>
              <RBACVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Change user roles (Guest, Developer, Admin) and see how their access permissions change instantly.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Key Principles
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Least Privilege</span>
                    <span>A user should be given only those privileges needed for it to complete its task. No more, no less.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Separation of Duties</span>
                    <span>Critical tasks should be divided among multiple people to prevent fraud or error. (e.g., The person who requests a payment shouldn't be the one to approve it).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Scalability</span>
                    <span>Instead of managing permissions for every single user, you manage roles. When a new employee joins, you just assign them a role.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-green-400 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Implementation
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Define Roles</span>
                      <span className="text-slate-400 text-sm">Analyze job functions (e.g., HR, IT, Sales) and create corresponding roles.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Assign Permissions</span>
                      <span className="text-slate-400 text-sm">Map resources (files, apps, databases) to the roles that need them.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Regular Audits</span>
                      <span className="text-slate-400 text-sm">Review access rights periodically. Remove access when employees leave or change roles ("Access Creep").</span>
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

