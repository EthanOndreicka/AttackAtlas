'use client';

import Link from 'next/link';
import { ArrowLeft, Wifi, ShieldCheck, UserX, AlertOctagon } from 'lucide-react';
import SessionHijackingVisualizer from '@/components/visualizations/SessionHijackingVisualizer';
import { motion } from 'framer-motion';

export default function SessionHijackingPage() {
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
            <h1 className="text-5xl font-bold mb-4 text-orange-600">
              Session Hijacking (Cookie Theft)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Session Hijacking involves stealing the unique session ID (usually stored in a cookie) that identifies a logged-in user to a web server, allowing the attacker to take over the account without knowing the password.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Wifi className="w-6 h-6 mr-2 text-orange-500" />
                Attack Simulation
              </h2>
              <SessionHijackingVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Click "Sniff Packet" to simulate an attacker on the same unsecured WiFi network intercepting your session cookie.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <UserX className="w-5 h-5 mr-2" />
                  Common Methods
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Sniffing</span>
                    <span>On unencrypted (HTTP) or public WiFi networks, attackers can simply read the session cookie from the network traffic.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">XSS</span>
                    <span>If a site has an XSS vulnerability, an attacker can use JavaScript (`document.cookie`) to steal the session ID and send it to themselves.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Fixation</span>
                    <span>An attacker tricks a user into authenticating with a known session ID (e.g., via a link), then uses that same ID to access the account.</span>
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
                      <span className="font-bold block text-slate-200">HTTPS (TLS/SSL)</span>
                      <span className="text-slate-400 text-sm">Encrypts all traffic between the user and server, preventing network sniffing.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Secure & HttpOnly Flags</span>
                      <span className="text-slate-400 text-sm">Marking cookies as `Secure` ensures they are only sent over HTTPS. `HttpOnly` prevents JavaScript (XSS) from reading them.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Session Rotation</span>
                      <span className="text-slate-400 text-sm">Websites should generate a new session ID immediately after a user logs in to prevent Session Fixation.</span>
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

