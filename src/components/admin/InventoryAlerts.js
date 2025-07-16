'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as motion from 'motion/react-client';

const severityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200', 
  low: 'bg-blue-100 text-blue-800 border-blue-200'
};

const severityIcons = {
  high: '🚨',
  medium: '⚠️',
  low: 'ℹ️'
};

export default function InventoryAlerts({ alerts }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Inventory Alerts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${severityColors[alert.severity]}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="text-lg">
                    {severityIcons[alert.severity]}
                  </span>
                  <div>
                    <h4 className="font-semibold">{alert.product}</h4>
                    <p className="text-sm mt-1">{alert.message}</p>
                    <p className="text-xs mt-2 font-medium">
                      Suggested: {alert.action}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Action
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
