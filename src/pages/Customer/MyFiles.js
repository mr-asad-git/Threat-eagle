import React, { useState } from 'react';

export default function MyFiles() {
  const [search, setSearch] = useState('');

  const files = [
    { name: 'project.js', size: '12 KB', status: 'Safe', scanned: '2025-10-17' },
    { name: 'invoice.html', size: '8 KB', status: 'Corrupted', scanned: '2025-10-16' },
    { name: 'notes.txt', size: '4 KB', status: 'Safe', scanned: '2025-10-15' },
  ];

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-40 bg-black text-yellow-300 font-mono px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-400 mb-8 tracking-wider border-b-2 border-yellow-500 pb-2">
          📁 My Files
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search files by name or status..."
            className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* File Table */}
        <div className="overflow-x-auto border border-yellow-500 rounded-xl">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-yellow-500 text-black">
              <tr>
                <th className="p-2 border border-yellow-400">#</th>
                <th className="p-2 border border-yellow-400">File Name</th>
                <th className="p-2 border border-yellow-400">Size</th>
                <th className="p-2 border border-yellow-400">Status</th>
                <th className="p-2 border border-yellow-400">Last Scanned</th>
                <th className="p-2 border border-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-black/20 text-yellow-200">
              {filteredFiles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-yellow-400">
                    No files found.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file, i) => (
                  <tr key={i}>
                    <td className="p-2 border border-yellow-500">{i + 1}</td>
                    <td className="p-2 border border-yellow-500">{file.name}</td>
                    <td className="p-2 border border-yellow-500">{file.size}</td>
                    <td className={`p-2 border border-yellow-500 ${
                      file.status === 'Corrupted' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {file.status}
                    </td>
                    <td className="p-2 border border-yellow-500">{file.scanned}</td>
                    <td className="p-2 border border-yellow-500 space-x-2">
                      <button className="px-3 py-1 text-xs font-bold border border-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition">
                        View
                      </button>
                      <button className="px-3 py-1 text-xs font-bold border border-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition">
                        Re-scan
                      </button>
                      <button className="px-3 py-1 text-xs font-bold border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition">
                        Delete
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