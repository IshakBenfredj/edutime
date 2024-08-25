import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCalendarDays, FaPhone, FaRegClock } from "react-icons/fa6";
import { MdOutlineMessage, MdDeleteForever, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { PiCertificateFill } from "react-icons/pi";
import { axiosDeleteWithHeader } from "../functions/axiosFunctions";
import { handleSuccess } from "../functions/toastifyFunctions";
import { deleteCourse } from "../toolkit/slices/courses";
import ReservationPopup from "./ReservationPopup";
import LoginPopup from "./LoginPopup";
import Name from "./Name";
import MessagePopup from "./MessagePopup";

export default function CourseCard({ data }) {
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const userCourse = users?.find((user) => data?.userId === user?._id);
  const [date, setDate] = useState("");
  const [myCourse, setMyCourse] = useState("");
  const [reservation, setReservation] = useState(false);
  const [messagePopup, setMessagePopup] = useState(false);

  useEffect(() => {
    if (user && userCourse && user._id === userCourse._id) {
      setMyCourse(true);
    } else {
      setMyCourse(false);
    }
  }, [user, userCourse]);

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`هل فعلا ترغب في حذف دورة ${data?.name}`)) {
      const dataR = await axiosDeleteWithHeader(`/courses/delete/${data?._id}`);
      handleSuccess(dataR.message);
      dispatch(deleteCourse(data?._id));
    }
  };

  useEffect(() => {
    if (!data?.isOpen) {
      const formattedDate = new Date(data?.date);
      const formatDate = `${formattedDate.getDate()}-${
        formattedDate.getMonth() + 1
      }-${formattedDate.getFullYear()}`;
      setDate(formatDate);
    }
  }, [data]);

  return (
    <>
      {messagePopup && !user ? (
        <LoginPopup set={setMessagePopup} />
      ) : (
        messagePopup && (
          <MessagePopup setMessagePopup={setMessagePopup} user={userCourse} />
        )
      )}
      {reservation &&
        (user ? (
          !user.isCenter && (
            <ReservationPopup course={data} setReservation={setReservation} />
          )
        ) : (
          <LoginPopup set={setReservation} student />
        ))}

      {userCourse && (
        <div className="bg-bgcolor shadow rounded-xl p-2 relative overflow-hidden">
          {data?.certificate && (
            <span className="absolute flex items-center top-4 lg:-left-12 -left-14 text-gray-800 -rotate-45 justify-center gap-2 lg:text-sm text-xs z-20 bg-[#FFD700] w-40 font-bold">
              <PiCertificateFill />
              شهادة
            </span>
          )}
          {/* Image of course & state & address & price DA */}
          <div className="lg:h-32 h-24 w-[100%] rounded-xl bg-blue-500 relative">
            <img
              src={data?.image}
              className="w-[100%] h-full object-cover"
              alt={data?.name}
            />
            <div className="absolute top-2 right-2 flex items-center gap-1 w-full">
              <span className="bg-green-700 text-white p-1 rounded-md lg:text-xs text-[9px]">
                {data?.isOnline ? "عن بعد" : "حضوري"}
              </span>
              <span className="bg-green-700 text-white p-1 rounded-md lg:text-xs text-[9px]">
                {data?.place}
              </span>
            </div>
            <span className="absolute flex items-center justify-center overflow-hidden bg-red-700 lg:h-12 h-8 lg:w-12 w-8 text-white lg:p-2 p-1 text-center rounded-full lg:-bottom-6 -bottom-4 left-2 lg:text-xs text-[9px]">
              {data?.isFree ? (
                "مجانية"
              ) : (
                <>
                  {data?.price} <br />
                  DA
                </>
              )}
            </span>
          </div>
          {/* Link For User That Publish this Course */}
          <Link
            to={`/profile/${userCourse._id}`}
            className="flex items-center lg:gap-2 gap-1 mt-3 text-primary"
          >
            <img
              src={userCourse.image}
              className="lg:w-8 w-6 lg:h-8 h-6 border-[1px] border-primary rounded-full"
              alt=""
            />
            <span className="lg:text-sm text-xs font-bold">
              <Name
                name={userCourse.name}
                checkmark={userCourse.checkmark}
                width={"w-3"}
              />
            </span>
          </Link>
          {/* Title of course */}
          <h1 className="lg:my-3 my-2 font-bold lg:text-lg text-xs text-primary">
            {data?.name.length >= 22
              ? `${data?.name.slice(0, 22)} ...`
              : data?.name}
          </h1>
          {/* Date of Course & number of hours */}
          <div className="flex items-center justify-between lg:mt-3">
            <div className="flex items-center lg:gap-2 gap-1 text-color">
              <FaCalendarDays className="lg:text-base text-xs" />
              <span className="lg:text-sm text-[10px] font-bold">
                {data?.isOpen ? "متاحة دائما" : date}
              </span>
            </div>
            <div className="flex items-center lg:gap-2 gap-1 text-color">
              <FaRegClock className="lg:text-base text-xs" />
              <span className="lg:text-sm text-[10px] font-bold">
                {data?.hours} ساعة
              </span>
            </div>
          </div>
          <span className="w-full h-[1px] bg-primary block my-2 opacity-70"></span>
          {/* Contact Informations */}
          <div className="flex items-center justify-between">
            <div
              className="lg:text-xl cursor-pointer text-primary"
              onClick={() => setMessagePopup(true)}
            >
              <MdOutlineMessage />
            </div>
            <Link
              to={`tel:${data?.phone}`}
              className="flex items-center lg:gap-2 gap-1 text-primary"
            >
              <span className="lg:text-sm text-xs font-bold">
                {data?.phone}
              </span>
              <FaPhone className="lg:text-base text-xs" />
            </Link>
          </div>
          {/* Buttons */}
          <div className="flex lg:gap-2 gap-1 mt-2">
            {!user || (!myCourse && user && !user.isCenter) ? (
              <>
                <button
                  onClick={() => setReservation(true)}
                  className="p-1 lg:text-base text-xs text-white bg-title hover:bg-title/80 transition-all border-title border-2 md:w-2/3 w-1/2 text-center rounded-md"
                >
                  أحجز الآن
                </button>
              </>
            ) : (
              myCourse && (
                <>
                  <Link
                    to={`/edit_course/${data?._id}`}
                    className="p-1 lg:w-1/3 w-1/4 lg:text-2xl text-lg flex justify-center hover:text-white text-title hover:bg-title transition-all border-title border-2 rounded-md"
                  >
                    <MdEdit />
                  </Link>
                  <button
                    onClick={handleDelete}
                    to={"/"}
                    className="p-1 lg:w-1/3 w-1/4 lg:text-2xl text-lg flex justify-center border-red-500 font-bold hover:bg-red-500 hover:text-white transition-all border-2 text-red-500 rounded-md"
                  >
                    <MdDeleteForever />
                  </button>
                </>
              )
            )}
            {user && user.isAdmin && (
              <button
                onClick={handleDelete}
                to={"/"}
                className="p-1 lg:w-1/3 w-1/4 lg:text-2xl text-lg flex justify-center border-red-500 font-bold hover:bg-red-500 hover:text-white transition-all border-2 text-red-500 rounded-md"
              >
                <MdDeleteForever />
              </button>
            )}
            <Link
              to={`/course_details/${data?._id}`}
              className="p-1 text-center lg:text-base text-xs md:w-1/3 w-1/2 border-secondary transition-all hover:bg-secondary hover:text-white border-2 text-secondary rounded-md"
            >
              التفاصيل
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
