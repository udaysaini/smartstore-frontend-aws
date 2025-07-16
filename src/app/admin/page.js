'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import PriceTrendChart from '@/components/Charts/PriceTrendChart';
import SegmentSalesChart from '@/components/Charts/SegmentSalesChart';
import InventoryAlerts from '@/components/admin/InventoryAlerts';
import AIAgentLogs from '@/components/admin/AIAgentLogs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  priceTrendData, 
  segmentSalesData, 
  inventoryAlerts, 
  aiAgentLogs,
  categoryPerformance 
} from '@/data/adminData';
import * as motion from 'motion/react-client';

export default function AdminDashboard() {
  const totalRevenue = categoryPerformance.reduce((sum, cat) => sum + cat.revenue, 0);
  const totalItems = categoryPerformance.reduce((sum, cat) => sum + cat.items_sold, 0);
  const avgMargin = categoryPerformance.reduce((sum, cat) => sum + cat.margin, 0) / categoryPerformance.length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">AI-powered grocery store analytics and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: '💰', color: 'text-green-600' },
            { label: 'Items Sold', value: totalItems.toLocaleString(), icon: '📦', color: 'text-blue-600' },
            { label: 'Avg Margin', value: `${(avgMargin * 100).toFixed(1)}%`, icon: '📊', color: 'text-purple-600' },
            { label: 'AI Actions', value: aiAgentLogs.length.toString(), icon: '🤖', color: 'text-orange-600' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                    </div>
                    <div className="text-3xl">{metric.icon}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <PriceTrendChart data={priceTrendData} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SegmentSalesChart data={segmentSalesData} />
          </motion.div>
        </div>

        {/* Alerts and Logs Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <InventoryAlerts alerts={inventoryAlerts} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <AIAgentLogs logs={aiAgentLogs} />
          </motion.div>
        </div>

        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Category</th>
                      <th className="text-right py-2">Revenue</th>
                      <th className="text-right py-2">Margin</th>
                      <th className="text-right py-2">Items Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryPerformance.map((category) => (
                      <tr key={category.category} className="border-b last:border-b-0">
                        <td className="py-3 font-medium">{category.category}</td>
                        <td className="text-right py-3">${category.revenue.toLocaleString()}</td>
                        <td className="text-right py-3">{(category.margin * 100).toFixed(1)}%</td>
                        <td className="text-right py-3">{category.items_sold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
