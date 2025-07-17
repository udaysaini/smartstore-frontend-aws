import { getUserSegment as getAuthUserSegment } from '@/lib/auth';

export const getPriceForUser = (product, userType) => {
  if (userType === 'VIP') {
    return product.prices.vip;
  }
  
  // For regular users, return discounted price if available, otherwise regular price
  return product.prices.discounted || product.prices.regular;
};

export const getGuestPrice = (product) => {
  // Guests see discounted price if available, otherwise regular price
  return product.prices.discounted || product.prices.regular;
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
  const regularPrice = product.prices.regular;
  const discountedPrice = product.prices.discounted;
  const vipPrice = product.prices.vip;
  
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
    showDiscount: discount > 0
  };
};

export const hasDiscount = (product, userType) => {
  const { discount } = getPricingInfo(product, userType);
  return discount > 0;
};
