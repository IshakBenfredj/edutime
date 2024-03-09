import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "./Button";

export default function ReservationsTable({ course }) {
  const reservations = useSelector((s) => s.reservations);
  const [courseRes, setCourseRes] = useState([]);
  useEffect(() => {
    const courseRes = reservations.filter(
      (r) => r.courseId === course._id && r.state === "wait"
    );
    setCourseRes(courseRes);
  }, [reservations, course]);

  return (
    <table className="w-full shadow-lg">
      <caption className="p-2 text-white bg-teal-600 font-bold text-lg">
        {course.name}
      </caption>
      {!courseRes.length && (
        <tfoot className="py-2 block bg-white font-bold text-center">
          لا يوجد أي حجوزات قيد الإنتظار لهذه الدورة
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
          {courseRes.map((c,i) => (
            <tr className="bg-white">
              <td>{i+1}</td>
              <td>{c.name}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td className="flex items-center">
                <Button text={'قبول'} color={'success'} />
                <Button text={'حذف'} color={'danger'} />
              </td>
            </tr>
          ))}
        </>
      )}
    </table>
  );
}
