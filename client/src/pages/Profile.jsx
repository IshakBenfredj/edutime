import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaRegHeart } from "react-icons/fa";
import { MdEmail, MdDeleteForever } from "react-icons/md";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { BsSendPlus } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

import {
  axiosDeleteWithHeader,
  axiosPutWithHeader,
} from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import UsersPopup from "../components/UsersPopup";
import { getCoursesByUserId, getUser } from "../functions/getFunctions";
import Loading from "../components/loading/Loading";
import ProfileLeftPart from "../components/ProfileLeftPart";
import Name from "../components/Name";
import { useCreateNotification } from "../functions/newNotification";
import MessagePopup from "../components/MessagePopup";
import { SocketContext } from "../SocketContext";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [showUsers, setShowUsers] = useState(true);
  const [usersLikes, setUsersLikes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [seePhotoProfile, setSeePhotoProfile] = useState(false);
  const userToolkit = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);
  const [popup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messagePopup, setMessagePopup] = useState(false);
  const navigate = useNavigate();
  const isMyprofile = userToolkit._id === id;
  const createNotification = useCreateNotification();
  const { onlineFriends } = useContext(SocketContext);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const user = await getUser(id);
        if (user) {
          setUser(user);
          setFollowers(user.followers);
        } else {
          navigate("/404");
        }
      } catch (error) {
        navigate("/404");
      }
    };
    getUserProfile();
  }, [id, navigate]);

  useEffect(() => {
    const getCoursesFunc = async () => {
      setLoading(true);
      try {
        const data = await getCoursesByUserId(id);
        setCourses(data);
      } catch (error) {
        navigate("/404");
      }
      setLoading(false);
    };
    if (user) getCoursesFunc();
  }, [id, navigate, user]);

  useEffect(() => {
    const getFollowing = async () => {
      const following = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].followers.includes(user._id)) {
          following.push(users[i]._id);
        }
      }
      setFollowing(following);
    };
    user && users && getFollowing();
  }, [user, users]);

  const handleLike = async () => {
    try {
      const data = await axiosPutWithHeader(`/users/like/${id}`);
      setUser(data);
      if (!user.followers.includes(userToolkit._id)) {
        await createNotification({
          userTo: user._id,
          userFrom: userToolkit._id,
          type: "follow",
        });
      }
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm("هل ترغب فعلا في حذف هذا المستخدم ؟");
    if (confirmDelete) {
      try {
        const data = await axiosDeleteWithHeader(`/users/delete/${user._id}`);

        handleSuccess(data.message);
        navigate("/");
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <>
      {seePhotoProfile && (
        <div className="fixed h-screen w-screen top-0 right-0 left-0 bg-black/70 z-50 flex justify-center items-center">
          <div className="w-4/5 h-4/5 relative">
            <div
              className="p-2 cursor-pointer text-xl absolute right-0 top-0 bg-white"
              onClick={() => setSeePhotoProfile(false)}
            >
              <IoCloseSharp />
            </div>
            <img
              src={user.image}
              alt=""
              className="f-full h-full object-contain m-auto"
            />
          </div>
        </div>
      )}
      {popup && (
        <UsersPopup
          usersLikesId={usersLikes}
          setPopup={setPopup}
          showUsers={showUsers}
        />
      )}
      {messagePopup && (
        <MessagePopup setMessagePopup={setMessagePopup} user={user} />
      )}
      {!user ? (
        <Loading />
      ) : (
        <div className="pt-14 md:pb-0 pb-16 grid md:grid-cols-4 grid-cols-1 md:h-screen">
          <div className="col-span-1 bg-bgcolor h-fit md:h-auto p-4 shadow-md">
            <div
              className="md:w-44 md:h-44 w-48 h-48 mx-auto rounded-full cursor-pointer relative"
              onClick={() => setSeePhotoProfile(true)}
            >
              <img
                src={user.image}
                alt=""
                className="w-full h-full rounded-full"
              />
              {onlineFriends.includes(user._id) && (
                <span className="w-[16px] h-[16px] rounded-full bg-green-500 absolute left-3 bottom-6"></span>
              )}
            </div>
            <h1 className="my-3 flex justify-center text-2xl text-gray-900 font-bold">
              <Name name={user.name} checkmark={user.checkmark} width={"w-4"} />
            </h1>
            <div className="flex gap-4 justify-center mb-3">
              {user.isCenter && (
                <div className="bg-white border-2 border-gray-900 rounded-md px-2 py-1 text-center">
                  <p className="font-bold text-xl">{courses.length}</p>
                  <p className="font-semibold text-sm">دورات</p>
                </div>
              )}
              <div
                onClick={() =>
                  user.followers.length > 0 &&
                  (setUsersLikes(followers),
                  setPopup(true),
                  setShowUsers(user.public.followers || isMyprofile))
                }
                className="bg-white cursor-pointer border-2 border-gray-900 rounded-md px-2 py-1 text-center"
              >
                <p className="font-bold text-xl">{user.followers.length}</p>
                <p className="font-semibold text-sm">توصيات</p>
              </div>
              <div
                onClick={() =>
                  following.length > 0 &&
                  (setUsersLikes(following),
                  setPopup(true),
                  setShowUsers(user.public.following || isMyprofile))
                }
                className="bg-white cursor-pointer border-2 border-gray-900 rounded-md px-2 py-1 text-center"
              >
                <p className="font-bold text-xl">{following.length}</p>
                <p className="font-semibold text-sm">موصى بهم</p>
              </div>
            </div>
            {!isMyprofile && (
              <div className="flex justify-center gap-3 mb-3">
                {userToolkit.isAdmin && (
                  <div
                    onClick={handleDelete}
                    className="flex gap-2 items-center p-2 bg-white text-red-500 rounded-md text-2xl cursor-pointer"
                  >
                    <MdDeleteForever />
                  </div>
                )}
                {user.followers.includes(userToolkit._id) ? (
                  <div
                    onClick={handleLike}
                    className="flex cursor-pointer gap-2 items-center p-2 bg-white text-gray-900 rounded-md text-lg"
                  >
                    <FaHeartCircleCheck className="text-red-600 text-2xl" />
                  </div>
                ) : (
                  <div
                    onClick={handleLike}
                    className="flex cursor-pointer gap-2 items-center p-2 bg-white text-gray-900 rounded-md text-lg"
                  >
                    <FaRegHeart />
                    <span>توصية</span>
                  </div>
                )}
                <div
                  onClick={() => setMessagePopup(true)}
                  className="flex gap-2 cursor-pointer items-center p-2 bg-white text-gray-900 rounded-md text-lg"
                >
                  <BsSendPlus />
                  <span>رسالة</span>
                </div>
              </div>
            )}
            <p className="text-center mb-4 text-gray-800">{user.bio}</p>
            <div className="grid grid-cols-1 gap-2">
              {user.phone && user.public.phone && (
                <Link
                  to={`tel:${user.phone}`}
                  className="flex font-semibold text-lg items-center justify-center gap-2 text-gray-800"
                >
                  <FaPhone />
                  <span>{user.phone}</span>
                </Link>
              )}
              {user.public.email && (
                <Link
                  to={`mailto:${user.email}`}
                  className="flex font-semibold text-lg items-center justify-center gap-2 text-gray-800"
                >
                  <MdEmail />
                  <span>{user.email}</span>
                </Link>
              )}
              {user.address && user.public.address && (
                <div className="flex font-semibold text-lg items-center justify-center gap-2 text-gray-800">
                  <FaMapMarkerAlt />
                  <span>{user.address}</span>
                </div>
              )}
            </div>
          </div>
          <ProfileLeftPart user={user} courses={courses} loading={loading} />
        </div>
      )}
    </>
  );
}
