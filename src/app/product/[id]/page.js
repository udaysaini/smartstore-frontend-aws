'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getProductById } from '@/data/products';
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

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [priceKey, setPriceKey] = useState(0); // Key to trigger price animations
  
  const product = getProductById(id);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleUserChange = (newUser) => {
    setUser(newUser);
    setPriceKey(prev => prev + 1); // Trigger price animation
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header onUserChange={handleUserChange} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const userType = user?.segment || 'Regular';
  const { currentPrice, originalPrice, discount, showDiscount } = getPricingInfo(product, userType);
  const badges = getBadges(product);
  const inventoryStatus = getInventoryStatus(product.inventory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onUserChange={handleUserChange} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {badges.map((badge) => (
                <span
                  key={badge.type}
                  className={`${badge.color} text-white text-sm font-medium px-3 py-1.5 rounded-md shadow-sm`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Brand */}
            <p className="text-sm text-gray-500 font-medium">{product.brand}</p>
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            
            {/* Description */}
            <p className="text-gray-600">{product.description}</p>

            {/* Nutrition Score */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">Nutrition Score:</span>
              <span className={`text-sm font-bold px-3 py-1 rounded ${
                product.nutritionScore.startsWith('A') ? 'bg-green-100 text-green-800' :
                product.nutritionScore.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {product.nutritionScore}
              </span>
            </div>

            {/* Pricing with animations */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <motion.span 
                  key={`${currentPrice}-${priceKey}`} // Include priceKey for animation trigger
                  className="text-3xl font-bold text-gray-900"
                  initial={{ scale: 1.2, color: '#22c55e' }}
                  animate={{ scale: 1, color: '#111827' }}
                  transition={{ duration: 0.5 }}
                >
                  {formatPrice(currentPrice)}
                </motion.span>
                {showDiscount && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(originalPrice)}
                    </span>
                    <motion.span 
                      key={`discount-${priceKey}`}
                      className="text-lg font-medium text-green-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 500 }}
                    >
                      {discount}% off
                    </motion.span>
                  </>
                )}
              </div>
              
              {user ? (
                <motion.p 
                  key={`user-info-${priceKey}`}
                  className="text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {user.segment === 'VIP' ? (
                    <span className="text-yellow-600 font-medium">⭐ Your exclusive VIP price</span>
                  ) : (
                    <span className="text-blue-600">Your member price</span>
                  )}
                </motion.p>
              ) : (
                <p className="text-sm text-gray-500">
                  Join VIP for exclusive pricing and member benefits
                </p>
              )}
            </div>

            {/* Pricing Comparison Table with animations */}
            <motion.div
              key={`pricing-table-${priceKey}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Pricing Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Regular Price</span>
                      <span className="text-sm font-medium">{formatPrice(product.prices.regular)}</span>
                    </div>
                    {product.prices.discounted && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Sale Price</span>
                        <span className="text-sm font-medium text-green-600">{formatPrice(product.prices.discounted)}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-t pt-2">
                      <span className={`text-sm font-medium ${user?.segment === 'VIP' ? 'text-yellow-600' : 'text-gray-600'}`}>
                        VIP Price {user?.segment === 'VIP' ? '(You!)' : ''}
                      </span>
                      <motion.span 
                        className={`text-sm font-bold ${user?.segment === 'VIP' ? 'text-yellow-600' : 'text-gray-900'}`}
                        animate={user?.segment === 'VIP' ? {
                          scale: [1, 1.1, 1],
                          color: ['#d97706', '#f59e0b', '#d97706']
                        } : {}}
                        transition={{ duration: 1 }}
                      >
                        {formatPrice(product.prices.vip)}
                      </motion.span>
                    </div>
                  </div>
                  {!user && (
                    <motion.div 
                      className="mt-3 p-2 bg-yellow-50 rounded text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <p className="text-xs text-yellow-800">Join VIP to save {calculateDiscount(product.prices.regular, product.prices.vip)}% on this item!</p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Inventory Status */}
            <div className={`text-sm ${inventoryStatus.color}`}>
              {inventoryStatus.label}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:text-gray-900"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart with animated total */}
            <div className="space-y-3">
              <motion.div
                key={`cart-button-${priceKey}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Button size="lg" className="w-full">
                  Add {quantity} to Cart - {formatPrice(currentPrice * quantity)}
                </Button>
              </motion.div>
              <Button size="lg" variant="outline" className="w-full">
                Buy Now
              </Button>
            </div>

            {/* Product Info */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Expiry Date:</span>
                <span className="text-sm font-medium">{new Date(product.expiryDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Category:</span>
                <span className="text-sm font-medium capitalize">{product.category}</span>
              </div>
              {product.madeInCanada && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Origin:</span>
                  <span className="text-sm font-medium text-red-600">🍁 Made in Canada</span>
                </div>
              )}
              {product.isQuickSale && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Quick Sale:</span>
                  <span className="text-sm font-medium text-orange-600">🚀 Limited Time</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
