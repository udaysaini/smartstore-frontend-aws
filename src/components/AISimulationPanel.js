'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  simulateAIPricing, 
  simulateQuickAI, 
  simulateFullAI, 
  simulateExpiryFocus,
  simulateRetailPriceAdjustment,
  clearAIUpdates, 
  getAIAgentStatus, 
  getAIUpdatedProductsCount,
  AI_CONFIG,
  updateAIConfig
} from '@/lib/priceUtils';
import { products } from '@/data/products';
import * as motion from 'motion/react-client';

export default function AISimulationPanel({ onPriceUpdate, onNotification }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateCount, setUpdateCount] = useState(0);
  const [lastUpdateType, setLastUpdateType] = useState('');
  const [maxItems, setMaxItems] = useState(AI_CONFIG.MAX_ITEMS_TO_UPDATE);
  const [retailDuration, setRetailDuration] = useState(AI_CONFIG.RETAIL_ADJUSTMENT_DURATION); // New duration setting

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Use the main keyboard number keys and check for the actual key value
        //   console.log(`Key pressed: ${e.key}, Code: ${e.code}, Shift: ${e.shiftKey}, Ctrl: ${e.ctrlKey}`);
      
      // Ctrl+Shift+A: Toggle panel visibility
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
      
      // Alternative: Ctrl+Alt+A
      if (e.ctrlKey && e.altKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsVisible(!isVisible);
      }
      
      // Use Ctrl+Alt+number combinations instead of Ctrl+Shift+number
      // Ctrl+Alt+1: Quick AI (3 items)
      if (e.ctrlKey && e.altKey && (e.key === '1' || e.code === 'Digit1')) {
        e.preventDefault();
        handleQuickAI();
      }
      
      // Ctrl+Alt+2: Full AI (all configured items)
      if (e.ctrlKey && e.altKey && (e.key === '2' || e.code === 'Digit2')) {
        e.preventDefault();
        handleFullAI();
      }
      
      // Ctrl+Alt+3: Expiry Focus
      if (e.ctrlKey && e.altKey && (e.key === '3' || e.code === 'Digit3')) {
        e.preventDefault();
        handleExpiryFocus();
      }
      
      // Ctrl+Alt+0: Clear all updates
      if (e.ctrlKey && e.altKey && (e.key === '0' || e.code === 'Digit0')) {
        e.preventDefault();
        handleClearUpdates();
      }

      // Alternative function key shortcuts
      // F1: Quick AI
      if (e.key === 'F1') {
        e.preventDefault();
        handleQuickAI();
      }
      
      // F2: Expiry Focus
      if (e.key === 'F2') {
        e.preventDefault();
        handleExpiryFocus();
      }
      
      // F3: Full AI
      if (e.key === 'F3') {
        e.preventDefault();
        handleFullAI();
      }
      
      // F4: Clear updates
      if (e.key === 'F4') {
        e.preventDefault();
        handleClearUpdates();
      }
      
      // Ctrl+Alt+4: Retail Price Adjustment
      if (e.ctrlKey && e.altKey && (e.key === '4' || e.code === 'Digit4')) {
        e.preventDefault();
        handleRetailAdjustment();
      }
      
      // F5: Retail Price Adjustment
      if (e.key === 'F5') {
        e.preventDefault();
        handleRetailAdjustment();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const executeAIUpdate = async (updateFunction, updateType) => {
    setIsUpdating(true);
    setLastUpdateType(updateType);
    
    // Update configuration if maxItems changed
    updateAIConfig({ MAX_ITEMS_TO_UPDATE: maxItems });
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const updates = updateFunction(products);
    setUpdateCount(Object.keys(updates).length);
    
    setIsUpdating(false);
    
    // Notify parent components to re-render
    if (onPriceUpdate) {
      onPriceUpdate();
    }
  };

  const handleQuickAI = () => executeAIUpdate(simulateQuickAI, 'Quick AI (3 items)');
  const handleFullAI = () => executeAIUpdate(simulateFullAI, 'Full AI Analysis');
  const handleExpiryFocus = () => executeAIUpdate(simulateExpiryFocus, 'Expiry-Focused');
  const handleCustomAI = () => executeAIUpdate((products) => simulateAIPricing(products, maxItems), `Custom (${maxItems} items)`);

  const handleClearUpdates = () => {
    clearAIUpdates();
    setUpdateCount(0);
    setLastUpdateType('');
    if (onPriceUpdate) {
      onPriceUpdate();
    }
  };

  const handleRetailAdjustment = async () => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    setLastUpdateType('Retail Price Adjustment');
    
    // Show loading notification
    const loadingNotificationId = onNotification({
      type: 'info',
      title: 'AI Competitive Analysis',
      message: 'Scraping competitor websites and analyzing market prices...',
      showLoader: true,
      duration: retailDuration,
      autoRemove: false
    });

    // Update configuration
    updateAIConfig({ 
      MAX_ITEMS_TO_UPDATE: maxItems,
      RETAIL_ADJUSTMENT_DURATION: retailDuration 
    });
    
    // Wait for the specified duration
    await new Promise(resolve => setTimeout(resolve, retailDuration));
    
    // Remove loading notification
    if (onNotification.remove) {
      onNotification.remove(loadingNotificationId);
    }
    
    // Execute the retail adjustment
    const updates = simulateRetailPriceAdjustment(products, maxItems);
    setUpdateCount(Object.keys(updates).length);
    
    setIsUpdating(false);
    
    // Show success notification with confetti
    onNotification({
      type: 'success',
      title: 'Prices Updated! 🎉',
      message: `Found better prices for ${Object.keys(updates).length} products. You're now getting the best deals in town!`,
      showConfetti: true,
      duration: 6000
    });
    
    // Notify parent components to re-render
    if (onPriceUpdate) {
      onPriceUpdate();
    }
  };

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
      className="fixed bottom-4 left-4 z-50 w-96"
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
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span>AI Status:</span>
                <span className={`font-medium ${getAIAgentStatus() ? 'text-green-600' : 'text-gray-500'}`}>
                  {getAIAgentStatus() ? 'Active' : 'Inactive'}
                </span>
              </div>
              {updateCount > 0 && (
                <>
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <span className="font-medium text-blue-600">{updateCount} items</span>
                  </div>
                  <div className="col-span-2 flex justify-between">
                    <span>Last Run:</span>
                    <span className="font-medium text-purple-600">{lastUpdateType}</span>
                  </div>
                </>
              )}
            </div>

            {/* Max Items Control */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Max Items:</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setMaxItems(Math.max(1, maxItems - 1))}
                  className="w-6 h-6 bg-gray-100 rounded text-sm hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-sm font-medium w-8 text-center">{maxItems}</span>
                <button 
                  onClick={() => setMaxItems(Math.min(20, maxItems + 1))}
                  className="w-6 h-6 bg-gray-100 rounded text-sm hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* Duration Control for Retail Adjustment */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Process Duration:</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setRetailDuration(Math.max(2000, retailDuration - 1000))}
                  className="w-6 h-6 bg-gray-100 rounded text-sm hover:bg-gray-200"
                >
                  -
                </button>
                <span className="text-sm font-medium w-12 text-center">{retailDuration/1000}s</span>
                <button 
                  onClick={() => setRetailDuration(Math.min(15000, retailDuration + 1000))}
                  className="w-6 h-6 bg-gray-100 rounded text-sm hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            {/* AI Simulation Buttons */}
            <div className="space-y-2">
              <Button
                onClick={handleQuickAI}
                disabled={isUpdating}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-sm"
                size="sm"
              >
                {isUpdating && lastUpdateType === 'Quick AI (3 items)' ? '🔄 Processing...' : '⚡ Quick AI (Ctrl+Alt+1 / F1)'}
              </Button>

              <Button
                onClick={handleExpiryFocus}
                disabled={isUpdating}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-sm"
                size="sm"
              >
                {isUpdating && lastUpdateType === 'Expiry-Focused' ? '🔄 Processing...' : '🚨 Expiry Focus (Ctrl+Alt+3 / F2)'}
              </Button>

              <Button
                onClick={handleFullAI}
                disabled={isUpdating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm"
                size="sm"
              >
                {isUpdating && lastUpdateType === 'Full AI Analysis' ? '🔄 Processing...' : '🚀 Full AI (Ctrl+Alt+2 / F3)'}
              </Button>

              <Button
                onClick={handleCustomAI}
                disabled={isUpdating}
                variant="outline"
                className="w-full text-sm"
                size="sm"
              >
                {isUpdating && lastUpdateType.includes('Custom') ? '🔄 Processing...' : `🎯 Custom (${maxItems} items)`}
              </Button>

              <Button
                onClick={handleRetailAdjustment}
                disabled={isUpdating}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-sm"
                size="sm"
              >
                {isUpdating && lastUpdateType === 'Retail Price Adjustment' ? '🔄 Analyzing...' : '🏪 Retail Price Match (Ctrl+Alt+4 / F5)'}
              </Button>

              {updateCount > 0 && (
                <Button
                  onClick={handleClearUpdates}
                  variant="outline"
                  className="w-full text-sm border-red-200 text-red-600 hover:bg-red-50"
                  size="sm"
                >
                  🔄 Reset Prices (Ctrl+Alt+0 / F4)
                </Button>
              )}
            </div>

            {/* Keyboard Shortcuts Help */}
            <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
              <p className="font-medium mb-1">Keyboard Shortcuts:</p>
              <div className="space-y-1">
                <div>Ctrl+Alt+A: Toggle Panel</div>
                <div>Ctrl+Alt+1 / F1: Quick AI</div>
                <div>Ctrl+Alt+2 / F3: Full AI</div>
                <div>Ctrl+Alt+3 / F2: Expiry Focus</div>
                <div>Ctrl+Alt+4 / F5: Retail Match</div>
                <div>Ctrl+Alt+0 / F4: Reset Prices</div>
              </div>
            </div>

            {/* AI Processing Indicator */}
            {isUpdating && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded border border-blue-200"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                />
                <span className="text-sm font-medium text-blue-700">
                  AI Analyzing {lastUpdateType}...
                </span>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
