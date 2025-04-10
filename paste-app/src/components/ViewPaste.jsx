// ViewPaste.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiCopy } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <div className="text-red-500 p-4">Paste not found.</div>;
  }

  function copyContent() {
    navigator.clipboard.writeText(paste.content);
    toast.success('Content copied!');
  }

  return (
    <div className="px-4 py-10 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Toaster position="top-center" />

      <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Title Input */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <input
            className="w-220 p-4 rounded-md bg-amber-200 dark:bg-amber-400 text-gray-800 font-semibold text-xl"
            value={paste.title}
            readOnly
          />
        </div>

        {/* Paste Content */}
        <div className="relative">
          <textarea
            className="w-full h-[600px] p-6 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-mono text-base resize-none"
            value={paste.content}
            readOnly
          />
          <FiCopy
            onClick={copyContent}
            className="absolute top-5 right-5 text-gray-600 dark:text-gray-300 text-2xl cursor-pointer hover:text-green-500 transition"
            title="Copy to clipboard"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
