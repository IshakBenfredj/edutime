import { IoCloseSharp } from "react-icons/io5";
import Input from "./Input";
import { useState } from "react";
import { FaInfo, FaPhone } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import Button from "./Button";
import { axiosPostWithHeader } from "../functions/axiosFunctions";
import { useDispatch } from "react-redux";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { addReservation } from "../toolkit/slices/reservations";

export default function ReservationPopup({ course, setReservation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!name || !address || !phone) {
      handleError("جميع الحقول مطلوبة");
      return;
    }
    try {
      const { data } = await axiosPostWithHeader(`/reservations/add`, {
        name,
        phone,
        address,
        courseId: course._id,
      });
      handleSuccess("تم طلب الحجز بنجاح , سيصلك إشعار في حال قبول أو رفض حجزك");
      dispatch(addReservation(data));
    } catch (error) {
      handleError(error.response.data.error);
    }
    setName("");
    setPhone("");
    setAddress("");
    setLoading(false);
  };
  return (
    <div className="fixed z-50 h-screen top-0 right-0 left-0 bg-black/70 flex justify-center items-center">
      <div className="bg-bgcolor max-h-fit no-scrollbar overflow-auto lg:w-1/4 md:w-2/5 w-4/5 rounded-lg">
        <div className="p-1 border-b-[1px] border-gray-500">
          <IoCloseSharp
            size={30}
            className="cursor-pointer"
            onClick={() => setReservation(false)}
          />
        </div>
        <form className="p-3 space-y-3" onSubmit={handleSubmit}>
          <p className="text-primary text-lg font-bold text-center">
            الحجز في <span className="text-title">{course.name}</span>
          </p>
          <Input
            label={"الإسم الكامل"}
            set={setName}
            type={"text"}
            name="name"
            Icon={FaInfo}
            state={name}
          />
          <Input
            label={"رقم الهاتف"}
            set={setPhone}
            type={"number"}
            name="phone"
            Icon={FaPhone}
            state={phone}
          />
          <Input
            set={setAddress}
            label={"العنوان"}
            type={"text"}
            name={"address"}
            Icon={FaMapMarkerAlt}
            state={address}
          />
          <Button text={"الحجز"} loadingText={"جاري الحجز"} loading={loading} />
        </form>
      </div>
    </div>
  );
}
