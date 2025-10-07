import React, { useState } from 'react';
import Header from '../../components/Header';
import './ScanPageStyling.css';

export default function ScanPage() {
  const [activeType, setActiveType] = useState('URL');
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scanSteps, setScanSteps] = useState([]);
  const [scanResult, setScanResult] = useState(null);

  const scanMessages = [
    '🔍 Processing the input...',
    '⚙️ Configuring files...',
    '🧠 Analyzing risks...',
    '🧬 Performing algorithms...',
    '🛡️ Finalizing threat report...',
  ];

  const handleScan = () => {
    if (!inputValue || inputValue.length > 5000) return;

    setIsLoading(true);
    setScanSteps([]);
    setScanResult(null);

    let step = 0;
    const interval = setInterval(() => {
      setScanSteps([scanMessages[step]]);
      step++;
      if (step === scanMessages.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setScanResult({
            status: 'Safe',
            summary: `No critical vulnerabilities found in the ${activeType.toLowerCase()} input.`,
          });
        }, 1000);
      }
    }, 1200);
  };

  return (
    <div className="bg-[#0a0a0a] pb-[2rem] min-h-screen text-yellow-300 pt-24 px-8">
      <Header />
      <div className="text-center mb-10">
        <h2 style={{ fontFamily: 'Saira Stencil One' }} className="text-6xl font-bold mb-2">🧪 Threat Scanner</h2>
        <p className="text-white max-w-2xl mx-auto">
          Paste a URL, code snippet, or upload a file to simulate a vulnerability scan. This tool mimics real-time analysis with animated feedback.
        </p>
      </div>

      {/* Scan Module */}
      <div className="flex justify-center mb-10">
        <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 w-[672px] text-center shadow-lg">
          {/* Connected Buttons Row */}
          <div className="flex justify-between mb-4">
            {['URL', 'Code', 'File'].map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`flex-1 mx-1 px-4 py-2 rounded-3xl font-semibold transition-all duration-300 ${
                  activeType === type
                    ? 'bg-yellow-400 text-black shadow-[0_0_10px_#ff0] hover:bg-yellow-500 hover:shadow-[0_0_20px_#ff0]'
                    : 'bg-gray-800 text-yellow-300 border border-yellow-500 hover:bg-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="mt-2">
            {activeType === 'File' ? (
              <input
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file && file.size < 5000) {
                    setInputValue(file.name);
                  } else {
                    alert('File must be under 5KB');
                  }
                }}
                className="w-full bg-gray-900 text-yellow-300 border border-yellow-500 px-4 py-2 rounded-lg"
              />
            ) : (
              <textarea
                rows={3}
                placeholder={`Paste your ${activeType.toLowerCase()} here...`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-[10rem] bg-gray-900 text-yellow-300 border border-yellow-500 px-4 py-2 rounded-lg"
              />
            )}
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            className="mt-4 w-full bg-yellow-400 text-black font-bold px-6 py-2 rounded-3xl shadow-[0_0_10px_#ff0] hover:bg-yellow-500 hover:shadow-[0_0_20px_#ff0] transition-all duration-300"
          >
            🚀 Start Scan
          </button>
        </div>
      </div>

      {/* Loader Feedback */}
      {isLoading && (
        <div className="flex justify-center mb-10">
          <div className="bg-gray-900 border border-yellow-500 rounded-xl p-6 w-[672px] text-center text-yellow-300 font-semibold animate-fade-step">
            {scanSteps.length > 0 && scanSteps[scanSteps.length - 1]}
          </div>
        </div>
      )}

      {/* Scan Result */}
      {scanResult && (
        <div className="flex justify-center mb-10">
          <div className="bg-gray-900 border border-green-500 rounded-xl p-6 w-[672px] text-center transition-all duration-700 animate-fade-in">
            <h3 className="text-green-400 text-2xl font-bold mb-2">✅ Scan Complete</h3>
            <p className="text-yellow-300">{scanResult.summary}</p>
          </div>
        </div>
      )}

    </div>
  );
}