'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ShieldCheck, FileJson, Lock } from 'lucide-react';
import XSSVisualizer from '@/components/visualizations/XSSVisualizer';
import SecureCodeChallenge from '@/components/SecureCodeChallenge';
import { motion } from 'framer-motion';

export default function XSSPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-green-500 selection:text-black pb-20">
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
            <h1 className="text-5xl font-bold mb-4 text-green-500">
              Cross-Site Scripting (XSS)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              Cross-Site Scripting (XSS) is a vulnerability that allows an attacker to inject malicious scripts into web pages viewed by other users. This script can then execute within the victim's browser context.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Code className="w-6 h-6 mr-2 text-green-500" />
                Attack Simulation
              </h2>
              <XSSVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Try posting a comment. Then use "Inject Script" to see what happens when the application doesn't sanitize input.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <FileJson className="w-5 h-5 mr-2" />
                  Types of XSS
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Stored</span>
                    <span>The malicious script is permanently stored on the target server (e.g., in a database via a comment field) and served to visitors.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Reflected</span>
                    <span>The malicious script is reflected off the web server, such as in an error message or search result, often via a malicious link.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">DOM-based</span>
                    <span>The vulnerability exists in client-side code rather than server-side code.</span>
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
                      <span className="font-bold block text-slate-200">Escape User Input</span>
                      <span className="text-slate-400 text-sm">Convert special characters into HTML entities (e.g., <code>&lt;</code> becomes <code>&amp;lt;</code>) so the browser renders them as text, not code.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Content Security Policy (CSP)</span>
                      <span className="text-slate-400 text-sm">An HTTP header that allows site operators to restrict the resources (like scripts) that can be loaded on a page.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
             <SecureCodeChallenge 
                vulnerableCode={`// Vulnerable React Component
function Comment({ text }) {
  // Dangerously rendering user input directly as HTML
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
}`}
                options={[
                    {
                        id: 1,
                        label: "Filter 'script' tags",
                        code: `function Comment({ text }) {
  const safeText = text.replace(/<script>/g, "");
  return <div dangerouslySetInnerHTML={{ __html: safeText }} />;
}`,
                        isCorrect: false,
                        explanation: "Insufficient. Attackers can use other tags like <img onerror=...> to execute scripts."
                    },
                    {
                        id: 2,
                        label: "Default React Rendering",
                        code: `function Comment({ text }) {
  // React automatically escapes content in children
  return <div>{text}</div>;
}`,
                        isCorrect: true,
                        explanation: "Correct! By default, React escapes all variables in JSX, preventing the browser from interpreting them as code."
                    },
                    {
                        id: 3,
                        label: "Encode URI Component",
                        code: `function Comment({ text }) {
  return <div dangerouslySetInnerHTML={{ __html: encodeURIComponent(text) }} />;
}`,
                        isCorrect: false,
                        explanation: "Encoding as a URI component is for URLs, not HTML content, and will display broken text to the user."
                    }
                ]}
             />
          </div>

        </motion.div>
      </div>
    </main>
  );
}
