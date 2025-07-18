import { getUserSegment as getAuthUserSegment } from '@/lib/auth';

// AI Agent simulation state
let aiUpdatedPrices = {};
let aiAgentActive = false;

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
  
  if (product.isFlashSale) {
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

export const simulateAIPricing = (products) => {
  aiAgentActive = true;
  
  // Simulate AI agents analyzing and updating prices
  const updates = {};
  
  products.forEach(product => {
    // Pricing Agent: Reduce prices for items expiring soon
    const daysToExpiry = Math.ceil((new Date(product.expiryDate) - new Date()) / (1000 * 60 * 60 * 24));
    
    if (daysToExpiry <= 3) {
      // Flash sale for expiring items
      const discountPercent = daysToExpiry === 1 ? 40 : daysToExpiry === 2 ? 30 : 20;
      const newRegularPrice = product.prices.regular * (1 - discountPercent / 100);
      const newVipPrice = product.prices.vip * (1 - (discountPercent + 10) / 100);
      
      updates[product.id] = {
        prices: {
          regular: product.prices.regular,
          discounted: Math.round(newRegularPrice * 100) / 100,
          vip: Math.round(newVipPrice * 100) / 100
        },
        reason: `Pricing Agent: ${discountPercent}% discount due to ${daysToExpiry} day(s) to expiry`,
        timestamp: new Date().toISOString()
      };
    }
    // Inventory Agent: Reduce prices for overstocked items
    else if (product.inventory > 30) {
      const discountPercent = 15;
      const newDiscountedPrice = product.prices.regular * (1 - discountPercent / 100);
      
      updates[product.id] = {
        prices: {
          regular: product.prices.regular,
          discounted: Math.round(newDiscountedPrice * 100) / 100,
          vip: product.prices.vip
        },
        reason: `Inventory Agent: ${discountPercent}% discount to reduce overstock (${product.inventory} units)`,
        timestamp: new Date().toISOString()
      };
    }
    // Segment Agent: Special VIP deals on premium items
    else if (product.prices.regular > 20 && Math.random() > 0.7) {
      const vipDiscountPercent = 25;
      const newVipPrice = product.prices.vip * (1 - vipDiscountPercent / 100);
      
      updates[product.id] = {
        prices: {
          regular: product.prices.regular,
          discounted: product.prices.discounted,
          vip: Math.round(newVipPrice * 100) / 100
        },
        reason: `Segment Agent: Enhanced VIP discount of ${vipDiscountPercent}% on premium item`,
        timestamp: new Date().toISOString()
      };
    }
  });
  
  aiUpdatedPrices = updates;
  return updates;
};

export const clearAIUpdates = () => {
  aiUpdatedPrices = {};
  aiAgentActive = false;
};

export const getAIAgentStatus = () => aiAgentActive;

export const getAIUpdatedProductsCount = () => Object.keys(aiUpdatedPrices).length;
