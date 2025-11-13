import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function FileScanPage() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [fileInfo, setFileInfo] = useState(null);
  const [results, setResults] = useState([]);
  const [activeSource, setActiveSource] = useState('virustotal');

  const statsRef = useRef({ scanned: 0, safe: 0, corrupted: 0 });
  const historyRef = useRef([]);

  useEffect(() => {
    // Show loader only when scan is in progress
    let scanResult = location.state?.scanResult;
    let fileName = location.state?.fileName;
    if (!scanResult || !fileName) {
      setLoading(true);
      return;
    }
    setLoading(false);
    let fileSize =
      scanResult.virustotal_result?.meta?.file_info?.size ??
      scanResult.virustotal_result?.report?.meta?.file_info?.size ??
      scanResult.virustotal_result?.report?.data?.meta?.file_info?.size ??
      scanResult.virustotal_result?.report?.data?.attributes?.size ??
      scanResult.size;
    let formattedSize = 'Unknown';
    if (typeof fileSize === 'number') {
      if (fileSize >= 1024 * 1024) {
        formattedSize = (fileSize / (1024 * 1024)).toFixed(2) + ' MB';
      } else {
        formattedSize = (fileSize / 1024).toFixed(2) + ' KB';
      }
    }
    let extMatch = fileName.match(/\.([a-zA-Z0-9]+)$/);
    let fileType = extMatch ? extMatch[1].toUpperCase() : 'Unknown';
    let today = new Date().toLocaleString();
    setFileInfo({
      name: fileName,
      size: formattedSize,
      type: fileType,
      modified: today,
      id: scanResult.id || Math.floor(Math.random() * 999999),
      checksum: scanResult.checksum || generateChecksum(fileName + (fileSize || '')),
    });
    setResults(scanResult.threats || []);
    statsRef.current.scanned += 1;
    statsRef.current.safe += scanResult.status === 'Safe' ? 1 : 0;
    statsRef.current.corrupted += scanResult.status === 'Corrupted' ? 1 : 0;
    historyRef.current.push({
      name: fileName,
      status: scanResult.status || (scanResult.threats?.length ? 'Corrupted' : 'Safe'),
      time: new Date().toLocaleTimeString(),
    });
  }, [location.state]);

  function formatScanDate(dateStr) {
    // dateStr: "20251018"
    if (!dateStr || dateStr.length !== 8) return dateStr;
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${year}-${month}-${day}`;
  }

  const generateChecksum = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
  };

  return (
    <div className="min-h-screen h-full px-6 pt-10 py-10 bg-black text-yellow-300 font-mono">
      <div className="max-w-8xl mx-auto bg-black p-6">

        {loading ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <Loader2 className="animate-spin text-yellow-400" size={64} />
            <div className="mt-6 text-yellow-300 text-xl font-bold">Scanning file... please wait...</div>
          </div>
        ) : !fileInfo ? (
          <div className="text-center text-yellow-400 mt-10">
            ⚠️ No file data found. Please return to the homepage and select a file.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 mt-10 gap-8 mb-10">
              <div className="bg-black border-2 border-yellow-500 rounded-lg   p-6 shadow-xl col-span-3 w-full">
                <h2 className="text-xl font-bold text-yellow-200 mb-4 tracking-wide">File Details</h2>
                <div className="grid grid-cols-[2fr_3fr] gap-32 w-full text-sm">
                  <div>
                    <p className="truncate w-full"><span className="text-yellow-400 font-semibold">Name:</span> {fileInfo.name}</p>
                    <p className="mt-4"><span className="text-yellow-400 font-semibold">Size:</span> {fileInfo.size}</p>
                  </div>
                  <div>
                    <p className="mb-4"><span className="text-yellow-400 font-semibold">Type:</span> {fileInfo.type}</p>
                    <p><span className="text-yellow-400 font-semibold">Scanning Date:</span> {fileInfo.modified}</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500 border-2 border-yellow-500 rounded-lg p-6 shadow-md flex flex-col items-center justify-center col-span-1">
                <h3 className="text-lg font-extrabold text-black mb-2">Total Scanners</h3>
                <p className="text-3xl font-extrabold text-black">{
                  [
                    location.state?.scanResult?.virustotal_result,
                    location.state?.scanResult?.hybrid_analysis_result,
                    location.state?.scanResult?.olevba_result
                  ].filter(Boolean).length
                }</p>
                <div className="text-xs text-black mt-2">(VirusTotal, Hybrid Analysis, OLEVBA)</div>
              </div>
            </div>

            {/* Scanner Tabs Section */}
            {location.state?.scanResult && (
              <>
                {/* Tabs for scanners */}
                <div className="flex gap-2 mb-6">
                  <button
                    className={`px-4 py-2 rounded-t-lg font-bold text-sm border-b-2 transition-all duration-200 focus:outline-none ${activeSource === 'virustotal' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-black text-yellow-300 border-yellow-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400'}`}
                    onClick={() => setActiveSource('virustotal')}
                  >VirusTotal</button>
                  <button
                    className={`px-4 py-2 rounded-t-lg font-bold text-sm border-b-2 transition-all duration-200 focus:outline-none ${activeSource === 'hybrid' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-black text-yellow-300 border-yellow-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400'}`}
                    onClick={() => setActiveSource('hybrid')}
                  >Hybrid Analysis</button>
                  <button
                    className={`px-4 py-2 rounded-t-lg font-bold text-sm border-b-2 transition-all duration-200 focus:outline-none ${activeSource === 'olevba' ? 'bg-yellow-400 text-black border-yellow-400' : 'bg-black text-yellow-300 border-yellow-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400'}`}
                    onClick={() => setActiveSource('olevba')}
                  >OLEVBA</button>
                </div>

                {/* VirusTotal Result */}
                {activeSource === 'virustotal' && location.state.scanResult.virustotal_result && (
                  <div className="bg-black/30 p-4 mb-6 overflow-x-auto">
                    {location.state.scanResult.virustotal_result.report?.data?.attributes ? (
                      <>
                        <div className="grid grid-cols-4 gap-6 mb-4">
                          <div className="bg-black border border-green-600 rounded-lg p-4 flex flex-col items-center">
                            <span className="font-semibold text-lg text-green-600 mb-2">Status</span>
                            <span className="text-green-600 text-lg font-bold">{location.state.scanResult.virustotal_result.report.data.attributes.status || 'Unknown'}</span>
                          </div>
                          <div className="bg-black border border-red-600 rounded-lg p-4 flex flex-col items-center">
                            <span className="font-semibold text-lg text-red-600 mb-2">Malicious</span>
                            <span className="text-red-600 text-lg font-bold">{location.state.scanResult.virustotal_result.report.data.attributes.stats?.malicious ?? 0}</span>
                          </div>
                          <div className="bg-black border border-orange-600 rounded-lg p-4 flex flex-col items-center">
                            <span className="font-semibold text-lg text-orange-600 mb-2">Harmless</span>
                            <span className="text-orange-600 text-lg font-bold">{location.state.scanResult.virustotal_result.report.data.attributes.stats?.harmless ?? 0}</span>
                          </div>
                          <div className="bg-black border border-gray-600 rounded-lg p-4 flex flex-col items-center">
                            <span className="font-semibold text-lg text-gray-600 mb-2">Undetected</span>
                            <span className="text-gray-600 text-lg font-bold">{location.state.scanResult.virustotal_result.report.data.attributes.stats?.undetected ?? 0}</span>
                          </div>
                        </div>
                        {location.state.scanResult.virustotal_result.report.data.attributes.results && (
                          <div className="mt-8">
                            <table className="min-w-full text-sm border border-yellow-600 rounded-lg overflow-hidden">
                              <thead className="bg-black text-yellow-400 text-center text-lg">
                                <tr>
                                  <th className="px-4 py-3 border-b border-yellow-600 text-left">Source</th>
                                  <th className="px-4 py-3 border-b border-yellow-600 text-center">Category</th>
                                  <th className="px-4 py-3 border-b border-yellow-600 text-center">Method</th>
                                  <th className="px-4 py-3 border-b border-yellow-600 text-center">Engine Update</th>
                                </tr>
                              </thead>
                              <tbody>
                                {Object.entries(location.state.scanResult.virustotal_result.report.data.attributes.results).map(([engine, result]) => (
                                  <tr key={engine} className="border-b border-yellow-800">
                                    <td className="px-4 py-3 text-yellow-200 font-mono text-left align-middle whitespace-nowrap">{result.engine_name || engine}</td>
                                    <td className="px-4 py-3 text-center align-middle whitespace-nowrap">
                                      <span className={
                                        `px-2 py-1 border rounded-md text-xs font-bold ` +
                                        (result.category === 'undetected' ? 'text-gray-400 border-gray-400' :
                                         result.category === 'type-unsupported' ? 'text-orange-400 border-orange-400' :
                                         'text-gray-400 border-gray-400')
                                      }>
                                        {result.category}
                                      </span>
                                    </td>
                                    <td className="px-4 py-3 text-center align-middle whitespace-nowrap"><span className="text-yellow-200 px-2 py-1 border border-yellow-200 rounded-md text-xs font-bold">{result.method}</span></td>
                                    <td className="px-4 py-3 text-center align-middle whitespace-nowrap"><span className="text-yellow-200 text-xs font-bold">{formatScanDate(result.engine_update)}</span></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-yellow-400">No data available.</p>
                    )}
                  </div>
                )}

                {/* Hybrid Analysis Result */}
                {(!activeSource || activeSource === 'hybrid') && location.state.scanResult.hybrid_analysis_result && (
                  <div className="bg-black/30  p-4 mb-6">
                    {(
                      location.state.scanResult.hybrid_analysis_result.error === 'No results found or unexpected format' ||
                      location.state.scanResult.hybrid_analysis_result.response?.message === 'Requested hash not found'
                    ) ? (
                      <p className="text-yellow-400 text-center">No results found.</p>
                    ) : location.state.scanResult.hybrid_analysis_result.error ? (
                      <p className="text-red-400 text-center">Error: {location.state.scanResult.hybrid_analysis_result.error}</p>
                    ) : location.state.scanResult.hybrid_analysis_result.response ? (
                      <p className="text-yellow-400 text-center">{location.state.scanResult.hybrid_analysis_result.response.message}</p>
                    ) : (
                      <p className="text-yellow-400 text-center">No Hybrid Analysis data available.</p>
                    )}
                  </div>
                )}

                {/* OLEVBA Result */}
                {(!activeSource || activeSource === 'olevba') && location.state.scanResult.olevba_result && (
                  <div className="bg-black/30 p-4 mb-6">
                    <p><span className="font-semibold text-yellow-400">Has Macros:</span> {location.state.scanResult.olevba_result.has_macros ? 'Yes' : 'No'}</p>
                    {Array.isArray(location.state.scanResult.olevba_result.suspicious) && location.state.scanResult.olevba_result.suspicious.length > 0 ? (
                      <div className="mt-4">
                        <table className="min-w-full text-sm border border-yellow-600 rounded-lg overflow-hidden">
                          <thead className="bg-black text-yellow-400 text-center text-lg">
                            <tr>
                              <th className="px-4 py-3 border-b border-yellow-600 text-left">Description</th>
                              <th className="px-4 py-3 border-b border-yellow-600 text-center">Keyword</th>
                              <th className="px-4 py-3 border-b border-yellow-600 text-center">Type</th>
                            </tr>
                          </thead>
                          <tbody>
                            {location.state.scanResult.olevba_result.suspicious.map((item, idx) => (
                              <tr key={idx} className="border-b border-yellow-800">
                                <td className="px-4 py-3 text-yellow-200 text-left align-middle whitespace-nowrap">{item.description}</td>
                                <td className="px-4 py-3 text-center align-middle whitespace-nowrap">{item.keyword}</td>
                                <td className="px-4 py-3 text-center align-middle whitespace-nowrap">{item.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p><span className="font-semibold text-yellow-400">Suspicious:</span> None</p>
                    )}
                  </div>
                )}
              </>
            )}


          </>
        )}
      </div>
    </div>
  );
}