'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const chartConfig = {
  yogurt: {
    label: "Greek Yogurt",
    color: "hsl(var(--chart-1))",
  },
  bananas: {
    label: "Organic Bananas", 
    color: "hsl(var(--chart-2))",
  },
  bread: {
    label: "Artisan Bread",
    color: "hsl(var(--chart-3))",
  },
  ribeye: {
    label: "Premium Ribeye",
    color: "hsl(var(--chart-4))",
  }
};

export default function PriceTrendChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Driven Price Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis 
                tickFormatter={(value) => `$${value}`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="yogurt" 
                stroke="var(--color-yogurt)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-yogurt)" }}
              />
              <Line 
                type="monotone" 
                dataKey="bananas" 
                stroke="var(--color-bananas)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-bananas)" }}
              />
              <Line 
                type="monotone" 
                dataKey="bread" 
                stroke="var(--color-bread)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-bread)" }}
              />
              <Line 
                type="monotone" 
                dataKey="ribeye" 
                stroke="var(--color-ribeye)" 
                strokeWidth={2}
                dot={{ fill: "var(--color-ribeye)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
