import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-yellow-300 py-6 border-t border-yellow-500 shadow-inner">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-sm">
        <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} Threat Eagle. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}