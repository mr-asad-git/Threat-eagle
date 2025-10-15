import React, { useEffect, useState } from 'react';

export default function FloatingButtons({ toggleTheme }) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="bg-yellow-500 text-black px-4 py-3 rounded-full shadow-lg hover:bg-yellow-400 transition-all"
        >
          ⬆️ Top
        </button>
      )}
      <button
        onClick={toggleTheme}
        className="bg-gray-900 text-yellow-300 px-4 py-3 rounded-full shadow-lg hover:bg-yellow-600 transition-all"
      >
        🎨 Theme
      </button>
    </div>
  );
}