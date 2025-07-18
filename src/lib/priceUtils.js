import { getUserSegment as getAuthUserSegment } from '@/lib/auth';

// AI Agent simulation state
let aiUpdatedPrices = {};
let aiAgentActive = false;

// AI Configuration
export const AI_CONFIG = {
  MAX_ITEMS_TO_UPDATE: 8, // Maximum number of items to update at once
  EXPIRY_DISCOUNTS: {
    TODAY: 50,        // 50% discount for items expiring today
    TOMORROW: 40,     // 40% discount for items expiring tomorrow  
    TWO_DAYS: 30,     // 30% discount for items expiring in 2 days
    THREE_DAYS: 20    // 20% discount for items expiring in 3 days
  },
  INVENTORY_DISCOUNT: 15,  // 15% discount for overstocked items
  VIP_PREMIUM_DISCOUNT: 25, // 25% additional VIP discount on premium items
  OVERSTOCK_THRESHOLD: 30,   // Items with more than 30 units considered overstocked
  RETAIL_ADJUSTMENT_DURATION: 8000, // Duration for retail price adjustment simulation (8 seconds)
  RETAIL_DISCOUNT_RANGE: { min: 5, max: 20 } // Discount range for retail adjustments
};

// Update AI configuration
export const updateAIConfig = (newConfig) => {
  Object.assign(AI_CONFIG, newConfig);
};

export const getPriceForUser = (product, userType) => {
  // Check if AI has updated this product's pricing
  const updatedProduct = getAIUpdatedProduct(product);
  
  if (userType === 'VIP') {
    return updatedProduct.prices.vip;
  }
  
  // For regular users, return discounted price if available, otherwise regular price
  return updatedProduct.prices.discounted || updatedProduct.prices.regular;
};

export const getGuestPrice = (product) => {
  const updatedProduct = getAIUpdatedProduct(product);
  // Guests see discounted price if available, otherwise regular price
  return updatedProduct.prices.discounted || updatedProduct.prices.regular;
};

export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice === currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD'
  }).format(price);
};

export const getBadges = (product) => {
  const badges = [];
  const updatedProduct = getAIUpdatedProduct(product);
  
  // Check if AI created a flash sale
  if (updatedProduct.isAIUpdated && updatedProduct.aiReason.includes('FLASH SALE')) {
    badges.push({
      type: 'ai-flash-sale',
      label: '🤖 AI Flash Sale',
      color: 'bg-gradient-to-r from-red-500 to-orange-500'
    });
  } else if (product.isFlashSale) {
    badges.push({
      type: 'flash-sale',
      label: '⚡ Flash Sale',
      color: 'bg-red-500'
    });
  }
  
  if (product.isQuickSale) {
    badges.push({
      type: 'quick-sale',
      label: '🚀 Quick Sale',
      color: 'bg-orange-500'
    });
  }
  
  if (product.madeInCanada) {
    badges.push({
      type: 'made-in-canada',
      label: '🍁 Made in Canada',
      color: 'bg-red-600'
    });
  }
  
  return badges;
};

export const getInventoryStatus = (inventory) => {
  if (inventory <= 5) {
    return {
      status: 'critical',
      label: `Only ${inventory} left!`,
      color: 'text-red-600'
    };
  } else if (inventory <= 15) {
    return {
      status: 'low',
      label: `${inventory} in stock`,
      color: 'text-orange-600'
    };
  } else {
    return {
      status: 'good',
      label: `${inventory} in stock`,
      color: 'text-green-600'
    };
  }
};

