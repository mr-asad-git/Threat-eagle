import React, { useState } from 'react';

export default function ViewReports() {
  const [severity, setSeverity] = useState('All');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const reports = [
  { id: 1, file: 'invoice.js', user: 'alice@threat.com', date: '2025-10-17', threats: 3, severity: 'High' },
  { id: 2, file: 'profile.html', user: 'bob@threat.com', date: '2025-10-16', threats: 1, severity: 'Moderate' },
  { id: 3, file: 'script.css', user: 'charlie@threat.com', date: '2025-10-15', threats: 0, severity: 'Safe' },
  { id: 4, file: 'dashboard.jsx', user: 'diana@threat.com', date: '2025-10-14', threats: 2, severity: 'Moderate' },
  { id: 5, file: 'report.pdf', user: 'edward@threat.com', date: '2025-10-13', threats: 5, severity: 'Critical' },
  { id: 6, file: 'data.csv', user: 'frank@threat.com', date: '2025-10-12', threats: 0, severity: 'Safe' },
  { id: 7, file: 'config.json', user: 'grace@threat.com', date: '2025-10-11', threats: 4, severity: 'High' },
  { id: 8, file: 'main.py', user: 'henry@threat.com', date: '2025-10-10', threats: 1, severity: 'Moderate' },
  { id: 9, file: 'index.php', user: 'isabel@threat.com', date: '2025-10-09', threats: 2, severity: 'Moderate' },
  { id: 10, file: 'notes.txt', user: 'jack@threat.com', date: '2025-10-08', threats: 0, severity: 'Safe' },
  { id: 11, file: 'login.js', user: 'kate@threat.com', date: '2025-10-07', threats: 3, severity: 'High' },
  { id: 12, file: 'style.scss', user: 'liam@threat.com', date: '2025-10-06', threats: 0, severity: 'Safe' },
  { id: 13, file: 'server.go', user: 'mia@threat.com', date: '2025-10-05', threats: 6, severity: 'Critical' },
  { id: 14, file: 'readme.md', user: 'nathan@threat.com', date: '2025-10-04', threats: 0, severity: 'Safe' },
  { id: 15, file: 'api.ts', user: 'olivia@threat.com', date: '2025-10-03', threats: 2, severity: 'Moderate' },
  { id: 16, file: 'component.vue', user: 'peter@threat.com', date: '2025-10-02', threats: 1, severity: 'Moderate' },
  { id: 17, file: 'script.rb', user: 'quinn@threat.com', date: '2025-10-01', threats: 4, severity: 'High' },
  { id: 18, file: 'package-lock.json', user: 'rachel@threat.com', date: '2025-09-30', threats: 0, severity: 'Safe' },
  { id: 19, file: 'dockerfile', user: 'sam@threat.com', date: '2025-09-29', threats: 2, severity: 'Moderate' },
  { id: 20, file: 'app.config', user: 'tina@threat.com', date: '2025-09-28', threats: 5, severity: 'Critical' },
];

  const filteredReports = reports.filter((r) => {
    const matchSeverity = severity === 'All' || r.severity === severity;
    const matchStart = !startDate || new Date(r.date) >= new Date(startDate);
    const matchEnd = !endDate || new Date(r.date) <= new Date(endDate);
    return matchSeverity && matchStart && matchEnd;
  });

  return (
    <div className="min-h-screen pt-40 bg-black text-yellow-300 font-mono px-6 py-10">
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