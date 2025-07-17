'use client';

import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import ProductCard from '@/components/ProductCard';
import FloatingCart from '@/components/FloatingCart';
import { Button } from '@/components/ui/button';
import { products, getFeaturedProducts } from '@/data/products';
import { STORE_CONFIG } from '@/lib/constants';
import { Suspense, useState } from 'react';
import * as motion from 'motion/react-client';

function ProductsContent() {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter'); // 'deals' or null for all products
  const [userKey, setUserKey] = useState(0); // Key to force re-render of product cards
  
  const displayProducts = filter === 'deals' ? getFeaturedProducts() : products;
  const pageTitle = filter === 'deals' ? 'All Deals & Flash Sales' : 'All Products';
  const pageDescription = filter === 'deals' 
    ? 'Discover all our current deals, flash sales, and special offers'
    : 'Browse our complete selection with personalized pricing';

  const handleUserChange = (user) => {
    setUserKey(prev => prev + 1); // Force re-render of all product cards
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onUserChange={handleUserChange} />
      
      {/* Page Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              {pageDescription}
            </p>
            
            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              <Button 
                variant={!filter ? "default" : "outline"}
                onClick={() => window.location.href = '/products'}
              >
                All Products ({products.length})
              </Button>
              <Button 
                variant={filter === 'deals' ? "default" : "outline"}
                onClick={() => window.location.href = '/products?filter=deals'}
              >
                Deals Only ({getFeaturedProducts().length})
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayProducts.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {displayProducts.length} Products
                </h2>
                <div className="flex items-center gap-4">
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
                    <option>Sort by: Featured</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Name: A to Z</option>
                    <option>Discount: High to Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayProducts.map((product, index) => (
                  <motion.div
                    key={`${product.id}-${userKey}`} // Include userKey to force re-render
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your filters or browse all products.
              </p>
              <Button onClick={() => window.location.href = '/products'}>
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      <FloatingCart />
    </div>
  );
}


function ProductsLoadingFallback() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="animate-pulse">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
              <div className="flex justify-center gap-4">
                <div className="h-10 bg-gray-200 rounded w-32"></div>
                <div className="h-10 bg-gray-200 rounded w-32"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<ProductsLoadingFallback />}>
        <ProductsContent />
      </Suspense>
    </div>
  );
}