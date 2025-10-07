// TrialPage.jsx
import React, { useState } from 'react';
import Header from '../../components/Header';
import './TrialPageStyling.css';


const cyberCompanies = ['CrowdStrike', 'Palo Alto', 'FireEye', 'Check Point', 'Darktrace', 'Fortinet'];

const dummyReports = [
  { id: 1, title: 'SQL Injection Detected', source: 'CrowdStrike', severity: 'High' },
  { id: 2, title: 'XSS Vulnerability Found', source: 'Darktrace', severity: 'Medium' },
  { id: 3, title: 'Phishing URL Flagged', source: 'Check Point', severity: 'Critical' },
  { id: 4, title: 'Open Port Exposure', source: 'Fortinet', severity: 'Low' },
  { id: 5, title: 'Unpatched Apache Server', source: 'Palo Alto', severity: 'High' },
  { id: 6, title: 'Malware Signature Match', source: 'FireEye', severity: 'Critical' },
  { id: 7, title: 'Weak Password Policy', source: 'CrowdStrike', severity: 'Medium' },
  { id: 8, title: 'Suspicious Login Attempt', source: 'Darktrace', severity: 'Low' },
  { id: 9, title: 'DNS Spoofing Risk', source: 'Check Point', severity: 'High' },
  { id: 10, title: 'Unencrypted Data Transfer', source: 'Fortinet', severity: 'Medium' },
  { id: 11, title: 'Privilege Escalation Path', source: 'Palo Alto', severity: 'Critical' },
  { id: 12, title: 'Zero-Day Exploit Alert', source: 'FireEye', severity: 'Critical' },
  { id: 13, title: 'Outdated SSL Certificate', source: 'CrowdStrike', severity: 'Low' },
  { id: 14, title: 'Brute Force Attempt', source: 'Darktrace', severity: 'High' },
  { id: 15, title: 'Remote Code Execution', source: 'Check Point', severity: 'Critical' },
  { id: 16, title: 'Cross-Site Request Forgery', source: 'Fortinet', severity: 'Medium' },
  { id: 17, title: 'Exposed Admin Panel', source: 'Palo Alto', severity: 'High' },
  { id: 18, title: 'Suspicious File Upload', source: 'FireEye', severity: 'Medium' },
  { id: 19, title: 'Broken Access Control', source: 'CrowdStrike', severity: 'Critical' },
  { id: 20, title: 'Insecure API Endpoint', source: 'Darktrace', severity: 'High' },
];

export default function TrialPage() {
  // eslint-disable-next-line 
  const [reports, setReports] = useState(dummyReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const filteredReports = reports.filter((report) => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompany ? report.source === selectedCompany : true;
    return matchesSearch && matchesCompany;
  });

  const handleDownload = () => {
    alert('Reports downloaded as PDF!');
  };

  return (
    <div className="bg-black min-h-screen text-yellow-300 pt-24">
      <Header />
      {/* Search + Filter */}
      <div className="flex items-center justify-between px-8 mt-4 gap-4">
        <input
          type="text"
          placeholder="Search vulnerabilities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-gray-900 text-yellow-300 border border-yellow-500 px-4 py-2 rounded-lg w-1/2"
        />
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="bg-gray-900 text-yellow-300 border border-yellow-500 px-4 py-2 rounded-lg w-1/2"
        >
          <option value="">All Companies</option>
          {cyberCompanies.map((company, index) => (
            <option key={index} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Download Button */}
      <div className="flex justify-end px-8 mt-6">
        <button
          onClick={handleDownload}
          className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-3xl shadow-[0_0_10px_#ff0] hover:bg-yellow-500 hover:shadow-[0_0_20px_#ff0] transition-all duration-300"
        >
          Download Reports
        </button>
      </div>

      {/* Vulnerability Reports */}
      <div className="px-8 mt-6">
        <h2 className="text-2xl font-bold mb-4">🛡️ Vulnerability Reports</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-gray-900 border border-yellow-500 rounded-lg shadow-md mb-10">
            <thead>
              <tr className="bg-yellow-500 text-black">
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Severity</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-t border-yellow-500 hover:bg-gray-800 transition">
                  <td className="px-4 py-3 text-yellow-300 font-semibold">{report.title}</td>
                  <td className="px-4 py-3 text-yellow-400">{report.source}</td>
                  <td className="px-4 py-3 text-red-400">{report.severity}</td>
                  <td className="px-4 py-3 text-right">
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}