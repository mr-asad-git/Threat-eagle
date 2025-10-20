import React, { useState } from 'react';

export default function ViewReports() {
  const [severity, setSeverity] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const reports = [
    {
      id: 1,
      file: 'invoice.js',
      user: 'alice@threat.com',
      date: '2025-10-17',
      threats: 3,
      severity: 'High',
    },
    {
      id: 2,
      file: 'profile.html',
      user: 'bob@threat.com',
      date: '2025-10-16',
      threats: 1,
      severity: 'Moderate',
    },
    {
      id: 3,
      file: 'script.css',
      user: 'charlie@threat.com',
      date: '2025-10-15',
      threats: 0,
      severity: 'Safe',
    },
  ];

  const filteredReports = reports.filter((r) => {
    const matchSeverity = severity === 'All' || r.severity === severity;
    const matchStart = !startDate || new Date(r.date) >= new Date(startDate);
    const matchEnd = !endDate || new Date(r.date) <= new Date(endDate);
    return matchSeverity && matchStart && matchEnd;
  });

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
          📊 Threat Reports
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label className="block text-yellow-300 font-semibold mb-2">Severity</label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Moderate">Moderate</option>
              <option value="Safe">Safe</option>
            </select>
          </div>
        </div>

        {/* Report Table */}
        <div className="overflow-x-auto border border-yellow-500 rounded-xl">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-2 border border-yellow-400">#</th>
                <th className="p-2 border border-yellow-400">File</th>
                <th className="p-2 border border-yellow-400">User</th>
                <th className="p-2 border border-yellow-400">Date</th>
                <th className="p-2 border border-yellow-400">Threats</th>
                <th className="p-2 border border-yellow-400">Severity</th>
              </tr>
            </thead>
            <tbody className="bg-black/20 text-yellow-200">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-yellow-400">
                    No reports found.
                  </td>
                </tr>
              ) : (
                filteredReports.map((r, i) => (
                  <tr key={r.id}>
                    <td className="p-2 border border-yellow-500">{i + 1}</td>
                    <td className="p-2 border border-yellow-500">{r.file}</td>
                    <td className="p-2 border border-yellow-500">{r.user}</td>
                    <td className="p-2 border border-yellow-500">{r.date}</td>
                    <td className="p-2 border border-yellow-500">{r.threats}</td>
                    <td className={`p-2 border border-yellow-500 ${
                      r.severity === 'High'
                        ? 'text-red-400'
                        : r.severity === 'Moderate'
                        ? 'text-yellow-300'
                        : 'text-green-400'
                    }`}>
                      {r.severity}
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