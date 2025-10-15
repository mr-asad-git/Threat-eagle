import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';

export default function LoginPage() {
  const location = useLocation();
  const initialRole = location.state?.role || 'Customer';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(initialRole);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="bg-gray-900 border border-yellow-500 rounded-xl p-8 w-full max-w-md shadow-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center tracking-widest">
          Login
        </h2>

        {/* Role Display
        <p className="text-yellow-300 text-center mb-4">
          Logging in as: <span className="font-bold">{role}</span>
        </p> */}

        {/* Email Input */}
        <label className="block text-yellow-300 font-semibold mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          placeholder="you@example.com"
        />

        {/* Password Input */}
        <label className="block text-yellow-300 font-semibold mb-2">Password</label>
        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-yellow-400 text-sm hover:text-yellow-300"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        {/* Role Dropdown */}
        <label className="block text-yellow-300 font-semibold mb-2">Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full px-4 py-2 mb-6 rounded-lg bg-black text-white border border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white font-bold py-2 rounded-lg hover:bg-yellow-500 transition-all"
        >
          Login
        </button>

        {/* Sign Up Link */}
        <p className="text-white mt-3">
          Don't have an account?
          <Link
            to="/signup"
            className="text-yellow-500 ml-2 hover:border-b-2 hover:border-yellow-500 cursor-pointer"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}