'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getUserSegment, isAuthenticated, getCurrentUser, login, logout } from '@/lib/auth';
import { useState, useEffect } from 'react';
import * as motion from 'motion/react-client';

export default function Header() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleQuickLogin = (type) => {
    const email = type === 'admin' ? 'admin@smartstore.com' : 'customer@smartstore.com';
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
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">SmartStore</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/category/produce" className="text-gray-700 hover:text-blue-600 transition-colors">
              Fresh Produce
            </Link>
            <Link href="/category/dairy" className="text-gray-700 hover:text-blue-600 transition-colors">
              Dairy
            </Link>
            <Link href="/category/meat" className="text-gray-700 hover:text-blue-600 transition-colors">
              Meat & Seafood
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <span className="text-gray-600">Hello, </span>
                  <span className="font-medium text-gray-900">{user.name}</span>
                  <div className="text-xs text-blue-600 font-medium">
                    {user.segment} Member
                  </div>
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
                >
                  Customer Login
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleQuickLogin('admin')}
                >
                  Admin Login
                </Button>
              </div>
            )}
            
            {/* Cart Icon */}
            <Button variant="ghost" size="sm" className="relative">
              🛒
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
