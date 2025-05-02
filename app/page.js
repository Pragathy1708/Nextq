'use client'
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Blur overlay */}
      {showLogin && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />
      )}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`z-20 text-center transition-all duration-300 ${
          showLogin ? 'scale-95 blur-sm' : ''
        }`}
      >
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">NextQ</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Revolutionize your exam prep with <span className="font-semibold text-purple-700">NextQ</span> — your AI-powered toolkit for:
        </p>
        <ul className="text-gray-700 text-base mb-6 space-y-2">
          <li>📄 RAG-based Question Paper Generation</li>
          <li>📝 Smart Notes Summarizer</li>
          <li>🔮 Predictive Question Paper Model</li>
        </ul>
        <button onClick={() => setShowLogin(true)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 text-lg rounded-2xl shadow-md"> Get Started </button>
      </motion.div>

      {/* Google Login Modal */}
      {showLogin && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute z-30 bg-white p-6 rounded-xl shadow-xl text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Login to NextQ</h2>
          <button
            variant="outline"
            className="flex items-center gap-3 px-4 py-2 border border-gray-300"
            onClick={() => alert("Trigger Google Login")}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>
          <button
            className="mt-4 text-sm text-gray-500 hover:underline"
            onClick={() => setShowLogin(false)}
          >
            Cancel
          </button>
        </motion.div>
      )}
    </div>
  );
}
