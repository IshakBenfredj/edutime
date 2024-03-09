import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function ReservationCard({ data }) {
  const users = useSelector((s) => s.users);
  const courses = useSelector((s) => s.courses);
  const [user, setUser] = useState();
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => { 
    if (courses && users && data) {
      const course = courses.find((c) => c._id === data.courseId);
      const user = users.find((u) => u._id === data.userId);
      setCourse(course);
      setUser(user);
    }
  }, [courses, data, users]);

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
            <div className="md:text-lg text-sm font-bold">
              <span className="text-color">الدورة : </span>
              <Link
                to={`/course_details/${course._id}`}
                className=" text-primary"
              >
                {course.name}
              </Link>
            </div>
            <div className="md:text-lg text-sm font-bold">
              <span className="text-color">المشرف : </span>
              <Link to={`/profile/${user._id}`} className=" text-primary">
                {user.name}
              </Link>
            </div>
            <div className="md:text-lg text-sm font-bold">
              <span className="text-color">الحالة : </span>
              <span className=" text-primary">
                {data.state === "wait" && "طور الإنتظار"}
                {data.state === "accept" && "حجز مقبول"}
                {data.state === "refuse" && "حجز مرفوض"}
              </span>
            </div>
            <Button
              color={"danger"}
              text={"إلغاء الحجز"}
              loading={loading}
              loadingText={"جاري الحذف"}
            />
          </div>
        </div>
      )}
    </>
  );
}
