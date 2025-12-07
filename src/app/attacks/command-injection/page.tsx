'use client';

import Link from 'next/link';
import { ArrowLeft, Terminal, ShieldCheck, Code, AlertTriangle } from 'lucide-react';
import CommandInjectionVisualizer from '@/components/visualizations/CommandInjectionVisualizer';
import SecureCodeChallenge from '@/components/SecureCodeChallenge';
import { motion } from 'framer-motion';

export default function CommandInjectionPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-green-500 selection:text-white pb-20">
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
              Command Injection (OS)
            </h1>
            <p className="text-xl text-slate-400 max-w-3xl">
              OS Command Injection is a vulnerability that allows an attacker to execute arbitrary operating system commands on the server running an application, typically by appending shell commands to user input.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <Terminal className="w-6 h-6 mr-2 text-green-500" />
                Attack Simulation
              </h2>
              <CommandInjectionVisualizer />
              <p className="mt-4 text-sm text-slate-500 italic">
                Interactive: The ping tool takes an IP address. Try appending `; cat /etc/passwd` to execute a second command after the ping finishes.
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                <h3 className="text-xl font-bold mb-4 text-cyan-400 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  How it Happens
                </h3>
                <ul className="space-y-4 text-slate-300">
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Unsafe Exec</span>
                    <span>Developers sometimes use functions like `system()` or `exec()` to run OS commands (like `ping`) with user input directly concatenated.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Separators</span>
                    <span>In Linux/Unix shells, characters like `;`, `|`, `&&` are used to chain commands. `ping 8.8.8.8; ls` runs ping, THEN runs ls.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-slate-800 px-2 py-1 rounded text-xs font-mono mr-3 mt-1 text-cyan-500">Total Control</span>
                    <span>If successful, this often gives the attacker the same privileges as the web server user, leading to data theft or full system takeover (RCE).</span>
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
                      <span className="font-bold block text-slate-200">Avoid OS Calls</span>
                      <span className="text-slate-400 text-sm">Use built-in language libraries instead of shell commands (e.g., use a native Ping library instead of calling `ping`).</span>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 mt-2 rounded-full bg-green-500 mr-3 shrink-0" />
                    <div>
                      <span className="font-bold block text-slate-200">Input Validation</span>
                      <span className="text-slate-400 text-sm">Allow only specific characters (e.g., `^[0-9.]+$` for IPs) and reject all shell metacharacters like `;`, `|`, `&`, `$`.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-20">
             <SecureCodeChallenge 
                vulnerableCode={`# Vulnerable Python Code
import os
ip = request.form['ip']
# Concatenating input directly into a shell command
os.system("ping -c 1 " + ip)`}
                options={[
                    {
                        id: 1,
                        label: "Use subprocess.run with list",
                        code: `import subprocess
# Passing args as a list prevents shell injection
subprocess.run(["ping", "-c", "1", ip])`,
                        isCorrect: true,
                        explanation: "Correct! When arguments are passed as a list, the OS treats them as data, not as executable shell commands."
                    },
                    {
                        id: 2,
                        label: "Quote the input",
                        code: `os.system("ping -c 1 '" + ip + "'")`,
                        isCorrect: false,
                        explanation: "Insufficient. Attackers can break out of quotes using single quotes in their payload."
                    },
                    {
                        id: 3,
                        label: "Check for semicolons",
                        code: `if ";" not in ip:
  os.system("ping -c 1 " + ip)`,
                        isCorrect: false,
                        explanation: "Weak defense. Attackers can use other separators like &&, ||, or | to inject commands."
                    }
                ]}
             />
          </div>

        </motion.div>
      </div>
    </main>
  );
}
