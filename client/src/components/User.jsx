import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosPutWithHeader } from "../functions/axiosFunctions";
import { getUsers } from "../toolkit/slices/users";
import { handleError } from "../functions/toastifyFunctions";
import { getUser } from "../functions/getFunctions";
import { Link } from "react-router-dom";
import { FaHeartCircleCheck, FaRegHeart } from "react-icons/fa6";
import { useCreateNotification } from "../functions/newNotification";

export default function User({ id, setPopup }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const me = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const createNotification = useCreateNotification();

  const handleLike = async () => {
    try {
      const data = await axiosPutWithHeader(`/users/like/${id}`);
      setUser(data);
      if (!user.followers.includes(me._id)) {
        await createNotification({
          userTo: user._id,
          userFrom: me._id,
          type: "follow",
        });
      }
      dispatch(getUsers());
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const user = await getUser(id);
        setUser(user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="animate-pulse p-3">
          <span className="w-[90%] block h-6 bg-slate-300 mx-auto"></span>
        </div>
      ) : user ? (
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
            {me &&
              user._id !== me._id &&
              (user.followers.includes(me._id) ? (
                <FaHeartCircleCheck />
              ) : (
                <FaRegHeart />
              ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
