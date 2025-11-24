

import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import CustomerNav from '../pages/Customer/CustomerNav';
import AdminNav from '../pages/Admin/AdminNav';


export default function Header() {
  const location = useLocation();
  const [showPlans, setShowPlans] = useState(false);
  const { currentUser } = useAuth();

  // Subscription plans array
  const plans = [
    {
      name: 'Basic',
      price: '$9/mo',
      features: [
        'Single scan',
        'Limited scan history',
        'Email support',
        'Basic vulnerability report',
        'Access to dashboard',
        'File scan only'
      ]
    },
    {
      name: 'Gold',
      price: '$29/mo',
      features: [
        'Unlimited scans',
        'Full scan history',
        'Priority support',
        'Advanced vulnerability report',
        'Code/URL/File scan',
        'Exportable reports',
        'Dashboard analytics',
        'Real-time threat intelligence'
      ]
    },
    {
      name: 'Premium',
      price: '$59/mo',
      features: [
        'All Gold features',
        'Team dashboard',
        'Dedicated manager',
        'API integration',
        'Network scan',
        'Custom alerts',
        'SIEM/SOAR integration',
        'Multi-user management',
        'Compliance reporting'
      ]
    }
  ];

  // Modal for subscription plans
  const SubscriptionModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 w-full h-full">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <button
          className="absolute top-8 right-12 text-yellow-400 text-3xl font-bold hover:text-yellow-500 z-10"
          onClick={() => setShowPlans(false)}
        >
          &times;
        </button>
        <h2 className="text-4xl font-bold text-yellow-400 mb-10 text-center">Choose Your Plan</h2>
        <div className="flex flex-row gap-10 justify-center items-stretch w-full max-w-5xl">
          {plans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`relative flex flex-col items-center min-w-[260px] max-w-xs w-full rounded-3xl p-0 border-4 border-yellow-400 shadow-2xl transition-transform duration-300 hover:scale-105 hover:shadow-yellow-400/40 bg-black ${idx === 1 ? 'scale-105 z-10 border-yellow-500 shadow-yellow-400/60' : ''}`}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                <span className={`px-5 py-2 rounded-full font-bold text-lg shadow-lg ${idx === 1 ? 'bg-yellow-400 text-black' : 'bg-black text-yellow-400 border border-yellow-400'}`}>{plan.name}</span>
              </div>
              <div className="mt-8 mb-4 text-3xl font-extrabold text-yellow-400 drop-shadow-lg tracking-wide">{plan.price}</div>
              <ul className="text-yellow-200 text-base mb-6 list-disc list-inside text-left w-full pl-4 space-y-2">
                {plan.features.map(f => <li key={f} className="pl-1">{f}</li>)}
              </ul>
              <div className="flex-1" />
              <div className="w-full flex justify-center pb-4">
                <button className="px-8 py-3 rounded-full bg-yellow-400 text-black font-extrabold text-lg shadow-lg hover:bg-yellow-500 transition-all duration-300 tracking-wide border-2 border-yellow-400 hover:border-yellow-500 focus:outline-none">Buy</button>
              </div>
              {idx === 1 && <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">Most Popular</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // If an admin is logged in and visiting admin routes, render the admin nav
  if (currentUser && currentUser.role === 'Admin' && location.pathname.startsWith('/admin')) {
    return <AdminNav />;
  }

  // If a customer is logged in and visiting customer routes, render the customer nav instead
  if (currentUser && currentUser.role === 'Customer' && location.pathname.startsWith('/customer')) {
    return <CustomerNav />;
  }

  return (
    <>
      <nav className="backdrop-blur-md  shadow-2xl py-4 px-4 md:py-3 md:px-8 flex flex-col md:flex-row justify-between items-center fixed top-0 w-full z-50 border-b border-yellow-400">
        <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-0">
          <img src="/logo192.png" alt="Threat Eagle Logo" className="w-7 h-7 md:w-8 md:h-8 rounded-full shadow-lgs" />
          <h1 className="text-lg md:text-2xl font-extrabold text-yellow-400 tracking-widest drop-shadow-lg font-sans ">
            Threat Eagle
          </h1>
        </div>
        <ul className="flex flex-wrap justify-center md:justify-end space-x-1 md:space-x-4  px-2 py-1 shadow-md text-sm w-full md:w-auto">
          {['Home', 'Subscription', 'Contact', 'Login', 'Signup'].map((item) => {
            let path = item === 'Home' ? '/' : `/${item.toLowerCase()}`;
            if (item === 'Signup') path = '/signup';
            const isActive = location.pathname === path;

            if (item === 'Subscription') {
              return (
                <li key={item} className="relative group">
                  <button
                    type="button"
                    onClick={() => setShowPlans(true)}
                    className={`relative inline-block text-center px-2 py-1 font-semibold transition-all duration-300 text-md tracking-wide focus:outline-none ${
                      isActive
                        ? 'text-yellow-400'
                        : 'text-white hover:text-yellow-400'
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                        isActive
                          ? 'bg-yellow-400 scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)]'
                          : 'bg-yellow-400 scale-x-0 group-hover:scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)]'
                      }`}
                      style={{ transformOrigin: 'left' }}
                    />
                  </button>
                </li>
              );
            }

            if (item === 'Login' || item === 'Signup') {
              return (
                <li key={item} className="w-full md:w-auto">
                  <Link
                    to={path}
                    className={`relative inline-block text-center px-2 py-1 font-bold transition-all duration-300 text-md tracking-wide focus:outline-none ${
                      isActive
                        ? 'text-yellow-400'
                        : 'text-yellow-400  hover:text-black hover:bg-yellow-400 rounded-md '
                    }`}
                  >
                    {item}
                    <span
                      className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                        isActive
                          ? 'bg-yellow-400 scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)] animate-bounce'
                          : 'bg-yellow-400 scale-x-0 group-hover:scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)] group-hover:animate-bounce'
                      }`}
                      style={{ transformOrigin: 'left' }}
                    />
                  </Link>
                </li>
              );
            }
            return (
              <li key={item} className="relative group">
                <Link
                  to={path}
                  className={`relative inline-block text-center px-2 py-1 font-semibold transition-all duration-300 text-md tracking-wide focus:outline-none ${
                    isActive
                      ? 'text-yellow-400'
                      : 'text-white hover:text-yellow-400'
                  }`}
                >
                  {item}
                  <span
                    className={`absolute left-0 bottom-0 w-full h-0.5 transition-all duration-300 ${
                      isActive
                        ? 'bg-yellow-400 scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)]'
                        : 'bg-yellow-400 scale-x-0 group-hover:scale-x-100 shadow-[0_4px_16px_0_rgba(255,193,7,0.7)]'
                    }`}
                    style={{ transformOrigin: 'left' }}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {showPlans && <SubscriptionModal />}
    </>
  );
}