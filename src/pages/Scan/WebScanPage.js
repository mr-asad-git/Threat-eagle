import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronDown, ChevronUp, Loader2, Info, ShieldAlert } from 'lucide-react';


export default function WebScanPage() {
    const { state } = useLocation();
    const [loading, setLoading] = useState(true);
    const [scanData, setScanData] = useState(null);
    const [search, setSearch] = useState('');
    const [openSections, setOpenSections] = useState({});
    const [openSolutions, setOpenSolutions] = useState({});

    useEffect(() => {
        const scanResult = state?.scanResult;
        if (scanResult) {
            setScanData(scanResult);
        }
        setLoading(false);
    }, [state]);

    const toggleSection = (key) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const toggleSolution = (key) => {
        setOpenSolutions((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-6">Web Scan Results</h1>
                <Loader2 className="animate-spin text-yellow-400 mb-4" size={48} />
            </div>
        );
    }
    if (!scanData) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold text-yellow-400 mb-6">Web Scan Results</h1>
                <p className="text-gray-300">No scan data to display.</p>
            </div>
        );
    }

    // Only destructure after confirming scanData exists
    const { vulnerabilities = {}, anomalies = {}, additionals = {}, solutions = {} } = scanData || {};
    const vulnCategories = Object.entries(vulnerabilities).filter(([cat, arr]) => Array.isArray(arr) && arr.length > 0);
    const anomalyCategories = Object.entries(anomalies).filter(([cat, arr]) => Array.isArray(arr) && arr.length > 0);
    const additionalCategories = Object.entries(additionals).filter(([cat, arr]) => Array.isArray(arr) && arr.length > 0);

    const filterBySearch = (arr) => {
        if (!search.trim()) return arr;
        return arr.filter(([cat, items]) => {
            if (cat.toLowerCase().includes(search.toLowerCase())) return true;
            if (Array.isArray(items)) {
                return items.some(item =>
                    Object.values(item).some(val =>
                        typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
                    )
                );
            }
            return false;
        });
    };

    // Severity color helper
    const getSeverityColor = (level) => {
        if (level === 1) return 'text-green-400'; 
        if (level === 2) return 'text-yellow-400';
        if (level === 3) return 'text-orange-400';
        if (level === 4) return 'text-red-400'; 
        return 'text-gray-400';
    };

    const scannedUrl = state?.fileName || scanData?.url || scanData?.target || '';
    let scanDate = scanData?.scan_date || scanData?.date || scanData?.timestamp || '';
    if (!scanDate) {
        const now = new Date();
        scanDate = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    }

    return (
        <div className="min-h-screen bg-black text-white py-20 px-4 flex flex-col items-center">
            <div className="bg-black/80 rounded-xl shadow-lg p-6 w-full max-w-8xl">
                <div className="mb-8 pb-4 border-b border-yellow-400/30">
                    <div className="flex flex-col gap-2">
                        {scannedUrl && (
                            <div className="text-lg font-bold text-yellow-300">
                                <span className="block text-yellow-400 font-bold text-3xl mt-1">{scannedUrl}</span>
                            </div>
                        )}
                        {scanDate && (
                            <div className="text-lg font-bold text-yellow-300">
                                <span className="block text-gray-400 text-xs ">{scanDate}</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-yellow-300 mb-2">Vulnerabilities</h2>
                    {filterBySearch(vulnCategories).length === 0 ? (
                        <div className="text-green-400 font-semibold">No vulnerabilities found!</div>
                    ) : (
                        <ul className="space-y-4">
                            {filterBySearch(vulnCategories).map(([category, items]) => (
                                <li key={category} className="bg-black/70 rounded-lg p-4 border border-yellow-400/30">
                                    <button
                                        className="w-full text-left text-lg font-bold text-yellow-400 mb-2 flex items-center gap-2 focus:outline-none"
                                        onClick={() => toggleSection(category)}
                                    >
                                        <ShieldAlert className="inline-block text-yellow-400" size={20} />
                                        {category}
                                        <span className="ml-2 text-yellow-300">{openSections[category] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                                    </button>
                                    {openSections[category] && (
                                        <div className="pl-2">
                                            <button
                                                className="text-yellow-200 text-sm mb-2 focus:outline-none underline flex items-center gap-1"
                                                onClick={() => toggleSolution(category)}
                                            >
                                                <Info className="inline-block text-yellow-200" size={16} />
                                                Solution {openSolutions[category] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                                            </button>
                                            {openSolutions[category] && solutions[category] && (
                                                <div className="text-yellow-200 text-sm mb-2"><span className="font-semibold">Solution:</span> {solutions[category]}</div>
                                            )}
                                            <ul className="space-y-2">
                                                {items.map((item, idx) => (
                                                    <li key={idx} className="text-gray-200 text-sm bg-black/60 rounded-md p-2 mb-2">
                                                        <div><span className="font-semibold">Info:</span> {item.info}</div>
                                                        <div><span className="font-semibold">Path:</span> {item.path}</div>
                                                        <div><span className="font-semibold">Method:</span> {item.method}</div>
                                                        <div><span className="font-semibold">Module:</span> {item.module}</div>
                                                        {item.wstg && item.wstg.length > 0 && (
                                                            <div><span className="font-semibold">WSTG:</span> {item.wstg.join(', ')}</div>
                                                        )}
                                                        <div>
                                                            <span className="font-semibold">Severity:</span>
                                                            <span className={`ml-2 ${getSeverityColor(item.level)}`}>{item.level === 1 ? 'Low' : item.level === 2 ? 'Medium' : item.level === 3 ? 'High' : item.level === 4 ? 'Critical' : 'Unknown'}</span>
                                                        </div>
                                                        <button
                                                            className="text-yellow-400 text-xs mt-1 hover:underline"
                                                            onClick={() => navigator.clipboard.writeText(item.curl_command || '')}
                                                        >Copy curl command</button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Anomalies Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-yellow-300 mb-2">Anomalies</h2>
                    {filterBySearch(anomalyCategories).length === 0 ? (
                        <div className="text-green-400 font-semibold">No anomalies found!</div>
                    ) : (
                        <ul className="space-y-4">
                            {filterBySearch(anomalyCategories).map(([category, items]) => (
                                <li key={category} className="bg-black/70 rounded-lg p-4 border border-yellow-400/30">
                                    <button
                                        className="w-full text-left text-lg font-bold text-yellow-400 mb-2 focus:outline-none"
                                        onClick={() => toggleSection('anomaly-' + category)}
                                    >
                                        {category} <span className="ml-2 text-yellow-300">{openSections['anomaly-' + category] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                                    </button>
                                    {openSections['anomaly-' + category] && (
                                        <ul className="space-y-2 pl-2">
                                            {items.map((item, idx) => (
                                                <li key={idx} className="text-gray-200 text-sm bg-black/60 rounded-md p-2 mb-2">
                                                    {typeof item === 'string' ? item : JSON.stringify(item)}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-yellow-300 mb-2">Additionals</h2>
                    {filterBySearch(additionalCategories).length === 0 ? (
                        <div className="text-green-400 font-semibold">No additionals found!</div>
                    ) : (
                        <ul className="space-y-4">
                            {filterBySearch(additionalCategories).map(([category, items]) => (
                                <li key={category} className="bg-black/70 rounded-lg p-4 border border-yellow-400/30">
                                    <button
                                        className="w-full text-left text-lg font-bold text-yellow-400 mb-2 focus:outline-none"
                                        onClick={() => toggleSection('additional-' + category)}
                                    >
                                        {category} <span className="ml-2 text-yellow-300">{openSections['additional-' + category] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</span>
                                    </button>
                                    {openSections['additional-' + category] && (
                                        <ul className="space-y-2 pl-2">
                                            {items.map((item, idx) => (
                                                <li key={idx} className="text-gray-200 text-sm bg-black/60 rounded-md p-2 mb-2">
                                                    {typeof item === 'string' ? item : JSON.stringify(item)}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
