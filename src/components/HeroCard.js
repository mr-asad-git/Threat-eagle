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
  const [selected, setSelected] = useState(inputOptions[0]);

  const handleSelect = (option) => {
    if (selected?.type === option.type) {
      setSelected(null); // Toggle off if same button is clicked
    } else {
      setSelected(option);
    }
  };

  return (
    <div className="max-w-2xl mx-auto  text-yellow-300">
      <div className=" rounded-3xl shadow-2xl p-8 ">
        {/* Option Buttons */}
        <div className="flex justify-center gap-4  mb-8">
          {inputOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => handleSelect(option)}
              className={`px-5 py-1 rounded-full border-2 font-semibold text-sm tracking-wide transition-all duration-300 ease-in-out shadow-lg focus:outline-none relative overflow-hidden
                ${
                  selected?.type === option.type
                    ? 'bg-yellow-400 text-black border-yellow-400 shadow-yellow-400/40 scale-105'
                    : 'bg-black/80 text-yellow-300 border-yellow-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105'
                }`}
            >
              {option.type}
            </button>
          ))}
        </div>

        <div className="relative min-h-[80px]">
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
        <form className={`${selected?.type === 'Code' ? 'flex flex-col gap-2 w-full' : 'flex items-center gap-2 w-full'}`}>
          {selected.type === 'File' ? (
                      <label
                        htmlFor="file-upload"
                        className="flex items-center w-full h-10 p-2 text-yellow-400 border-2 border-transparent rounded-xl cursor-pointer shadow-lg bg-yellow-600 backdrop-blur-md transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-yellow-400"
                      >
                        <span className="truncate flex-1 text-center font-semibold tracking-wide text-yellow-200 drop-shadow">Choose a file to scan</span>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    ) : selected.type === 'Code' ? (
                      <>
                        <textarea
                          placeholder={selected.placeholder}
                          className="w-full h-32 p-2  text-yellow-300 border-2 border-yellow-400 rounded-xl shadow-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 bg-transparent resize-none"
                        />
                        <button type="submit" className="mt-2 w-full px-3 py-2 rounded-md bg-yellow-400 text-black font-bold text-xs shadow-lg transition-all duration-300 border-2 border-yellow-400 hover:border-yellow-500 focus:outline-none">
                          Scan
                        </button>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          placeholder={selected.placeholder}
                          className="w-full h-10 p-2 text-yellow-300 border-2 border-yellow-400 rounded-xl  focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 bg-transparent"
                        />
                        <button type="submit" className="px-3 py-2 rounded-md bg-yellow-400 text-black font-bold text-xs shadow-lg transition-all duration-300 border-2 border-yellow-400 hover:border-yellow-500 focus:outline-none">
                          Scan
                        </button>
                      </>
                    )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default InputSelector;