import { useState, useEffect } from "react";

export function useNotifications() {
  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      console.error("Notifications not supported");
      return;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error("Error requesting notification permission:", error);
    }
  };

  const sendLocalNotification = (
    title: string,
    options?: NotificationOptions
  ) => {
    if (permission === "granted") {
      new Notification(title, options);
    }
  };

  return {
    permission,
    requestPermission,
    sendLocalNotification,
  };
}
