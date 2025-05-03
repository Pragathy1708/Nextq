'use client';
import { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] flex flex-col items-center justify-center px-6 pt-28 overflow-hidden font-sans">
      
      {/* Blur overlay for modal */}
      {showLogin && <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10" />}

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className={`z-20 text-center transition-all duration-300 ${showLogin ? 'scale-95 blur-sm' : ''}`}
      >
        <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight font-poppins">NextQ</h1>

        {/* Animated Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="max-w-2xl text-lg text-gray-300 mb-10 font-roboto"
        >
          NextQ leverages RAG-based AI to automate exam paper generation and notes summarization — making learning smart, efficient, and future-ready.
        </motion.p>

        {/* Updated Gradient Login Button */}
        <button
          onClick={() => setShowLogin(true)}
          className="bg-gradient-to-r from-[#6a11cb] to-[#2575fc] hover:brightness-110 text-white px-8 py-3 text-lg rounded-md shadow-md transition duration-300 font-semibold transform hover:scale-105"
        >
          Getstart
        </button>
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
            className="flex items-center gap-3 px-4 py-2 border border-gray-300 rounded-lg"
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
