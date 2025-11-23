import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
// import GlobalNavArrows from './components/GlobalNavArrows';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Public Pages
import HomePage from './pages/HomePage/HomePage';
import TrialPage from './pages/TrialPage/TrialPage';
// import ScanPage from './pages/ScanPage/ScanPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

// Scan Results
import UrlResultsPage from './pages/Results/UrlResultsPage';
import CodeScanPage from './pages/Scan/CodeScanPage';
import FileScanPage from './pages/Scan/FileScanPage';

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import ManageUsers from './pages/Admin/ManageUsers';
import ViewReports from './pages/Admin/ViewReports';
// import Settings from './pages/Admin/Settings';

// Customer Pages
import CustomerDashboard from './pages/Customer/CustomerDashboard';
import MyFiles from './pages/Customer/MyFiles';
import ScanHistory from './pages/Customer/ScanHistory';
import Profile from './pages/Customer/Profile';

function App() {
  return (
    <Router>
      <Header />
      {/* <GlobalNavArrows /> */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/trial" element={<TrialPage />} />
        {/* <Route path="/scan" element={<ScanPage />} /> */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Scan Results */}
        <Route path="/results/url" element={<UrlResultsPage />} />
        <Route path="/scan/code" element={<CodeScanPage />} />
        <Route path="/scan/file" element={<FileScanPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="Admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute role="Admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/view-reports"
          element={
            <ProtectedRoute role="Admin">
              <ViewReports />
            </ProtectedRoute>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute role="Customer">
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/my-files"
          element={
            <ProtectedRoute role="Customer">
              <MyFiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/history"
          element={
            <ProtectedRoute role="Customer">
              <ScanHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute role="Customer">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;