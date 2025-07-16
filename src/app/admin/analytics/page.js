'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import HourlyTrafficChart from '@/components/Charts/HourlyTrafficChart';
import WeeklyComparisonChart from '@/components/Charts/WeeklyComparisonChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { detailedAnalytics } from '@/data/adminData';
import * as motion from 'motion/react-client';

export default function AnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
            <p className="text-gray-600">Deep insights into customer behavior and sales patterns</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Export Data</Button>
            <Button>Custom Report</Button>
          </div>
        </div>

        {/* Time Period Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2"
        >
          {['Today', '7 Days', '30 Days', '90 Days'].map((period) => (
            <Button 
              key={period} 
              variant={period === '7 Days' ? 'default' : 'outline'} 
              size="sm"
            >
              {period}
            </Button>
          ))}
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HourlyTrafficChart data={detailedAnalytics.hourlyTraffic} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <WeeklyComparisonChart data={detailedAnalytics.weeklyComparison} />
          </motion.div>
        </div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { 
                    metric: 'Average Transaction Value',
                    value: '$34.56',
                    change: '+12.3%',
                    trend: 'up',
                    description: 'vs last week'
                  },
                  {
                    metric: 'Customer Retention Rate', 
                    value: '68.4%',
                    change: '+5.2%',
                    trend: 'up',
                    description: 'monthly retention'
                  },
                  {
                    metric: 'Conversion Rate',
                    value: '24.8%',
                    change: '-2.1%', 
                    trend: 'down',
                    description: 'visitors to buyers'
                  }
                ].map((kpi, index) => (
                  <div key={kpi.metric} className="text-center p-4 border rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">{kpi.metric}</p>
                    <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <span className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.trend === 'up' ? '↗' : '↘'} {kpi.change}
                      </span>
                      <span className="text-xs text-gray-500">{kpi.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Customer Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Customer Behavior Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Top Shopping Hours</h4>
                  <div className="space-y-2">
                    {[
                      { time: '12:00 PM - 2:00 PM', percentage: 85 },
                      { time: '6:00 PM - 8:00 PM', percentage: 78 },
                      { time: '8:00 AM - 10:00 AM', percentage: 65 }
                    ].map((hour) => (
                      <div key={hour.time} className="flex items-center justify-between">
                        <span className="text-sm">{hour.time}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${hour.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{hour.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Popular Categories</h4>
                  <div className="space-y-2">
                    {[
                      { category: 'Fresh Produce', sales: '$12,400' },
                      { category: 'Dairy & Eggs', sales: '$8,900' },
                      { category: 'Meat & Seafood', sales: '$15,600' }
                    ].map((cat) => (
                      <div key={cat.category} className="flex justify-between">
                        <span className="text-sm">{cat.category}</span>
                        <span className="text-sm font-medium">{cat.sales}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
