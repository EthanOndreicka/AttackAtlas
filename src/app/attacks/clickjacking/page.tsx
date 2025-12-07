'use client';

import Link from 'next/link';
import { ArrowLeft, Layers, ShieldCheck, Square, MousePointer } from 'lucide-react';
import ClickjackingVisualizer from '@/components/visualizations/ClickjackingVisualizer';
import { motion } from 'framer-motion';

export default function ClickjackingPage() {
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
              Clickjacking (UI Redressing)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Clickjacking occurs when an attacker uses transparent or opaque layers (iframes) to trick a user into clicking on a button or link on another page when they intended to click on the top level page.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MousePointer className="w-6 h-6 mr-2 text-purple-500" />
                Attack Simulation
              </h2>
              <ClickjackingVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "CLAIM PRIZE" to see what happens. Use the slider to reveal the invisible "Delete Account" button hiding underneath.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Layers className="w-5 h-5 mr-2" />
                  The Concept
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">The Lure</span>
                    <span>The attacker creates a page with an attractive button ("Win $500", "Play Video") to entice a click.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">The Trap</span>
                    <span>They load a target website (e.g., banking settings, Facebook 'Like') in an invisible `iframe` positioned directly under the user's cursor.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">The Hijack</span>
                    <span>When the user clicks, the browser registers the click on the invisible iframe, performing the action on the target site.</span>
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
                      <span className="font-bold block text-slate-200">X-Frame-Options Header</span>
                      <span className="text-slate-400 text-sm">Servers can send `X-Frame-Options: DENY` or `SAMEORIGIN` to tell browsers "Do not allow my site to be loaded inside an iframe."</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Content Security Policy (CSP)</span>
                      <span className="text-slate-400 text-sm">The `frame-ancestors` directive allows finer control over which domains are allowed to embed the site.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">SameSite Cookies</span>
                      <span className="text-slate-400 text-sm">Prevents the iframe from being logged in (receiving session cookies) if it's cross-origin, effectively breaking the attack.</span>
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

