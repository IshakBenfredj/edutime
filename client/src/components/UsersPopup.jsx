import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { axiosPutWithHeader } from "../functions/axiosFunctions";
import { handleError } from "../functions/toastifyFunctions";
import { getUser } from "../functions/getFunctions";
import { IoCloseSharp } from "react-icons/io5";
import { getUsers } from "../toolkit/slices/users";

export default function UsersPopup({ usersLikesId, setPopup }) {
  return (
    <div className="fixed z-50 h-screen top-0 right-0 left-0 bg-black/70 flex justify-center items-center">
      <div className="bg-white max-h-96 no-scrollbar overflow-auto lg:w-1/4 md:w-2/5 w-4/5 rounded-lg">
        <div className="p-1 border-b-[1px] border-gray-500">
          <IoCloseSharp
            size={30}
            className="cursor-pointer"
            onClick={() => setPopup(false)}
          />
        </div>
        {usersLikesId.map((id) => (
          <User id={id} key={id} setPopup={setPopup} />
        ))}
      </div>
    </div>
  );
}

const User = ({ id, setPopup }) => {
  const [user, setUser] = useState();
  const me = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const handleLike = async () => {
    try {
      const data = await axiosPutWithHeader(`/users/like/${id}`);
      setUser(data);
      dispatch(getUsers());
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getUser(id);
      setUser(user);
    };
    getUserProfile();
  }, [id]);

  return (
    <>
      {user ? (
        <div className="flex items-center">
          <Link
            to={`/profile/${user._id}`}
            onClick={() => setPopup(false)}
            className="w-4/5 p-2 flex items-center gap-2 text-primary hover:text-secondary text-lg font-bold"
          >
            <img
              src={user && user.image}
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <span>{user.name}</span>
          </Link>
          <div
            className="w-1/5 p-2 cursor-pointer flex justify-center items-center text-2xl text-red-700"
            onClick={() => handleLike(user._id)}
          >
            {user._id === me._id ? (
              <></>
            ) : user.likes.includes(me._id) ? (
              <FaHeartCircleCheck />
            ) : (
              <FaRegHeart />
            )}
          </div>
        </div>
      ) : (
        <div className="animate-pulse p-3">
          <span className="w-[90%] block h-6 bg-slate-300 mx-auto"></span>
        </div>
      )}
    </>
  );
};
