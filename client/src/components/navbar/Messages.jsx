import { AiOutlineMessage, AiFillMessage } from "react-icons/ai";
import ConversationsPopup from "../../pages/messages/ConversationsPopup";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosGetWithHeader } from "../../functions/axiosFunctions";
import { useSelector } from "react-redux";

export default function Messages({ popup, setPopup, closeAll, setPopupNot }) {
  const path = useLocation().pathname;
  const [newConvLength, setNewConvLength] = useState(0);
  const user = useSelector((s) => s.user);

  console.log(path.startsWith("/messages"));
  const handle = () => {
    closeAll();
    setPopup(!popup);
    setPopupNot(false);
  };
  useEffect(() => {
    const fetchLength = async () => {
      try {
        const data = await axiosGetWithHeader(
          `/conversations/new_conversations/${user._id}`
        );
        setNewConvLength(data);
      } catch (error) {}
    };
    if (user) fetchLength();
    setInterval(() => {
      fetchLength();
    }, 30000);
  }, [user]);
  return (
    <>
      <div className="relative">
        <button
          onClick={handle}
          className="p-1 relative rounded-lg lg:text-3xl text-2xl text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center"
        >
          {popup || path.startsWith("/messages") ? (
            <AiFillMessage className="text-title" />
          ) : (
            <AiOutlineMessage />
          )}
          {newConvLength > 0 && (
            <span className="absolute text-xs bg-orange-500 top-0 left-0 text-white rounded-full p-[2px] w-4 h-4 flex items-center justify-center">
              {newConvLength <= 9 ? newConvLength : "+9"}
            </span>
          )}
        </button>
        {popup && <ConversationsPopup closeAll={closeAll} />}
      </div>
    </>
  );
}
