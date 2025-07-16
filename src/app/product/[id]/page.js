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
  getGuestPrice
} from '@/lib/priceUtils';
import { getCurrentUser } from '@/lib/auth';
import * as motion from 'motion/react-client';
import { useState, useEffect } from 'react';

export default function ProductPage() {
  const params = useParams();
  const id = params.id;
  const [user, setUser] = useState(null);
  const [quantity, setQuantity] = useState(1);
  
  const product = getProductById(id);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Button onClick={() => window.history.back()}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const currentPrice = user 
    ? getPriceForUser(product, user.segment)
    : getGuestPrice(product);
  
  const discount = calculateDiscount(product.originalPrice, currentPrice);
  const badges = getBadges(product);
  const inventoryStatus = getInventoryStatus(product.inventory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
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

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(currentPrice)}
                </span>
                {discount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                    <span className="text-lg font-medium text-green-600">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
              
              {user ? (
                <p className="text-sm text-blue-600">
                  Your {user.segment} member price
                </p>
              ) : (
                <p className="text-sm text-gray-500">
                  Sign in for member pricing and additional discounts
                </p>
              )}
            </div>

            {/* Segment Pricing Table */}
            {user && (
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3">Member Pricing</h3>
                  <div className="space-y-2">
                    {Object.entries(product.segmentPrices).map(([segment, price]) => (
                      <div key={segment} className="flex justify-between">
                        <span className={`text-sm ${user.segment === segment ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                          {segment} {user.segment === segment ? '(You)' : ''}
                        </span>
                        <span className={`text-sm ${user.segment === segment ? 'font-bold text-blue-600' : 'text-gray-600'}`}>
                          {formatPrice(price)}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

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

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button size="lg" className="w-full">
                Add {quantity} to Cart - {formatPrice(currentPrice * quantity)}
              </Button>
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
              {product.isEligibleForTGTG && (
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Too Good To Go:</span>
                  <span className="text-sm font-medium text-green-600">Eligible</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
