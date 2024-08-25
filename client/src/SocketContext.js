import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
// import { axiosGetWithoutHeader } from "./functions/axiosFunctions";
import { useSelector } from "react-redux";
import { axiosGetWithoutHeader } from "./functions/axiosFunctions";

export const SocketContext = createContext();

export default function SocketContextProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const user = useSelector((s) => s.user);

  useEffect(() => {
    // setSocket(io("http://localhost:8900"));
    // setSocket(io("http://192.168.56.1:8900"));
    setSocket(io("https://socket.edutime.click"));
  }, []);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const data = await axiosGetWithoutHeader(`/users/friends/${user._id}`);
        setFriends(data);
      } catch (err) {
        console.log(err);
      }
      setLoadingFriends(false);
    };
    if (user) {
      getFriends();
    }
  }, [user]);

  useEffect(() => {
    socket?.on("getOnlineUsers", (data) => {
      console.log(data);      
      const onlineUsers = data.map((f) => f.userId);
      setOnlineFriends(onlineUsers);
    });
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{ socket, friends, setFriends, loadingFriends, onlineFriends }}
    >
      {children}
    </SocketContext.Provider>
  );
}
