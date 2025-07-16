'use client';

import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const chartConfig = {
  customers: {
    label: "Customers",
    color: "hsl(var(--chart-1))",
  },
  sales: {
    label: "Sales ($)",
    color: "hsl(var(--chart-2))",
  }
};

export default function HourlyTrafficChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Traffic & Sales Pattern</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                yAxisId="left"
                dataKey="customers" 
                fill="var(--color-customers)" 
                radius={[2, 2, 0, 0]}
                opacity={0.8}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="sales" 
                stroke="var(--color-sales)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-sales)", strokeWidth: 2, r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
