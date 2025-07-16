import { getUserSegment as getAuthUserSegment } from '@/lib/auth';

export const getPriceForUser = (product, userSegment = null) => {
  const segment = userSegment || getAuthUserSegment();
  return product.segmentPrices[segment] || product.segmentPrices.Standard;
};

export const calculateDiscount = (originalPrice, currentPrice) => {
  const discount = ((originalPrice - currentPrice) / originalPrice) * 100;
  return Math.round(discount);
};

export const getExpiryDiscountLabel = (expiryDate) => {
  const now = new Date();
  const expiry = new Date(expiryDate);
  const daysUntilExpiry = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));
  
  if (daysUntilExpiry <= 1) {
    return "🔥 Flash Sale – Expiring Today";
  } else if (daysUntilExpiry <= 3) {
    return "🔥 Flash Sale – Expiring Soon";
  } else if (daysUntilExpiry <= 7) {
    return "⏳ Short Shelf Life";
  }
  return null;
};

export const getInventoryStatus = (inventory) => {
  if (inventory <= 5) {
    return { status: "low", label: "Only " + inventory + " left!", color: "text-red-600" };
  } else if (inventory <= 15) {
    return { status: "medium", label: "Limited stock", color: "text-orange-600" };
  }
  return { status: "good", label: "In stock", color: "text-green-600" };
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

export const getBadges = (product) => {
  const badges = [];
  
  const expiryLabel = getExpiryDiscountLabel(product.expiryDate);
  if (expiryLabel) {
    badges.push({ type: 'expiry', label: expiryLabel, color: 'bg-red-500' });
  }
  
  if (product.isEligibleForTGTG) {
    badges.push({ type: 'tgtg', label: '🌍 Too Good To Go', color: 'bg-green-500' });
  }
  
  if (product.isFlashSale) {
    badges.push({ type: 'flash', label: '⚡ Flash Sale', color: 'bg-yellow-500' });
  }
  
  return badges;
};

export const getGuestPrice = (product) => {
  // For guests, show Standard pricing with any applicable discounts
  let price = product.segmentPrices.Standard;
  
  // Apply discounts for expiring products for all users
  const expiryLabel = getExpiryDiscountLabel(product.expiryDate);
  if (expiryLabel && expiryLabel.includes('Flash Sale')) {
    // Apply additional discount for expiring items
    price = price * 0.9; // 10% additional discount
  }
  
  return price;
};
