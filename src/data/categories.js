export const categories = [
  {
    id: "produce",
    name: "Fresh Produce",
    slug: "produce",
    icon: "🥬",
    description: "Fresh fruits and vegetables",
    image: "/images/categories/produce.jpg"
  },
  {
    id: "dairy", 
    name: "Dairy & Eggs",
    slug: "dairy",
    icon: "🥛",
    description: "Milk, cheese, yogurt and eggs",
    image: "/images/categories/dairy.jpg"
  },
  {
    id: "meat",
    name: "Meat & Poultry", 
    slug: "meat",
    icon: "🥩",
    description: "Fresh meat and poultry",
    image: "/images/categories/meat.jpg"
  },
  {
    id: "bakery",
    name: "Bakery",
    slug: "bakery", 
    icon: "🍞",
    description: "Fresh bread and baked goods",
    image: "/images/categories/bakery.jpg"
  },
  {
    id: "seafood",
    name: "Seafood",
    slug: "seafood",
    icon: "🐟",
    description: "Fresh fish and seafood",
    image: "/images/categories/seafood.jpg"
  },
  {
    id: "frozen",
    name: "Frozen Foods",
    slug: "frozen",
    icon: "🧊",
    description: "Frozen meals and ingredients", 
    image: "/images/categories/frozen.jpg"
  },
  {
    id: "beverages",
    name: "Beverages",
    slug: "beverages",
    icon: "🥤",
    description: "Drinks and beverages",
    image: "/images/categories/beverages.jpg"
  },
  {
    id: "snacks",
    name: "Snacks",
    slug: "snacks",
    icon: "🍿",
    description: "Chips, crackers and snacks",
    image: "/images/categories/snacks.jpg"
  }
];

export const getFeaturedCategories = () => categories.slice(0, 4);
export const getCategoryById = (id) => categories.find(c => c.id === id);
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);
