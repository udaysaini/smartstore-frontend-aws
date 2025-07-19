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
  RETAIL_ADJUSTMENT_DURATION: 40000, // Duration for retail price adjustment simulation (40 seconds)
  RETAIL_DISCOUNT_RANGE: { min: 5, max: 20 }, // Discount range for retail adjustments
  CLEARANCE_DURATION: 40000, // Duration for clearance simulation (40 seconds)
  CLEARANCE_DISCOUNT_RANGE: { min: 30, max: 70 } // Higher discounts for clearance
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
  
  // Simulate competitor price analysis - focus on products that can benefit from retail matching
  products.forEach(product => {
    // Focus on items that aren't already heavily discounted and have reasonable prices
    const hasExistingDiscount = product.prices.discounted && product.prices.discounted < product.prices.regular;
    const isReasonablyPriced = product.prices.regular > 5; // Focus on items above $5
    
    // Include products with existing AI updates but also add new ones
    if (isReasonablyPriced && Math.random() > 0.3) {
      // Simulate finding better competitor prices
      const discountPercent = Math.floor(
        Math.random() * (AI_CONFIG.RETAIL_DISCOUNT_RANGE.max - AI_CONFIG.RETAIL_DISCOUNT_RANGE.min) + 
        AI_CONFIG.RETAIL_DISCOUNT_RANGE.min
      );
      
      const competitors = ['FreshMart', 'GroceryPlus', 'ValueFoods', 'QuickStop', 'MegaStore', 'PriceSmart'];
      const competitor = competitors[Math.floor(Math.random() * competitors.length)];
      
      // Calculate new prices based on current prices (not just regular)
      const basePrice = hasExistingDiscount ? product.prices.discounted : product.prices.regular;
      const newDiscountedPrice = basePrice * (1 - discountPercent / 100);
      const newVipPrice = Math.min(product.prices.vip, newDiscountedPrice * 0.85);
      
      candidates.push({
        productId: product.id,
        priority: product.prices.regular + Math.random() * 15, // Higher priority for expensive items
        update: {
          prices: {
            regular: product.prices.regular,
            discounted: Math.round(newDiscountedPrice * 100) / 100,
            vip: Math.round(newVipPrice * 100) / 100
          },
          reason: `Market Agent: Found ${competitor} at $${(basePrice * (1 - (discountPercent + 3) / 100)).toFixed(2)} - Price matched with ${discountPercent}% savings!`,
          timestamp: new Date().toISOString()
        }
      });
    }
  });
  
  // Sort by priority and select top items
  const selectedUpdates = candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxItems);
  
  // Apply the updates - preserve existing AI updates and add new ones
  selectedUpdates.forEach(({ productId, update }) => {
    updates[productId] = update;
  });
  
  // Merge with existing updates instead of replacing them
  aiUpdatedPrices = { ...aiUpdatedPrices, ...updates };
  return updates;
};

// Simulate Expired Items Clearance with aggressive pricing
export const simulateExpiredItemsClearance = (products, maxItems = 8) => {
  aiAgentActive = true;
  
  const updates = {};
  const candidates = [];
  
  // Focus on items that are expiring soon or overstocked
  products.forEach(product => {
    const daysToExpiry = Math.ceil((new Date(product.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    const isExpiringSoon = daysToExpiry >= 0 && daysToExpiry <= 4;
    const isOverstocked = product.inventory > AI_CONFIG.OVERSTOCK_THRESHOLD;
    const isLowMoving = product.inventory > 20 && Math.random() > 0.6; // Simulate slow-moving items
    
    if (isExpiringSoon || isOverstocked || isLowMoving) {
      let discountPercent;
      let reason;
      let priority;
      
      if (daysToExpiry <= 0) {
        // Items expired today - maximum clearance
        discountPercent = Math.floor(Math.random() * 20) + 60; // 60-80% off
        reason = `Clearance Agent: URGENT CLEARANCE ${discountPercent}% OFF - Expired today, must move immediately!`;
        priority = 100;
      } else if (daysToExpiry === 1) {
        // Items expiring tomorrow - high clearance
        discountPercent = Math.floor(Math.random() * 15) + 45; // 45-60% off
        reason = `Clearance Agent: FLASH CLEARANCE ${discountPercent}% OFF - Expires tomorrow, clear inventory now!`;
        priority = 90;
      } else if (daysToExpiry <= 3) {
        // Items expiring in 2-3 days - moderate clearance
        discountPercent = Math.floor(Math.random() * 15) + 35; // 35-50% off
        reason = `Clearance Agent: EARLY CLEARANCE ${discountPercent}% OFF - Expires in ${daysToExpiry} days`;
        priority = 80 - daysToExpiry * 10;
      } else if (isOverstocked) {
        // Overstocked items - inventory clearance
        discountPercent = Math.floor(Math.random() * 20) + 25; // 25-45% off
        reason = `Inventory Agent: OVERSTOCK CLEARANCE ${discountPercent}% OFF - Reducing ${product.inventory} units`;
        priority = Math.min(product.inventory, 70);
      } else {
        // Slow-moving items - promotional clearance
        discountPercent = Math.floor(Math.random() * 15) + 20; // 20-35% off
        reason = `Movement Agent: PROMOTIONAL CLEARANCE ${discountPercent}% OFF - Boosting product movement`;
        priority = 40 + Math.random() * 20;
      }
      
      const newDiscountedPrice = product.prices.regular * (1 - discountPercent / 100);
      const newVipPrice = Math.min(product.prices.vip, newDiscountedPrice * 0.8); // Extra VIP savings on clearance
      
      candidates.push({
        productId: product.id,
        priority: priority,
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
  });
  
  // Sort by priority (highest first) and select top items
  const selectedUpdates = candidates
    .sort((a, b) => b.priority - a.priority)
    .slice(0, maxItems);
  
  // Apply the updates - merge with existing updates
  selectedUpdates.forEach(({ productId, update }) => {
    updates[productId] = update;
  });
  
  // Merge with existing updates instead of replacing them
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
