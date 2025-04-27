import { createContext } from "react";
import { NotificationType } from "./NotificationProvider.tsx";
export interface NotificationContextType {
  open: (message: string, type?: NotificationType) => void;
}
export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
