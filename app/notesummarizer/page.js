"use client";

import React, { useState, useRef } from "react";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import { UserCircle } from "lucide-react";
import { motion } from "framer-motion";


export default function DocumentSummarizer() {
  const [summary, setSummary] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Simulate summarization logic
      setSummary("This is a summarized version of the uploaded document.");
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

  const downloadPDF = () => {
    const blob = new Blob([summary], { type: "application/pdf" });
    saveAs(blob, "summary.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/5 backdrop-blur-md shadow-md border-b border-white/10">
        {/* Logo */}
        <div className="text-2xl font-bold text-cyan-300">NextQ</div>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-gray-200 font-medium">
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
