import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Empty from "../components/Empty";
import { getClientReservations } from "../toolkit/slices/reservations";
import ReservationCard from "../components/ReservationCard";
import Title from "../components/Title";
import Remark from "../components/Remark";

export default function ClientReservations() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.user);
  const reservations = useSelector((s) => s.reservations);

  useEffect(() => {
    dispatch(getClientReservations());
  }, [dispatch, user]);

  return (
    <div className="ps bg-bgcolor min-h-screen">
      <div className="container">
        <Title title={"حجوزاتي"} />
        <Remark
          text={
            "عند حذف أي إعلان من قبل المشرف عليه فإنه سيتم حذف جميع الحجوزات المتعلقة به تلقائيا"
          }
        />
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-center lg:gap-6 md:gap-3 gap-1 mt-6">
          {!reservations.length ? (
            <Empty text={"لا يوجد أي حجوزات"} />
          ) : (
            reservations.map((r) => (
              <ReservationCard key={r && r._id} data={r} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
