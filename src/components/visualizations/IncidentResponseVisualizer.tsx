'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertOctagon, CheckCircle, XCircle, ArrowRight, ShieldAlert, Activity } from 'lucide-react';

interface Scenario {
  id: number;
  title: string;
  description: string;
  steps: Step[];
}

interface Step {
  id: number;
  question: string;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
  feedback: string;
  nextStep?: number;
}

const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Ransomware Outbreak",
    description: "An employee reports their computer screen is red and demanding Bitcoin. Several files on the shared drive are becoming unreadable.",
    steps: [
      {
        id: 1,
        question: "What is your immediate first action?",
        options: [
          { id: 'a', text: "Run a full antivirus scan on the infected machine.", isCorrect: false, feedback: "Too slow! While scanning, the malware is still spreading to the server." },
          { id: 'b', text: "Disconnect the infected machine from the network (Unplug Ethernet/WiFi).", isCorrect: true, feedback: "Correct! Isolation is the top priority to prevent spread to other systems.", nextStep: 2 },
          { id: 'c', text: "Pay the ransom immediately.", isCorrect: false, feedback: "Never pay as a first option. There's no guarantee you'll get data back, and it funds crime." }
        ]
      },
      {
        id: 2,
        question: "The machine is isolated. Now what?",
        options: [
          { id: 'a', text: "Wipe the machine and reinstall Windows immediately.", isCorrect: false, feedback: "Wait! You need to analyze the malware first to understand what it did and if data was stolen (forensics)." },
          { id: 'b', text: "Check the backups for integrity and offline status.", isCorrect: true, feedback: "Correct. You need to ensure your recovery point is safe and wasn't also encrypted.", nextStep: 3 },
          { id: 'c', text: "Email the entire company to warn them.", isCorrect: false, feedback: "Good idea, but you should verify the scope of the infection first." }
        ]
      },
      {
        id: 3,
        question: "Backups are safe. How do you recover?",
        options: [
          { id: 'a', text: "Decrypt the files using an online tool.", isCorrect: false, feedback: "Most modern ransomware cannot be cracked by free tools." },
          { id: 'b', text: "Restore from the last known good backup to a clean machine.", isCorrect: true, feedback: "Correct. This gets business running again. Ensure you patch the vulnerability that let them in first!" },
        ]
      }
    ]
  }
];

export default function IncidentResponseVisualizer() {
  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);
  const [currentStepId, setCurrentStepId] = useState(1);
  const [history, setHistory] = useState<{question: string, answer: string, isCorrect: boolean, feedback: string}[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const currentStep = activeScenario.steps.find(s => s.id === currentStepId);

  const handleOption = (option: Option) => {
    if (!currentStep) return;

    setHistory(prev => [...prev, {
        question: currentStep.question,
        answer: option.text,
        isCorrect: option.isCorrect,
        feedback: option.feedback
    }]);

    if (option.isCorrect) {
        if (option.nextStep) {
            setTimeout(() => setCurrentStepId(option.nextStep), 1500);
        } else {
            setTimeout(() => setIsComplete(true), 1500);
        }
    } else {
        // Penalty or Game Over? Let's just let them see the error and retry or restart.
        // For educational purposes, maybe just show the feedback and let them try again?
        // Actually, let's keep it simple: Wrong answer stays on screen, retry.
    }
  };

  const reset = () => {
    setCurrentStepId(1);
    setHistory([]);
    setIsComplete(false);
  };

  return (
    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl overflow-hidden flex flex-col gap-6 min-h-[500px]">
      
      <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex justify-between items-center">
        <div>
            <h3 className="font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
                Scenario: {activeScenario.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">{activeScenario.description}</p>
        </div>
        <button onClick={reset} className="text-xs text-slate-500 hover:text-white">Restart</button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        
        {/* History Log */}
        <div className="flex-1 space-y-4">
            {history.map((entry, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg border-l-4 ${entry.isCorrect ? 'bg-green-900/10 border-green-500' : 'bg-red-900/10 border-red-500'}`}
                >
                    <div className="text-xs text-slate-500 mb-1">Decision {i+1}</div>
                    <div className="font-bold text-white mb-2">{entry.question}</div>
                    <div className="text-sm text-slate-300 flex items-center gap-2">
                        {entry.isCorrect ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />}
                        You chose: "{entry.answer}"
                    </div>
                    <div className={`text-xs mt-2 font-mono ${entry.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {'>'} {entry.feedback}
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Current Interaction */}
        <AnimatePresence mode="wait">
            {!isComplete && currentStep ? (
                <motion.div
                    key={currentStep.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg mt-auto"
                >
                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-400" />
                        {currentStep.question}
                    </h4>
                    <div className="grid gap-3">
                        {currentStep.options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleOption(option)}
                                className="w-full text-left p-4 rounded-lg bg-slate-900 hover:bg-slate-700 border border-slate-800 transition-colors flex justify-between items-center group"
                            >
                                <span className="text-slate-300 group-hover:text-white">{option.text}</span>
                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                            </button>
                        ))}
                    </div>
                </motion.div>
            ) : isComplete && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-900/20 p-8 rounded-xl border border-green-500 text-center mt-auto"
                >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Incident Contained!</h2>
                    <p className="text-slate-300">
                        You successfully navigated the incident response process. The organization is recovering and security has been hardened.
                    </p>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </div>
  );
}

