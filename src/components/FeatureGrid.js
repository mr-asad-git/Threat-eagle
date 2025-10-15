'use client'
import React from 'react';
// import { Brain, Zap, Search } from 'lucide-react';

const FeatureGrid = () => {
  return (
    <div className="mt-16 p-6 bg-black text-yellow-300">
      <h2 className="text-5xl font-bold text-yellow-400 mb-10 text-center tracking-wide">Product Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-14">
        {/* Feature 1 */}
        <div className="relative rounded-3xl p-8 flex flex-col items-center bg-black/60 border border-yellow-400/30 shadow-2xl backdrop-blur-lg hover:scale-105 hover:shadow-yellow-400/40 transition-transform duration-300 group overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-yellow-400/20 group-hover:border-yellow-400/40" style={{borderImage: 'linear-gradient(135deg, #FFD700 0%, #FFB300 100%) 1'}}></div>
          {/* <div className="relative z-10 text-6xl mb-4 animate-pulse">🧠</div> */}
          <h3 className="relative z-10 text-2xl font-extrabold mb-3 text-yellow-400 text-center tracking-wide drop-shadow-lg">Unified Threat Intelligence Dashboard</h3>
          <p className="relative z-10 text-yellow-200 text-justify text-base font-medium">A single, centralized hub that visualizes results from network, file, code, and web scanning — providing real-time insights, severity rankings, and actionable intelligence all in one place.</p>
        </div>
        {/* Feature 2 */}
        <div className="relative rounded-3xl p-8 flex flex-col items-center bg-black/60 border border-yellow-400/30 shadow-2xl backdrop-blur-lg hover:scale-105 hover:shadow-yellow-400/40 transition-transform duration-300 group overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-yellow-400/20 group-hover:border-yellow-400/40" style={{borderImage: 'linear-gradient(135deg, #FFD700 0%, #FFB300 100%) 1'}}></div>
          {/* <div className="relative z-10 text-6xl mb-4 animate-bounce">⚡</div> */}
          <h3 className="relative z-10 text-2xl font-extrabold mb-3 text-yellow-400 text-center tracking-wide drop-shadow-lg">Automated Scanning & Threat Intelligence Data</h3>
          <p className="relative z-10 text-yellow-200 text-justify text-base font-medium">Integrates machine learning and automated analysis to detect misconfigurations, malware, insecure code, and exploitable web flaws — while enriching findings with real-time threat intelligence data for deeper context and faster response.</p>
        </div>
        {/* Feature 3 */}
        <div className="relative rounded-3xl p-8 flex flex-col items-center bg-black/60 border border-yellow-400/30 shadow-2xl backdrop-blur-lg hover:scale-105 hover:shadow-yellow-400/40 transition-transform duration-300 group overflow-hidden">
          <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-yellow-400/20 group-hover:border-yellow-400/40" style={{borderImage: 'linear-gradient(135deg, #FFD700 0%, #FFB300 100%) 1'}}></div>
          {/* <div className="relative z-10 text-6xl mb-4 animate-pulse">🔍</div> */}
          <h3 className="relative z-10 text-2xl font-extrabold mb-3 text-yellow-400 text-center tracking-wide drop-shadow-lg">Threat Correlation & Analysis Engine</h3>
          <p className="relative z-10 text-yellow-200 text-justify text-base font-medium">Connects the dots between detected vulnerabilities, indicators of compromise, and known attack patterns using data from sources like NVD and MITRE ATT&CK, enabling smarter prioritization and proactive defense.</p>
        </div>
      </div>
      
      <div className="mt-8 px-6 py-12 bg-[#0a0a0a] text-yellow-300">
  <h2 className="text-4xl font-bold text-center mb-20 ">Technologies Used</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
    {[
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Recharts',
      'JWT',
      'Axios',
      'Framer Motion',
      'React Router',
      'Git',
      'Vite',
      'ESLint',
      'Prettier',
      'PostCSS',
    ].map((tech, index) => (
      <button
        key={index}
        className="bg-gray-900 text-yellow-300 py-4 px-6 rounded-xl shadow-md hover:bg-yellow-500 hover:text-black transition-all duration-300 font-semibold text-lg"
      >
        {tech}
      </button>
    ))}
  </div>
</div>
    </div>
  );
};

export default FeatureGrid;