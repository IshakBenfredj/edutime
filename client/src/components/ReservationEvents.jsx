import React from "react";
import Button from "./Button";
import {
  axiosDeleteWithHeader,
  axiosPutWithHeader,
} from "../functions/axiosFunctions";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteReservation,
  updateReservation,
} from "../toolkit/slices/reservations";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { useCreateNotification } from "../functions/newNotification";

export default function ReservationEvents({ id, isWait, reservation }) {
  const dispatch = useDispatch();
  const createNotification = useCreateNotification();
  const user = useSelector((s) => s.user);
  const handleAccept = async () => {
    try {
      const data = await axiosPutWithHeader(`/reservations/accept/${id}`);
      dispatch(updateReservation({ id, data }));
      await createNotification({
        userFrom: user._id,
        userTo: reservation.client,
        type: "reservation",
        post: reservation.courseId,
        accept: true,
      });
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const handleDelete = async () => {
    try {
      const data = await axiosDeleteWithHeader(`/reservations/delete/${id}`);
      handleSuccess(data.message);
      dispatch(deleteReservation(id));
      await createNotification({
        userFrom: user._id,
        userTo: reservation.client,
        type: "reservation",
        post: reservation.courseId,
        accept: false,
      });
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  return (
    <td className="flex items-center w-fit gap-2">
      {isWait && (
        <Button clickFunc={handleAccept} text={"قبول"} color={"success"} />
      )}
      <Button clickFunc={handleDelete} text={"حذف"} color={"danger"} />
    </td>
  );
}
