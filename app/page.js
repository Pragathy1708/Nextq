'use client';
import { signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    setShowNav(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 w-full px-8 py-5 flex justify-between items-center backdrop-blur-md bg-white/5 transition-all duration-700 z-50 ${showNav ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        <h1 className="text-xl font-bold tracking-wide">NextQ</h1>
        <div className="space-x-6 text-sm">
          <Link href="#about" className="hover:text-purple-300 transition">About</Link>
          <Link href="#features" className="hover:text-purple-300 transition">Features</Link>
          <Link href="#login" className="hover:text-purple-300 transition">Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-24">
        <h2 className="text-5xl font-extrabold leading-tight mb-6">
          Empowering <span className="text-purple-400">Education</span> with AI
        </h2>
        <p className="max-w-2xl text-lg text-gray-300 mb-10">
          NextQ leverages RAG-based AI to automate exam paper generation and notes summarization — making learning smart, efficient, and future-ready.
        </p>
        <a href="#login" className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-semibold transition">
          Get Started
        </a>
      </section>

      {/* Login Section */}
      <section id="login" className="flex items-center justify-center pb-20">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-xl p-10 w-full max-w-md text-center">
          <h3 className="text-2xl font-semibold mb-6">Login to Continue</h3>
          <button
            onClick={() => signIn('google')}
            className="w-full py-3 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
          >
            Login with Google
          </button>
        </div>
      </section>
    </div>
  );
}
