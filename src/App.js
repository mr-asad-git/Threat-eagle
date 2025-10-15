import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroCard from './components/HeroCard';
import Header from './components/Header';
import FeatureGrid from './components/FeatureGrid';
import TrialPage from './pages/TrialPage/TrialPage';
import ScanPage from './pages/ScanPage/ScanPage';
import AboutPage from './pages/AboutPage/AboutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ContactPage from './pages/ContactPage/ContactPage';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Homepage Route */}
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-black  text-white pt-40 px-6">
              <div className="text-center">
                <h1 style={{ fontFamily: 'Saira Stencil One' }} className="text-7xl font-normal text-yellow-400 neon-text mb-4 animate-pulse">
                  Threat Eagle
                </h1>
                <p className="text-grey-100 font-serif text-gray-400 text-md max-w-2xl mx-auto">
                  Threat Eagle is an innovative cybersecurity platform integrating intelligent scanning across networks, files, source code, and web applications — delivering comprehensive vulnerability assessments and proactive threat intelligence
                </p>
              </div>
              <HeroCard />
              <FeatureGrid />
              <Footer />
              
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
        <Route path="/contact" element={<ContactPage/>} />
      </Routes>
    </Router>
  );
}

export default App;