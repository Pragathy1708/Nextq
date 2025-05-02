"use client";

import React, { useState, useRef } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { UserCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function DocumentSummarizer() {
  const [summary, setSummary] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [difficulty, setDifficulty] = useState("");
  const fileInputRef = useRef();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileUploaded(true);
      setSummary(""); // Reset previous summary if any
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const generateSummary = () => {
    // Simulate different summaries based on difficulty
    const summaries = {
      easy: "This is a very simple summary highlighting the basic points.",
      medium: "This summary provides a balanced overview of key concepts and insights.",
      hard: "This is a detailed and analytical summary, capturing nuanced elements of the content.",
    };
    setSummary(summaries[difficulty]);
  };

  const downloadPDF = () => {
    const blob = new Blob([summary], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "summary.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-md shadow-md border-b border-white/10">
        <div className="text-2xl font-bold text-cyan-300">NextQ</div>
        <div className="hidden md:flex gap-6 text-gray-200 font-medium">
          <a href="#" className="hover:text-cyan-400 transition">Home</a>
          <a href="#" className="hover:text-cyan-400 transition">Predictive QP</a>
          <a href="#" className="hover:text-cyan-400 transition">Summarize Notes</a>
          <a href="#" className="hover:text-cyan-400 transition">Customize QP</a>
        </div>
        <div className="flex items-center gap-2">
          <UserCircle className="w-8 h-8 text-cyan-300" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <motion.div
          className={`w-full max-w-xl p-10 text-center border-2 border-dashed rounded-lg transition-colors duration-300 ${dragActive ? "border-cyan-400 bg-white/10" : "border-white/20"}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current.click()}
        >
          <DocumentArrowUpIcon className="w-12 h-12 mx-auto mb-4 text-cyan-300" />
          <p className="text-lg font-medium text-gray-200">Drag & Drop your document here or click to upload</p>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </motion.div>

        {/* Difficulty Level */}
        {fileUploaded && !summary && (
          <div className="mt-8 text-center">
            <label className="text-lg font-semibold text-gray-200">Select Difficulty Level</label>
            <div className="flex justify-center gap-6 mt-4">
              {["easy", "medium", "hard"].map((level) => (
                <label key={level} className="flex items-center gap-2 text-gray-300">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    checked={difficulty === level}
                    onChange={(e) => setDifficulty(e.target.value)}
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
            </div>
            <button
              onClick={generateSummary}
              className={`px-6 py-2 mt-6 rounded text-white ${difficulty ? "bg-cyan-600 hover:bg-cyan-500" : "bg-gray-500 cursor-not-allowed"}`}
              disabled={!difficulty}
            >
              Generate Summary
            </button>
          </div>
        )}

        {/* Summary Output */}
        {summary && (
          <div className="w-full max-w-2xl mt-8">
            <label className="block mb-2 text-lg font-semibold text-gray-200">Summarized Notes</label>
            <textarea
              value={summary}
              readOnly
              className="w-full p-4 text-black rounded-md resize-none min-h-[200px]"
            />
            <button
              onClick={downloadPDF}
              className="px-6 py-2 mt-4 text-white transition-colors bg-cyan-600 rounded hover:bg-cyan-500"
            >
              Download as PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
