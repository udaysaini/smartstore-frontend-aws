'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import { getUserSegment, isAuthenticated, getCurrentUser, login, logout } from '@/lib/auth';
import { STORE_CONFIG } from '@/lib/constants';
import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

export default function Header({ onUserChange = () => {} }) {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleQuickLogin = (type) => {
    let email;
    switch(type) {
      case 'admin':
        email = 'admin@smartstore.com';
        break;
      case 'vip':
        email = 'vip@smartstore.com';
        break;
      default:
        email = 'customer@smartstore.com';
    }
    
    const result = login(email, 'password');
    if (result.success) {
      setUser(result.user);
      onUserChange(result.user); // Notify parent components
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    onUserChange(null); // Notify parent components
  };

  return (
    <motion.header 
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">{STORE_CONFIG.name}</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <SearchBar />
          </div>

          {/* Navigation - Better spaced */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Products
            </Link>
            <Link href="/products?filter=deals" className="text-red-600 hover:text-red-700 transition-colors font-medium flex items-center gap-1">
              🔥 Deals
            </Link>
            <div className="h-6 w-px bg-gray-300"></div> {/* Separator */}
          </nav>

          {/* User Actions - Improved spacing and layout */}
          <div className="flex items-center space-x-4 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-4">
                {/* User Info */}
                <div className="text-sm hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Hello,</span>
                    <span className="font-semibold text-gray-900">{user.name}</span>
                  </div>
                  {user.segment === 'VIP' && (
                    <div className="text-xs text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                      ⭐ VIP Member
                    </div>
                  )}
                  {user.segment === 'Premium' && (
                    <div className="text-xs text-purple-600 font-medium flex items-center gap-1 mt-0.5">
                      💎 Premium
                    </div>
                  )}
                  {user.segment === 'Standard' && (
                    <div className="text-xs text-blue-600 font-medium flex items-center gap-1 mt-0.5">
                      👤 Standard
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                  {user.role === 'admin' && (
                    <Link href="/admin">
                      <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-600 hover:text-gray-900">
                    Logout
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Quick Login Options */}
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Quick Login:</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuickLogin('customer')}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    Customer
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuickLogin('vip')}
                    className="text-amber-600 hover:bg-amber-50 font-medium"
                  >
                    ⭐ VIP
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleQuickLogin('admin')}
                    className="text-green-600 hover:bg-green-50"
                  >
                    Admin
                  </Button>
                </div>

                {/* Mobile Login Dropdown */}
                <div className="sm:hidden relative">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    Login ▾
                  </Button>
                  {isMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 mt-2 bg-white rounded-lg shadow-xl border py-2 min-w-[120px] z-50"
                    >
                      <button 
                        onClick={() => { handleQuickLogin('customer'); setIsMenuOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50"
                      >
                        Customer
                      </button>
                      <button 
                        onClick={() => { handleQuickLogin('vip'); setIsMenuOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-amber-600"
                      >
                        ⭐ VIP
                      </button>
                      <button 
                        onClick={() => { handleQuickLogin('admin'); setIsMenuOpen(false); }}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 text-green-600"
                      >
                        Admin
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            )}
            
            {/* Cart Icon - Better positioned */}
            <div className="flex items-center space-x-2">
              <div className="h-6 w-px bg-gray-300 hidden sm:block"></div> {/* Separator */}
              <Button variant="ghost" size="sm" className="relative hover:bg-blue-50">
                <span className="text-xl">🛒</span>
                <motion.span 
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.3 }}
                >
                  3
                </motion.span>
              </Button>

              {/* Mobile Search Toggle */}
              <Button variant="ghost" size="sm" className="md:hidden">
                🔍
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </motion.header>
  );
}
