'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/SearchBar';
import { getUserSegment, isAuthenticated, getCurrentUser, login, logout } from '@/lib/auth';
import { STORE_CONFIG } from '@/lib/constants';
import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

export default function Header() {
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
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
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

          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              Products
            </Link>
            <Link href="/products?filter=deals" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              Deals
            </Link>
            <Link href="/category/produce" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
              Produce
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm hidden sm:block">
                  <span className="text-gray-600">Hello, </span>
                  <span className="font-medium text-gray-900">{user.name}</span>
                  {user.segment === 'VIP' && (
                    <div className="text-xs text-yellow-600 font-medium flex items-center gap-1">
                      ⭐ VIP Member
                    </div>
                  )}
                </div>
                {user.role === 'admin' && (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleQuickLogin('customer')}
                  className="hidden sm:inline-flex"
                >
                  Login
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickLogin('vip')}
                  className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                >
                  VIP Login
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickLogin('admin')}
                >
                  Admin
                </Button>
              </div>
            )}
            
            {/* Cart Icon */}
            <Button variant="ghost" size="sm" className="relative">
              🛒
              <motion.span 
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
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

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>
    </motion.header>
  );
}
