'use client';

import { useState, useCallback } from 'react';

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove after duration (if not a loader notification)
    if (!notification.showLoader && notification.autoRemove !== false) {
      const timeout = notification.duration || 5000;
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    clearAll
  };
}
