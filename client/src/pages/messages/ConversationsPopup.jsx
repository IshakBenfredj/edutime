import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { axiosGetWithHeader } from "../../functions/axiosFunctions";
import Conversation from "./Conversation";
import { ConversationLoading } from "./Conversation";
import Empty from "../../components/Empty";
import { MessagesContext } from "./MessagesContext";

export default function ConversationsPopup({ closeAll }) {
  const user = useSelector((s) => s.user);
  const { conversations, setConversations } = useContext(MessagesContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const data = await axiosGetWithHeader(`/conversations/${user._id}`);
        setConversations(data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };
    getConversations();
  }, [setConversations, user]);

  return (
    <div className="md:w-[350px] w-[95%] bg-white h-96 fixed md:left-auto left-1/2 md:translate-x-0 overflow-auto -translate-x-1/2 lg:top-16 lg:bottom-auto bottom-16 shadow-xl border-2 border-title">
      <h3 className="p-2 text-lg font-bold text-primary">المحادثات :</h3>
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
          <Link to={"/messages"} onClick={closeAll}>
            <Conversation conversation={c} currentUser={user} key={c} />
          </Link>
        ))
      )}
    </div>
  );
}
