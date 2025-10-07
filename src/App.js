import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroCard from './components/HeroCard';
import Header from './components/Header';
import GraphGrid from './components/GraphGrid';
import TrialPage from './pages/TrialPage/TrialPage';
import ScanPage from './pages/ScanPage/ScanPage';
import AboutPage from './pages/AboutPage/AboutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Homepage Route */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black text-white pt-24 px-6">
              <div className="text-center mb-10">
                <h1 style={{ fontFamily: 'Saira Stencil One' }} className="text-8xl font-normal text-yellow-300 neon-text mb-4">
                  Threat Eagle
                </h1>
                <p className="text-grey-100 font-serif text-lg max-w-2xl mx-auto">
                  Your intelligent cybersecurity companion. Scan URLs, code snippets, and files for vulnerabilities with precision and speed.
                </p>
              </div>
              <HeroCard />
              <GraphGrid />
            </div>
          }
        />

        {/* Trial Page Route */}
        <Route path="/" element={<App />} />
        <Route path="/trial" element={<TrialPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
      </Routes>
    </Router>
  );
}

export default App;