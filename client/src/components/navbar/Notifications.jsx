import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";

export default function Notifications() {
  return (
    <>
      <button className="p-1 rounded-lg lg:text-3xl text-2xl text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center">
        <IoMdNotificationsOutline />
      </button>
    </>
  );
}
