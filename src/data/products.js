export const products = [
  {
    id: "001",
    name: "Greek Yogurt",
    category: "dairy",
    image: "/images/products/yogurt.jpg",
    expiryDate: "2025-01-20",
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
    expiryDate: "2025-01-18",
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
    expiryDate: "2025-01-17",
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
    expiryDate: "2025-01-22",
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
    expiryDate: "2026-03-15",
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
    expiryDate: "2025-01-19",
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
    expiryDate: "2025-02-01",
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
    expiryDate: "2025-01-21",
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
    expiryDate: "2025-02-15",
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
    expiryDate: "2025-06-30",
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
    expiryDate: "2025-12-31",
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
    expiryDate: "2025-01-20",
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
    expiryDate: "2025-08-15",
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
    expiryDate: "2025-09-01",
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
    expiryDate: "2025-04-30",
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
    expiryDate: "2025-01-19",
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
    expiryDate: "2025-05-15",
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
    expiryDate: "2026-01-15",
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
    expiryDate: "2025-01-21",
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
    expiryDate: "2027-01-01",
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
