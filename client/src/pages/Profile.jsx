import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaRegHeart } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CourseworkCard from "../components/CourseworkCard";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { BsSendPlus } from "react-icons/bs";

import { axiosPutWithHeader } from "../functions/axiosFunctions";
import { handleError } from "../functions/toastifyFunctions";
import UsersPopup from "../components/UsersPopup";
import { getUser } from "../functions/getFunctions";
import Loading from "../components/loading/Loading";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [usersLikes, setUsersLikes] = useState([]);
  const userAuth = useSelector((state) => state.user);
  const all_courses = useSelector((state) => state.courses);
  const users = useSelector((state) => state.users);
  const courses = all_courses.filter((ele) => ele.userId === id);
  const [popup, setPopup] = useState(false);
  const isCenter = user && user.type === "center";

  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getUser(id);
      setUser(user);
      setFollowers(user.likes);
    };
    getUserProfile();
  }, [id]);

  useEffect(() => {
    const getFollowing = async () => {
      const following = [];
      for (let i = 0; i < users.length; i++) {
        if (users[i].likes.includes(user._id)) {
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
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <>
      {popup && <UsersPopup usersLikesId={usersLikes} setPopup={setPopup} />}
      {!user ? (
        <Loading />
      ) : (
        <div className="pt-16 grid md:grid-cols-4 grid-cols-1 min-h-screen">
          <div className="col-span-1 bg-bgcolor md:h-auto h-fit p-4 shadow-md">
            <img
              src={user.image}
              alt=""
              className="md:w-1/3 w-2/5 mx-auto rounded-full"
            />
            <h1 className="my-3 text-center text-2xl text-primary font-bold">
              {user.name}
            </h1>
            <div className="flex gap-4 justify-center mb-3">
              {isCenter && (
                <div className="bg-white border-2 border-primary rounded-md px-2 py-1 text-center">
                  <p className="font-bold text-xl">{courses.length}</p>
                  <p className="font-semibold text-sm">دورة</p>
                </div>
              )}
              <div
                onClick={() =>
                  user.likes.length > 0 &&
                  (setUsersLikes(followers), setPopup(true))
                }
                className="bg-white cursor-pointer border-2 border-primary rounded-md px-2 py-1 text-center"
              >
                <p className="font-bold text-xl">{user.likes.length}</p>
                <p className="font-semibold text-sm">توصية</p>
              </div>
              <div
                onClick={() =>
                  following.length > 0 &&
                  (setUsersLikes(following), setPopup(true))
                }
                className="bg-white cursor-pointer border-2 border-primary rounded-md px-2 py-1 text-center"
              >
                <p className="font-bold text-xl">{following.length}</p>
                <p className="font-semibold text-sm">موصى بهم</p>
              </div>
            </div>
            {userAuth && userAuth._id !== id && (
              <div className="flex justify-center gap-3 mb-3">
                {user.likes.includes(userAuth._id) ? (
                  <div
                    onClick={handleLike}
                    className="flex cursor-pointer gap-2 items-center p-2 bg-white text-primary rounded-md text-lg"
                  >
                    <FaHeartCircleCheck className="text-red-600 text-2xl" />
                  </div>
                ) : (
                  <div
                    onClick={handleLike}
                    className="flex cursor-pointer gap-2 items-center p-2 bg-white text-primary rounded-md text-lg"
                  >
                    <FaRegHeart />
                    <span>توصية</span>
                  </div>
                )}
                <div className="flex gap-2 items-center p-2 bg-white text-primary rounded-md text-lg">
                  <BsSendPlus />
                  <span>رسالة</span>
                </div>
              </div>
            )}
            <p className="text-center mb-4 text-primary">{user.bio}</p>
            <div className="grid grid-cols-1 gap-2">
              {user.phone && (
                <Link
                  to={`tel:${user.phone}`}
                  className="flex font-semibold text-lg items-center justify-center gap-2 text-primary"
                >
                  <FaPhone />
                  <span>{user.phone}</span>
                </Link>
              )}
              <Link
                to={`mailto:${user.email}`}
                className="flex font-semibold text-lg items-center justify-center gap-2 text-primary"
              >
                <MdEmail />
                <span>{user.email}</span>
              </Link>
              {user.address && (
                <div className="flex font-semibold text-lg items-center justify-center gap-2 text-primary">
                  <FaMapMarkerAlt />
                  <span>{user.address}</span>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-3 grid lg:grid-cols-3 2xl:grid-cols-4 grid-cols-2 lg:gap-6 gap-2 p-4 h-fit">
            {courses &&
              courses.map((course) => (
                <CourseworkCard data={course} key={course._id} />
              ))}
          </div>
        </div>
      )}
    </>
  );
}
