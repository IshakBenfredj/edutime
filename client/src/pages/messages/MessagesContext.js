import { createContext, useState } from "react";

export const MessagesContext = createContext();

export default function MessagesContextProvider({ children }) {
  const [conversations, setConversations] = useState([]);
  const [conversation, setConversation] = useState(null);
  const [userFriend, setUserFriend] = useState(null);
  const [newCon, setNewCon] = useState(false);
  
  return (
    <MessagesContext.Provider
      value={{
        conversation,
        setConversation,
        conversations,
        setConversations,
        userFriend,
        setUserFriend,
        newCon,
        setNewCon,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
