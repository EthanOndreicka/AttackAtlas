'use client';

import Link from 'next/link';
import { ArrowLeft, Database, ShieldCheck, Code, FileCode } from 'lucide-react';
import SQLiVisualizer from '@/components/visualizations/SQLiVisualizer';
import SecureCodeChallenge from '@/components/SecureCodeChallenge';
import { motion } from 'framer-motion';

export default function SQLiPage() {
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
              SQL Injection (SQLi)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              SQL Injection is a code injection technique where an attacker can execute malicious SQL statements that control a web application's database server, potentially accessing or deleting sensitive data.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Code className="w-6 h-6 mr-2 text-purple-500" />
                Attack Simulation
              </h2>
              <SQLiVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: Try typing <code>admin' OR '1'='1</code> into the input or use the "Auto-Fill" button.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  How it Works
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Input</span>
                    <span>The application accepts user input (e.g., username) without proper sanitization.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Inject</span>
                    <span>The attacker adds SQL syntax (like <code>'</code> or <code>OR</code>) into the input field.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Execute</span>
                    <span>The database interprets the input as code, altering the query's logic to return data it shouldn't.</span>
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
                      <span className="font-bold block text-slate-200">Prepared Statements (Parameterized Queries)</span>
                      <span className="text-slate-400 text-sm">Use database features that treat user input as data, not executable code.</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Input Validation</span>
                      <span className="text-slate-400 text-sm">Ensure input conforms to expected formats (e.g., only alphanumeric characters for usernames).</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
             <SecureCodeChallenge 
                vulnerableCode={`// Vulnerable Node.js Code
const query = "SELECT * FROM users WHERE user = '" + username + "'";
db.execute(query);`}
                options={[
                    {
                        id: 1,
                        label: "Sanitization",
                        code: `// Attempting to remove quotes
const safeUser = username.replace(/'/g, "");
const query = "SELECT * FROM users WHERE user = '" + safeUser + "'";
db.execute(query);`,
                        isCorrect: false,
                        explanation: "Sanitization is hard to get right. Attackers can often bypass filters (e.g., using hex encoding)."
                    },
                    {
                        id: 2,
                        label: "Parameterized Query",
                        code: `// Using placeholders (?)
const query = "SELECT * FROM users WHERE user = ?";
db.execute(query, [username]);`,
                        isCorrect: true,
                        explanation: "Correct! The database driver treats the input strictly as data, never as executable SQL commands."
                    },
                    {
                        id: 3,
                        label: "Error Suppression",
                        code: `try {
  const query = "SELECT * FROM users WHERE user = '" + username + "'";
  db.execute(query);
} catch (e) { /* Ignore errors */ }`,
                        isCorrect: false,
                        explanation: "Suppressing errors doesn't fix the vulnerability; the injection still executes."
                    }
                ]}
             />
          </div>

        </motion.div>
      </div>
    </main>
  );
}
