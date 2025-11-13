
'use client'
import React, { useState } from 'react';
import { ShieldCheck, ScanLine, Link2, Database, PlugZap } from 'lucide-react';
import Footer from '../../components/Footer';
// import UrlResultsPage from './pages/Results/UrlResultsPage';
// import CodeResultsPage from './pages/Results/CodeResultsPage';
// import FileResultsPage from './pages/Results/FileResultsPage';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Mapping tech names to lucide-react icons
import { Loader2 } from 'lucide-react';
const techIcons = {
  'React': <img src={require('../../assets/icons/react.png')} alt="React" width={20} height={20} style={{ marginRight: '8px' }} />,
  'Tailwind CSS': <img src={require('../../assets/icons/tailwindcss.png')} alt="Tailwind CSS" width={20} height={20} style={{ marginRight: '8px' }} />,
  'Python': <img src={require('../../assets/icons/python.png')} alt="Python" width={20} height={20} style={{ marginRight: '8px' }} />,
  'MongoDB': <img src={require('../../assets/icons/mongodb.png')} alt="MongoDB" width={20} height={20} style={{ marginRight: '8px' }} />,
  'Authentication': <img src={require('../../assets/icons/keyround.png')} alt="Authentication" width={20} height={20} style={{ marginRight: '8px' }} />,
  'Git': <img src={require('../../assets/icons/git.png')} alt="Git" width={20} height={20} style={{ marginRight: '8px' }} />,
  'ESLint': <img src={require('../../assets/icons/filecheck.png')} alt="ESLint" width={20} height={20} style={{ marginRight: '8px' }} />,
  'External Tools': <img src={require('../../assets/icons/wrench.png')} alt="External Tools" width={20} height={20} style={{ marginRight: '8px' }} />,
};

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const featureCards = [
  {
    title: 'File Scanning & Malware Detection',
    description: 'Upload and scan files for malware, viruses, and suspicious content using advanced multi-engine analysis. Get instant results and detailed threat breakdowns for every file.',
    icon: <ScanLine size={40} className="text-yellow-400 mb-2" />,
  },
  {
    title: 'Unified Threat Intelligence Dashboard',
    description: 'A single, centralized hub that visualizes results from network, file, code, and web scanning — providing real-time insights, severity rankings, and actionable intelligence all in one place.',
    icon: <ShieldCheck size={40} className="text-yellow-400 mb-2" />,
  },
  {
    title: 'Automated Scanning & Threat Intelligence Data',
    description: 'Integrates machine learning and automated analysis to detect misconfigurations, malware, insecure code, and exploitable web flaws — while enriching findings with real-time threat intelligence data for deeper context and faster response.',
    icon: <ScanLine size={40} className="text-yellow-400 mb-2" />,
  },
  {
    title: 'Multiple Data Collection',
    description: 'Collects and aggregates threat data from multiple sources, including endpoints, cloud, network, and third-party feeds, to provide a holistic view of your security posture.',
    icon: <Database size={40} className="text-yellow-400 mb-2" />,
  },
  {
    title: 'API Integration',
    description: 'Easily integrates with your existing security stack and SIEM/SOAR platforms via robust APIs, enabling automated workflows and seamless data exchange.',
    icon: <PlugZap size={40} className="text-yellow-400 mb-2" />,
  },

  {
    title: 'Source Code Vulnerability Scanning',
    description: 'Paste or upload your code to detect insecure coding practices, vulnerabilities, and server side  misconfigurations. Supports multiple languages and provides actionable remediation guidance.',
    icon: <Link2 size={40} className="text-yellow-400 mb-2" />,
  },
  {
    title: 'URL & Web Application Scanning',
    description: 'Scan URLs and web applications for vulnerabilities, phishing, and malicious content. Receive real-time threat intelligence and security recommendations for safer browsing.',
    icon: <Link2 size={40} className="text-yellow-400 mb-2" />,
  },
  {
    title: 'Comprehensive Reporting & Export',
    description: 'Generate interactive, visual reports for all scans. Export results in multiple formats and share findings with your team for faster remediation and compliance.',
    icon: <Database size={40} className="text-yellow-400 mb-2" />,
  },
];

