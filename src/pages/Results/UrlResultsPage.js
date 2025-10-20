import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Utility to simulate URL safety check
const isUrlMalicious = (url) => {
  const keywords = ['malware', 'phish', 'danger', 'attack', 'hack'];
  return keywords.some((word) => url.toLowerCase().includes(word));
};

export default function UrlResultsPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const newUrl = query.get('value');

  const [urlList, setUrlList] = useState([]);
  const [safeCount, setSafeCount] = useState(0);
  const [maliciousCount, setMaliciousCount] = useState(0);
  const [mostFrequentUrl, setMostFrequentUrl] = useState('');

  // Load stored URLs on mount
  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('scannedUrls')) || [];

  if (newUrl && !stored.includes(newUrl)) {
    const updated = [...stored, newUrl];
    localStorage.setItem('scannedUrls', JSON.stringify(updated));
    setUrlList(updated);
  } else {
    setUrlList(stored);
  }
}, [newUrl]);

  // Analyze URLs
  useEffect(() => {
    const safe = urlList.filter((url) => !isUrlMalicious(url)).length;
    const malicious = urlList.length - safe;
    setSafeCount(safe);
    setMaliciousCount(malicious);

    // Count most frequent URL
    const freqMap = {};
    urlList.forEach((url) => {
      freqMap[url] = (freqMap[url] || 0) + 1;
    });
    const mostFrequent = Object.entries(freqMap).sort((a, b) => b[1] - a[1])[0]?.[0] || '';
    setMostFrequentUrl(mostFrequent);
  }, [urlList]);

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-yellow-700 bg-black/80 backdrop-blur-md shadow-md">
        <div className="flex pt-40 items-center gap-4">
          {/* <div className="text-2xl font-extrabold text-yellow-400 tracking-wider">Threat Eagle</div> */}
          <select
            className="bg-black border border-yellow-500 text-yellow-300 px-3 py-1 rounded-md text-sm focus:outline-none"
            onChange={(e) => {
              const type = e.target.value;
              if (type === 'code') window.location.href = '/scan/code';
              if (type === 'file') window.location.href = '/scan/file';
            }}
          >
            <option value="">Scan another...</option>
            <option value="code">Code</option>
            <option value="file">File</option>
          </select>
        </div>
      </header>

      {/* Page Title */}
      <div className="text-center mt-10 mb-6">
        <h1 className="text-4xl font-bold text-yellow-400 drop-shadow">Scanning URL</h1>
      </div>

      {/* Graph Summary */}
      <div className="grid grid-cols-4 gap-4 px-10 mb-10">
        <div className="bg-yellow-900/10 border border-yellow-600 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-yellow-300">URLs Entered</h2>
          <p className="text-3xl font-bold text-yellow-200 mt-2">{urlList.length}</p>
        </div>
        <div className="bg-green-900/10 border border-green-600 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-green-300">Safe URLs</h2>
          <p className="text-3xl font-bold text-green-200 mt-2">{safeCount}</p>
        </div>
        <div className="bg-red-900/10 border border-red-600 p-4 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-red-300">Malicious URLs</h2>
          <p className="text-3xl font-bold text-red-200 mt-2">{maliciousCount}</p>
        </div>
        <div className="bg-yellow-800/10 border border-yellow-500 p-4 rounded-lg shadow-md text-center col-span-1">
          <h2 className="text-lg font-semibold text-yellow-300">Most Frequent</h2>
          <p className="text-sm mt-2 text-yellow-200 break-words">{mostFrequentUrl || '—'}</p>
        </div>
      </div>

      {/* URL Table */}
      <div className="px-10 pb-20">
        <h2 className="text-2xl font-semibold text-yellow-400 mb-4">Scanned URLs</h2>
        <div className="bg-yellow-900/5 border border-yellow-700 rounded-lg overflow-hidden shadow-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-yellow-800/20 text-yellow-300 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">URL</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {urlList.map((url, index) => (
                <tr key={index} className="border-t border-yellow-800 hover:bg-yellow-800/10">
                  <td className="px-4 py-2 text-yellow-500">{index + 1}</td>
                  <td className="px-4 py-2 text-yellow-100 break-all">{url}</td>
                  <td className="px-4 py-2">
                    {isUrlMalicious(url) ? (
                      <span className="text-red-400 font-semibold">Malicious</span>
                    ) : (
                      <span className="text-green-400 font-semibold">Safe</span>
                    )}
                  </td>
                </tr>
              ))}
              {urlList.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center text-yellow-500 py-6">
                    No URLs scanned yet.
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