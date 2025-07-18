'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { simulateAIPricing, clearAIUpdates, getAIAgentStatus, getAIUpdatedProductsCount } from '@/lib/priceUtils';
import { products } from '@/data/products';
import * as motion from 'motion/react-client';

export default function AISimulationPanel({ onPriceUpdate }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);

  const handleAIUpdate = async () => {
    setIsUpdating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const updates = simulateAIPricing(products);
    setUpdateCount(Object.keys(updates).length);
    
    setIsUpdating(false);
    
    // Notify parent components to re-render
    if (onPriceUpdate) {
      onPriceUpdate();
    }
    
    // Auto-hide after successful update
    setTimeout(() => setIsVisible(false), 3000);
  };

  const handleClearUpdates = () => {
    clearAIUpdates();
    setUpdateCount(0);
    if (onPriceUpdate) {
      onPriceUpdate();
    }
  };

  // Hidden trigger - press Ctrl+Shift+A to show panel
  useState(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setIsVisible(!isVisible);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 left-4 z-50">
        <motion.button
          onClick={() => setIsVisible(true)}
          className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-sm font-bold"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="AI Demo Controls (Ctrl+Shift+A)"
        >
          🤖
        </motion.button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -300 }}
      className="fixed bottom-4 left-4 z-50 w-80"
    >
      <Card className="shadow-2xl border-2 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              🤖 AI Demo Controls
            </h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            {/* Status */}
            <div className="flex items-center justify-between text-sm">
              <span>AI Agent Status:</span>
              <span className={`font-medium ${getAIAgentStatus() ? 'text-green-600' : 'text-gray-500'}`}>
                {getAIAgentStatus() ? 'Active' : 'Inactive'}
              </span>
            </div>

            {updateCount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span>Products Updated:</span>
                <span className="font-medium text-blue-600">{updateCount}</span>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-2">
              <Button
                onClick={handleAIUpdate}
                disabled={isUpdating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isUpdating ? (
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    AI Analyzing Prices...
                  </div>
                ) : (
                  '🚀 Trigger AI Price Update'
                )}
              </Button>

              {updateCount > 0 && (
                <Button
                  onClick={handleClearUpdates}
                  variant="outline"
                  className="w-full"
                >
                  Reset to Original Prices
                </Button>
              )}
            </div>

            {/* Demo Instructions */}
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              <p className="font-medium mb-1">Demo Flow:</p>
              <ol className="space-y-1">
                <li>1. Show original prices</li>
                <li>2. Demonstrate AI agents in Bedrock</li>
                <li>3. Click "Trigger AI Price Update"</li>
                <li>4. Show updated prices with reasons</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
