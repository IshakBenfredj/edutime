import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";
import { axiosDeleteWithHeader } from "../functions/axiosFunctions";
import { deleteReservation } from "../toolkit/slices/reservations";
import { handleSuccess } from "../functions/toastifyFunctions";
import Name from "./Name";

export default function ReservationCard({ data }) {
  const users = useSelector((s) => s.users);
  const courses = useSelector((s) => s.courses);
  const [user, setUser] = useState();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (courses && users && data) {
      const course = courses.find((c) => c._id === data.courseId);
      const user = users.find((u) => u._id === data.userId);
      setCourse(course);
      setUser(user);
    }
  }, [courses, data, users]);
  const handleDelete = async () => {
    setLoading(true);
    try {
      const dataRes = await axiosDeleteWithHeader(
        `/reservations/delete/${data._id}`
      );
      dispatch(deleteReservation(data._id));
      handleSuccess(dataRes.message);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <>
      {course && user && (
        <div className="bg-white shadow-md rounded-md overflow-hidden">
          <div className="w-full h-32">
            <img
              src={course.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2 space-y-2">
            <div className="md:text-base text-sm font-bold">
              <span className="text-color">الدورة : </span>
              <Link
                to={`/course_details/${course._id}`}
                className=" text-primary"
              >
                {course.name}
              </Link>
            </div>
            <div className="md:text-base text-sm font-bold flex gap-2 flex-wrap">
              <span className="text-color">المشرف : </span>
              <Link to={`/profile/${user._id}`} className=" text-primary">
                <Name
                  name={user.name}
                  checkmark={user.checkmark}
                  width={"w-4"}
                />
              </Link>
            </div>
            <div className="md:text-base text-sm font-bold">
              <span className="text-color">الحالة : </span>
              <span className=" text-primary">
                {!data.isAccept && "طور الإنتظار"}
                {data.isAccept && "حجز مقبول"}
              </span>
            </div>
            <Button
              color={"danger"}
              text={"إلغاء الحجز"}
              loading={loading}
              loadingText={"جاري الحذف"}
              clickFunc={handleDelete}
            />
          </div>
        </div>
      )}
    </>
  );
}
