import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Title from "../components/Title";
import ReservationsTable from "../components/ReservationsTable";

export default function UserReservations() {
  const user = useSelector((s) => s.user);
  const courses = useSelector((s) => s.courses);

  const [isWait, setIsWait] = useState(true);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    const myCourses = courses.filter((c) => c.userId === user._id);
    setMyCourses(myCourses);
  }, [courses, user]);

  return (
    <div className="ps bg-bgcolor min-h-screen">
      <div className="container">
        <Title title={"طلبات الحجز"} />
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsWait(true)}
            className={`border-2 border-secondary text-secondary p-2 rounded-md font-bold ${
              isWait && "bg-secondary text-white"
            }`}
          >
            قيد الإنتظار
          </button>
          <button
            onClick={() => setIsWait(false)}
            className={`border-2 border-secondary text-secondary p-2 rounded-md font-bold ${
              !isWait && "bg-secondary text-white"
            }`}
          >
            المقبولة
          </button>
        </div>
        <div className="space-y-4 mt-4">
          {myCourses &&
            myCourses.map((c) => (
              <ReservationsTable course={c} key={c._id} isWait={isWait} />
            ))}
        </div>
      </div>
    </div>
  );
}
