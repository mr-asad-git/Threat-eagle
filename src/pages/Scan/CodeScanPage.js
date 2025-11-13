import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CodeScanPage() {
  const navigate = useNavigate();
  const location = useLocation();
  // Accept scanResult and fileName from location.state (from upload)
  const scanResult = location.state?.scanResult || null;
  const fileName = location.state?.fileName || '';
  const [activeSource, setActiveSource] = useState('bandit');
  const [loading, setLoading] = useState(false);
  // Meta info toggle for semgrep
  const [showMeta, setShowMeta] = useState(false);

  // File info extraction
  const fileInfo = scanResult ? {
    name: fileName,
    type: fileName.split('.').pop(),
    size: scanResult.bandit?.scanned_file ? null : null, // Could be passed in state if needed
    scanned_file: scanResult.bandit?.scanned_file || scanResult.semgrep?.scanned_file || '',
    scanDate: new Date().toLocaleString(),
    sources: Object.keys(scanResult).length,
  } : null;

  // Tab sources
  const sources = scanResult ? Object.keys(scanResult) : [];

  // Helper to render issues/results for each source
  const renderSourceResults = (source, showMeta, setShowMeta) => {
    if (!scanResult || !scanResult[source]) return <div className="text-yellow-400">No data for {source}</div>;
    if (source === 'bandit') {
      const bandit = scanResult.bandit;
      if (bandit.error) return <div className="text-red-400">Error: {bandit.error}</div>;
      if (!bandit.issues || bandit.issues.length === 0) return <div className="text-green-400">No issues found.</div>;
      // Filter unique test_id issues
      const uniqueIssues = [];
      const seenTestIds = new Set();
      for (const issue of bandit.issues) {
        if (!seenTestIds.has(issue.test_id)) {
          uniqueIssues.push(issue);
          seenTestIds.add(issue.test_id);
        }
      }
      return (
        <div>
          <div className="text-yellow-300 mb-3">Total Issues: {uniqueIssues.length}</div>
          <table className="w-full text-sm border border-yellow-700 rounded-lg overflow-hidden mb-4">
            <thead className="bg-yellow-800/20">
              <tr>
                <th className="px-2 py-2 text-center">Test ID</th>
                <th className="px-2 py-2 text-center">Issue</th>
                <th className="px-2 py-2 text-center">Severity</th>
              </tr>
            </thead>
            <tbody>
              {uniqueIssues.map((issue, idx) => {
                let sevColor = 'text-yellow-300';
                if (issue.severity?.toLowerCase() === 'low') sevColor = 'text-green-400';
                if (issue.severity?.toLowerCase() === 'medium') sevColor = 'text-yellow-400';
                if (issue.severity?.toLowerCase() === 'high' || issue.severity?.toLowerCase() === 'critical') sevColor = 'text-red-500 font-bold';
                return (
                  <tr key={idx} className="border-t border-yellow-800 text-center">
                    <td className="px-2 py-2 text-yellow-500 align-middle">{issue.test_id}</td>
                    <td className="px-2 py-2 text-yellow-100 align-middle">{issue.issue_text}</td>
                    <td className={`px-2 py-2 font-semibold align-middle ${sevColor}`}>{issue.severity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    if (source === 'semgrep') {
      const semgrep = scanResult.semgrep;
      if (semgrep.error) return <div className="text-red-400">Error: {semgrep.error}</div>;
      // Support both semgrep.results and semgrep.output.results
      const results = semgrep.output?.results || semgrep.results || [];
      if (!results || results.length === 0) return <div className="text-green-400">No issues found.</div>;
      // Show meta info from first result if present, filtering unwanted keys
      const firstMetaRaw = results[0]?.extra?.metadata;
      const unwantedKeys = ['source', 'shortlink', 'license'];
      const firstMeta = firstMetaRaw
        ? Object.fromEntries(Object.entries(firstMetaRaw).filter(([key]) => !unwantedKeys.includes(key)))
        : undefined;
      // Helper for color coding
      const getColorClass = (field, val) => {
        if (!val) return '';
        const v = String(val).toLowerCase();
        if (field === 'confidence' || field === 'impact' || field === 'likelihood') {
          if (v === 'low') return 'border-green-400 bg-green-900/30 text-green-300';
          if (v === 'medium') return 'border-yellow-400 bg-yellow-900/30 text-yellow-200';
          if (v === 'high') return 'border-orange-400 bg-orange-900/30 text-orange-300';
          if (v === 'critical') return 'border-red-500 bg-red-900/30 text-red-300';
        }
        return '';
      };
      // Highlighted fields
      const highlightFields = ['confidence', 'impact', 'likelihood'];
      return (
        <div>
          {firstMeta && (
            <div className="mb-6">
              <button
                className={`px-4 py-2 rounded font-bold text-yellow-400 bg-black border border-yellow-400 hover:bg-yellow-400 hover:text-black transition mb-2`}
                onClick={() => setShowMeta((prev) => !prev)}
                style={{ outline: 'none' }}
              >
                {showMeta ? 'Hide Meta Information ▲' : 'Show Meta Information ▼'}
              </button>
              {showMeta && (
                <div className="bg-black/80 rounded-xl p-5 mt-2">
                  <div className="font-bold text-lg text-yellow-400 mb-3">Meta Information :</div>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(firstMeta).map(([key, value], i) => {
                      const isHighlight = highlightFields.includes(key.toLowerCase());
                      const colorClass = isHighlight ? getColorClass(key.toLowerCase(), value) : '';
                      return (
                        <div
                          key={i}
                          className={`text-sm font-semibold ${isHighlight ? `border-2 rounded-lg px-2 py-1 font-bold ${colorClass}` : 'text-yellow-200'}`}
                          style={isHighlight ? { boxShadow: '0 0 0 2px #FFD700' } : {}}
                        >
                          <span className={`font-semibold ${isHighlight ? 'text-yellow-100' : 'text-yellow-400'}`}>{key}:</span> {Array.isArray(value) ? value.join(', ') : String(value)}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="text-yellow-300 mb-3">Total Results: {results.length}</div>
          <table className="w-full text-sm border border-yellow-700 rounded-lg overflow-hidden mb-4">
            <thead className="bg-yellow-800/20">
              <tr>
                <th className="px-2 py-2 text-center">Check ID</th>
                <th className="px-2 py-2 text-center">Message</th>
                <th className="px-2 py-2 text-center">Validation State</th>
                <th className="px-2 py-2 text-center">Line</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => {
                const validationState = result.validation_state || result.extra?.validation_state || '--';
                let valColor = 'text-yellow-300';
                if (validationState?.toLowerCase() === 'no_validator') valColor = 'text-red-500 font-bold';
                if (validationState?.toLowerCase() === 'valid') valColor = 'text-green-400 font-bold';
                const message = result.extra?.message || result.message || '';
                return (
                  <tr key={idx} className="border-t border-yellow-800 text-center">
                    <td className="px-2 py-2 text-yellow-500 align-middle">{result.check_id}</td>
                    <td className="px-2 py-2 text-yellow-100 align-middle">{message}</td>
                    <td className={`px-2 py-2 font-semibold align-middle ${valColor}`}>{validationState}</td>
                    <td className="px-2 py-2 text-yellow-200 align-middle">{result.start?.line || result.end?.line || ''}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }
    return <div className="text-yellow-400">No renderer for {source}</div>;
  };

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono pt-16">
      {/* Main Container */}
      <div className="max-w-8xl mx-auto bg-black/90 rounded-3xl shadow-2xl  p-10 flex flex-col gap-8">
        {/* File Info Section */}
        {fileInfo && (
          <div className="flex flex-row gap-8 items-start mb-2">
            <div className="flex-1 bg-black rounded-xl p-6 shadow border-2 border-yellow-400 flex flex-col gap-2 min-h-[120px]" style={{ borderRadius: '16px' }}>
              <div className="font-bold text-yellow-400 text-2xl mb-5" style={{ fontFamily: 'monospace' }}>File Details</div>
              <div className="flex flex-row gap-20">
                <div className="flex flex-col gap-2">
                  <div><span className="font-bold text-yellow-400">Name:</span> <span className="text-yellow-200 font-mono">{fileInfo.name}</span></div>
                  <div><span className="font-bold text-yellow-400">Size:</span> <span className="text-yellow-200 font-mono">{fileInfo.size ? fileInfo.size : '--'}</span></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div><span className="font-bold text-yellow-400">Type:</span> <span className="text-yellow-200 font-mono">{fileInfo.type ? fileInfo.type.toUpperCase() : '--'}</span></div>
                  <div><span className="font-bold text-yellow-400">Scanning Date:</span> <span className="text-yellow-200 font-mono">{fileInfo.scanDate}</span></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center min-w-[260px] bg-yellow-500 rounded-xl p-6 shadow ">
              <div className="font-bold text-black text-2xl mb-2 tracking-wide" style={{ fontFamily: 'monospace' }}>Total Scanners</div>
              <div className="text-black text-5xl font-extrabold mb-2 drop-shadow-lg">{fileInfo.sources}</div>
              <div className="text-black text-sm font-mono opacity-80">({sources.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(', ')})</div>
            </div>
          </div>
        )}

        {/* Tabs and Results Section */}
        {sources.length > 0 && (
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex flex-row gap-2 items-end mb-2">
              {sources.map((src) => (
                <button
                  key={src}
                  onClick={() => setActiveSource(src)}
                  className={`px-6 py-2 font-bold text-base rounded-t-md border-b-2 transition-all duration-200
                    ${activeSource === src
                      ? 'bg-yellow-400 text-black border-yellow-400'
                      : 'bg-black text-yellow-400 border-transparent hover:bg-yellow-400 hover:text-black hover:border-yellow-400'}
                  `}
                  style={{ outline: 'none', minWidth: '140px' }}
                >
                  {src.charAt(0).toUpperCase() + src.slice(1)}
                </button>
              ))}
            </div>
            <div className="bg-black rounded-b-xl shadow-xl border-2 border-yellow-400 p-6">
              {renderSourceResults(activeSource, showMeta, setShowMeta)}
            </div>
          </div>
        )}

        {!scanResult && (
          <div className="text-center mt-20 text-yellow-400 text-xl">No scan results available. Please upload and scan a code file.</div>
        )}
      </div>
    </div>
  );
}
