'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import * as motion from 'motion/react-client';
import Link from 'next/link';

export default function SearchBar({ onSearch = () => {}, className = "" }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef(null);

  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const productResults = products
      .filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 4)
      .map(product => ({
        type: 'product',
        id: product.id,
        title: product.name,
        subtitle: product.brand,
        url: `/product/${product.id}`,
        icon: '🛍️'
      }));

    const categoryResults = categories
      .filter(category => 
        category.name.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 2)
      .map(category => ({
        type: 'category',
        id: category.id,
        title: category.name,
        subtitle: category.description,
        url: `/category/${category.slug}`,
        icon: category.icon
      }));

    setSuggestions([...categoryResults, ...productResults]);
    setIsOpen(true);
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % suggestions.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev <= 0 ? suggestions.length - 1 : prev - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          window.location.href = suggestions[selectedIndex].url;
        } else {
          onSearch(query);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products, brands, categories..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSuggestions([]);
              setIsOpen(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      {/* Search Suggestions */}
      {isOpen && suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <Link
              key={`${suggestion.type}-${suggestion.id}`}
              href={suggestion.url}
              onClick={() => setIsOpen(false)}
            >
              <motion.div
                whileHover={{ backgroundColor: '#f8fafc' }}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                  index === selectedIndex ? 'bg-blue-50' : ''
                }`}
              >
                <span className="text-xl">{suggestion.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{suggestion.title}</p>
                  <p className="text-sm text-gray-600">{suggestion.subtitle}</p>
                </div>
                <span className="text-xs text-gray-400 capitalize">{suggestion.type}</span>
              </motion.div>
            </Link>
          ))}
          
          {query && (
            <div className="border-t px-4 py-3">
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  onSearch(query);
                  setIsOpen(false);
                }}
              >
                Search for &quot;{query}&quot;
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
