import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CodeScanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialCode = query.get('value') || '';

  const [codeInput, setCodeInput] = useState(() => query.get('value') || '');
  const [hasAutoScanned, setHasAutoScanned] = useState(false);
  //eslint-disable-next-line
  const [lastScannedCode, setLastScannedCode] = useState('');
  const [scanResults, setScanResults] = useState(null);
  const [history, setHistory] = useState([]);

  // Load history on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('scannedCodeBlocks')) || [];
    setHistory(stored);
  }, []);

  const [errorMessage, setErrorMessage] = useState('');

const scanCode = (code = codeInput, suppressWarning = false) => {
  if (!code.trim()) return;

  const stored = JSON.parse(localStorage.getItem('scannedCodeBlocks')) || [];
  const isDuplicate = stored.some((entry) => entry.code === code);

  if (isDuplicate) {
    if (suppressWarning || hasAutoScanned) {
      setHasAutoScanned(false); // reset after first use
      return;
    } else {
      setErrorMessage('⚠️ This code has already been scanned.');
      return;
    }
  }

  setErrorMessage('');
  setLastScannedCode(code);

  const suspiciousWords = ['eval', 'exec', 'document.write', 'innerHTML', 'setTimeout', 'fetch', 'XMLHttpRequest'];
  const found = suspiciousWords.filter((word) => code.includes(word));
  const threatLevel = found.length === 0 ? 'Safe' : found.length <= 2 ? 'Moderate' : 'High';

  const result = {
    code,
    length: code.length,
    suspicious: found,
    threat: threatLevel,
  };

  setScanResults(result);

  const updatedHistory = [result, ...stored];
  setHistory(updatedHistory);
  localStorage.setItem('scannedCodeBlocks', JSON.stringify(updatedHistory));
};

useEffect(() => {
  if (initialCode.trim()) {
    const stored = JSON.parse(localStorage.getItem('scannedCodeBlocks')) || [];
    const isDuplicate = stored.some((entry) => entry.code === initialCode);

    if (!isDuplicate) {
      const suspiciousWords = ['eval', 'exec', 'document.write', 'innerHTML', 'setTimeout', 'fetch', 'XMLHttpRequest'];
      const found = suspiciousWords.filter((word) => initialCode.includes(word));
      const threatLevel = found.length === 0 ? 'Safe' : found.length <= 2 ? 'Moderate' : 'High';

      const result = {
        code: initialCode,
        length: initialCode.length,
        suspicious: found,
        threat: threatLevel,
      };

      setScanResults(result);
      const updatedHistory = [result, ...stored];
      setHistory(updatedHistory);
      localStorage.setItem('scannedCodeBlocks', JSON.stringify(updatedHistory));
    }

    setLastScannedCode(initialCode);
    setHasAutoScanned(true);
    setErrorMessage('');
  }
}, [initialCode]);


  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-yellow-700 bg-black/80 backdrop-blur-md shadow-md">
        <div className="flex items-center pt-20 gap-4">
          <button
            onClick={() => navigate('/')}
            className="text-yellow-400 hover:text-yellow-300 transition-transform transform hover:scale-110"
            title="Go Back"
          >
            ←
          </button>
          <div className="text-2xl font-extrabold text-yellow-400 tracking-wider">Threat Eagle</div>
          <select
            className="bg-black border border-yellow-500 text-yellow-300 px-3 py-1 rounded-md text-sm focus:outline-none"
            onChange={(e) => {
              const type = e.target.value;
              if (type === 'url') navigate('/scan/url');
              if (type === 'code') navigate('/scan/code');
              if (type === 'file') navigate('/scan/file');
            }}
          >
            <option value="">Scan another...</option>
            <option value="url">URL</option>
            <option value="code">Code</option>
            <option value="file">File</option>
          </select>
        </div>
      </header>

      {/* Page Title */}
      <div className="text-center mt-10 mb-6">
        <h1 className="text-4xl font-bold text-yellow-400 drop-shadow">Scanning Code</h1>
      </div>

      {/* Code Input */}
      <div className="px-10 mb-6">
        <textarea
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          placeholder="Paste your code here..."
          className="w-full h-40 bg-black border-2 border-yellow-600 rounded-lg p-4 text-yellow-200 font-mono text-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
        />
        {errorMessage && (
        <div className="mt-2 mb-2 text-red-400 font-semibold text-sm">
            {errorMessage}
        </div>
        )}
        <button
          onClick={() => scanCode()}
          className="mt-4 px-6 py-2 rounded-full bg-yellow-400 text-black font-bold text-sm shadow-lg border-2 border-yellow-500 hover:border-yellow-300 hover:scale-105 transition-all"
        >
          Scan Code
        </button>
      </div>

      {/* Scan Results */}
      {scanResults && (
        <div className="px-10 mb-10">
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Scan Results</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-yellow-900/10 border border-yellow-600 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Code Length</h3>
              <p className="text-3xl font-bold text-yellow-200 mt-2">{scanResults.length} chars</p>
            </div>
            <div className="bg-yellow-900/10 border border-yellow-600 p-4 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">Suspicious Keywords</h3>
              <p className="mt-2 text-yellow-200">{scanResults.suspicious.join(', ') || 'None'}</p>
            </div>
            <div className={`p-4 rounded-lg shadow-md text-center ${
              scanResults.threat === 'Safe'
                ? 'bg-green-900/10 border border-green-600'
                : scanResults.threat === 'Moderate'
                ? 'bg-yellow-900/10 border border-yellow-600'
                : 'bg-red-900/10 border border-red-600'
            }`}>
              <h3 className="text-lg font-semibold">Threat Level</h3>
              <p className="text-2xl font-bold mt-2">
                {scanResults.threat}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* History Table */}
      <div className="px-10 pb-20">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Scanned Code History</h2>
        <div className="bg-yellow-900/5 border border-yellow-700 rounded-lg overflow-hidden shadow-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-yellow-800/20 text-yellow-300 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Snippet</th>
                <th className="px-4 py-2">Threat</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index} className="border-t border-yellow-800 hover:bg-yellow-800/10">
                  <td className="px-4 py-2 text-yellow-500">{index + 1}</td>
                  <td className="px-4 py-2 text-yellow-100 break-all max-w-[600px]">{entry.code.slice(0, 100)}...</td>
                  <td className="px-4 py-2 font-semibold text-center">
                    {entry.threat === 'Safe' ? (
                      <span className="text-green-400">Safe</span>
                    ) : entry.threat === 'Moderate' ? (
                      <span className="text-yellow-400">Moderate</span>
                    ) : (
                      <span className="text-red-400">High</span>
                    )}
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-yellow-500 py-6">
                    No code scanned yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}