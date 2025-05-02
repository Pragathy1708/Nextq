'use client'

import React, { useState, useRef, useEffect } from "react";
import { UserCircle } from "lucide-react";
import AnimatedNavbar from "../components/navbar";

// CardContainer with 3D effect logic
const CardContainer = ({ children }) => {
  const containerRef = useRef(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  // Mouse movement handler for 3D effect
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    container.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  // Reset the transform on mouse leave
  const resetTransform = () => {
    if (containerRef.current) {
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsMouseEntered(true)}
      onMouseLeave={() => {
        setIsMouseEntered(false);
        resetTransform();
      }}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {children}
    </div>
  );
};

// CardItem with 3D translate effect
const CardItem = ({ children, translateZ = 0, className = "", ...rest }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translateZ(${translateZ}px)`;
    }
  }, [translateZ]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-200 ease-linear ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

// HomePage component with integrated 3D hover effect on cards
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      <nav className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-md shadow-md border-b border-white/10">
        {/* Logo */}
        <div className="text-2xl font-bold text-cyan-300">NextQ</div>

        {/* Nav Links */}
        <div className="flex gap-6 text-gray-200 font-medium">
          <a href="#" className="hover:text-cyan-400 transition">Home</a>
          <a href="#" className="hover:text-cyan-400 transition">Predictive QP</a>
          <a href="#" className="hover:text-cyan-400 transition">Summarize Notes</a>
          <a href="#" className="hover:text-cyan-400 transition">Customize QP</a>
        </div>

        {/* User Icon */}
        <div className="flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-cyan-300" />
        </div>
      </nav>

      {/* Main Content */}
      <main className="text-center mt-20 px-4">
        <h1 className="text-5xl font-extrabold text-cyan-300 mb-4 drop-shadow-md">NextQ</h1>
        <p className="text-lg text-gray-300 mb-16 max-w-xl mx-auto">
          Your smart assistant for generating, customizing, and summarizing educational content effortlessly.
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:px-16 mb-24">
          {/* Card 1: Custom QP */}
          <CardContainer>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-left">
              <CardItem translateZ={20}>
                <h2 className="text-2xl font-semibold mb-2 text-white">Custom Question Paper Generator</h2>
              </CardItem>
              <CardItem translateZ={10}>
                <p className="text-gray-300 mb-4">
                  Create personalized question papers with full control over format, topics, and design.
                </p>
              </CardItem>
              <CardItem translateZ={30}>
                <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition">Create Now</button>
              </CardItem>
            </div>
          </CardContainer>

          {/* Card 2: Note Summarizer */}
          <CardContainer>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-left">
              <CardItem translateZ={20}>
                <h2 className="text-2xl font-semibold mb-2 text-white">Note Summarizer</h2>
              </CardItem>
              <CardItem translateZ={10}>
                <p className="text-gray-300 mb-4">
                  Upload your documents and get a concise summary tailored to your desired difficulty level.
                </p>
              </CardItem>
              <CardItem translateZ={30}>
                <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition">Summarize Notes</button>
              </CardItem>
            </div>
          </CardContainer>

          {/* Card 3: Predictive QP */}
          <CardContainer>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition text-left">
              <CardItem translateZ={20}>
                <h2 className="text-2xl font-semibold mb-2 text-white">Predictive Question Paper Generator</h2>
              </CardItem>
              <CardItem translateZ={10}>
                <p className="text-gray-300 mb-4">
                  Analyze past papers and generate likely questions for upcoming exams with smart prediction.
                </p>
              </CardItem>
              <CardItem translateZ={30}>
                <button className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-500 transition">Predict Now</button>
              </CardItem>
            </div>
          </CardContainer>
        </div>
      </main>
     <AnimatedNavbar/>
    </div>
  );
}
