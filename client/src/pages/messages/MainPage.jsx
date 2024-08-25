import React, { useContext, useEffect, useState } from "react";
import { axiosGetWithHeader } from "../../functions/axiosFunctions";
import { useSelector } from "react-redux";
import Conversation, { ConversationLoading } from "./Conversation";
import Empty from "../../components/Empty";
import MiddlePart from "./MiddlePart";
import { MessagesContext } from "./MessagesContext";
import { SocketContext } from "../../SocketContext";

export default function MainPage() {
  const user = useSelector((s) => s.user);
  const [loading, setLoading] = useState(true);
  const { conversation, userFriend, conversations, setConversations } =
    useContext(MessagesContext);
  const { friends, loadingFriends } = useContext(SocketContext);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const data = await axiosGetWithHeader(`/conversations/${user._id}`);
        setConversations(data.reverse());
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    if (user) {
      getConversations();
    }
  }, [setConversations, user]);

  return (
    <div className="grid md:grid-cols-4 h-screen pt-16 md:pb-16 lg:pb-2 px-2 bg-bgcolor gap-2">
      <div className="col-span-1 md:block hidden h-full bg-white shadow-md rounded-md overflow-y-auto no-scrollbar">
        <h1 className="font-bold mb-2 p-2 text-xl text-primary">المحادثات :</h1>
        {loading ? (
          <>
            <ConversationLoading />
            <ConversationLoading />
            <ConversationLoading />
            <ConversationLoading />
            <ConversationLoading />
          </>
        ) : !conversations.length ? (
          <Empty text={"لم تبدأ أي محادثات"} />
        ) : (
          conversations.map((c) => (
            <Conversation conversation={c} currentUser={user} key={c._id} />
          ))
        )}
      </div>
      <div className="col-span-2 md:mb-0 mb-16 bg-white shadow-md rounded-md overflow-hidden relative">
        {(!conversation || !userFriend) && <Empty text={"قم بفتح محادثة ما"} />}
        {conversation && userFriend && <MiddlePart user={user} />}
      </div>
      <div className="col-span-1 md:block hidden bg-white shadow-md rounded-md h-full overflow-y-auto no-scrollbar">
        <h1 className="font-bold mb-2 p-2 text-xl text-primary">الأصدقاء :</h1>
        {loadingFriends ? (
          <>
            <ConversationLoading />
            <ConversationLoading />
            <ConversationLoading />
            <ConversationLoading />
            <ConversationLoading />
          </>
        ) : !friends ? (
          <Empty text={"لم تبدأ أي محادثات"} />
        ) : (
          friends.map((f) => (
            <Conversation
              conversation={f}
              currentUser={user}
              friends
              key={f._id}
            />
          ))
        )}
      </div>
    </div>
  );
}
