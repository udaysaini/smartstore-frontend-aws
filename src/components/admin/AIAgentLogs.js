'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import * as motion from 'motion/react-client';

const agentColors = {
  PricingAgent: 'bg-green-100 text-green-800',
  InventoryAgent: 'bg-blue-100 text-blue-800',
  SegmentAgent: 'bg-purple-100 text-purple-800'
};

export default function AIAgentLogs({ logs }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Agent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {logs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-l-4 border-gray-200 pl-4 py-2"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${agentColors[log.agent]}`}>
                  {log.agent}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </span>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {Math.round(log.confidence * 100)}% confidence
                </span>
              </div>
              <p className="text-sm text-gray-900 mb-1">{log.action}</p>
              <p className="text-xs text-green-600 font-medium">{log.impact}</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
