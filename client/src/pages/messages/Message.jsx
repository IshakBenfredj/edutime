import moment from "moment";
import images from "../../constants/images";
import { MdDeleteForever } from "react-icons/md";
import { axiosDeleteWithHeader } from "../../functions/axiosFunctions";
import { handleError } from "../../functions/toastifyFunctions";
import { useState } from "react";

export default function Message({
  userContact,
  user,
  message,
  messages,
  setMessages,
  lastMessage
}) {
  const formattedTimestamp = moment(message.createdAt).calendar(null, {
    sameDay: "HH:mm",
    lastDay: "HH:mm",
    lastWeek: "dddd HH:mm",
    sameElse: "DD/MM/YYYY HH:mm",
  });
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);

  const deleteMessage = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelition = confirm("هل ترغب في حذف هذه الرسالة فعلا ؟");
    if (confirmDelition) {
      try {
        await axiosDeleteWithHeader(`/messages/${message._id}`);
        const filterMessages = messages.filter((m) => m._id !== message._id);
        setMessages(filterMessages);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <>
      {message.sender === user._id ? (
        <div className="w-2/3 mb-1">
          <div className="flex gap-2">
            <div
              className="w-fit bg-blue-500 text-white p-1 rounded-md"
              onClick={() => setShowDeleteBtn(!showDeleteBtn)}
            >
              <p>{message.text}</p>
              <span className="text-xs text-slate-100 mt-1">
                {formattedTimestamp}
              </span>
            </div>
            {showDeleteBtn && (
              <MdDeleteForever
                className="text-xl text-color cursor-pointer"
                onClick={deleteMessage}
              />
            )}
          </div>
          {
            !message.isNewMessage && lastMessage &&
            (
              <img src={userContact.image} alt="" className="w-4 h-4 rounded-full mt-1" />
            )
          }
        </div>
      ) : (
        <div className="flex items-start justify-end gap-2 w-2/3 mr-auto">
          <div className="mb-1 w-fit bg-slate-400 text-white p-1 rounded-md">
            <p>{message.text}</p>
            <span className="text-xs text-slate-100 mt-1">
              {formattedTimestamp}
            </span>
          </div>
          <img
            src={userContact.name ? userContact.image : images.pProfile}
            className="w-8 h-8 rounded-full border-[1px] border-gray-300"
            alt=""
          />
        </div>
      )}
    </>
  );
}

