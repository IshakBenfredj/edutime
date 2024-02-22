import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaCalendarDays, FaPhone, FaRegClock } from "react-icons/fa6";
import { MdOutlineMessage } from "react-icons/md";

export default function CourseworkCard({ data }) {
  const users = useSelector((state) => state.users);
  const user = users.find((user) => data.userId === user._id);

  return (
    <div className="bg-bgcolor shadow rounded-xl p-2">
      {/* Image of course & state & address & price DA */}
      <div className="lg:h-32 h-24 w-[100%] rounded-xl bg-blue-500 relative">
        <img
          src={data.image}
          className="w-[100%] h-full object-cover"
          alt={data.name}
        />
        <div className="absolute top-2 right-2 flex items-center gap-1 w-full">
          <span className="bg-green-700 text-white p-1 rounded-md lg:text-xs text-[9px]">
            حضوري
          </span>
          <span className="bg-green-700 text-white p-1 rounded-md lg:text-xs text-[9px]">
            سطيف حي بيكا 124
          </span>
        </div>
        <span className="absolute overflow-hidden bg-red-700 lg:h-12 h-8 lg:w-12 w-8 text-white lg:p-2 p-1 text-center rounded-full lg:-bottom-6 -bottom-4 left-2 lg:text-xs text-[9px]">
          {data.price} <br />
          DA
        </span>
      </div>
      {/* Link For User That Publish this Course */}
      <Link
        to={`/profile/${user._id}`}
        className="flex items-center lg:gap-2 gap-1 mt-3 text-primary"
      >
        {/* <FaCircleUser className="text-2xl" /> */}
        <img
          src={user.image}
          className="lg:w-8 w-6 lg:h-8 h-6 border-[1px] border-primary rounded-full"
          alt=""
        />
        <span className="lg:text-sm text-xs font-bold">{user.name}</span>
      </Link>
      {/* Title of course */}
      <h1 className="lg:my-3 my-2 font-bold lg:text-lg text-xs text-primary">
        {data.name.length >= 22 ? `${data.name.slice(0, 22)} ...` : data.name}
      </h1>
      {/* Date of Course & number of hours */}
      <div className="flex items-center justify-between lg:mt-3">
        <div className="flex items-center lg:gap-2 gap-1 text-color">
          <FaCalendarDays className="lg:text-base text-xs" />
          <span className="lg:text-sm text-[10px] font-bold">
            {data.dateStart}
          </span>
        </div>
        <div className="flex items-center lg:gap-2 gap-1 text-color">
          <FaRegClock className="lg:text-base text-xs" />
          <span className="lg:text-sm text-[10px] font-bold">
            {data.hours} ساعة
          </span>
        </div>
      </div>
      <span className="w-full h-[1px] bg-primary block my-2 opacity-70"></span>
      {/* Contact Informations */}
      <div className="flex items-center justify-between">
        <div className="lg:text-xl cursor-pointer text-primary">
          <MdOutlineMessage />
        </div>
        <Link
          to={`tel:${user.phone}`}
          className="flex items-center lg:gap-2 gap-1 text-primary"
        >
          <span className="lg:text-sm text-xs font-bold">{user.phone}</span>
          <FaPhone className="lg:text-base text-xs" />
        </Link>
      </div>
      {/* Buttons */}
      <div className="flex items-center lg:gap-2 gap-1 mt-2">
        <Link
          to={"/"}
          className="p-1 lg:text-base text-xs text-white bg-title border-title border-2 w-2/3 text-center rounded-md"
        >
          أحجز الآن
        </Link>
        <Link
          to={"/"}
          className="p-1 lg:text-base text-xs border-secondary border-2 text-secondary rounded-md"
        >
          التفاصيل
        </Link>
      </div>
    </div>
  );
}
