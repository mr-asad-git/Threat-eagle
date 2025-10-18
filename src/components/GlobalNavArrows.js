import React from 'react';

export default function GlobalNavArrows() {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex gap-8">
      {/* Back Arrow */}
      <button
        onClick={() => window.history.back()}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-black border-2 border-yellow-500 shadow-yellow-500/40 shadow-lg hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300 ease-in-out"
        title="Go Back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Forward Arrow */}
      <button
        onClick={() => window.history.forward()}
        className="w-16 h-16 flex items-center justify-center rounded-full bg-black border-2 border-yellow-500 shadow-yellow-500/40 shadow-lg hover:shadow-yellow-400/60 hover:scale-105 transition-all duration-300 ease-in-out"
        title="Go Forward"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8 text-yellow-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}