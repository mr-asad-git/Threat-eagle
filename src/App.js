import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import UrlResultsPage from './pages/Results/UrlResultsPage';
import CodeScanPage from './pages/Scan/CodeScanPage';
import FileScanPage from './pages/Scan/FileScanPage';
import TrialPage from './pages/TrialPage/TrialPage';
import ScanPage from './pages/ScanPage/ScanPage';
import AboutPage from './pages/AboutPage/AboutPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import GlobalNavArrows from './components/GlobalNavArrows';

function App() {
  return (
    <Router>
      <Header />
      <GlobalNavArrows />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trial" element={<TrialPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/results/url" element={<UrlResultsPage />} />
        <Route path="/scan/code" element={<CodeScanPage />} />
        <Route path="/scan/file" element={<FileScanPage />} />
      </Routes>
    </Router>
  );
}

export default App;