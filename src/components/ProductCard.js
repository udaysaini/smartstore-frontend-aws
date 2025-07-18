'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  getPriceForUser, 
  calculateDiscount, 
  formatPrice, 
  getBadges,
  getInventoryStatus,
  getGuestPrice,
  getPricingInfo
} from '@/lib/priceUtils';
import { getCurrentUser } from '@/lib/auth';
import * as motion from 'motion/react-client';
import { useState, useEffect } from 'react';

export default function ProductCard({ product, className = "" }) {
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Use new pricing structure with AI updates
  const userType = user?.segment || 'Regular';
  const { currentPrice, originalPrice, discount, showDiscount, isAIUpdated, aiReason } = getPricingInfo(product, userType);
  const badges = getBadges(product);
  const inventoryStatus = getInventoryStatus(product.inventory);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    // You could add a toast notification here
  };

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={`group ${className}`}
    >
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md">
        <div className="relative">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
            
            {/* Badges with stagger animation */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {badges.map((badge, index) => (
                <motion.span
                  key={badge.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`${badge.color} text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm`}
                >
                  {badge.label}
                </motion.span>
              ))}
            </div>

            {/* Quick Add Button with loading state */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-2 right-2"
            >
              <motion.div
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="sm" 
                  className="shadow-lg relative overflow-hidden"
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                >
                  {isAddingToCart ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    "Quick Add"
                  )}
                </Button>
              </motion.div>
            </motion.div>

            {/* AI Updated Badge */}
            {isAIUpdated && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 500 }}
                className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
              >
                🤖 AI Updated
              </motion.div>
            )}

            {/* Price animation overlay */}
            {discount > 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: isHovered ? 1 : 0 }}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
              >
                -{discount}%
              </motion.div>
            )}
          </div>

          <CardContent className="p-4">
            {/* Brand */}
            <p className="text-xs text-gray-500 font-medium mb-1">{product.brand}</p>
            
            {/* Product Name with hover effect */}
            <Link href={`/product/${product.id}`}>
              <motion.h3 
                className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                whileHover={{ x: 2 }}
              >
                {product.name}
              </motion.h3>
            </Link>

            {/* Nutrition Score with pulse animation */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Nutrition Score:</span>
              <motion.span 
                className={`text-xs font-bold px-2 py-0.5 rounded ${
                  product.nutritionScore.startsWith('A') ? 'bg-green-100 text-green-800' :
                  product.nutritionScore.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}
                whileHover={{ scale: 1.1 }}
                animate={product.nutritionScore.startsWith('A') ? { 
                  boxShadow: ['0 0 0 0 rgba(34, 197, 94, 0.4)', '0 0 0 10px rgba(34, 197, 94, 0)']
                } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {product.nutritionScore}
              </motion.span>
            </div>

            {/* AI Pricing Info */}
            {isAIUpdated && (
              <motion.div 
                className="mb-3 p-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-md border border-blue-200"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-medium text-blue-700">🤖 AI Price Update</span>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-3 h-3 border border-blue-500 border-t-transparent rounded-full"
                  />
                </div>
                <p className="text-xs text-blue-600">{aiReason}</p>
              </motion.div>
            )}

            {/* Pricing with number animation */}
            <div className="flex items-center gap-2 mb-3">
              <motion.span 
                className="text-lg font-bold text-gray-900"
                key={`${currentPrice}-${isAIUpdated}`}
                initial={{ scale: isAIUpdated ? 1.3 : 1.2, color: isAIUpdated ? '#3b82f6' : '#22c55e' }}
                animate={{ scale: 1, color: '#111827' }}
                transition={{ duration: isAIUpdated ? 0.8 : 0.3 }}
              >
                {formatPrice(currentPrice)}
              </motion.span>
              {showDiscount && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(originalPrice)}
                  </span>
                  <motion.span 
                    className="text-sm font-medium text-green-600"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 500 }}
                  >
                    {discount}% off
                  </motion.span>
                </>
              )}
            </div>

            {/* User Pricing Info */}
            {user ? (
              <motion.div 
                className="text-xs mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {user.segment === 'VIP' ? (
                  <span className="text-yellow-600 font-medium">
                    ⭐ Your VIP price {isAIUpdated ? '(AI Enhanced!)' : ''}
                  </span>
                ) : (
                  <span className="text-blue-600">
                    Your member price {isAIUpdated ? '(AI Updated!)' : ''}
                  </span>
                )}
              </motion.div>
            ) : (
              <div className="text-xs text-gray-500 mb-2">
                Sign up for VIP pricing & exclusive deals
              </div>
            )}

            {/* Inventory Status with color animation */}
            <motion.div 
              className={`text-xs ${inventoryStatus.color} mb-3`}
              animate={inventoryStatus.status === 'critical' ? {
                color: ['#dc2626', '#ef4444', '#dc2626']
              } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {inventoryStatus.label}
            </motion.div>

            {/* Add to Cart Button with improved interaction */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                className="w-full" 
                variant="outline"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                {isAddingToCart ? "Adding..." : "Add to Cart"}
              </Button>
            </motion.div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
