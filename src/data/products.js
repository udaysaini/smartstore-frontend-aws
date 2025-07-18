// Helper function to calculate expiry dates
const getExpiryDate = (productType, daysToAdd) => {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);
  return today.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

// Helper function to get expiry days based on product category/name
const getExpiryDays = (productName, category) => {
  const name = productName.toLowerCase();
  
  // Fresh produce (2-7 days)
  if (name.includes('banana')) return 4;
  if (name.includes('apple')) return 10;
  if (name.includes('lettuce') || name.includes('spinach') || name.includes('kale')) return 5;
  if (name.includes('tomato')) return 7;
  if (name.includes('carrot')) return 14;
  if (name.includes('potato')) return 21;
  if (name.includes('onion')) return 30;
  
  // Dairy products (5-14 days)
  if (name.includes('milk') || name.includes('yogurt')) return 7;
  if (name.includes('cheese')) return 21;
  if (name.includes('butter')) return 30;
  
  // Meat & Seafood (1-3 days fresh, longer if frozen)
  if (name.includes('chicken') || name.includes('beef') || name.includes('fish')) return 3;
  
  // Bread & Bakery (3-7 days)
  if (name.includes('bread') || name.includes('bagel')) return 5;
  
  // Canned goods (1-2 years)
  if (name.includes('canned') || name.includes('can ')) return 365;
  
  // Dry goods (6 months - 1 year)
  if (name.includes('rice') || name.includes('pasta') || name.includes('flour')) return 365;
  if (name.includes('cereal') || name.includes('crackers')) return 180;
  
  // Frozen items (3-6 months)
  if (name.includes('frozen')) return 90;
  
  // Default based on category
  switch (category?.toLowerCase()) {
    case 'fresh produce':
    case 'fruits':
    case 'vegetables': return 7;
    case 'dairy': return 10;
    case 'meat': return 3;
    case 'bakery': return 5;
    case 'pantry':
    case 'canned goods': return 365;
    case 'frozen': return 90;
    default: return 30; // Default 1 month
  }
};