export const getPricingInfo = (product, userType) => {
  const updatedProduct = getAIUpdatedProduct(product);
  const regularPrice = updatedProduct.prices.regular;
  const discountedPrice = updatedProduct.prices.discounted;
  const vipPrice = updatedProduct.prices.vip;
  
  let currentPrice, originalPrice, discount;
  
  if (userType === 'VIP') {
    currentPrice = vipPrice;
    originalPrice = discountedPrice || regularPrice;
  } else {
    currentPrice = discountedPrice || regularPrice;
    originalPrice = discountedPrice ? regularPrice : null;
  }
  
  discount = originalPrice ? calculateDiscount(originalPrice, currentPrice) : 0;
  
  return {
    currentPrice,
    originalPrice,
    discount,
    showDiscount: discount > 0,
    isAIUpdated: updatedProduct.isAIUpdated,
    aiReason: updatedProduct.aiReason
  };
};

export const hasDiscount = (product, userType) => {
  const { discount } = getPricingInfo(product, userType);
  return discount > 0;
};

// AI Agent Simulation Functions
export const getAIUpdatedProduct = (product) => {
  if (aiUpdatedPrices[product.id]) {
    return {
      ...product,
      prices: aiUpdatedPrices[product.id].prices,
      isAIUpdated: true,
      aiReason: aiUpdatedPrices[product.id].reason,
      aiTimestamp: aiUpdatedPrices[product.id].timestamp
    };
  }
  return { ...product, isAIUpdated: false };
};

