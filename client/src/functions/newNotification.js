import { createContext, useContext } from "react";
import { axiosPostWithHeader } from "./axiosFunctions";
import { SocketContext } from "../SocketContext";

export const NotificationsContext = createContext();

export function useCreateNotification() {
  const { socket } = useContext(SocketContext);
  const createNotification = async (notificationData) => {
    try {
      const data = await axiosPostWithHeader(
        "/notifications",
        notificationData
      );
      socket?.emit("sendNotification", data);
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  };
  return createNotification;
}
