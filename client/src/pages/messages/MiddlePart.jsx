import React, { useContext, useEffect, useRef, useState } from "react";
import { MessagesContext } from "./MessagesContext";
import Name from "../../components/Name";
import { Link } from "react-router-dom";
import {
  axiosDeleteWithHeader,
  axiosGetWithHeader,
  axiosPostWithHeader,
  axiosPutWithHeader,
} from "../../functions/axiosFunctions";
import { IoSend } from "react-icons/io5";
import Loading from "../../components/loading/Loading";
import Message from "./Message";
import { handleError } from "../../functions/toastifyFunctions";
import { MdDeleteForever } from "react-icons/md";
import images from "../../constants/images";
import { SocketContext } from "../../SocketContext";

export default function MiddlePart({ user }) {
  const {
    conversation,
    userFriend,
    newCon,
    setNewCon,
    setConversation,
    conversations,
    setConversations,
  } = useContext(MessagesContext);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const { socket, onlineFriends } = useContext(SocketContext);

  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit("addUser", user._id);
  }, [socket, user]);

  useEffect(() => {
    arrivalMessage &&
      conversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, conversation]);

  useEffect(() => {
    const markAsLu = async () => {
      try {
        await axiosPutWithHeader(
          `/messages/${conversation._id}/${userFriend._id}`
        );
      } catch (error) {}
    };
    markAsLu();
  }, [conversation, userFriend, messages]);

  const handleSubmit = async () => {
    if (!newMessage) {
      return;
    }
    if (newCon && user) {
      sendMessageNewConv();
      return;
    }
    if (user && conversation) sendMessage();
  };

  const sendMessage = async () => {
    try {
      const message = {
        sender: user._id,
        text: newMessage,
        conversationId: conversation._id,
      };

      socket?.emit("sendMessage", {
        senderId: user._id,
        receiverId: userFriend._id,
        text: newMessage,
      });
      const dataM = await axiosPostWithHeader("/messages", message);
      setMessages([...messages, dataM]);
      setNewMessage("");
    } catch (error) {}
  };

  const sendMessageNewConv = async () => {
    try {
      const data = await axiosPostWithHeader(`/messages/fromProfile`, {
        id: userFriend._id,
        text: newMessage,
      });
      setMessages([data.message]);
      setConversation(data.conversation);
      setConversations([data.conversation, ...conversations]);
      setNewCon(false);
      socket?.emit("sendMessage", {
        senderId: user._id,
        receiverId: userFriend._id,
        text: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const deleteConversation = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelition = confirm("هل ترغب في حذف هذه المحادثة فعلا ؟");
    if (confirmDelition) {
      try {
        await axiosDeleteWithHeader(`/conversations/${conversation._id}`);
        const filterConvs = conversations.filter(
          (c) => c._id !== conversation._id
        );
        setConversations(filterConvs);
        setConversation(null);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await axiosGetWithHeader(`/messages/${conversation._id}`);
        setMessages(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
      setLoadingMessages(false);
    };
    getMessages();
  }, [conversation]);

  useEffect(() => {
    console.log(messages);
    console.log(conversation);
  }, [messages, conversation]);

  return (
    <div className="flex flex-col justify-between h-full">
      <header className="p-2 border-b-[1px] border-gray-300 flex items-center justify-between">
        {userFriend.name ? (
          <Link
            to={`/profile/${userFriend._id}`}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-full border-[1px] border-gray-400 relative">
              <img
                src={userFriend.image}
                className={`w-full h-full rounded-full`}
                alt=""
              />
              {onlineFriends.includes(userFriend._id) && (
                <span className="w-[10px] h-[10px] rounded-full bg-green-500 absolute left-0 bottom-0"></span>
              )}
            </div>
            <span className="font-bold text-lg">
              <Name
                checkmark={userFriend.checkmark}
                name={userFriend.name}
                width={"w-3"}
              />
            </span>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <img
              src={images.pProfile}
              className="w-10 h-10 rounded-full border-[1px] border-gray-400"
              alt=""
            />
            <span className="font-bold text-lg">حساب محذوف</span>
          </div>
        )}
        {!newCon && (
          <MdDeleteForever
            className="text-2xl text-color cursor-pointer"
            onClick={deleteConversation}
          />
        )}
      </header>
      <div className="h-full overflow-y-scroll no-scrollbar p-2">
        {loadingMessages ? (
          <Loading />
        ) : newCon ? (
          <p className="text-color text-2xl leading-10 text-center font-bold">
            إبدأ محادثة جديدة
          </p>
        ) : (
          messages.length > 0 &&
          messages.map((m) => (
            <div ref={scrollRef}>
              <Message
                user={user}
                userContact={userFriend}
                message={m}
                key={m._id}
                messages={messages}
                setMessages={setMessages}
              />
            </div>
          ))
        )}
      </div>
      {userFriend.name && (
        <div className="p-3">
          <div className="flex min-h-14 rounded-lg overflow-hidden">
            <span
              onClick={handleSubmit}
              className="text-2xl p-2 flex items-center justify-center bg-slate-200 text-slate-500"
            >
              <IoSend />
            </span>
            <textarea
              className="min-h-full w-full bg-slate-200 outline-none pt-2"
              placeholder="أكتب رسالتك..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
