import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { findEle } from "../functions/filter";
import { FaMapMarkerAlt, FaPhone, FaRegHeart } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CourseworkCard from "../components/CourseworkCard";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { BsSendPlus } from "react-icons/bs";

import { axiosPutWithHeader } from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { update } from "../toolkit/slices/user";
import UsersPopup from "../components/UsersPopup";
import { getUser } from "../functions/getFunctions";

export default function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const userAuth = useSelector((state) => state.user);
  const all_courses = useSelector((state) => state.courses);
  const courses = all_courses.filter((ele) => ele.userId === id);
  const [popup, setPopup] = useState(false);
  const isCenter = user && user.type === "center";

  useEffect(() => {
    const getUserProfile = async () => {
      const user = await getUser(id);
      setUser(user);
    };
    getUserProfile();
  }, [id]);

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
      {popup && <UsersPopup usersLikesId={user.likes} setPopup={setPopup} />}
      {user && (
        <div className="pt-16 grid md:grid-cols-4 grid-cols-1 min-h-screen">
          <div className="col-span-1 bg-bgcolor md:h-auto h-fit p-4 shadow-md">
            <img
              src={user.image}
              alt=""
              className="md:w-1/3 w-2/5 mx-auto rounded-full"
            />
            <h1 className="my-3 text-center text-2xl text-gray-800 font-bold">
              {user.name}
            </h1>
            <div className="flex gap-4 justify-center mb-3">
              {isCenter && (
                <div className="bg-white border-2 border-gray-800 rounded-md px-2 py-1 text-center">
                  <p className="font-bold text-xl">{courses.length}</p>
                  <p className="font-semibold text-sm">دورة</p>
                </div>
              )}
              <div
                onClick={() => user.likes.length > 0 && setPopup(true)}
                className="bg-white cursor-pointer border-2 border-gray-800 rounded-md px-2 py-1 text-center"
              >
                <p className="font-bold text-xl">{user.likes.length}</p>
                <p className="font-semibold text-sm">توصية</p>
              </div>
            </div>
            {userAuth && userAuth._id !== id && (
              <div className="flex justify-center gap-3 mb-3">
                {user.likes.includes(userAuth._id) ? (
                  <div
                    onClick={handleLike}
                    className="flex cursor-pointer gap-2 items-center p-2 bg-white rounded-md text-lg"
                  >
                    <FaHeartCircleCheck className="text-red-600 text-2xl" />
                  </div>
                ) : (
                  <div
                    onClick={handleLike}
                    className="flex cursor-pointer gap-2 items-center p-2 bg-white rounded-md text-lg"
                  >
                    <FaRegHeart />
                    <span>توصية</span>
                  </div>
                )}
                <div className="flex gap-2 items-center p-2 bg-white rounded-md text-lg">
                  <BsSendPlus />
                  <span>رسالة</span>
                </div>
              </div>
            )}
            <p className="text-center mb-4">{user.bio}</p>
            <div className="grid grid-cols-1 gap-2">
              {user.phone && (
                <Link
                  to={`tel:${user.phone}`}
                  className="flex font-semibold text-lg items-center justify-center gap-2 text-gray-900"
                >
                  <FaPhone />
                  <span>{user.phone}</span>
                </Link>
              )}
              <Link
                to={`mailto:${user.email}`}
                className="flex font-semibold text-lg items-center justify-center gap-2 text-gray-900"
              >
                <MdEmail />
                <span>{user.email}</span>
              </Link>
              {user.address && (
                <div className="flex font-semibold text-lg items-center justify-center gap-2 text-gray-900">
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
