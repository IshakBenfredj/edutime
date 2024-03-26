import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ReservationEvents from "./ReservationEvents";

export default function ReservationsTable({ course, isWait }) {
  const reservations = useSelector((s) => s.reservations);
  const [courseRes, setCourseRes] = useState([]);
  useEffect(() => {
    const courseRes = reservations.filter(
      (r) =>
        r.courseId === course._id &&
        ((isWait && !r.isAccept) || (!isWait && r.isAccept))
    );
    setCourseRes(courseRes);
  }, [reservations, course, isWait]);

  return (
    <div className="md:overflow-auto overflow-scroll md:p-0 py-3">
      <table className="w-full shadow-lg md:text-base text-sm">
        <caption className="p-2 text-white bg-teal-600 font-bold text-lg">
          {course.name}
        </caption>
        {!courseRes.length && (
          <tfoot className="py-2 block bg-white font-bold text-center">
            {isWait && "لا يوجد أي حجوزات قيد الإنتظار لهذه الدورة"}
            {!isWait && "لا يوجد أي حجوزات مقبولة لهذه الدورة"}
          </tfoot>
        )}
        {courseRes.length > 0 && (
          <>
            <thead>
              <th>الرقم</th>
              <th>إسم الحاجز</th>
              <th>رقم الهاتف</th>
              <th>العنوان</th>
              <th>الإجراء</th>
            </thead>
            {courseRes.map((c, i) => (
              <tr className="bg-white">
                <td>{i + 1}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <ReservationEvents id={c._id} reservation={c} isWait={isWait} />
              </tr>
            ))}
          </>
        )}
      </table>
    </div>
  );
}
