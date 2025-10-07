// InputSelector.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const inputOptions = [
  {
    type: 'URL',
    placeholder: 'Enter a URL to scan for threats...',
  },
  {
    type: 'Code',
    placeholder: 'Paste your code snippet here...',
  },
  {
    type: 'File',
    placeholder: 'Upload a file to analyze...',
  },
];

const glitchVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  exit: { opacity: 0, scale: 0.95 },
};

const InputSelector = () => {
  const [selected, setSelected] = useState(null);

  const handleSelect = (option) => {
    if (selected?.type === option.type) {
      setSelected(null); // Toggle off if same button is clicked
    } else {
      setSelected(option);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 text-yellow-300">
      {/* Option Buttons */}
      <div className="flex justify-center gap-6 mb-6">
        {inputOptions.map((option) => (
          <button
            key={option.type}
            onClick={() => handleSelect(option)}
            className={`px-6 py-2 rounded-full border transition duration-300 ease-in-out font-semibold
              ${
                selected?.type === option.type
                  ? 'bg-black border-yellow-400 text-yellow-300 shadow-[0_0_10px_#ff0]'
                  : 'bg-black border-gray-600 text-gray-400 hover:border-yellow-400 hover:text-yellow-300'
              }`}
          >
            {option.type}
          </button>
        ))}
      </div>

      {/* Input Field with Glitch Transition */}
      <div className="relative min-h-[180px]">
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.type}
              variants={glitchVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full"
            >
              {selected.type === 'File' ? (
                <label
                    htmlFor="file-upload"
                    className="block w-full p-4 bg-black text-yellow-300 border border-yellow-500 rounded-lg cursor-pointer
                      shadow-[0_0_5px_#ff0] hover:shadow-[0_0_15px_#ff0] transition-all duration-300 ease-in-out
                      hover:text-yellow-100 hover:border-yellow-300"
                  >
                    📁 Choose a file to scan
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                    />
                  </label>
              ) : (
                <textarea
                  placeholder={selected.placeholder}
                  className="w-full h-40 p-4 bg-black text-yellow-300 border border-yellow-500 rounded-lg resize-none"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InputSelector;