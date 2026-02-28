'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const primaryNav = [
    { name: 'Home', path: '/' },
    { name: 'AI Assistant', path: '/home' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Telehealth', path: '/telehealth' },
    { name: 'Services', path: '/services' },
  ];

  const moreNav = [
    { name: 'Symptom Checker', path: '/symptom-checker' },
    { name: 'Drug Interactions', path: '/drug-interactions' },
    { name: 'Dosage Calculator', path: '/dosage-calculator' },
    { name: 'Appointments', path: '/appointments' },
    { name: 'Clinician Portal', path: '/clinician' },
    { name: 'Guardian Care', path: '/guardians' },
    { name: 'Health Articles', path: '/articles' },
    { name: 'Support', path: '/support' },
    { name: 'Contact', path: '/contact' },
  ];

  const authItems = [
    { name: 'Login', path: '/login' },
    { name: 'Sign Up', path: '/signup' },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 group-hover:bg-white/30 transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-white tracking-tight">
                  PeaceMatcher
                </span>
              </Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {primaryNav.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === item.path
                    ? 'bg-white/25 text-white shadow-inner'
                    : 'text-white/90 hover:bg-white/15 hover:text-white'
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMoreOpen(!moreOpen)}
                  onBlur={() => setTimeout(() => setMoreOpen(false), 200)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${moreNav.some(i => i.path === pathname)
                    ? 'bg-white/25 text-white'
                    : 'text-white/90 hover:bg-white/15'
                    }`}
                >
                  More
                  <svg className={`w-4 h-4 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {moreOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {moreNav.map((item) => (
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`block px-4 py-2.5 text-sm transition-colors ${pathname === item.path
                          ? 'bg-emerald-50 text-emerald-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                          }`}
                        onClick={() => setMoreOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-8 bg-white/20 mx-2" />

              {/* Auth */}
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${pathname === '/login'
                    ? 'bg-white text-emerald-700 border-white'
                    : 'text-white border-white/40 hover:bg-white/15 hover:border-white/60'
                    }`}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === '/signup'
                    ? 'bg-white text-emerald-700 shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                    }`}
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/15 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Out Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="fixed inset-y-0 right-0 w-80 max-w-[85vw] bg-white z-50 lg:hidden shadow-2xl overflow-y-auto">
            {/* Drawer Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-5 flex items-center justify-between">
              <span className="text-lg font-bold text-white">PeaceMatcher</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Nav Links */}
            <div className="px-4 py-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Navigation</p>
              {primaryNav.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors mb-0.5 ${pathname === item.path
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="border-t border-gray-100 my-3" />
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">More</p>

              {moreNav.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-3 rounded-lg text-sm font-medium transition-colors mb-0.5 ${pathname === item.path
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block w-full px-4 py-3 text-center rounded-xl text-sm font-semibold border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors mb-3"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileOpen(false)}
                className="block w-full px-4 py-3 text-center rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-all shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavBar;