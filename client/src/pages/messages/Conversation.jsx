import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../../functions/getFunctions";
import images from "../../constants/images";
import { MessagesContext } from "./MessagesContext";
import Name from "../../components/Name";
import { axiosPutWithHeader } from "../../functions/axiosFunctions";
import { SocketContext } from "../../SocketContext";

export default function Conversation({ conversation, currentUser, friends }) {
  const [user, setUser] = useState();
  const [newMessages, setNewMessages] = useState(0);
  const [friendId, setfriendId] = useState("");
  const [loading, setLoading] = useState(false);
  const { onlineFriends } = useContext(SocketContext);
  const {
    conversation: conv,
    setConversation,
    setUserFriend,
    setNewCon,
    conversations,
  } = useContext(MessagesContext);

  useEffect(() => {
    const getUserProfile = async () => {
      const friendId = conversation.members.find((m) => m !== currentUser._id);
      setfriendId(friendId);
      setLoading(true);
      try {
        const user = await getUser(friendId);
        setUser(user);
      } catch (error) {}
      setLoading(false);
    };
    if (!friends) {
      getUserProfile();
    } else {
      setUser(conversation);
    }
  }, [conversation, currentUser, friends]);

  useEffect(() => {
    const getNewMessagesLength = async () => {
      try {
        const data = await axiosPutWithHeader(
          `/messages/length/${conversation._id}/${user._id}`
        );
        setNewMessages(data);
      } catch (error) {}
    };
    if (user && conversation) getNewMessagesLength();
  }, [conversation, user]);

  const markAsLu = async () => {
    try {
      await axiosPutWithHeader(`/messages/${conversation._id}/${user._id}`);
      setNewMessages(0);
    } catch (error) {}
  };

  const handleClick = async () => {
    const findConv = conversations.find((c) => c.members.includes(friendId));
    if (user) {
      setUserFriend(user);
      if (findConv) {
        setNewCon(false);
        setConversation(findConv);
        await markAsLu();
      } else {
        setNewCon(true);
        setConversation(conversation);
      }
    } else {
      setUserFriend({ _id: friendId });
      setNewCon(false);
      setConversation(findConv);
      await markAsLu();
    }
  };

  return (
    <>
      {loading ? (
        <ConversationLoading />
      ) : !user ? (
        <div
          onClick={handleClick}
          className={`cursor-pointer select-none flex items-center justify-between p-2 border-b-[1px] border-gray-200 transition-all hover:bg-gray-200 ${
            conv &&
            conversation &&
            conv._id === conversation._id &&
            "bg-gray-200"
          } ${newMessages && "font-bold"} text-lg`}
        >
          <div className="flex items-center gap-2">
            <img
              src={images.pProfile}
              className="w-10 h-10 rounded-full border-[1px] border-gray-300"
              alt=""
            />
            <span>حساب محذوف</span>
          </div>
          {newMessages !== 0 && (
            <span>{newMessages <= 9 ? newMessages : "+9"}</span>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          className={`cursor-pointer select-none flex items-center justify-between p-2 border-b-[1px] border-gray-200 transition-all hover:bg-gray-200 ${
            conv &&
            conversation &&
            conv._id === conversation._id &&
            "bg-gray-200"
          } ${newMessages > 0 && "font-bold"} text-lg`}
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-[1px] border-gray-300 relative">
              <img
                src={user.image}
                className={`w-full h-full rounded-full`}
                alt=""
              />
              {onlineFriends.includes(user._id) && (
                <span className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-0 bottom-0"></span>
              )}
            </div>
            <Name checkmark={user.checkmark} name={user.name} width={"w-3"} />
          </div>
          {newMessages !== 0 && (
            <span>{newMessages <= 9 ? newMessages : "+9"}</span>
          )}
        </div>
      )}
    </>
  );
}
export function ConversationLoading() {
  return (
    <div className="flex items-center gap-2 p-2 animate-pulse">
      <span className="w-10 h-10 rounded-full bg-slate-300"></span>
      <span className="bg-slate-300 w-2/3 h-5"></span>
    </div>
  );
}
