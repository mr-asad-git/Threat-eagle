import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function FileScanPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [fileInfo, setFileInfo] = useState(null);
  const [results, setResults] = useState([]);

  const statsRef = useRef({ scanned: 0, safe: 0, corrupted: 0 });
  const historyRef = useRef([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const name = query.get('name');
    const size = query.get('size');
    const type = query.get('type');
    const modified = query.get('modified');

    if (name && size) {
      const fileData = {
        name,
        size: formatBytes(Number(size)),
        type: type || 'Unknown',
        modified: modified ? new Date(Number(modified)).toLocaleString() : 'Unknown',
        id: Math.floor(Math.random() * 999999),
        checksum: generateChecksum(name + size + modified),
      };

      setFileInfo(fileData);

      setTimeout(() => {
        const isCorrupted = Math.random() < 0.5;

        statsRef.current.scanned += 1;
        statsRef.current.safe += isCorrupted ? 0 : 1;
        statsRef.current.corrupted += isCorrupted ? 1 : 0;

        const mockResults = isCorrupted
          ? [
              { pattern: 'eval()', line: 42, severity: 'High' },
              { pattern: 'innerHTML', line: 88, severity: 'Moderate' },
              { pattern: 'setTimeout()', line: 120, severity: 'Moderate' },
            ]
          : [];

        setResults(mockResults);

        historyRef.current.push({
          name: fileData.name,
          status: isCorrupted ? 'Corrupted' : 'Safe',
          time: new Date().toLocaleTimeString(),
        });

        setLoading(false);
      }, 2500);
    } else {
      setLoading(false);
    }
  }, [location.search]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateChecksum = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
  };

  return (
    <div className="min-h-screen px-6 pt-40 py-10 bg-black text-yellow-300 font-mono">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
          🧾 FILE SCAN DASHBOARD
        </h1>

        {/* Stats Panel */}
        <div className="grid grid-cols-3 gap-4 mb-10 text-center">
          <div className="bg-black/40 border-2 border-yellow-500 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold text-yellow-300">Files Scanned</h2>
            <p className="text-2xl font-bold text-yellow-400 mt-2">{statsRef.current.scanned}</p>
          </div>
          <div className="bg-black/40 border-2 border-green-500 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold text-green-300">Files Safe</h2>
            <p className="text-2xl font-bold text-green-400 mt-2">{statsRef.current.safe}</p>
          </div>
          <div className="bg-black/40 border-2 border-red-500 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-bold text-red-300">Files Corrupted</h2>
            <p className="text-2xl font-bold text-red-400 mt-2">{statsRef.current.corrupted}</p>
          </div>
        </div>

        {/* Loader or Results */}
        {loading ? (
          <div className="text-center mt-20">
            <div className="animate-pulse text-yellow-300 text-xl">
              ⚡ Scanning file... please wait...
            </div>
            <div className="mt-4 w-32 h-2 mx-auto bg-yellow-500 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-300 animate-ping"></div>
            </div>
          </div>
        ) : !fileInfo ? (
          <div className="text-center text-yellow-400 mt-10">
            ⚠️ No file data found. Please return to the homepage and select a file.
          </div>
        ) : (
          <>
            {/* File Credentials */}
            <div className="bg-black/40 border-2 border-yellow-500 rounded-xl p-6 shadow-xl mb-10">
              <h2 className="text-xl font-bold text-yellow-200 mb-4 tracking-wide">📄 File Credentials</h2>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><span className="text-yellow-400 font-semibold">Name:</span> {fileInfo.name}</p>
                <p><span className="text-yellow-400 font-semibold">Size:</span> {fileInfo.size}</p>
                <p><span className="text-yellow-400 font-semibold">Type:</span> {fileInfo.type}</p>
                <p><span className="text-yellow-400 font-semibold">Last Modified:</span> {fileInfo.modified}</p>
                <p><span className="text-yellow-400 font-semibold">File ID:</span> #{fileInfo.id}</p>
                <p><span className="text-yellow-400 font-semibold">Checksum:</span> {fileInfo.checksum}</p>
              </div>
            </div>

            {/* Threat Matrix */}
            <div className="bg-black/30 border border-yellow-500 rounded-lg p-4">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">📊 Threat Matrix</h3>
              {results.length === 0 ? (
                <p className="text-green-400 font-semibold">✅ No threats detected. File is safe.</p>
              ) : (
                <table className="w-full text-sm border-collapse border border-yellow-500">
                  <thead className="bg-yellow-500 text-black">
                    <tr>
                      <th className="p-2 border border-yellow-400">#</th>
                      <th className="p-2 border border-yellow-400">Pattern</th>
                      <th className="p-2 border border-yellow-400">Line</th>
                      <th className="p-2 border border-yellow-400">Severity</th>
                    </tr>
                  </thead>
                  <tbody className="bg-black/20 text-yellow-200">
                    {results.map((r, i) => (
                      <tr key={i}>
                        <td className="p-2 border border-yellow-500">{i + 1}</td>
                        <td className="p-2 border border-yellow-500">{r.pattern}</td>
                        <td className="p-2 border border-yellow-500">Line {r.line}</td>
                        <td className={`p-2 border border-yellow-500 ${
                          r.severity === 'High' ? 'text-red-400' : 'text-yellow-300'
                        }`}>{r.severity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Scan History */}
            <div className="bg-black/30 border border-yellow-500 rounded-lg p-4 mt-8">
              <h3 className="text-xl font-bold text-yellow-300 mb-3">📁 Scan History</h3>
              {historyRef.current.length === 0 ? (
                <p className="text-yellow-400">No files scanned yet.</p>
              ) : (
                <table className="w-full text-sm border-collapse border border-yellow-500">
                  <thead className="bg-yellow-500 text-black">
                    <tr>
                      <th className="p-2 border border-yellow-400">#</th>
                      <th className="p-2 border border-yellow-400">File Name</th>
                      <th className="p-2 border border-yellow-400">Status</th>
                      <th className="p-2 border border-yellow-400">Time</th>
                    </tr>
                  </thead>
                                    <tbody className="bg-black/20 text-yellow-200">
                    {historyRef.current.map((entry, i) => (
                      <tr key={i}>
                        <td className="p-2 border border-yellow-500">{i + 1}</td>
                        <td className="p-2 border border-yellow-500">{entry.name}</td>
                        <td className={`p-2 border border-yellow-500 ${
                          entry.status === 'Corrupted' ? 'text-red-400' : 'text-green-400'
                        }`}>{entry.status}</td>
                        <td className="p-2 border border-yellow-500">{entry.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}