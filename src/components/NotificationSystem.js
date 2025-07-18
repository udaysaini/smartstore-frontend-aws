'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import * as motion from 'motion/react-client';

// Generate confetti particles based on intensity
const generateConfettiParticles = (intensity = 50) => {
  return Array.from({ length: intensity }, (_, i) => ({
    id: i,
    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4', '#84cc16'][Math.floor(Math.random() * 8)],
    size: Math.random() * 8 + 3,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 2 + 2.5, // Random duration between 2.5-4.5s
    rotationSpeed: Math.random() * 720 + 360 // Random rotation speed
  }));
};

export default function NotificationSystem({ notifications, onRemove }) {
  const [confettiVisible, setConfettiVisible] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState([]);

  useEffect(() => {
    const successNotification = notifications.find(n => n.type === 'success' && n.showConfetti);
    if (successNotification && !confettiVisible) {
      const intensity = successNotification.confettiIntensity || 50;
      setConfettiParticles(generateConfettiParticles(intensity));
      setConfettiVisible(true);
      const timer = setTimeout(() => setConfettiVisible(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications, confettiVisible]);

  return (
    <>
      {/* Enhanced Confetti Effect */}
      {confettiVisible && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                backgroundColor: particle.color,
                width: particle.size,
                height: particle.size,
                left: `${particle.x}%`,
                top: '-20px'
              }}
              initial={{ y: -30, rotate: 0, opacity: 1, scale: 0 }}
              animate={{ 
                y: window.innerHeight + 100, 
                rotate: particle.rotationSpeed,
                opacity: [1, 1, 0.8, 0],
                scale: [0, 1, 1, 0.8]
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for natural fall
              }}
            />
          ))}
          
          {/* Add some sparkle effects */}
          {Array.from({ length: Math.floor(confettiParticles.length / 3) }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute text-yellow-400"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 50}%`,
                fontSize: Math.random() * 20 + 10
              }}
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1.2, 0],
                rotate: 360
              }}
              transition={{
                duration: 2,
                delay: Math.random() * 2,
                repeat: 2
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      )}

      {/* Notifications */}
      <div className="fixed bottom-20 right-6 z-50 space-y-3 max-w-sm">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 300, scale: 0.8 }}
            className="relative"
          >
            <Card className={`shadow-lg border-l-4 ${
              notification.type === 'success' ? 'border-l-green-500 bg-green-50' :
              notification.type === 'info' ? 'border-l-blue-500 bg-blue-50' :
              notification.type === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
              'border-l-red-500 bg-red-50'
            }`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-0.5">
                    {notification.type === 'success' && '✅'}
                    {notification.type === 'info' && '🤖'}
                    {notification.type === 'warning' && '🗑️'}
                    {notification.type === 'error' && '❌'}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold text-sm ${
                        notification.type === 'success' ? 'text-green-800' :
                        notification.type === 'info' ? 'text-blue-800' :
                        notification.type === 'warning' ? 'text-yellow-800' :
                        'text-red-800'
                      }`}>
                        {notification.title}
                      </h4>
                      {notification.showLoader && (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"
                        />
                      )}
                    </div>
                    <p className={`text-sm ${
                      notification.type === 'success' ? 'text-green-700' :
                      notification.type === 'info' ? 'text-blue-700' :
                      notification.type === 'warning' ? 'text-yellow-700' :
                      'text-red-700'
                    }`}>
                      {notification.message}
                    </p>
                    
                    {/* Progress bar for loading notifications */}
                    {notification.showLoader && notification.duration && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <motion.div
                            className={`h-1 rounded-full ${
                              notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: notification.duration / 1000, ease: "linear" }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Close button */}
                  {!notification.showLoader && (
                    <button
                      onClick={() => onRemove(notification.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}
