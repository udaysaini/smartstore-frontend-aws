export const products = [
  {
    id: "001",
    name: "Greek Yogurt",
    category: "dairy",
    image: "/images/products/yogurt.jpg",
    expiryDate: "2025-01-20",
    inventory: 12,
    isEligibleForTGTG: true,
    isFlashSale: true,
    segmentPrices: {
      VIP: 3.99,
      Premium: 4.49,
      Standard: 4.99,
      Budget: 4.99
    },
    originalPrice: 5.49,
    description: "Creamy Greek yogurt with probiotics",
    nutritionScore: "A",
    brand: "FreshFarm"
  },
  {
    id: "002", 
    name: "Organic Bananas",
    category: "produce",
    image: "/images/products/bananas.jpg",
    expiryDate: "2025-01-18",
    inventory: 45,
    isEligibleForTGTG: false,
    isFlashSale: false,
    segmentPrices: {
      VIP: 2.29,
      Premium: 2.49,
      Standard: 2.79,
      Budget: 2.99
    },
    originalPrice: 3.29,
    description: "Fresh organic bananas, perfect for smoothies",
    nutritionScore: "A+",
    brand: "Organic Valley"
  },
  {
    id: "003",
    name: "Artisan Bread",
    category: "bakery",
    image: "/images/products/bread.jpg", 
    expiryDate: "2025-01-17",
    inventory: 8,
    isEligibleForTGTG: true,
    isFlashSale: true,
    segmentPrices: {
      VIP: 3.49,
      Premium: 3.99,
      Standard: 4.49,
      Budget: 4.49
    },
    originalPrice: 5.99,
    description: "Freshly baked sourdough bread",
    nutritionScore: "B",
    brand: "Local Bakery"
  },
  {
    id: "004",
    name: "Premium Ribeye Steak",
    category: "meat",
    image: "/images/products/ribeye.jpg",
    expiryDate: "2025-01-22",
    inventory: 15,
    isEligibleForTGTG: false,
    isFlashSale: false,
    segmentPrices: {
      VIP: 18.99,
      Premium: 21.99,
      Standard: 24.99,
      Budget: 26.99
    },
    originalPrice: 29.99,
    description: "USDA Prime ribeye steak, aged to perfection",
    nutritionScore: "B+",
    brand: "Prime Cuts"
  }
];

export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getFeaturedProducts = () => products.filter(p => p.isFlashSale || p.isEligibleForTGTG);
