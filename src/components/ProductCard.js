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
  getGuestPrice
} from '@/lib/priceUtils';
import { getCurrentUser } from '@/lib/auth';
import * as motion from 'motion/react-client';
import { useState, useEffect } from 'react';

export default function ProductCard({ product, className = "" }) {
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // Fix: Use consistent pricing based on user state
  const currentPrice = user 
    ? getPriceForUser(product, user.segment)
    : getGuestPrice(product);
  
  const discount = calculateDiscount(product.originalPrice, currentPrice);
  const badges = getBadges(product);
  const inventoryStatus = getInventoryStatus(product.inventory);

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
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {badges.map((badge, index) => (
                <motion.span
                  key={badge.type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${badge.color} text-white text-xs font-medium px-2 py-1 rounded-md shadow-sm`}
                >
                  {badge.label}
                </motion.span>
              ))}
            </div>

            {/* Quick Add Button - appears on hover */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-2 right-2"
            >
              <Button size="sm" className="shadow-lg">
                Quick Add
              </Button>
            </motion.div>
          </div>

          <CardContent className="p-4">
            {/* Brand */}
            <p className="text-xs text-gray-500 font-medium mb-1">{product.brand}</p>
            
            {/* Product Name */}
            <Link href={`/product/${product.id}`}>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Nutrition Score */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-500">Nutrition Score:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                product.nutritionScore.startsWith('A') ? 'bg-green-100 text-green-800' :
                product.nutritionScore.startsWith('B') ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {product.nutritionScore}
              </span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(currentPrice)}
              </span>
              {discount > 0 && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {discount}% off
                  </span>
                </>
              )}
            </div>

            {/* User Segment Pricing Info */}
            {user ? (
              <div className="text-xs text-blue-600 mb-2">
                Your {user.segment} price
              </div>
            ) : (
              <div className="text-xs text-gray-500 mb-2">
                Sign in for member pricing
              </div>
            )}

            {/* Inventory Status */}
            <div className={`text-xs ${inventoryStatus.color} mb-3`}>
              {inventoryStatus.label}
            </div>

            {/* Add to Cart Button */}
            <Button className="w-full" variant="outline">
              Add to Cart
            </Button>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  );
}
