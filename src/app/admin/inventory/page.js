'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { inventoryData } from '@/data/adminData';
import * as motion from 'motion/react-client';

const getStockStatus = (current, min, max) => {
  const percentage = (current / max) * 100;
  if (current <= min) return { status: 'critical', color: 'bg-red-500', text: 'Critical' };
  if (percentage <= 30) return { status: 'low', color: 'bg-yellow-500', text: 'Low' };
  if (percentage <= 70) return { status: 'good', color: 'bg-green-500', text: 'Good' };
  return { status: 'high', color: 'bg-blue-500', text: 'High' };
};

export default function InventoryPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600">Monitor stock levels, turnover rates, and waste metrics</p>
          </div>
          <Button>Generate Report</Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total SKUs', value: inventoryData.length, icon: '📦', trend: '+2 this week' },
            { label: 'Low Stock Items', value: inventoryData.filter(item => item.currentStock <= item.minStock).length, icon: '⚠️', trend: '2 critical' },
            { label: 'Avg Turnover', value: `${(inventoryData.reduce((sum, item) => sum + item.turnoverRate, 0) / inventoryData.length * 100).toFixed(1)}%`, icon: '🔄', trend: '+5% vs last month' },
            { label: 'Total Waste', value: `${(inventoryData.reduce((sum, item) => sum + item.wasteRate, 0) / inventoryData.length * 100).toFixed(1)}%`, icon: '🗑️', trend: '-2% improvement' }
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-xs text-gray-500 mt-1">{metric.trend}</p>
                    </div>
                    <div className="text-3xl">{metric.icon}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Inventory Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Inventory Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left">
                      <th className="py-3 px-4">Product</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Current Stock</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Turnover Rate</th>
                      <th className="py-3 px-4">Waste Rate</th>
                      <th className="py-3 px-4">Margin</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventoryData.map((item, index) => {
                      const stockStatus = getStockStatus(item.currentStock, item.minStock, item.maxStock);
                      return (
                        <motion.tr 
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                          className="border-b last:border-b-0 hover:bg-gray-50"
                        >
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-500">{item.supplier}</p>
                            </div>
                          </td>
                          <td className="py-4 px-4 capitalize">{item.category}</td>
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{item.currentStock}</p>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className={`${stockStatus.color} h-2 rounded-full`}
                                  style={{ width: `${Math.min((item.currentStock / item.maxStock) * 100, 100)}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${stockStatus.color}`}>
                              {stockStatus.text}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-medium ${item.turnoverRate >= 0.8 ? 'text-green-600' : item.turnoverRate >= 0.6 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {(item.turnoverRate * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-medium ${item.wasteRate <= 0.1 ? 'text-green-600' : item.wasteRate <= 0.15 ? 'text-yellow-600' : 'text-red-600'}`}>
                              {(item.wasteRate * 100).toFixed(1)}%
                            </span>
                          </td>
                          <td className="py-4 px-4 font-medium text-green-600">
                            {(item.profitMargin * 100).toFixed(1)}%
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                Reorder
                              </Button>
                              <Button size="sm" variant="ghost">
                                Details
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      );
                    })}
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
