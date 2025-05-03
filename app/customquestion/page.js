'use client'
import React, { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  XMarkIcon,
  PlusIcon,
  PrinterIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/solid';
import { PhotoIcon } from '@heroicons/react/24/outline';
import html2pdf from 'html2pdf.js';

export default function CustomizeQP() {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    setBlocks([{ id: Date.now(), content: '', color: '#000000', alignment: 'left', fontSize: '16px', mcqOptions: [] }]);
  }, []);

  const addBlock = () => {
    setBlocks([...blocks, { id: Date.now(), content: '', color: '#000000', alignment: 'left', fontSize: '16px', mcqOptions: [] }]);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter((block) => block.id !== id));
  };

  const updateBlock = (id, newContent, color, alignment, fontSize) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id
          ? { ...block, content: newContent, color, alignment, fontSize }
          : block
      )
    );
  };

  const handleColorChange = (id, color) => {
    setBlocks(
      blocks.map((block) =>
        block.id === id ? { ...block, color } : block
      )
    );
  };

  const applyStyle = (command) => {
    document.execCommand(command, false, null);
  };

  const handleAlignment = (id, alignment) => {
    updateBlock(id, blocks.find(b => b.id === id).content, blocks.find(b => b.id === id).color, alignment, blocks.find(b => b.id === id).fontSize);
  };

  const handleFontSizeChange = (id, fontSize) => {
    updateBlock(id, blocks.find(b => b.id === id).content, blocks.find(b => b.id === id).color, blocks.find(b => b.id === id).alignment, fontSize);
  };

  const addMCQOption = (blockId) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              mcqOptions: [...block.mcqOptions, { id: Date.now(), text: '', isCorrect: false }],
            }
          : block
      )
    );
  };

  const handleMCQOptionChange = (blockId, optionId, text) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              mcqOptions: block.mcqOptions.map((option) =>
                option.id === optionId ? { ...option, text } : option
              ),
            }
          : block
      )
    );
  };

  const handleMCQCorrectAnswer = (blockId, optionId) => {
    setBlocks(
      blocks.map((block) =>
        block.id === blockId
          ? {
              ...block,
              mcqOptions: block.mcqOptions.map((option) =>
                option.id === optionId ? { ...option, isCorrect: true } : { ...option, isCorrect: false }
              ),
            }
          : block
      )
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('question-paper');
    html2pdf().from(element).save('customized_question_paper.pdf');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <nav className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5 backdrop-blur-md shadow-md">
        <div className="text-xl font-bold text-cyan-300">NextQ</div>
        <div className="space-x-6 hidden md:flex text-gray-200">
          <a href="#" className="hover:text-cyan-400">Home</a>
          <a href="#" className="hover:text-cyan-400">Predictive QP</a>
          <a href="#" className="hover:text-cyan-400">Summarize Notes</a>
          <a href="#" className="hover:text-cyan-400">Customize QP</a>
        </div>
        <UserCircleIcon className="w-8 h-8 text-cyan-300" />
      </nav>

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center text-cyan-300 mb-6">Customized Question Paper</h2>

        <div id="question-paper" className="mb-6">
          {blocks.map((block) => (
            <div key={block.id} className="relative bg-white/10 backdrop-blur-sm p-4 rounded-md mb-6 shadow-md">
              <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                <button onClick={() => applyStyle('bold')} className="hover:text-cyan-300 font-bold">B</button>
                <button onClick={() => applyStyle('italic')} className="hover:text-cyan-300 italic">I</button>
                <button onClick={() => applyStyle('underline')} className="hover:text-cyan-300 underline">U</button>
                <button onClick={() => applyStyle('superscript')} className="hover:text-cyan-300">X<sup>2</sup></button>
                <button onClick={() => applyStyle('subscript')} className="hover:text-cyan-300">X<sub>2</sub></button>
                <label className="hover:text-cyan-300 cursor-pointer flex items-center gap-1">
                  <PhotoIcon className="w-4 h-4" />
                  <input type="file" accept="image/*" className="hidden" />
                </label>
                <input
                  type="color"
                  value={block.color}
                  onChange={(e) => handleColorChange(block.id, e.target.value)}
                  className="w-6 h-6 border-none bg-transparent"
                />
                <button onClick={() => handleAlignment(block.id, 'left')} className="hover:text-cyan-300">Left</button>
                <button onClick={() => handleAlignment(block.id, 'center')} className="hover:text-cyan-300">Center</button>
                <button onClick={() => handleAlignment(block.id, 'right')} className="hover:text-cyan-300">Right</button>
                <select
                  value={block.fontSize}
                  onChange={(e) => handleFontSizeChange(block.id, e.target.value)}
                  className="text-sm px-2 py-1 border rounded"
                >
                  <option value="12px">12px</option>
                  <option value="16px">16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                  <option value="24px">24px</option>
                </select>
                <button
                  onClick={() => addMCQOption(block.id)}
                  className="hover:text-cyan-300 px-2 py-1 border rounded text-xs"
                >
                  Add MCQ Option
                </button>
              </div>

              <div
                id={`block-${block.id}`}
                className="w-full p-3 text-black rounded-md min-h-[120px] resize-none border bg-white"
                contentEditable
                style={{
                  color: block.color,
                  textAlign: block.alignment,
                  fontSize: block.fontSize
                }}
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  updateBlock(block.id, e.target.innerHTML, block.color, block.alignment, block.fontSize)
                }
                dangerouslySetInnerHTML={{ __html: block.content }}
              />

              {block.mcqOptions.length > 0 && (
                <div className="mt-4">
                  {block.mcqOptions.map((option) => (
                    <div key={option.id} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`mcq-${block.id}`}
                        checked={option.isCorrect}
                        onChange={() => handleMCQCorrectAnswer(block.id, option.id)}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleMCQOptionChange(block.id, option.id, e.target.value)}
                        className="flex-1 p-2 border rounded"
                        placeholder="MCQ option"
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => removeBlock(block.id)}
                className="absolute top-2 right-2 text-red-500"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={addBlock}
            className="flex items-center gap-2 px-4 py-2 bg-cyan-500 rounded-md hover:bg-cyan-600"
          >
            <PlusIcon className="w-5 h-5" />
            Add Block
          </button>
          <div className="flex space-x-4">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 rounded-md hover:bg-green-600"
            >
              <PrinterIcon className="w-5 h-5" />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
