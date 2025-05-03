'use client'
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function PredictiveQPPage() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [generatedQP, setGeneratedQP] = useState('');

  const handleFileUpload = (e) => {
    setUploadedFile(e.target.files[0]);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleGenerate = () => {
    // Dummy content for now
    setGeneratedQP('Sample Predictive Question Paper based on your uploaded document and prompt.');
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedQP], { type: 'application/pdf' });
    element.href = URL.createObjectURL(file);
    element.download = 'predictive_qp.pdf';
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="text-2xl font-bold">NextQ</div>
        <div className="space-x-6">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Predictive QP</a>
          <a href="#" className="hover:underline">Summarize Notes</a>
          <a href="#" className="hover:underline">Customize QP</a>
        </div>
        <div className="relative">
          <button onClick={() => setShowDropdown(!showDropdown)}>
            <FaUserCircle className="text-3xl" />
          </button>
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 w-40 p-2 mt-2 bg-white rounded shadow-lg text-black"
              >
                <button className="flex items-center w-full px-2 py-1 hover:bg-gray-100">
                  <FiSettings className="mr-2" /> Settings
                </button>
                <button className="flex items-center w-full px-2 py-1 hover:bg-gray-100">
                  <FiLogOut className="mr-2" /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Main Section */}
      <main className="flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl p-6 text-center border-2 border-dashed rounded-lg border-white/30 bg-white/10">
          <input type="file" onChange={handleFileUpload} className="w-full" />
          <p className="mt-2 text-sm">Drag and drop or click to upload a document</p>
        </div>

        <textarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt here..."
          className="w-full max-w-xl p-4 mt-6 bg-white/10 border border-white/20 rounded-md focus:outline-none"
          rows={4}
        />

        <button
          onClick={handleGenerate}
          className="px-6 py-2 mt-4 font-semibold text-white transition bg-blue-600 rounded hover:bg-blue-700"
        >
          Generate Predictive QP
        </button>

        {generatedQP && (
          <div className="w-full max-w-xl p-4 mt-6 bg-white/10 border border-white/20 rounded-md">
            <h3 className="mb-2 text-lg font-bold">Generated Question Paper</h3>
            <p>{generatedQP}</p>
            <button
              onClick={handleDownload}
              className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-green-600 rounded hover:bg-green-700"
            >
              Download as PDF
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
