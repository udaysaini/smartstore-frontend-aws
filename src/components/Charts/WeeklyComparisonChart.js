'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const chartConfig = {
  thisWeek: {
    label: "This Week",
    color: "hsl(var(--chart-1))",
  },
  lastWeek: {
    label: "Last Week",
    color: "hsl(var(--chart-2))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--chart-3))",
  }
};

export default function WeeklyComparisonChart({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Performance vs Target</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="lastWeek" 
                fill="var(--color-lastWeek)" 
                radius={[2, 2, 0, 0]}
                opacity={0.6}
              />
              <Bar 
                dataKey="thisWeek" 
                fill="var(--color-thisWeek)" 
                radius={[2, 2, 0, 0]}
              />
              <ReferenceLine 
                y={20000} 
                stroke="var(--color-target)" 
                strokeDasharray="5 5" 
                label="Avg Target"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
