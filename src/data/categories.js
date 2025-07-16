export const categories = [
  {
    id: "produce",
    name: "Fresh Produce",
    slug: "produce",
    image: "/images/categories/produce.jpg",
    description: "Fresh fruits and vegetables",
    icon: "🥬",
    featured: true
  },
  {
    id: "dairy", 
    name: "Dairy & Eggs",
    slug: "dairy",
    image: "/images/categories/dairy.jpg",
    description: "Milk, cheese, yogurt and eggs",
    icon: "🥛",
    featured: true
  },
  {
    id: "meat",
    name: "Meat & Seafood", 
    slug: "meat",
    image: "/images/categories/meat.jpg",
    description: "Fresh meat and seafood",
    icon: "🥩",
    featured: true
  },
  {
    id: "bakery",
    name: "Bakery",
    slug: "bakery", 
    image: "/images/categories/bakery.jpg",
    description: "Fresh bread and baked goods",
    icon: "🍞",
    featured: true
  },
  {
    id: "pantry",
    name: "Pantry Staples",
    slug: "pantry",
    image: "/images/categories/pantry.jpg", 
    description: "Canned goods, pasta, rice",
    icon: "🥫",
    featured: false
  },
  {
    id: "frozen",
    name: "Frozen Foods",
    slug: "frozen",
    image: "/images/categories/frozen.jpg",
    description: "Frozen meals and ingredients", 
    icon: "❄️",
    featured: false
  }
];

export const getFeaturedCategories = () => categories.filter(c => c.featured);
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);
