'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { formatPrice } from '@/lib/priceUtils';
import * as motion from 'motion/react-client';

export default function FloatingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems] = useState([
    { id: 1, name: 'Greek Yogurt', price: 3.99, quantity: 2 },
    { id: 2, name: 'Organic Bananas', price: 2.49, quantity: 1 }
  ]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Floating Cart Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 500 }}
      >
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={totalItems > 0 ? {
            boxShadow: [
              '0 4px 20px rgba(59, 130, 246, 0.3)',
              '0 8px 30px rgba(59, 130, 246, 0.5)',
              '0 4px 20px rgba(59, 130, 246, 0.3)'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-2xl">🛒</span>
          {totalItems > 0 && (
            <motion.span
              className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              key={totalItems}
              transition={{ type: "spring", stiffness: 500 }}
            >
              {totalItems}
            </motion.span>
          )}
        </motion.button>
      </motion.div>

      {/* Cart Drawer */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        animate={{ opacity: isOpen ? 1 : 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          onClick={() => setIsOpen(false)}
        />

        {/* Cart Panel */}
        <motion.div
          className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl pointer-events-auto"
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? 0 : '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="p-6 h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                {formatPrice(item.price)} × {item.quantity}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <button className="w-6 h-6 bg-gray-100 rounded text-sm">-</button>
                                <span className="text-sm">{item.quantity}</span>
                                <button className="w-6 h-6 bg-gray-100 rounded text-sm">+</button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <motion.div
                className="border-t pt-4 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="w-full" size="lg">
                    Checkout
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
