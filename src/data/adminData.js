export const priceTrendData = [
  { date: "2025-01-10", yogurt: 4.99, bananas: 2.79, bread: 4.49, ribeye: 24.99 },
  { date: "2025-01-11", yogurt: 4.79, bananas: 2.69, bread: 4.29, ribeye: 23.99 },
  { date: "2025-01-12", yogurt: 4.49, bananas: 2.59, bread: 3.99, ribeye: 22.99 },
  { date: "2025-01-13", yogurt: 4.29, bananas: 2.49, bread: 3.89, ribeye: 21.99 },
  { date: "2025-01-14", yogurt: 3.99, bananas: 2.49, bread: 3.99, ribeye: 21.99 },
  { date: "2025-01-15", yogurt: 3.99, bananas: 2.49, bread: 3.99, ribeye: 21.99 },
];

export const segmentSalesData = [
  { segment: "VIP", sales: 12500, customers: 450 },
  { segment: "Premium", sales: 18200, customers: 780 },
  { segment: "Standard", sales: 25600, customers: 1200 },
  { segment: "Budget", sales: 8900, customers: 380 }
];

export const inventoryAlerts = [
  {
    id: "alert_001",
    product: "Greek Yogurt",
    type: "low_stock",
    message: "Only 12 units remaining",
    severity: "medium",
    action: "Reorder suggested"
  },
  {
    id: "alert_002", 
    product: "Artisan Bread",
    type: "expiring_soon",
    message: "Expires in 2 days",
    severity: "high",
    action: "Increase discount to 40%"
  },
  {
    id: "alert_003",
    product: "Organic Bananas", 
    type: "overstock",
    message: "45 units, slow movement",
    severity: "low",
    action: "Consider promotion"
  }
];

export const aiAgentLogs = [
  {
    id: "log_001",
    timestamp: "2025-01-15T10:30:00Z",
    agent: "PricingAgent",
    action: "Reduced Greek Yogurt price by 20% due to expiry",
    impact: "+15% sales velocity",
    confidence: 0.92
  },
  {
    id: "log_002",
    timestamp: "2025-01-15T09:15:00Z", 
    agent: "InventoryAgent",
    action: "Triggered Too Good To Go eligibility for Artisan Bread",
    impact: "Reduced waste by 8 units",
    confidence: 0.88
  },
  {
    id: "log_003",
    timestamp: "2025-01-15T08:45:00Z",
    agent: "SegmentAgent", 
    action: "Increased VIP discount on Premium Ribeye",
    impact: "+3 VIP purchases",
    confidence: 0.95
  }
];

export const categoryPerformance = [
  { category: "Dairy", revenue: 15600, margin: 0.35, items_sold: 890 },
  { category: "Produce", revenue: 12400, margin: 0.42, items_sold: 1250 },
  { category: "Meat", revenue: 28900, margin: 0.28, items_sold: 340 },
  { category: "Bakery", revenue: 8200, margin: 0.38, items_sold: 450 }
];

export const inventoryData = [
  {
    id: "001",
    name: "Greek Yogurt",
    category: "dairy",
    currentStock: 12,
    minStock: 10,
    maxStock: 50,
    reorderPoint: 15,
    supplier: "FreshFarm Co.",
    lastRestock: "2025-01-10",
    turnoverRate: 0.85,
    wasteRate: 0.05,
    profitMargin: 0.35
  },
  {
    id: "002", 
    name: "Organic Bananas",
    category: "produce",
    currentStock: 45,
    minStock: 20,
    maxStock: 100,
    reorderPoint: 30,
    supplier: "Organic Valley",
    lastRestock: "2025-01-12",
    turnoverRate: 0.92,
    wasteRate: 0.12,
    profitMargin: 0.42
  },
  {
    id: "003",
    name: "Artisan Bread", 
    category: "bakery",
    currentStock: 8,
    minStock: 5,
    maxStock: 25,
    reorderPoint: 10,
    supplier: "Local Bakery",
    lastRestock: "2025-01-14",
    turnoverRate: 0.78,
    wasteRate: 0.18,
    profitMargin: 0.38
  },
  {
    id: "004",
    name: "Premium Ribeye",
    category: "meat", 
    currentStock: 15,
    minStock: 8,
    maxStock: 30,
    reorderPoint: 12,
    supplier: "Prime Cuts",
    lastRestock: "2025-01-13",
    turnoverRate: 0.65,
    wasteRate: 0.08,
    profitMargin: 0.28
  }
];

export const detailedAnalytics = {
  hourlyTraffic: [
    { hour: '6AM', customers: 45, sales: 1200 },
    { hour: '7AM', customers: 89, sales: 2400 },
    { hour: '8AM', customers: 156, sales: 4200 },
    { hour: '9AM', customers: 234, sales: 6800 },
    { hour: '10AM', customers: 198, sales: 5900 },
    { hour: '11AM', customers: 167, sales: 4800 },
    { hour: '12PM', customers: 289, sales: 8900 },
    { hour: '1PM', customers: 345, sales: 12400 },
    { hour: '2PM', customers: 298, sales: 9800 },
    { hour: '3PM', customers: 223, sales: 7200 },
    { hour: '4PM', customers: 178, sales: 5600 },
    { hour: '5PM', customers: 267, sales: 8100 },
    { hour: '6PM', customers: 334, sales: 11200 },
    { hour: '7PM', customers: 245, sales: 7800 },
    { hour: '8PM', customers: 167, sales: 4900 },
    { hour: '9PM', customers: 89, sales: 2300 }
  ],
  weeklyComparison: [
    { day: 'Mon', thisWeek: 15600, lastWeek: 14200, target: 16000 },
    { day: 'Tue', thisWeek: 18900, lastWeek: 17800, target: 18000 },
    { day: 'Wed', thisWeek: 16700, lastWeek: 15900, target: 17500 },
    { day: 'Thu', thisWeek: 19200, lastWeek: 18600, target: 19000 },
    { day: 'Fri', thisWeek: 23400, lastWeek: 22100, target: 24000 },
    { day: 'Sat', thisWeek: 28900, lastWeek: 27500, target: 29000 },
    { day: 'Sun', thisWeek: 21800, lastWeek: 20600, target: 22000 }
  ]
};

export const agentPerformance = {
  pricingAgent: {
    totalAdjustments: 156,
    avgImpact: '+12.3%',
    successRate: 0.89,
    revenueGenerated: 23400,
    wasteReduced: 89
  },
  inventoryAgent: {
    totalActions: 89,
    avgImpact: '+8.7%',
    successRate: 0.92,
    stockOptimized: 67,
    alertsGenerated: 23
  },
  segmentAgent: {
    totalPersonalizations: 234,
    avgImpact: '+15.6%', 
    successRate: 0.87,
    conversionsImproved: 145,
    loyaltyBoost: 34
  }
};
