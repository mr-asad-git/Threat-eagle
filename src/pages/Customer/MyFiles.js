import React, { useState, useEffect } from 'react';
import { getCurrentUser, updateCurrentUser } from '../../data/authUsers';

const sampleFiles = [
  { name: 'invoice-01.pdf', size: '12KB', status: 'Safe', scanned: '2025-11-24' },
  { name: 'report-02.docx', size: '45KB', status: 'Safe', scanned: '2025-11-23' },
  { name: 'data-03.csv', size: '34KB', status: 'Safe', scanned: '2025-11-22' },
  { name: 'malware-04.zip', size: '92KB', status: 'Corrupted', scanned: '2025-11-21' },
  { name: 'image-05.png', size: '210KB', status: 'Safe', scanned: '2025-11-20' },
  { name: 'script-06.js', size: '8KB', status: 'Safe', scanned: '2025-11-19' },
  { name: 'invoice-07.pdf', size: '16KB', status: 'Safe', scanned: '2025-11-18' },
  { name: 'archive-08.rar', size: '128KB', status: 'Corrupted', scanned: '2025-11-17' },
  { name: 'notes-09.txt', size: '2KB', status: 'Safe', scanned: '2025-11-16' },
  { name: 'presentation-10.pptx', size: '2.1MB', status: 'Safe', scanned: '2025-11-15' },
  { name: 'backup-11.tar', size: '512KB', status: 'Safe', scanned: '2025-11-14' },
  { name: 'setup-12.exe', size: '1.2MB', status: 'Corrupted', scanned: '2025-11-13' },
  { name: 'design-13.sketch', size: '3.4MB', status: 'Safe', scanned: '2025-11-12' },
  { name: 'video-14.mp4', size: '4.8MB', status: 'Safe', scanned: '2025-11-11' },
  { name: 'ebook-15.epub', size: '600KB', status: 'Safe', scanned: '2025-11-10' },
  { name: 'config-16.json', size: '6KB', status: 'Safe', scanned: '2025-11-09' },
  { name: 'payload-17.bin', size: '256KB', status: 'Corrupted', scanned: '2025-11-08' },
  { name: 'log-18.log', size: '18KB', status: 'Safe', scanned: '2025-11-07' },
  { name: 'spreadsheet-19.xlsx', size: '96KB', status: 'Safe', scanned: '2025-11-06' },
  { name: 'draft-20.doc', size: '24KB', status: 'Safe', scanned: '2025-11-05' },
];

export default function MyFiles() {
  const [search, setSearch] = useState('');
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setFiles(u?.files ? [...u.files] : [...sampleFiles]);
  }, []);

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      (f.status || '').toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (idx) => {
    const next = files.filter((_, i) => i !== idx);
    setFiles(next);
    if (user) updateCurrentUser({ ...user, files: next });
  };

  const handleRescan = (idx) => {
    const next = files.map((f, i) => (i === idx ? { ...f, status: 'Scanning...' } : f));
    setFiles(next);
    if (user) updateCurrentUser({ ...user, files: next });

    setTimeout(() => {
      const done = next.map((f, i) => (i === idx ? { ...f, status: 'Safe', scanned: new Date().toISOString().split('T')[0] } : f));
      setFiles(done);
      if (user) updateCurrentUser({ ...user, files: done });
    }, 900);
  };

  return (
    <div className="min-h-screen bg-black text-yellow-300 font-mono px-6 pt-40 py-10">
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
                    You have no uploaded files yet.
                  </td>
                </tr>
              ) : (
                filteredFiles.map((file, i) => (
                  <tr key={i}>
                    <td className="p-2 border border-yellow-500">{i + 1}</td>
                    <td className="p-2 border border-yellow-500">{file.name}</td>
                    <td className="p-2 border border-yellow-500">{file.size || '—'}</td>
                    <td className={`p-2 border border-yellow-500 ${
                      file.status === 'Corrupted' ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {file.status}
                    </td>
                    <td className="p-2 border border-yellow-500">{file.scanned || '—'}</td>
                    <td className="p-2 border border-yellow-500 space-x-2">
                      <button className="px-3 py-1 text-xs font-bold border border-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition">
                        View
                      </button>
                      <button onClick={() => handleRescan(i)} className="px-3 py-1 text-xs font-bold border border-yellow-400 rounded hover:bg-yellow-500 hover:text-black transition">
                        Re-scan
                      </button>
                      <button onClick={() => handleDelete(i)} className="px-3 py-1 text-xs font-bold border border-red-500 text-red-400 rounded hover:bg-red-500 hover:text-black transition">
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