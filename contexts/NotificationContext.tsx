// contexts/UserContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

interface Notification {
  total: number;
  unread: number;
}

interface NotificationContextType {
  notification: Notification | null;
  setNotification: React.Dispatch<React.SetStateAction<Notification | null>>;
}

const defaultValue: NotificationContextType = {
  notification: null,
  setNotification: () => {},
};

export const NotificationContext =
  createContext<NotificationContextType>(defaultValue);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
