'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Folder, FileText, ArrowUp, AlertTriangle, FileLock, Lock } from 'lucide-react';

export default function DirectoryTraversalVisualizer() {
  const [currentPath, setCurrentPath] = useState('/var/www/html/public');
  const [inputPath, setInputPath] = useState('image.png');
  const [output, setOutput] = useState<string | null>(null);
  const [isVulnerable, setIsVulnerable] = useState(true);

  const fileSystem: Record<string, string[]> = {
    '/': ['etc', 'var', 'home'],
    '/etc': ['passwd', 'hosts', 'shadow'],
    '/var': ['www', 'log'],
    '/var/www': ['html'],
    '/var/www/html': ['public', 'src'],
    '/var/www/html/public': ['index.html', 'style.css', 'image.png', 'logo.svg'],
  };

  const fileContents: Record<string, string> = {
    'image.png': '[BINARY IMAGE DATA]',
    'passwd': 'root:x:0:0:root:/root:/bin/bash\nuser:x:1000:1000:user:/home/user:/bin/bash',
    'shadow': '[PERMISSION DENIED]',
    'hosts': '127.0.0.1 localhost'
  };

  const executeRequest = () => {
    setOutput(null);
    
    // Simulate path processing
    let simulatedPath = `/var/www/html/public/${inputPath}`;
    
    // Handle traversal
    if (inputPath.includes('../')) {
        if (!isVulnerable) {
            setOutput("Error: Access Denied (Path traversal detected)");
            return;
        }

        // Logic to simulate resolving ../
        const parts = inputPath.split('/');
        let depth = 0;
        let filename = '';
        
        parts.forEach(p => {
            if (p === '..') depth++;
            else if (p !== '.' && p !== '') filename = p;
        });

        // 4 levels up from /var/www/html/public goes to /
        // then into etc/passwd
        if (depth >= 4 && (filename === 'passwd' || filename === 'shadow' || filename === 'hosts')) {
             setOutput(fileContents[filename] || "File not found");
             return;
        }
    }

    if (fileContents[inputPath]) {
        setOutput(fileContents[inputPath]);
    } else {
        setOutput("File not found or invalid path");
    }
  };

  const injectAttack = () => {
    setInputPath('../../../../etc/passwd');
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6">
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-white font-bold">
            <Folder className="w-5 h-5 text-yellow-500" />
            File Viewer App
        </div>
        <button 
            onClick={() => setIsVulnerable(!isVulnerable)}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                isVulnerable ? 'bg-red-500/20 text-red-500 border border-red-500/50' : 'bg-green-500/20 text-green-500 border border-green-500/50'
            }`}
        >
            {isVulnerable ? 'VULNERABLE' : 'SECURE'}
        </button>
      </div>

      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-4">
        <div>
            <label className="text-xs text-slate-500 uppercase font-bold">Current Working Directory</label>
            <div className="text-slate-300 font-mono text-sm bg-slate-900 p-2 rounded border border-slate-800 flex items-center gap-2">
                <Lock className="w-3 h-3 text-green-500" />
                {currentPath}
            </div>
        </div>

        <div>
            <label className="text-xs text-slate-500 uppercase font-bold flex justify-between">
                <span>Requested File (Parameter)</span>
                <button onClick={injectAttack} className="text-red-400 hover:text-red-300 text-[10px] bg-red-900/20 px-2 py-0.5 rounded">
                    Inject Attack Payload
                </button>
            </label>
            <div className="flex gap-2 mt-1">
                <input 
                    type="text" 
                    value={inputPath}
                    onChange={(e) => setInputPath(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2 font-mono text-sm focus:outline-none focus:border-cyan-500"
                />
                <button 
                    onClick={executeRequest}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded font-bold text-xs"
                >
                    Retrieve
                </button>
            </div>
        </div>
      </div>

      <div className="relative min-h-[150px] bg-black rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-hidden">
        <div className="text-slate-500 border-b border-slate-800 pb-2 mb-2">System Output</div>
        <AnimatePresence mode="wait">
            {output ? (
                <motion.div
                    key={output}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`whitespace-pre-wrap break-all ${output.includes('root:') ? 'text-red-400' : 'text-slate-300'}`}
                >
                    {output}
                </motion.div>
            ) : (
                <div className="text-slate-600 italic">No output...</div>
            )}
        </AnimatePresence>
        
        {output && output.includes('root:') && (
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute bottom-2 right-2 bg-red-900 text-red-100 px-3 py-1 rounded text-[10px] font-bold border border-red-500 flex items-center gap-1"
            >
                <AlertTriangle className="w-3 h-3" />
                SENSITIVE SYSTEM FILE EXPOSED
            </motion.div>
        )}
      </div>

    </div>
  );
}