export const simulateAIPricing = (products, maxItems = AI_CONFIG.MAX_ITEMS_TO_UPDATE) => {
  aiAgentActive = true;
  
  // Simulate AI agents analyzing and updating prices
  const updates = {};
  const candidates = []; // Array to store potential updates with priority
  
  products.forEach(product => {
    const daysToExpiry = Math.ceil((new Date(product.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    // Priority 1: Items expiring very soon (0-3 days)
    if (daysToExpiry >= 0 && daysToExpiry <= 3) {
      let discountPercent;
      let reason;
      
      if (daysToExpiry === 0) {
        discountPercent = AI_CONFIG.EXPIRY_DISCOUNTS.TODAY;
        reason = `Pricing Agent: ${discountPercent}% FLASH SALE - Expires TODAY!`;
      } else if (daysToExpiry === 1) {
        discountPercent = AI_CONFIG.EXPIRY_DISCOUNTS.TOMORROW;
        reason = `Pricing Agent: ${discountPercent}% discount - Expires TOMORROW`;
      } else if (daysToExpiry === 2) {
        discountPercent = AI_CONFIG.EXPIRY_DISCOUNTS.TWO_DAYS;
        reason = `Pricing Agent: ${discountPercent}% discount - Expires in 2 days`;
      } else {
        discountPercent = AI_CONFIG.EXPIRY_DISCOUNTS.THREE_DAYS;
        reason = `Pricing Agent: ${discountPercent}% discount - Expires in 3 days`;
      }
      
      const newDiscountedPrice = product.prices.regular * (1 - discountPercent / 100);
      const newVipPrice = product.prices.vip * (1 - (discountPercent + 10) / 100);
      
      candidates.push({
        productId: product.id,
        priority: 10 - daysToExpiry, // Higher priority for sooner expiry
        update: {
          prices: {
            regular: product.prices.regular,
            discounted: Math.round(newDiscountedPrice * 100) / 100,
            vip: Math.round(newVipPrice * 100) / 100
          },
          reason,
          timestamp: new Date().toISOString()
        }
      });
    }
    // Priority 2: Overstocked items
    else if (product.inventory > AI_CONFIG.OVERSTOCK_THRESHOLD) {
      const discountPercent = AI_CONFIG.INVENTORY_DISCOUNT;
      const newDiscountedPrice = product.prices.regular * (1 - discountPercent / 100);
      
      candidates.push({
        productId: product.id,
        priority: Math.min(product.inventory / 10, 8), // Higher priority for more stock
        update: {
          prices: {
            regular: product.prices.regular,
            discounted: Math.round(newDiscountedPrice * 100) / 100,
            vip: product.prices.vip
          },
          reason: `Inventory Agent: ${discountPercent}% discount to reduce overstock (${product.inventory} units)`,
          timestamp: new Date().toISOString()
        }
      });
    }
    // Priority 3: Premium VIP deals
    else if (product.prices.regular > 20 && Math.random() > 0.6) {
      const vipDiscountPercent = AI_CONFIG.VIP_PREMIUM_DISCOUNT;
      const newVipPrice = product.prices.vip * (1 - vipDiscountPercent / 100);
      
      candidates.push({
        productId: product.id,
        priority: product.prices.regular / 10, // Higher priority for more expensive items
        update: {
          prices: {
            regular: product.prices.regular,
            discounted: product.prices.discounted,
            vip: Math.round(newVipPrice * 100) / 100
          },
          reason: `Segment Agent: Enhanced VIP discount of ${vipDiscountPercent}% on premium item`,
          timestamp: new Date().toISOString()
        }
      });
    }
  });
  
  // Sort by priority (highest first) and take only the max number of items
  const selectedUpdates = candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxItems);
  
  // Apply the updates
  selectedUpdates.forEach(({ productId, update }) => {
    updates[productId] = update;
  });
  
  aiUpdatedPrices = updates;
  return updates;
};

// Simulate Retail Price Adjustment based on competitor analysis
export const simulateRetailPriceAdjustment = (products, maxItems = 6) => {
  aiAgentActive = true;
  
  const updates = {};
  const candidates = [];
  
  // Simulate competitor price analysis
  products.forEach(product => {
    // Focus on higher-priced items that have more room for competitive adjustment
    if (product.prices.regular > 8 && Math.random() > 0.4) {
      // Simulate finding better competitor prices
      const discountPercent = Math.floor(
        Math.random() * (AI_CONFIG.RETAIL_DISCOUNT_RANGE.max - AI_CONFIG.RETAIL_DISCOUNT_RANGE.min) + 
        AI_CONFIG.RETAIL_DISCOUNT_RANGE.min
      );
      
      const competitors = ['FreshMart', 'GroceryPlus', 'ValueFoods', 'QuickStop', 'MegaStore'];
      const competitor = competitors[Math.floor(Math.random() * competitors.length)];
      
      const newDiscountedPrice = product.prices.regular * (1 - discountPercent / 100);
      const newVipPrice = Math.min(product.prices.vip, newDiscountedPrice * 0.9);
      
      candidates.push({
        productId: product.id,
        priority: product.prices.regular + Math.random() * 10, // Higher priority for expensive items
        update: {
          prices: {
            regular: product.prices.regular,
            discounted: Math.round(newDiscountedPrice * 100) / 100,
            vip: Math.round(newVipPrice * 100) / 100
          },
          reason: `Competitive Agent: Found ${competitor} selling at $${(product.prices.regular * (1 - (discountPercent + 2) / 100)).toFixed(2)} - Adjusted by ${discountPercent}%`,
          timestamp: new Date().toISOString()
        }
      });
    }
  });
  
  // Sort by priority and select top items
  const selectedUpdates = candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxItems);
  
  // Apply the updates
  selectedUpdates.forEach(({ productId, update }) => {
    updates[productId] = update;
  });
  
  aiUpdatedPrices = { ...aiUpdatedPrices, ...updates };
  return updates;
};

// Quick AI simulation with different strategies
export const simulateQuickAI = (products) => {
  return simulateAIPricing(products, 3); // Only update 3 items for quick demo
};

export const simulateFullAI = (products) => {
  return simulateAIPricing(products, AI_CONFIG.MAX_ITEMS_TO_UPDATE);
};

// Simulate specific scenarios
export const simulateExpiryFocus = (products) => {
  const expiringProducts = products.filter(product => {
    const daysToExpiry = Math.ceil((new Date(product.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    return daysToExpiry >= 0 && daysToExpiry <= 3;
  });
  
  return simulateAIPricing(expiringProducts, Math.min(expiringProducts.length, 5));
};

export const clearAIUpdates = () => {
  aiUpdatedPrices = {};
  aiAgentActive = false;
};

export const getAIAgentStatus = () => aiAgentActive;

export const getAIUpdatedProductsCount = () => Object.keys(aiUpdatedPrices).length;
