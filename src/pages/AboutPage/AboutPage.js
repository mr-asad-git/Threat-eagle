import React, { useState } from 'react';
import Header from '../../components/Header';
import './AboutPageStyling.css';
import Footer from '../../components/Footer';

export default function AboutPage() {
  const [hoveredTech, setHoveredTech] = useState(null);

  const techStack = [
    { name: 'React', icon: '⚛️', description: 'Component-based UI for dynamic rendering.' },
    { name: 'Tailwind CSS', icon: '🎨', description: 'Utility-first styling for responsive layouts.' },
    { name: 'Node.js', icon: '🟢', description: 'Backend runtime for scalable logic.' },
    { name: 'MongoDB', icon: '🍃', description: 'NoSQL database for flexible data storage.' },
    { name: 'Express', icon: '🚀', description: 'Minimalist backend framework for APIs.' },
    { name: 'Recharts', icon: '📊', description: 'Data visualization for interactive dashboards.' },
  ];

  const nodePaths = [
    'M100 100 Q100 40, 40 40',
    'M100 100 L40 100',
    'M100 100 Q100 160, 40 160',
    'M100 100 Q100 160, 160 160', // swapped
    'M100 100 L160 100',
    'M100 100 Q100 40, 160 40',   // swapped
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-yellow-300 pt-24 px-8 pb-20 overflow-hidden">
      <Header />

      {/* Intro Text */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">🛡️ About Threat Eagle</h2>
        <p className="text-yellow-400 max-w-xl mx-auto">
          Threat Eagle is a cyber-themed vulnerability dashboard built with precision, speed, and visual impact.
        </p>
      </div>

      {/* Shield + Nodes */}
      <div className="relative mx-auto mb-40 mt-10 w-[320px] h-[320px]">
        {/* Central Shield */}
        <div className="shield-core absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-500 text-black rounded-full w-[10rem] h-[10rem] flex items-center justify-center text-6xl font-bold z-10">
          🛡️
        </div>

        {/* Tech Nodes */}
        {techStack.map((tech, index) => {
          const angle = (index / techStack.length) * 360;
          const radius = 130;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          const isLeft = index < 3;
          const tooltipClass = isLeft ? 'node-tooltip-left' : 'node-tooltip-right';

          return (
            <div
              key={tech.name}
              className="tech-node absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
              }}
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <svg className="node-path" width="200" height="200">
                <path
                  d={nodePaths[index]}
                  stroke="#facc15"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div className={`node-icon ${hoveredTech === index ? 'active' : ''}`}>
                {tech.icon}
              </div>
              {hoveredTech === index && (
                <div className={tooltipClass}>{tech.description}</div>
              )}
            </div>
          );
        })}
      </div>

      {/* Project Highlights Tree */}
<div className="relative max-w-4xl mx-auto mt-20 mb-20">
  <h3 className="text-3xl font-bold text-center mb-12">📊 Project Highlights</h3>

  {/* Vertical Trunk Line */}
  <div className="absolute left-1/2 top-0 h-full w-[4px] bg-yellow-500 transform -translate-x-1/2 z-0"></div>

  {/* Branch Nodes */}
  <div className="relative z-10 flex flex-col items-center space-y-16">
    {[
      {
        title: '🔍 Real-time Scanning',
        description: 'Scan URLs, code snippets, and files instantly.',
      },
      {
        title: '🧠 Smart Filtering',
        description: 'Filter by company, severity, and keyword.',
      },
      {
        title: '📄 Report Export',
        description: 'Generate editable and exportable reports.',
      },
      {
        title: '🎯 Cyber UI',
        description: 'Glowing transitions and animated layouts.',
      },
      {
        title: '📈 Modular Dashboard',
        description: 'Architecture ready for scalable insights.',
      },
    ].map((item, index) => {
      const isLeft = index % 2 !== 0;
      const branchClass = isLeft
        ? 'left-branch'
        : 'right-branch';

      return (
        <div key={index} className="relative w-full flex items-center justify-center">
          {/* Node */}
          <div className="z-10 w-6 h-6 rounded-full bg-yellow-500 border-2 border-yellow-300"></div>

          {/* Branch Content */}
          <div className={`absolute ${branchClass}`}>
            <div className="bg-gray-900 border border-yellow-500 rounded-xl px-4 py-2 text-yellow-300 shadow-lg max-w-xs">
              <div className="font-bold mb-1">{item.title}</div>
              <div className="text-sm">{item.description}</div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
<Footer />
    </div>
  );
}