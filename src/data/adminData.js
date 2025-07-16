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
