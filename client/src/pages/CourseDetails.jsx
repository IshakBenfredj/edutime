import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHourglassHalf, FaUser, FaPhone } from "react-icons/fa6";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdAddComment, MdCategory, MdOutlineAttachMoney } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { PiCertificateFill } from "react-icons/pi";

import { getCourse } from "../functions/getFunctions";
import Loading from "../components/loading/Loading";
import Title from "../components/Title";
import ReservationPopup from "../components/ReservationPopup";
import LoginPopup from "../components/LoginPopup";
import Input from "../components/Input";
import Comments from "../components/Comments";
import Button from "../components/Button";
import {
  axiosDeleteWithHeader,
  axiosPostWithHeader,
} from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { deleteCourse } from "../toolkit/slices/courses";
import { useCreateNotification } from "../functions/newNotification";
import renderPostText from "../functions/renderPostText";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState();
  const [userCourse, setUserCourse] = useState();
  const [seePhotoCourse, setSeePhotoCourse] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const createNotification = useCreateNotification();

  const navigate = useNavigate();

  useEffect(() => {
    const getCoursDetails = async () => {
      try {
        const course = await getCourse(id);
        if (course) {
          setCourse(course);
          return;
        }
        navigate("/404");
      } catch (error) {
        navigate("/404");
      }
    };
    getCoursDetails();
  }, [id, navigate]);

  useEffect(() => {
    if (course) {
      const user = users.find((u) => u._id === course.userId);
      setUserCourse(user);
    }
  }, [course, users]);

  const handleComment = async (e) => {
    try {
      e.preventDefault();
      const data = await axiosPostWithHeader("/comments/add", {
        comment,
        postId: course._id,
      });
      setComments([data, ...comments]);
      setComment("");
      handleSuccess("تم إضافة تعليقك");
      if (userCourse._id !== user._id) {
        await createNotification({
          userTo: userCourse._id,
          userFrom: user._id,
          post: course._id,
          type: "course",
        });
      }
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`هل فعلا ترغب في حذف دورة ${course.name}`)) {
      const courseR = await axiosDeleteWithHeader(
        `/courses/delete/${course._id}`
      );
      handleSuccess(courseR.message);
      dispatch(deleteCourse(course._id));
    }
  };

  return (
    <>
      {seePhotoCourse && (
        <div className="fixed h-screen w-screen top-0 right-0 left-0 bg-black/70 z-50 flex justify-center items-center">
          <div className="w-4/5 h-4/5 relative">
            <div
              className="p-2 cursor-pointer text-xl absolute right-0 top-0 bg-white"
              onClick={() => setSeePhotoCourse(false)}
            >
              <IoCloseSharp />
            </div>
            <img
              src={course.image}
              alt=""
              className="f-full h-full object-contain m-auto"
            />
          </div>
        </div>
      )}
      {reservation &&
        (user ? (
          !user.isCenter && (
            <ReservationPopup course={course} setReservation={setReservation} />
          )
        ) : (
          <LoginPopup set={setReservation} />
        ))}
      {!course || !userCourse ? (
        <Loading />
      ) : (
        <div className="min-h-screen pt-14 lg:pb-0 pb-14 bg-bgcolor">
          <div className="grid md:grid-cols-2 grid-cols-1">
            <div className="bg-bgcolor p-4 relative">
              <div className="md:hidden block">
                <Title title={course.name} />
              </div>
              <img
                onClick={() => setSeePhotoCourse(true)}
                src={course.image}
                alt=""
                className="w-full h-64 object-contain mb-6 cursor-pointer"
              />
              <div className="grid md:grid-cols-2 gap-2">
                <div className="space-y-3">
                  <Link
                    to={`/profile/${course.userId}`}
                    className="detail_link"
                  >
                    <FaUser />
                    <span>{userCourse && userCourse.name}</span>
                  </Link>
                  <Link to={`tel:${course.phone}`} className="detail_link">
                    <FaPhone />
                    <span>{course.phone}</span>
                  </Link>
                  <div className="detail_link">
                    <FaMapMarkerAlt />
                    <span>{course.place}</span>
                  </div>
                  <div className="detail_link">
                    <MdOutlineAttachMoney />
                    <span>
                      {course.isFree ? "مجانية 🔥" : `${course.price} دج`}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="detail_link">
                    <MdCategory />
                    <span>{course.category}</span>
                  </div>
                  <div className="detail_link">
                    <FaCalendarAlt />
                    <span>
                      {course.isOpen
                        ? "متاحة دائما ✅"
                        : `${new Date(course.date).getDate()}-${new Date(
                          course.date
                        ).getMonth()}-${new Date(course.date).getFullYear()}`}
                    </span>
                  </div>
                  <div className="detail_link">
                    <PiCertificateFill />
                    <span>
                      {course.certificate ? "مع شهادة" : "بدون شهادة"}
                    </span>
                  </div>
                  <div className="detail_link">
                    <FaHourglassHalf />
                    <span>{course.hours} ساعة</span>
                  </div>
                </div>
              </div>
              <div>
                {user && user._id !== userCourse._id && !user.isAdmin && (
                  <>
                    <button
                      onClick={() => setReservation(true)}
                      className="bg-title py-1 px-2 w-1/2 mt-4 mx-auto text-white text-lg text-center rounded-md block"
                    >
                      أحجز الآن
                    </button>
                  </>
                )}
                {user && (user._id === userCourse._id || user.isAdmin) && (
                  <>
                    <button
                      onClick={handleDelete}
                      className="bg-red-500 py-1 px-2 w-1/2 mt-4 mx-auto text-white text-lg text-center rounded-md block"
                    >
                      حذف الإعلان
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="p-4 h-fit bg-white">
              <div className="md:block hidden">
                <Title title={course.name} />
              </div>
              <div>
                <h3 className="text-primary text-xl font-bold mb-4">
                  وصف الدورة :
                </h3>
                <pre className="text-color md:h-[65vh] md:overflow-y-auto">
                  {renderPostText(course.description)}
                </pre>
              </div>
            </div>
          </div>
          <div className="mt-6 pb-10 md:px-6 px-3 md:w-1/2 ">
            <h1 className="font-bold text-title text-3xl mb-5">
              التعليقات : {comments.length}
            </h1>
            {user && (
              <form onSubmit={handleComment} className="mb-4">
                <Input
                  set={setComment}
                  state={comment}
                  label={"إضافة تعليق"}
                  name={"comment"}
                  Icon={MdAddComment}
                  textarea
                  placeholder={"مارأيك في هذا الإعلان أو الدورة ؟"}
                />
                <div className="w-fit mt-3">
                  <Button text={"تعليق"} />
                </div>
              </form>
            )}
            <Comments
              id={course._id}
              comments={comments}
              setComments={setComments}
            />
          </div>
        </div>
      )}
    </>
  );
}
