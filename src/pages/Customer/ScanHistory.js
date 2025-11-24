import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateCurrentUser } from '../../data/authUsers';

export default function ScanHistory() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [history, setHistory] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setHistory(u?.scanHistory || u?.history || []);
  }, []);

  const filtered = history.filter((f) => {
    const matchSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.status || '').toLowerCase().includes(search.toLowerCase());
    const matchDate = !date || f.scanned === date;
    return matchSearch && matchDate;
  });

  const removeRecord = (idx) => {
    const next = history.filter((_, i) => i !== idx);
    setHistory(next);
    if (user) updateCurrentUser({ ...user, scanHistory: next });
  };

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono px-6 pt-nav py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
          📁 Scan History
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by file name or status..."
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Filter by Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* History Table */}
        <div className="overflow-x-auto border border-yellow-500 rounded-xl">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-2 border border-yellow-400">#</th>
                <th className="p-2 border border-yellow-400">File Name</th>
                <th className="p-2 border border-yellow-400">Size</th>
                <th className="p-2 border border-yellow-400">Status</th>
                <th className="p-2 border border-yellow-400">Scanned On</th>
                <th className="p-2 border border-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-black/20 text-yellow-200">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-yellow-400">
                    No scan records found.
                  </td>
                </tr>
              ) : (
                filtered.map((file, i) => (
                  <tr key={i}>
                    <td className="p-2 border border-yellow-500">{i + 1}</td>
                    <td className="p-2 border border-yellow-500">{file.name}</td>
                    <td className="p-2 border border-yellow-500">{file.size || '—'}</td>
                    <td className={`p-2 border border-yellow-500 ${
                      file.status === 'Corrupted' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {file.status}
                    </td>
                    <td className="p-2 border border-yellow-500">{file.scanned}</td>
                    <td className="p-2 border border-yellow-500">
                      <button onClick={() => removeRecord(i)} className="px-3 py-1 text-xs font-bold border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition">
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}