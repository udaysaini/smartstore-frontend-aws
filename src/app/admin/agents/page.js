'use client';

import AdminLayout from '@/components/layout/AdminLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { agentPerformance, aiAgentLogs } from '@/data/adminData';
import * as motion from 'motion/react-client';

const AgentCard = ({ name, data, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="h-full">
      <CardHeader className={`${color} text-white`}>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <div>
            <CardTitle className="text-white">{name}</CardTitle>
            <p className="text-white/80 text-sm">AI-Powered Automation</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{data.totalAdjustments || data.totalActions || data.totalPersonalizations}</p>
            <p className="text-sm text-gray-600">Total Actions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{data.avgImpact}</p>
            <p className="text-sm text-gray-600">Avg Impact</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{Math.round(data.successRate * 100)}%</p>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">
              {data.revenueGenerated ? `$${data.revenueGenerated.toLocaleString()}` : 
               data.stockOptimized || data.conversionsImproved}
            </p>
            <p className="text-sm text-gray-600">
              {data.revenueGenerated ? 'Revenue' : data.stockOptimized ? 'Items Optimized' : 'Conversions'}
            </p>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
              Configure
            </Button>
            <Button size="sm" variant="ghost" className="flex-1">
              View Logs
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function AgentsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">AI Agents Dashboard</h1>
            <p className="text-gray-600">Monitor and manage AI-powered automation agents</p>
          </div>
          <Button>Agent Settings</Button>
        </div>

        {/* Agent Performance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AgentCard 
            name="Pricing Agent"
            data={agentPerformance.pricingAgent}
            icon="💰"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <AgentCard 
            name="Inventory Agent"
            data={agentPerformance.inventoryAgent}
            icon="📦"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <AgentCard 
            name="Segment Agent"
            data={agentPerformance.segmentAgent}
            icon="👥"
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
        </div>

        {/* Agent Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Agent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiAgentLogs.map((log, index) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        log.agent === 'PricingAgent' ? 'bg-green-500' :
                        log.agent === 'InventoryAgent' ? 'bg-blue-500' : 'bg-purple-500'
                      }`}>
                        {log.agent === 'PricingAgent' ? '💰' :
                         log.agent === 'InventoryAgent' ? '📦' : '👥'}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{log.agent}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          log.confidence >= 0.9 ? 'bg-green-100 text-green-800' :
                          log.confidence >= 0.8 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {Math.round(log.confidence * 100)}% confidence
                        </span>
                      </div>
                      <p className="text-gray-900 mb-1">{log.action}</p>
                      <p className="text-sm text-green-600 font-medium">{log.impact}</p>
                    </div>
                    <Button size="sm" variant="ghost">
                      Details
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Agent Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Agent Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { agent: 'Pricing Agent', status: 'Active', interval: '15 min', lastRun: '2 min ago' },
                  { agent: 'Inventory Agent', status: 'Active', interval: '30 min', lastRun: '5 min ago' },
                  { agent: 'Segment Agent', status: 'Active', interval: '1 hour', lastRun: '12 min ago' }
                ].map((config) => (
                  <div key={config.agent} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{config.agent}</h4>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        {config.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Run Interval:</span>
                        <span>{config.interval}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Run:</span>
                        <span>{config.lastRun}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      Configure
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AdminLayout>
  );
}
