import { useState } from "react";
import { IoCloseSharp, IoSend } from "react-icons/io5";
import Comments from "./Comments";
import { axiosPostWithHeader } from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateNotification } from "../functions/newNotification";

export default function PostDetails({
  post,
  userPost,
  setComments,
  comments,
  setOpenDetails,
  openDetails,
}) {
  const [comment, setComment] = useState([]);
  const user = useSelector((s) => s.user);
  const createNotification = useCreateNotification();

  const handleClose = () => {
    setOpenDetails(false);
    document.body.classList.remove("overflow-hidden");
  };

  const handleComment = async (e) => {
    try {
      e.preventDefault();
      const data = await axiosPostWithHeader("/comments/add", {
        comment,
        postId: post._id,
      });
      setComments([...comments, data]);
      setComment("");
      handleSuccess("تم إضافة تعليقك");
      if (userPost._id !== user._id) {
        await createNotification({
          userTo: userPost._id,
          userFrom: user._id,
          post: post._id,
          type: "comment",
        });
      }
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <Parent openDetails={openDetails} handleClose={handleClose}>
      <div className="flex flex-col justify-end h-full pb-32">
        <Comments
          comments={comments}
          id={post._id}
          setComments={setComments}
          reverse={true}
        />
        <div className="md:absolute fixed bottom-0 w-full left-0 px-3 py-4 bg-white">
          <div
            className={`flex items-center min-h-8 bg-bgcolor rounded-md border-2 border-gray-400`}
          >
            <span
              onClick={handleComment}
              className="p-2 text-2xl text-gray-600"
            >
              <IoSend />
            </span>
            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              className="w-full bg-bgcolor outline-none min-h-full"
            />
          </div>
        </div>
      </div>
    </Parent>
  );
}

const Parent = ({ children, openDetails, handleClose }) => {
  const path = useLocation().pathname;
  return (
    <>
      <div
        className={`z-[100] h-screen  ${
          path === "/forum" ? "-top-3" : "top-0"
        } right-0 left-0 bg-black/70 fixed ${
          openDetails ? "hidden md:flex" : "hidden"
        } justify-center`}
      >
        <div className={`w-1/2 h-screen bg-bgcolor relative`}>
          <div className="p-1 border-b-[1px] border-gray-500">
            <IoCloseSharp
              size={30}
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>
          {children}
        </div>
      </div>
      <div
        className={`fixed rounded-tl-2xl rounded-tr-2xl overflow-hidden w-screen h-full md:hidden ${
          openDetails
            ? `translate-y-0  ${path === "/forum" ? "-top-3" : "top-0"}`
            : "translate-y-full overflow-hidden"
        } transition-all duration-400 w-screen bottom-0 right-0 bg-bgcolor z-[100] space-y-0`}
      >
        <div className="p-1 border-b-[1px] border-gray-500">
          <IoCloseSharp
            size={30}
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        {children}
      </div>
    </>
  );
};
