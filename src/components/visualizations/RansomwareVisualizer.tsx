'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, FileImage, Lock, Download, AlertOctagon, RefreshCw, File } from 'lucide-react';

interface MockFile {
  id: number;
  name: string;
  type: 'doc' | 'image' | 'pdf';
  isEncrypted: boolean;
}

export default function RansomwareVisualizer() {
  const [files, setFiles] = useState<MockFile[]>([
    { id: 1, name: 'Budget_2024.xlsx', type: 'doc', isEncrypted: false },
    { id: 2, name: 'Family_Photo.jpg', type: 'image', isEncrypted: false },
    { id: 3, name: 'Contract_Final.pdf', type: 'pdf', isEncrypted: false },
    { id: 4, name: 'Passwords.txt', type: 'doc', isEncrypted: false },
  ]);
  const [isInfected, setIsInfected] = useState(false);
  const [showRansomNote, setShowRansomNote] = useState(false);

  const downloadMalware = () => {
    setIsInfected(true);
    
    // Animate encryption process
    files.forEach((file, index) => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, isEncrypted: true, name: f.name + '.CRYPT' } : f
        ));
      }, (index + 1) * 800);
    });

    // Show note after all encrypted
    setTimeout(() => {
      setShowRansomNote(true);
    }, (files.length + 1) * 800);
  };

  const reset = () => {
    setIsInfected(false);
    setShowRansomNote(false);
    setFiles([
      { id: 1, name: 'Budget_2024.xlsx', type: 'doc', isEncrypted: false },
      { id: 2, name: 'Family_Photo.jpg', type: 'image', isEncrypted: false },
      { id: 3, name: 'Contract_Final.pdf', type: 'pdf', isEncrypted: false },
      { id: 4, name: 'Passwords.txt', type: 'doc', isEncrypted: false },
    ]);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden relative min-h-[400px]">
      
      {/* Ransom Note Overlay */}
      <AnimatePresence>
        {showRansomNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 z-50 bg-red-900/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <div className="bg-black border-4 border-red-600 p-8 max-w-md w-full shadow-2xl text-center">
              <AlertOctagon className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-red-500 mb-2 uppercase tracking-widest">Files Encrypted</h2>
              <p className="text-white mb-6 font-mono text-sm">
                Your personal documents, photos, and databases have been encrypted with a strong military-grade algorithm.
              </p>
              <div className="bg-red-950 p-4 border border-red-800 mb-6">
                <p className="text-red-400 text-xs font-mono mb-2">Payment Required:</p>
                <p className="text-2xl font-bold text-white">₿ 0.5 BTC</p>
                <p className="text-xs text-red-400 mt-2">Time Remaining: 23:59:59</p>
              </div>
              <button 
                onClick={reset}
                className="bg-white text-red-900 font-bold px-6 py-2 hover:bg-slate-200 transition-colors uppercase text-sm"
              >
                Reset Simulation (Decrypt)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white flex items-center gap-2">
          <File className="w-5 h-5 text-blue-400" />
          My Documents
        </h3>
        <button 
            onClick={reset}
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors"
        >
            <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {files.map((file) => (
          <motion.div
            key={file.id}
            layout
            className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-2 text-center h-32 transition-colors ${
              file.isEncrypted 
                ? 'bg-red-950/30 border-red-500/50' 
                : 'bg-slate-800 border-slate-700'
            }`}
          >
            <AnimatePresence mode="wait">
              {file.isEncrypted ? (
                <motion.div
                  key="locked"
                  initial={{ rotate: 180, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                >
                  <Lock className="w-10 h-10 text-red-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="file"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                >
                  {file.type === 'image' ? <FileImage className="w-10 h-10 text-purple-400" /> : <FileText className="w-10 h-10 text-blue-400" />}
                </motion.div>
              )}
            </AnimatePresence>
            <span className={`text-xs font-mono break-all ${file.isEncrypted ? 'text-red-400' : 'text-slate-300'}`}>
              {file.name}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Action Area */}
      {!isInfected && (
        <div className="mt-8 bg-slate-800/50 border border-slate-700 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <p className="text-slate-400 text-sm mb-4">
            Incoming Email: "URGENT_INVOICE.exe"
          </p>
          <button
            onClick={downloadMalware}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-bold transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Attachment
          </button>
          <p className="text-slate-500 text-xs mt-2">
            (Don't do this in real life!)
          </p>
        </div>
      )}
      
      {isInfected && !showRansomNote && (
        <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-red-400 animate-pulse">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Encrypting filesystem...
            </div>
        </div>
      )}

    </div>
  );
}

