'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';

interface ChallengeProps {
  vulnerableCode: string;
  options: {
    id: number;
    label: string;
    code: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export default function SecureCodeChallenge({ vulnerableCode, options }: ChallengeProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (id: number) => {
    setSelectedOption(id);
    setIsSubmitted(true);
  };

  const currentOption = options.find(o => o.id === selectedOption);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-500" />
            Secure Code Challenge
        </h3>
        <span className="text-xs font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded">
            PATCH_THE_VULNERABILITY
        </span>
      </div>

      <div className="p-6 grid gap-6 lg:grid-cols-2">
        {/* Vulnerable Code */}
        <div>
            <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wide">Vulnerable Code</div>
            <div className="bg-slate-950 p-4 rounded-lg border border-red-900/30 font-mono text-sm text-slate-300 overflow-x-auto">
                <pre>{vulnerableCode}</pre>
            </div>
            <p className="mt-4 text-sm text-slate-400">
                Identify the security flaw above and select the correct patch to fix it.
            </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
            <div className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wide">Select the Secure Implementation</div>
            {options.map((option) => (
                <button
                    key={option.id}
                    onClick={() => !isSubmitted && handleSubmit(option.id)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-lg border transition-all duration-200 group ${
                        isSubmitted && option.isCorrect ? 'bg-green-900/20 border-green-500' :
                        isSubmitted && selectedOption === option.id && !option.isCorrect ? 'bg-red-900/20 border-red-500' :
                        'bg-slate-800 border-slate-700 hover:bg-slate-700'
                    }`}
                >
                    <div className="font-mono text-xs text-slate-300 mb-2 overflow-x-auto whitespace-pre-wrap">
                        {option.code}
                    </div>
                    {isSubmitted && selectedOption === option.id && (
                        <div className={`text-xs font-bold mt-2 flex items-center gap-2 ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                            {option.isCorrect ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            {option.explanation}
                        </div>
                    )}
                </button>
            ))}
        </div>
      </div>
    </div>
  );
}

