import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // 🔥 TOAST STATE
  const [toast, setToast] = useState(null);

  const addNotification = (message, userEmail) => {
    const newNotif = {
      id: Date.now(),
      message,
      userEmail,
      read: false,
      createdAt: new Date().toISOString(),
    };

    setNotifications((prev) => [newNotif, ...prev]);

    // 🔥 TOAST EKLE
    setToast(message);

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const markAllAsRead = (userEmail) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.userEmail === userEmail
          ? { ...n, read: true }
          : n
      )
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        markAllAsRead,
        toast, // 🔥 BUNU EKLEDİK
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);