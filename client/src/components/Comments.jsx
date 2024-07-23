/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import Loading from "./loading/Loading";
import Empty from "./Empty";
import {
  axiosDeleteWithHeader,
  axiosGetWithoutHeader,
} from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { getUser } from "../functions/getFunctions";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";

import renderPostText from "../functions/renderPostText.js";

export default function Comments({ id, comments, setComments }) {
  const [loading, setLoading] = useState(true);
  const path = useLocation().pathname;

  useEffect(() => {
    const fetchCommments = async () => {
      try {
        const data = await axiosGetWithoutHeader(`/comments/${id}`);
        if (path === "/forum") {
          setComments(data.reverse());
        } else {
          setComments(data);
        }
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoading(false);
    };
    id && fetchCommments();
  }, [id, setComments, path]);

  return (
    <div className="overflow-auto no-scrollbar">
      {loading ? (
        <Loading />
      ) : !comments.length ? (
        <Empty text={"لا يوجد تعليقات"} />
      ) : (
        <div className="space-y-2 h-full">
          {comments.map((c) => (
            <Comment comment={c} key={c._id} setComments={setComments} />
          ))}
        </div>
      )}
    </div>
  );
}

const Comment = ({ comment, setComments }) => {
  const [userComment, setUserComment] = useState();
  const [loading, setLoading] = useState(true);
  const user = useSelector((s) => s.user);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(comment.userId);
      setUserComment(user);
      setLoading(false);
    };
    fetchUser();
  }, [comment]);

  const handleDelete = async () => {
    const confirmDelete = confirm("هل ترغب فعلا في حذف هذا التعليق ؟");
    if (confirmDelete) {
      try {
        const data = await axiosDeleteWithHeader(
          `/comments/delete/${comment._id}`
        );
        setComments((prevComments) =>
          prevComments.filter((c) => c._id !== comment._id)
        );

        handleSuccess(data.message);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="bg-white p-3 relative md:w-full w-[95%] mx-auto before:h-full before:w-1 before:bg-secondary before:absolute before:right-0 before:top-0 animate-pulse">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-slate-200"></span>
            <p className="h-5 w-2/5 bg-slate-200"></p>
          </div>
          <p className="text-color mt-2 h-10 w-full bg-slate-200"></p>
        </div>
      ) : !userComment ? (
        <></>
      ) : (
        <div className="bg-white p-3 w-[95%] mx-auto relative before:h-full before:w-1 before:bg-secondary before:absolute before:right-0 before:top-0">
          <div className="flex items-center justify-between">
            <Link
              to={`/profile/${userComment._id}`}
              className="flex items-center gap-3 text-primary font-bold"
            >
              <img
                src={userComment.image}
                alt=""
                className="w-9 h-9 rounded-full object-cover border-[1px] border-gray-200"
              />
              <p>{userComment.name}</p>
            </Link>
            {user && user._id === userComment._id && (
              <span
                onClick={handleDelete}
                className="bg-red-400 cursor-pointer text-white rounded-full p-1"
              >
                <MdDeleteForever size={24} />
              </span>
            )}
          </div>
          <p className="text-color mt-2">{renderPostText(comment.comment)}</p>
        </div>
      )}
    </>
  );
};