export const products = [
  {
    id: "001",
    name: "Greek Yogurt",
    category: "dairy",
    image: "/images/products/yogurt.jpg",
    expiryDate: getExpiryDate("Greek Yogurt", getExpiryDays("Greek Yogurt", "dairy")),
    inventory: 12,
    isQuickSale: true,
    isFlashSale: true,
    madeInCanada: false,
    prices: {
      regular: 5.49,
      discounted: 4.99,
      vip: 3.99
    },
    description: "Creamy Greek yogurt with probiotics",
    nutritionScore: "A",
    brand: "FreshFarm"
  },
  {
    id: "002", 
    name: "Organic Bananas",
    category: "produce",
    image: "/images/products/bananas.jpg",
    expiryDate: getExpiryDate("Organic Bananas", getExpiryDays("Organic Bananas", "produce")),
    inventory: 45,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: false,
    prices: {
      regular: 3.29,
      discounted: null,
      vip: 2.29
    },
    description: "Fresh organic bananas, perfect for smoothies",
    nutritionScore: "A+",
    brand: "Organic Valley"
  },
  {
    id: "003",
    name: "Artisan Bread",
    category: "bakery",
    image: "/images/products/bread.jpg", 
    expiryDate: getExpiryDate("Artisan Bread", getExpiryDays("Artisan Bread", "bakery")),
    inventory: 8,
    isQuickSale: true,
    isFlashSale: true,
    madeInCanada: true,
    prices: {
      regular: 5.99,
      discounted: 4.49,
      vip: 3.49
    },
    description: "Freshly baked sourdough bread",
    nutritionScore: "B",
    brand: "Local Bakery"
  },
  {
    id: "004",
    name: "Premium Ribeye Steak",
    category: "meat",
    image: "/images/products/ribeye.jpg",
    expiryDate: getExpiryDate("Premium Ribeye Steak", getExpiryDays("Premium Ribeye Steak", "meat")),
    inventory: 15,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 29.99,
      discounted: null,
      vip: 18.99
    },
    description: "USDA Prime ribeye steak, aged to perfection",
    nutritionScore: "B+",
    brand: "Prime Cuts"
  },
  {
    id: "005",
    name: "Maple Syrup",
    category: "condiments",
    image: "/images/products/maple-syrup.jpg",
    expiryDate: getExpiryDate("Maple Syrup", getExpiryDays("Maple Syrup", "condiments")),
    inventory: 25,
    isQuickSale: false,
    isFlashSale: true,
    madeInCanada: true,
    prices: {
      regular: 12.99,
      discounted: 9.99,
      vip: 8.49
    },
    description: "Pure Canadian maple syrup, Grade A",
    nutritionScore: "C",
    brand: "Canadian Maple Co."
  },
  {
    id: "006",
    name: "Atlantic Salmon",
    category: "seafood",
    image: "/images/products/salmon.jpg",
    expiryDate: getExpiryDate("Atlantic Salmon", getExpiryDays("Atlantic Salmon", "seafood")),
    inventory: 20,
    isQuickSale: true,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 16.99,
      discounted: 13.99,
      vip: 11.99
    },
    description: "Fresh Atlantic salmon fillet",
    nutritionScore: "A+",
    brand: "Maritime Fresh"
  },
  {
    id: "007",
    name: "Organic Free-Range Eggs",
    category: "dairy",
    image: "/images/products/eggs.jpg",
    expiryDate: getExpiryDate("Organic Free-Range Eggs", getExpiryDays("Organic Free-Range Eggs", "dairy")),
    inventory: 35,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 6.49,
      discounted: null,
      vip: 4.99
    },
    description: "Farm-fresh organic eggs from free-range hens",
    nutritionScore: "A",
    brand: "Prairie Farms"
  },
  {
    id: "008",
    name: "Avocados",
    category: "produce",
    image: "/images/products/avocados.jpg",
    expiryDate: getExpiryDate("Avocados", getExpiryDays("Avocados", "produce")),
    inventory: 30,
    isQuickSale: false,
    isFlashSale: true,
    madeInCanada: false,
    prices: {
      regular: 4.99,
      discounted: 3.99,
      vip: 3.49
    },
    description: "Ripe Hass avocados, perfect for guacamole",
    nutritionScore: "A+",
    brand: "Tropical Fresh"
  },
  {
    id: "009",
    name: "Cheddar Cheese",
    category: "dairy",
    image: "/images/products/cheddar.jpg",
    expiryDate: getExpiryDate("Cheddar Cheese", getExpiryDays("Cheddar Cheese", "dairy")),
    inventory: 18,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 8.99,
      discounted: null,
      vip: 6.99
    },
    description: "Aged Canadian cheddar cheese",
    nutritionScore: "B",
    brand: "Quebec Dairy"
  },
  {
    id: "010",
    name: "Whole Grain Cereal",
    category: "breakfast",
    image: "/images/products/cereal.jpg",
    expiryDate: getExpiryDate("Whole Grain Cereal", getExpiryDays("Whole Grain Cereal", "breakfast")),
    inventory: 40,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: false,
    prices: {
      regular: 5.99,
      discounted: null,
      vip: 4.49
    },
    description: "Nutritious whole grain cereal with fiber",
    nutritionScore: "A",
    brand: "Healthy Start"
  },
  {
    id: "011",
    name: "Ground Coffee",
    category: "beverages",
    image: "/images/products/coffee.jpg",
    expiryDate: getExpiryDate("Ground Coffee", getExpiryDays("Ground Coffee", "beverages")),
    inventory: 22,
    isQuickSale: false,
    isFlashSale: true,
    madeInCanada: true,
    prices: {
      regular: 11.99,
      discounted: 8.99,
      vip: 7.49
    },
    description: "Premium roasted coffee beans from Canadian roastery",
    nutritionScore: "B+",
    brand: "Northern Roast"
  },
  {
    id: "012",
    name: "Chicken Breast",
    category: "meat",
    image: "/images/products/chicken.jpg",
    expiryDate: getExpiryDate("Chicken Breast", getExpiryDays("Chicken Breast", "meat")),
    inventory: 25,
    isQuickSale: true,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 12.99,
      discounted: 9.99,
      vip: 8.49
    },
    description: "Boneless skinless chicken breast",
    nutritionScore: "A",
    brand: "Farm Fresh Poultry"
  },
  {
    id: "013",
    name: "Frozen Blueberries",
    category: "frozen",
    image: "/images/products/blueberries.jpg",
    expiryDate: getExpiryDate("Frozen Blueberries", getExpiryDays("Frozen Blueberries", "frozen")),
    inventory: 32,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 7.99,
      discounted: null,
      vip: 5.99
    },
    description: "Wild Canadian blueberries, frozen fresh",
    nutritionScore: "A+",
    brand: "Boreal Berries"
  },
  {
    id: "014",
    name: "Pasta Sauce",
    category: "condiments",
    image: "/images/products/pasta-sauce.jpg",
    expiryDate: getExpiryDate("Pasta Sauce", getExpiryDays("Pasta Sauce", "condiments")),
    inventory: 28,
    isQuickSale: false,
    isFlashSale: true,
    madeInCanada: false,
    prices: {
      regular: 3.99,
      discounted: 2.99,
      vip: 2.49
    },
    description: "Traditional marinara pasta sauce",
    nutritionScore: "B",
    brand: "Italian Kitchen"
  },
  {
    id: "015",
    name: "Ice Cream",
    category: "frozen",
    image: "/images/products/ice-cream.jpg",
    expiryDate: getExpiryDate("Ice Cream", getExpiryDays("Ice Cream", "frozen")),
    inventory: 15,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 6.99,
      discounted: null,
      vip: 4.99
    },
    description: "Premium vanilla ice cream made with Canadian cream",
    nutritionScore: "C",
    brand: "Creamy Delights"
  },
  {
    id: "016",
    name: "Baby Spinach",
    category: "produce",
    image: "/images/products/spinach.jpg",
    expiryDate: getExpiryDate("Baby Spinach", getExpiryDays("Baby Spinach", "produce")),
    inventory: 38,
    isQuickSale: true,
    isFlashSale: false,
    madeInCanada: false,
    prices: {
      regular: 3.49,
      discounted: 2.49,
      vip: 1.99
    },
    description: "Fresh baby spinach leaves, pre-washed",
    nutritionScore: "A+",
    brand: "Green Valley"
  },
  {
    id: "017",
    name: "Granola Bars",
    category: "snacks",
    image: "/images/products/granola-bars.jpg",
    expiryDate: getExpiryDate("Granola Bars", getExpiryDays("Granola Bars", "snacks")),
    inventory: 45,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 4.99,
      discounted: null,
      vip: 3.49
    },
    description: "Healthy oat and honey granola bars",
    nutritionScore: "B+",
    brand: "Nature's Trail"
  },
  {
    id: "018",
    name: "Olive Oil",
    category: "condiments",
    image: "/images/products/olive-oil.jpg",
    expiryDate: getExpiryDate("Olive Oil", getExpiryDays("Olive Oil", "condiments")),
    inventory: 20,
    isQuickSale: false,
    isFlashSale: true,
    madeInCanada: false,
    prices: {
      regular: 9.99,
      discounted: 7.99,
      vip: 6.99
    },
    description: "Extra virgin olive oil, cold-pressed",
    nutritionScore: "A",
    brand: "Mediterranean Gold"
  },
  {
    id: "019",
    name: "Ground Turkey",
    category: "meat",
    image: "/images/products/turkey.jpg",
    expiryDate: getExpiryDate("Ground Turkey", getExpiryDays("Ground Turkey", "meat")),
    inventory: 18,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 10.99,
      discounted: null,
      vip: 8.49
    },
    description: "Lean ground turkey, 93% fat-free",
    nutritionScore: "A",
    brand: "Heritage Farms"
  },
  {
    id: "020",
    name: "Honey",
    category: "condiments",
    image: "/images/products/honey.jpg",
    expiryDate: getExpiryDate("Honey", getExpiryDays("Honey", "condiments")),
    inventory: 24,
    isQuickSale: false,
    isFlashSale: false,
    madeInCanada: true,
    prices: {
      regular: 8.49,
      discounted: null,
      vip: 6.49
    },
    description: "Pure Canadian wildflower honey",
    nutritionScore: "B",
    brand: "Golden Hive"
  },
  // {
  //   id: "021",
  //   name: "Potato Chips",
  //   category: "snacks",
  //   image: "/images/products/chips.jpg",
  //   expiryDate: "2025-03-30",
  //   inventory: 50,
  //   isQuickSale: false,
  //   isFlashSale: true,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 3.99,
  //     discounted: 2.99,
  //     vip: 2.49
  //   },
  //   description: "Crispy kettle-cooked potato chips",
  //   nutritionScore: "C",
  //   brand: "Crispy Crunch"
  // },
  // {
  //   id: "022",
  //   name: "Green Tea",
  //   category: "beverages",
  //   image: "/images/products/green-tea.jpg",
  //   expiryDate: "2026-06-30",
  //   inventory: 35,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: false,
  //   prices: {
  //     regular: 6.99,
  //     discounted: null,
  //     vip: 4.99
  //   },
  //   description: "Premium organic green tea bags",
  //   nutritionScore: "A+",
  //   brand: "Zen Garden"
  // },
  // {
  //   id: "023",
  //   name: "Mushrooms",
  //   category: "produce",
  //   image: "/images/products/mushrooms.jpg",
  //   expiryDate: "2025-01-22",
  //   inventory: 28,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 4.49,
  //     discounted: null,
  //     vip: 3.49
  //   },
  //   description: "Fresh button mushrooms, locally grown",
  //   nutritionScore: "A",
  //   brand: "Forest Fresh"
  // },
  // {
  //   id: "024",
  //   name: "Almond Butter",
  //   category: "spreads",
  //   image: "/images/products/almond-butter.jpg",
  //   expiryDate: "2025-07-15",
  //   inventory: 16,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: false,
  //   prices: {
  //     regular: 12.99,
  //     discounted: null,
  //     vip: 9.99
  //   },
  //   description: "Natural almond butter, no added sugar",
  //   nutritionScore: "A",
  //   brand: "Nutty Goodness"
  // },
  // {
  //   id: "025",
  //   name: "Frozen Pizza",
  //   category: "frozen",
  //   image: "/images/products/pizza.jpg",
  //   expiryDate: "2025-05-30",
  //   inventory: 22,
  //   isQuickSale: false,
  //   isFlashSale: true,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 7.99,
  //     discounted: 5.99,
  //     vip: 4.99
  //   },
  //   description: "Deluxe frozen pizza with Canadian toppings",
  //   nutritionScore: "C+",
  //   brand: "Maple Kitchen"
  // },
  // {
  //   id: "026",
  //   name: "Orange Juice",
  //   category: "beverages",
  //   image: "/images/products/orange-juice.jpg",
  //   expiryDate: "2025-01-25",
  //   inventory: 30,
  //   isQuickSale: true,
  //   isFlashSale: false,
  //   madeInCanada: false,
  //   prices: {
  //     regular: 4.99,
  //     discounted: 3.49,
  //     vip: 2.99
  //   },
  //   description: "100% pure orange juice, not from concentrate",
  //   nutritionScore: "B+",
  //   brand: "Sunshine Citrus"
  // },
  // {
  //   id: "027",
  //   name: "Quinoa",
  //   category: "grains",
  //   image: "/images/products/quinoa.jpg",
  //   expiryDate: "2025-10-15",
  //   inventory: 20,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: false,
  //   prices: {
  //     regular: 8.99,
  //     discounted: null,
  //     vip: 6.99
  //   },
  //   description: "Organic tri-color quinoa, high in protein",
  //   nutritionScore: "A+",
  //   brand: "Ancient Grains"
  // },
  // {
  //   id: "028",
  //   name: "Bell Peppers",
  //   category: "produce",
  //   image: "/images/products/bell-peppers.jpg",
  //   expiryDate: "2025-01-23",
  //   inventory: 42,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 5.99,
  //     discounted: null,
  //     vip: 4.49
  //   },
  //   description: "Colorful bell peppers, greenhouse grown",
  //   nutritionScore: "A+",
  //   brand: "Greenhouse Gardens"
  // },
  // {
  //   id: "029",
  //   name: "Dark Chocolate",
  //   category: "confectionery",
  //   image: "/images/products/dark-chocolate.jpg",
  //   expiryDate: "2025-08-30",
  //   inventory: 25,
  //   isQuickSale: false,
  //   isFlashSale: true,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 6.99,
  //     discounted: 4.99,
  //     vip: 3.99
  //   },
  //   description: "70% dark chocolate bar, artisan crafted",
  //   nutritionScore: "B",
  //   brand: "Cocoa Dreams"
  // },
  // {
  //   id: "030",
  //   name: "Coconut Milk",
  //   category: "beverages",
  //   image: "/images/products/coconut-milk.jpg",
  //   expiryDate: "2025-04-15",
  //   inventory: 18,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: false,
  //   prices: {
  //     regular: 3.99,
  //     discounted: null,
  //     vip: 2.99
  //   },
  //   description: "Creamy coconut milk, perfect for cooking",
  //   nutritionScore: "B+",
  //   brand: "Tropical Coast"
  // },
  // {
  //   id: "031",
  //   name: "Sweet Potatoes",
  //   category: "produce",
  //   image: "/images/products/sweet-potatoes.jpg",
  //   expiryDate: "2025-02-10",
  //   inventory: 35,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 3.99,
  //     discounted: null,
  //     vip: 2.99
  //   },
  //   description: "Fresh sweet potatoes, locally sourced",
  //   nutritionScore: "A+",
  //   brand: "Root Harvest"
  // },
  // {
  //   id: "032",
  //   name: "Protein Powder",
  //   category: "supplements",
  //   image: "/images/products/protein-powder.jpg",
  //   expiryDate: "2025-12-31",
  //   inventory: 12,
  //   isQuickSale: false,
  //   isFlashSale: false,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 39.99,
  //     discounted: null,
  //     vip: 29.99
  //   },
  //   description: "Whey protein powder, vanilla flavor",
  //   nutritionScore: "A",
  //   brand: "Muscle Fuel"
  // },
  // {
  //   id: "033",
  //   name: "Sourdough Starter",
  //   category: "bakery",
  //   image: "/images/products/sourdough-starter.jpg",
  //   expiryDate: "2025-02-28",
  //   inventory: 8,
  //   isQuickSale: true,
  //   isFlashSale: false,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 12.99,
  //     discounted: 8.99,
  //     vip: 7.49
  //   },
  //   description: "Live sourdough starter, 100+ years old",
  //   nutritionScore: "B+",
  //   brand: "Heritage Bakery"
  // },
  // {
  //   id: "034",
  //   name: "Smoked Salmon",
  //   category: "seafood",
  //   image: "/images/products/smoked-salmon.jpg",
  //   expiryDate: "2025-01-28",
  //   inventory: 14,
  //   isQuickSale: false,
  //   isFlashSale: true,
  //   madeInCanada: true,
  //   prices: {
  //     regular: 19.99,
  //     discounted: 15.99,
  //     vip: 13.99
  //   },
  //   description: "Cold-smoked Pacific salmon, sliced",
  //   nutritionScore: "A+",
  //   brand: "Pacific Smokehouse"
  // }
];

export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getFeaturedProducts = () => products.filter(p => p.isFlashSale || p.isQuickSale);
export const getCanadianProducts = () => products.filter(p => p.madeInCanada);
export const getQuickSaleProducts = () => products.filter(p => p.isQuickSale);
export const getFlashSaleProducts = () => products.filter(p => p.isFlashSale);