function ProductFeaturesSection() {
  return (
    <div className="mt-16 p-6  bg-black/80 rounded-md text-yellow-300 w-full">
      <h2 className="text-5xl font-bold text-yellow-500 mb-10 text-center tracking-wide">Product Features</h2>
      <div className="w-full flex justify-center item-center ">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full justify-center ">
          {featureCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: 'spring', stiffness: 120, damping: 30, duration: 0.7, delay: idx * 0.1 }}
              className="min-w-[200px] max-w-xs cursor-pointer relative rounded-3xl p-8 flex flex-col items-center bg-black/60 border border-yellow-400/30 shadow-2xl backdrop-blur-lg hover:scale-105 hover:shadow-yellow-400/40 transition-transform duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-yellow-400/20 group-hover:border-yellow-400/40" style={{ borderImage: 'linear-gradient(135deg, #FFD700 0%, #FFB300 100%) 1' }}></div>
              <div className="relative z-10 flex flex-col items-center">
                {card.icon}
                <h3 className="text-xl font-extrabold mb-3 text-yellow-400 text-center tracking-wide drop-shadow-lg">{card.title}</h3>
                <p className="text-yellow-200 text-justify text-base font-medium">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

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
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${backendUrl}/file-scanning/file-scan`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      navigate('/scan/file', { state: { scanResult: data, fileName: file.name } });
    } catch (err) {
      setError('File upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Function for code file scanning
  const handleCodeFileChange = async (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    // Accept only code file extensions
    const allowedExtensions = [
      '.js', '.py', '.java', '.cpp', '.c', '.ts', '.tsx', '.jsx', '.rb', '.go', '.php', '.cs', '.swift', '.kt', '.rs', '.pl', '.sh', '.html', '.css', '.json', '.xml', '.yml', '.yaml', '.sql', '.dart', '.r', '.m', '.scala', '.vb', '.lua', '.groovy', '.erl', '.ex', '.exs', '.hs', '.jl', '.fs', '.fsx', '.ps1', '.bat', '.cmd', '.dockerfile', '.ini', '.conf', '.env'
    ];
    const fileName = file.name.toLowerCase();
    const isCodeFile = allowedExtensions.some(ext => fileName.endsWith(ext));
    if (!isCodeFile) {
      setError('Please upload a valid code file.');
      return;
    }
    setSelectedFile(file);
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await fetch(`${backendUrl}/code-scanning/scan/code`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      navigate('/scan/code', { state: { scanResult: data, fileName: file.name } });
    } catch (err) {
      setError('Code file upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelect = (option) => {
    setSelected(option);
    setError('');
  };

  // Function for URL scanning
  const handleUrlScan = async (url) => {
    setError('');
    const urlPattern = /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w- .\/\?%&=]*)?$/i;
    if (!urlPattern.test(url)) {
      setError('Please enter a valid URL starting with http:// or https://');
      return;
    }
    setIsUploading(true);
    try {
      const payload = {
        "url": url
      }
      const response = await fetch(`${backendUrl}/web-scanning/web-scan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      const hasScanData =
        (data && data.scanResult) ||
        (data && typeof data === 'object' && (
          (data.vulnerabilities && Object.keys(data.vulnerabilities).length > 0) ||
          (data.infos && Object.keys(data.infos).length > 0) ||
          (data.solutions && Object.keys(data.solutions).length > 0)
        ));
      if (hasScanData) {
        navigate('/scan/web', { state: { scanResult: data, fileName: url } });
      } else {
        if (data && data.detail) {
          setError(data.detail || 'Web scan failed.');
        } else {
          setError('Web scan failed.');
        }
      }
    } catch (err) {
      setError('Web scan failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>
      <>
        <div className="h-[80vh]">
          <div className="text-center flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center mb-2">
              <img src={require('../../assets/logo.png')} alt="Threat Eagle Logo" className="w-38 animate-pulse h-28 md:w-32 md:h-24 mt-[-20px] mr-[-5px]" />
              <h1
                style={{ fontFamily: 'Saira Stencil One' }}
                className="text-7xl font-normal text-yellow-400 neon-text mb-4 animate-pulse"
              >
                Threat Eagle
              </h1>
            </div>
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
                    ${selected?.type === option.type
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
                        className={`${selected?.type === 'Code'
                          ? 'flex flex-col gap-2 w-full'
                          : 'flex items-center gap-2 w-full'
                          }`}
                      >
                        {selected.type === 'File' ? (
                          <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center w-full h-10 p-2 text-yellow-400 border-2 border-transparent rounded-xl cursor-pointer shadow-lg bg-yellow-600 backdrop-blur-md transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-yellow-400"
                          >
                            <span className="truncate flex-1 text-center font-semibold tracking-wide text-black drop-shadow">
                              {isUploading
                                ? 'Uploading and scanning...'
                                : selectedFile
                                  ? `${selectedFile.name} — ${(selectedFile.size / 1024).toFixed(2)} KB`
                                  : 'Choose a file to scan'}
                            </span>
                            <input
                              id="file-upload"
                              type="file"
                              className="hidden"
                              onChange={handleFileChange}
                              disabled={isUploading}
                            />
                          </label>
                        ) : selected.type === 'Code' ? (
                          <>
                            <label
                              htmlFor="code-upload"
                              className="flex items-center justify-center w-full h-10 p-2 text-yellow-400 border-2 border-transparent rounded-xl cursor-pointer shadow-lg bg-yellow-600 backdrop-blur-md transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-yellow-400"
                            >
                              <span className="truncate flex-1 text-center font-semibold tracking-wide text-black drop-shadow">
                                {isUploading
                                  ? 'Uploading and scanning...'
                                  : selectedFile
                                    ? `${selectedFile.name} — ${(selectedFile.size / 1024).toFixed(2)} KB`
                                    : 'Choose a code file to scan'}
                              </span>
                              <input
                                id="code-upload"
                                type="file"
                                className="hidden"
                                accept=".js,.py,.java,.cpp,.c,.ts,.tsx,.jsx,.rb,.go,.php,.cs,.swift,.kt,.rs,.pl,.sh,.html,.css,.json,.xml,.yml,.yaml,.sql,.dart,.r,.m,.scala,.vb,.lua,.groovy,.erl,.ex,.exs,.hs,.jl,.fs,.fsx,.ps1,.bat,.cmd,.dockerfile,.ini,.conf,.env"
                                onChange={handleCodeFileChange}
                                disabled={isUploading}
                              />
                            </label>
                          </>
                        ) : (
                          <>
                            <div className="relative w-full">
                              <input
                                id="scan-input"
                                type="text"
                                placeholder={selected.placeholder}
                                className="w-full h-10 p-2 text-yellow-500 border-2 border-yellow-400 rounded-xl focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 transition-all duration-300 bg-transparent pr-12"
                                disabled={isUploading}
                              />
                              {isUploading && (
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                                  <Loader2 size={22} className="animate-spin text-yellow-400" />
                                </span>
                              )}
                            </div>
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
                              disabled={isUploading}
                              onClick={() => {
                                if (!selected) return;
                                if (selected.type === 'File') {
                                  document.getElementById('file-upload')?.click();
                                } else if (selected.type === 'URL') {
                                  const inputValue = document.getElementById('scan-input')?.value || '';
                                  if (!inputValue.trim()) {
                                    setError('Please enter a URL.');
                                    return;
                                  }
                                  handleUrlScan(inputValue.trim());
                                } else {
                                  const inputValue = document.getElementById('scan-input')?.value || '';
                                  if (!inputValue.trim()) {
                                    setError('Please enter code to scan.');
                                    return;
                                  }
                                  navigate(`/results/${selected.type.toLowerCase()}?value=${encodeURIComponent(inputValue)}`);
                                }
                              }}
                              className="px-3 py-2 rounded-md bg-yellow-400 text-black font-bold text-xs shadow-lg transition-all duration-300 border-2 border-yellow-400 hover:border-yellow-500 focus:outline-none"
                            >
                              {isUploading ? 'Scanning...' : 'Scan'}
                            </button>
                          </>
                        )}
                      </form>
                      {error && (
                        <div className="w-full flex flex-col justify-center items-center mt-2">
                          <span className="text-red-500 text-sm font-semibold text-center">{error}</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
        {/* Product Features Section with vertical paging and dots */}
        <div className="w-full bg-black/70 px-30 rounded-md ">
          {/* About Project Section */}
          <div className="w-full mb-12 p-8 bg-black/70 rounded-2xl shadow-2xl flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4 text-center">About Threat Eagle</h2>
            <p className="text-gray-400 text-lg max-w-5xl text-center leading-relaxed">
              Threat Eagle is an advanced cybersecurity platform designed to empower organizations with intelligent, multi-vector scanning and real-time threat intelligence. By integrating file, code, URL, and network scanning, Threat Eagle provides a unified dashboard for comprehensive vulnerability assessment and proactive defense. The platform leverages modern technologies to deliver fast, accurate results, actionable insights, and seamless integration with existing security workflows. Whether you're a SOC team or an individual user, Threat Eagle helps you stay ahead of threats and secure your digital environment with confidence.
            </p>
          </div>
          <ProductFeaturesSection />
          {/* Why Choose Us Section */}
          <div className="w-full mt-20 flex flex-col md:flex-row items-center justify-center gap-8 py-16 px-2 bg-black/95 rounded-2xl shadow-2xl mb-16 ">
            <motion.div
              className="flex-1 max-w-xl text-left"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 120, damping: 30, duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold text-yellow-400 mb-4 drop-shadow">Why Choose Us?</h2>
              <p className="text-gray-400 text-lg mb-6">Threat Eagle empowers modern SOC teams with intelligent automation, context, and actionable insights to detect and respond to threats faster. It's not just about collecting data—it's about turning it into precise, actionable defense. The longer you wait, the deeper the risk. Proactive security starts with one step.</p>
              <button className="bg-yellow-500 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:bg-black hover:border hover:border-yellow-400 hover:rounded-full hover:text-yellow-400 transition-all duration-300 border-2 border-yellow-400">Secure Your Environment Now</button>
            </motion.div>
            <motion.div
              className="flex-1 max-w-xl w-full"
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: 'spring', stiffness: 120, damping: 30, duration: 0.7 }}
            >
              <div className="bg-black rounded-xl shadow-lg border-2 border-yellow-400 p-6">
                {[
                  {
                    title: 'Unified Multi-Vector Scanning',
                    content: 'Scan URLs, files, source code, and networks in one platform—no need for separate tools.'
                  },
                  {
                    title: 'Real-Time Threat Intelligence',
                    content: 'Enriches scan results with live threat intelligence from global feeds and databases (NVD, MITRE ATT&CK, etc.).'
                  },
                  {
                    title: 'User-Centric Dashboard & History',
                    content: 'Personalized dashboards and full scan history for every user, making tracking and reporting effortless.'
                  },
                  {
                    title: 'Actionable, Visual Reports',
                    content: 'Interactive, exportable reports with severity rankings and remediation guidance.'
                  },
                  {
                    title: 'Easy Integration & Extensibility',
                    content: 'Robust API support for SIEM/SOAR, plus modular design for future features.'
                  }
                ].map((item, idx) => (
                  <AccordionItem key={item.title} title={item.title} content={item.content} />
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Comparison Table Section */}
        <motion.div
          className="w-full bg-black/95 rounded-2xl shadow-2xl mb-16 py-12 px-2 flex flex-col items-center"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 120, damping: 30, duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-yellow-400 text-center mb-10">Threat Eagle vs. Traditional Vulnerability Scanners<br /><span className='text-2xl text-yellow-200 font-semibold'>Comparison</span></h2>
          <div className="overflow-x-auto w-full max-w-7xl">
            <table className="w-full border-separate border-spacing-0 rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-yellow-400 text-black text-lg">
                  <th className="py-4 px-4 font-bold text-left rounded-tl-xl">FEATURES</th>
                  <th className="py-4 px-4 font-bold text-center">TRADITIONAL SCANNERS</th>
                  <th className="py-4 px-4 font-bold text-center rounded-tr-xl">THREAT EAGLE</th>
                </tr>
              </thead>
              <tbody className="text-yellow-200 text-base">
                <tr>
                  <td className="py-5 px-4 font-semibold border-b border-yellow-400">Scan Types</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Usually single-type (web or file or code)</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Multi-type: URL, code, file, and network scanning</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-semibold border-b border-yellow-400">User Dashboard</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Basic results, limited customization</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Customizable dashboard with detailed scan results</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-semibold border-b border-yellow-400">User History</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">No or limited scan history per user</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Maintains full scan history for each logged-in user</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-semibold border-b border-yellow-400">Result Visualization</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Text-based or static reports</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Interactive, visual, and exportable reports</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-semibold border-b border-yellow-400">User Experience</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Generic, not user-focused</td>
                  <td className="py-5 px-4 text-center border-b border-yellow-400">Personalized experience for each user</td>
                </tr>
                <tr>
                  <td className="py-5 px-4 font-semibold">Integration & Extensibility</td>
                  <td className="py-5 px-4 text-center">Limited, often closed systems</td>
                  <td className="py-5 px-4 text-center">API support, easy integration, extensible features</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
        {/* Technologies Used Section */}
        <motion.div
          className="mt-8 px-6 py-12 bg-[#0a0a0a] text-yellow-300 relative"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ type: 'spring', stiffness: 120, damping: 30, duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-10 text-yellow-400">Technologies Used</h2>
          <div className=" shadow-2xl p-10 relative flex flex-col md:flex-row gap-10">
            <div className="flex-1 flex flex-col justify-center items-start pr-8 border-r-4 border-yellow-400">
              <h3 className="text-2xl font-bold mb-4 text-yellow-400">How We Use These Technologies</h3>
              <p className="text-yellow-200 text-base leading-relaxed">
                Threat Eagle uses React for building a fast, interactive user interface, and Tailwind CSS for modern, responsive styling. Python powers backend logic and scanning engines, while MongoDB securely stores scan results and user data. JWT is used for secure authentication, Git for version control and collaboration, and ESLint for maintaining code quality and consistency throughout the project.
              </p>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {[
                  'React',
                  'Tailwind CSS',
                  'Python',
                  'MongoDB',
                  'Authentication',
                  'Git',
                  'ESLint',
                  'External Tools'
                ].map((tech, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 60, scale: 0.7 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ backgroundColor: '#FFD700', color: '#000', scale: 1.12 }}
                    whileTap={{ scale: 0.92, filter: 'blur(1.5px)', boxShadow: '0 0 0 2px #FFD700' }}
                    className="bg-black/80 text-yellow-300 py-4 px-4 w-[160px] rounded-xl shadow-md font-semibold text-[15px] transition-all duration-700 flex items-center justify-center"
                    style={{ minWidth: '160px', maxWidth: '160px' }}
                  >
                    {techIcons[tech]}
                    <span>{tech}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <Footer />
      </>
    </div>
  );
  function AccordionItem({ title, content }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="border-b border-yellow-400 last:border-none relative">
        <button
          className="w-full flex items-center justify-between py-5 px-4 text-lg font-semibold text-yellow-300 focus:outline-none hover:bg-yellow-400/10 transition-all duration-200"
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`transition-all duration-700 ease-in-out ${open ? 'opacity-100 translate-x-0' : 'opacity-60 -translate-x-2'}`}>{title}</span>
          <span className="text-2xl font-bold text-yellow-400">{open ? '-' : '+'}</span>
        </button>
        <div
          className={`transition-all duration-700 ease-in-out overflow-hidden bg-black px-4 pb-4 text-yellow-200 text-base`}
          style={{ maxHeight: open ? '300px' : '0', opacity: open ? 1 : 0 }}
        >
          <div className={`transition-all duration-700 ease-in-out ${open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>{content}</div>
        </div>
      </div>
    );
  }
}
