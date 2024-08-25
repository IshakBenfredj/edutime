import React, { useState } from "react";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { axiosPostWithHeader } from "../functions/axiosFunctions";

export default function MessagePopup({ setMessagePopup, user }) {
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [messageText, setMessageText] = useState("");
  const sendMessage = async () => {
    if (!messageText) {
      handleError("الرسالة مطلوبة");
      return;
    }
    setLoadingMessage(true);
    try {
      await axiosPostWithHeader(`/messages/fromProfile`, {
        id: user._id,
        text: messageText,
      });

      handleSuccess("تم إرسال الرسالة");
      setMessagePopup(false);
    } catch (error) {
      handleError(error.response.data.error);
    }
    setLoadingMessage(false);
  };
  return (
    <div className="fixed top-0 right-0 w-screen h-screen bg-black/70 z-50 flex items-center justify-center">
      <div className="lg:w-2/5 md:w-3/5 w-[95%] p-2 bg-white space-y-2 rounded-md">
        <h1 className="font-semibold text-lg">الرسالة :</h1>
        <textarea
          className="bg-bgcolor resize-y outline-none p-2 w-full min-h-28 border-[1px] border-gray-300 rounded-md"
          placeholder="رسالتك"
          onChange={(e) => setMessageText(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-4">
          <button
            onClick={sendMessage}
            className="bg-title text-white p-2 rounded-md"
          >
            {loadingMessage ? "جاري الإرسال ..." : "إرسال"}
          </button>
          <button
            onClick={() => setMessagePopup(false)}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
}
