import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
// import UrlResultsPage from './pages/Results/UrlResultsPage';
// import CodeResultsPage from './pages/Results/CodeResultsPage';
// import FileResultsPage from './pages/Results/FileResultsPage';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';


const inputOptions = [
  {
    type: 'URL',
    placeholder: 'Enter a URL to scan for threats...',
  },
  {
    type: 'Code',
    placeholder: 'Paste your code snippet here...',
  },
  {
    type: 'File',
    placeholder: 'Upload a file to analyze...',
  },
];


const glitchVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
  exit: { opacity: 0, scale: 0.95 },
};

export default function Homepage() {

const [selected, setSelected] = useState(inputOptions[0]);
const [selectedFile, setSelectedFile] = useState(null);
const [codeInput, setCodeInput] = useState('');
const navigate = useNavigate();


  useEffect(() => {
  if (selectedFile) {
    const timeout = setTimeout(() => {
      navigate('/scan/file');
    }, 3000);

    return () => clearTimeout(timeout); // cleanup if file changes
  }
}, [selectedFile, navigate]);

  const handleSelect = (option) => {
    if (selected?.type === option.type) {
      setSelected(null);
    } else {
      setSelected(option);
    }
  };


  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6">
      <div className="bg-img h-[80vh] bg-cover bg-center bg-no-repeat">


      <div className="text-center">
        <h1
          style={{ fontFamily: 'Saira Stencil One' }}
          className="text-7xl font-normal text-yellow-400 neon-text mb-4 animate-pulse"
        >
          Threat Eagle
        </h1>
        <p className="text-grey-100 font-serif text-gray-400 text-md max-w-2xl mx-auto">
          Threat Eagle is an innovative cybersecurity platform integrating intelligent scanning across networks, files, source code, and web applications — delivering comprehensive vulnerability assessments and proactive threat intelligence
        </p>
      </div>

      <div className="max-w-2xl mx-auto text-yellow-300">
        <div className="rounded-3xl shadow-2xl p-8">
          {/* Option Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            {inputOptions.map((option) => (
              <button
                key={option.type}
                onClick={() => handleSelect(option)}
                className={`px-5 py-1 rounded-full border-2 font-semibold text-sm tracking-wide transition-all duration-300 ease-in-out shadow-lg focus:outline-none relative overflow-hidden
                  ${
                    selected?.type === option.type
                      ? 'bg-yellow-400 text-black border-yellow-400 shadow-yellow-400/40 scale-105'
                      : 'bg-black/80 text-yellow-300 border-yellow-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105'
                  }`}
              >
                {option.type}
              </button>
            ))}
          </div>

          <div className="relative min-h-[80px]">
            <AnimatePresence mode="wait">
              {selected && (
                <motion.div
                  key={selected.type}
                  variants={glitchVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute w-full"
                >
                  <form
        className={`${
          selected?.type === 'Code'
            ? 'flex flex-col gap-2 w-full'
            : 'flex items-center gap-2 w-full'
        }`}
      >
        {selected.type === 'File' ? (
  <label
    htmlFor="file-upload"
    className="flex items-center justify-center w-full h-10 p-2 text-yellow-400 border-2 border-transparent rounded-xl cursor-pointer shadow-lg bg-yellow-600 backdrop-blur-md transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-yellow-400"
  >
    <span className="truncate flex-1 text-center font-semibold tracking-wide text-yellow-200 drop-shadow">
      {selectedFile
        ? `${selectedFile.name} — ${(selectedFile.size / 1024).toFixed(2)} KB`
        : 'Choose a file to scan'}
    </span>
    <input
      id="file-upload"
      type="file"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
        }
      }}
    />
  </label>
) :  selected.type === 'Code' ? (
    <>
      <textarea
        id="scan-input"
        value={codeInput}
        onChange={(e) => setCodeInput(e.target.value)}
        placeholder={selected.placeholder}
        className="w-full h-32 p-2 text-yellow-300 border-2 border-yellow-400 rounded-xl shadow-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 bg-transparent resize-none"
      />  
      <button
  type="button"
  onClick={() => {
    if (!selected) return;
    navigate(`/scan/code?value=${encodeURIComponent(codeInput)}`);
  }}
  className={`mt-2 w-full px-5 py-1 rounded-full border-2 font-semibold text-sm tracking-wide transition-all duration-300 ease-in-out shadow-lg focus:outline-none relative overflow-hidden
    ${
      selected
        ? 'bg-yellow-400 text-black border-yellow-400 shadow-yellow-400/40 scale-105'
        : 'bg-black/80 text-yellow-300 border-yellow-700 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 hover:scale-105'
    }`}
>
  Scan
</button>
    </>
  ) : (
    <>
      <input
        id="scan-input"
        type="text"
        placeholder={selected.placeholder}
        className="w-full h-10 p-2 text-yellow-300 border-2 border-yellow-400 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 bg-transparent"
      />
        <input id="file-upload" type="file" className="hidden" onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setSelectedFile(file);

                  const fileInfo = {
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    modified: file.lastModified,
                  };

                  navigate(`/results/file?name=${encodeURIComponent(fileInfo.name)}&size=${fileInfo.size}&type=${encodeURIComponent(fileInfo.type)}&modified=${fileInfo.modified}`);
                }
              }}
            />

            <button
              type="button"
              onClick={() => {
                if (!selected) return;

                if (selected.type === 'File') {
                  document.getElementById('file-upload')?.click();
                } else {
                  const inputValue = document.getElementById('scan-input')?.value || '';
                  if (!inputValue.trim()) return;
                  navigate(`/results/${selected.type.toLowerCase()}?value=${encodeURIComponent(inputValue)}`);
                }
              }}
              className="px-3 py-2 rounded-md bg-yellow-400 text-black font-bold text-xs shadow-lg transition-all duration-300 border-2 border-yellow-400 hover:border-yellow-500 focus:outline-none"
            >
              Scan
            </button>
    </>
  )}
</form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      </div>

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
      'NEXTJS',
      'TAILWIND CSS',
      'PYTHON',
      'FASTAPI',
      'ELASTICSEARCH',
      'SQLITE',
      'OpenCTI',
      'NMAP & ARP SCAN',
      'SEMGREP & SONARQUE',
      'CALM AV & YARA',
      'NODEJS',
      'NVD',
      'OAUTH & JWT',
      'GDPR & OWASP Compliances',
      'DOCKER',
      'GITHUB ACTION CI/CD',
      'VS CODE',
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

      <Footer />
    </div>
  );
}