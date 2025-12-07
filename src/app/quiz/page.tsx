'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Trophy } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: "Which attack involves overwhelming a server with traffic to take it offline?",
    options: ["Phishing", "DDoS", "SQL Injection", "XSS"],
    correct: 1
  },
  {
    id: 2,
    question: "What does the 'S' in HTTPS stand for?",
    options: ["Standard", "Secure", "Simple", "System"],
    correct: 1
  },
  {
    id: 3,
    question: "In a Phishing attack, what is the attacker primarily trying to do?",
    options: ["Crash your computer", "Steal sensitive info via deception", "Encrypt your files", "Use your CPU for mining"],
    correct: 1
  },
  {
    id: 4,
    question: "Which of these is the best defense against Credential Stuffing?",
    options: ["Using short passwords", "Reusing passwords", "Multi-Factor Authentication (MFA)", "Ignoring updates"],
    correct: 2
  },
  {
    id: 5,
    question: "What type of malware demands payment to decrypt your files?",
    options: ["Spyware", "Ransomware", "Adware", "Worm"],
    correct: 1
  },
  {
    id: 6,
    question: "Where does a Cross-Site Scripting (XSS) script execute?",
    options: ["On the database", "On the web server", "In the victim's browser", "On the attacker's machine"],
    correct: 2
  },
  {
    id: 7,
    question: "What is a 'Man-in-the-Middle' attack?",
    options: ["Intercepting communications between two parties", "Guessing passwords rapidly", "Injecting code into a database", "Sending spam emails"],
    correct: 0
  },
  {
    id: 8,
    question: "Which character is often used to trigger SQL Injection?",
    options: ["@", "#", "' (Single Quote)", "$"],
    correct: 2
  },
  {
    id: 9,
    question: "What does a Keylogger record?",
    options: ["Webcam footage", "Keystrokes", "Mouse movements", "Network packets"],
    correct: 1
  },
  {
    id: 10,
    question: "DNS Spoofing is also known as...",
    options: ["Cache Poisoning", "IP Flooding", "Port Scanning", "Packet Sniffing"],
    correct: 0
  }
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered) return;
    
    setSelectedOption(optionIndex);
    setIsAnswered(true);
    
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-purple-500 selection:text-white py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 text-purple-400">
            Cyber Security Challenge
          </h1>
          <p className="text-slate-400">
            Test your knowledge against common cyber threats.
          </p>
        </motion.div>

        <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 shadow-2xl relative overflow-hidden min-h-[400px]">
          <AnimatePresence mode="wait">
            {showScore ? (
              <motion.div 
                key="score"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="text-center h-full flex flex-col items-center justify-center py-10"
              >
                <Trophy className={`w-20 h-20 mb-6 ${score > 7 ? 'text-yellow-400' : 'text-slate-600'}`} />
                <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
                <p className="text-slate-400 mb-8">You scored</p>
                <div className="text-6xl font-bold mb-8 bg-slate-800 w-32 h-32 rounded-full flex items-center justify-center border-4 border-slate-700 mx-auto">
                  {score}/{questions.length}
                </div>
                <p className="mb-8 text-lg">
                  {score === 10 ? "Perfect Score! You're a security expert! 🛡️" :
                   score > 7 ? "Great job! You know your stuff. 🔒" :
                   score > 4 ? "Not bad, but keep learning. 📚" :
                   "Time to review the Atlas! ⚠️"}
                </p>
                <button 
                  onClick={resetQuiz}
                  className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key={currentQuestion}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-sm font-mono text-slate-500">
                    Question {currentQuestion + 1} / {questions.length}
                  </span>
                  <span className="bg-slate-800 px-3 py-1 rounded-full text-xs font-bold text-cyan-400">
                    Score: {score}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-8 min-h-[4rem]">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === questions[currentQuestion].correct;
                    
                    let buttonStyle = "bg-slate-800 border-slate-700 hover:bg-slate-700";
                    if (isAnswered) {
                        if (isCorrect) buttonStyle = "bg-green-900/50 border-green-500 text-green-400";
                        else if (isSelected) buttonStyle = "bg-red-900/50 border-red-500 text-red-400";
                        else buttonStyle = "bg-slate-800 border-slate-700 opacity-50";
                    } else if (isSelected) {
                        buttonStyle = "bg-cyan-900/50 border-cyan-500";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={isAnswered}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${buttonStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress Bar */}
          {!showScore && (
             <div className="absolute bottom-0 left-0 h-1 bg-slate-800 w-full">
                <motion.div 
                    className="h-full bg-cyan-500"
                    animate={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                />
             </div>
          )}
        </div>
      </div>
    </main>
  );
}

