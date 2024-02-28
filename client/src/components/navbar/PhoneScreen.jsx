import React from "react";
import images from "../../constants/images";
import NavDropdown from "./NavDropdown";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";

// Import Icons
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { PiStudent, PiStudentFill } from "react-icons/pi";
import {
  AiOutlineMessage,
  AiFillMessage,
  AiOutlinePlusCircle,
  AiFillPlusCircle,
} from "react-icons/ai";
import Messages from "./Messages";
import Notifications from "./Notifications";

export default function PhoneScreen({
  openNav,
  closeAll,
  showSearch,
  setShowSearch,
  setOpenNav,
}) {
  const user = useSelector((s) => s.user);
  const path = useLocation().pathname;

  const openNavFunc = () => {
    setOpenNav(!openNav);
    setShowSearch(false);
    document.querySelector("body").classList.remove("open");
    document.querySelector("body").classList.add("nav");
  };

  console.log(path);
  return (
    <div className="px-3 lg:hidden relative flex items-center h-[100%] justify-between">
      <div className="flex items-center gap-3">
        <div
          className="text-gray-500"
          onClick={openNav ? closeAll : openNavFunc}
        >
          {openNav ? <IoClose size={24} /> : <FaBars size={24} />}
        </div>
        <NavDropdown closeAll={closeAll} />
        {user && (
          <>
            {user.isCenter && (
              <>
                <NavLink
                  to={`/add_announcement`}
                  className="rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center"
                >
                  {
                    path === '/add_announcement' ? <AiFillPlusCircle size={30} /> : <AiOutlinePlusCircle size={30} />
                  }
                </NavLink>
                <NavLink
                  to={`/reservations`}
                  className="rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center"
                >
                  <PiStudent size={30} />
                </NavLink>
              </>
            )}
            {!user.isCenter && (
              <NavLink
                to={`/myReservations`}
                className="rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center"
              >
                <PiStudent size={30} />
              </NavLink>
            )}
          </>
        )}
        {!user && (
          <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        )}
      </div>
      <div className="flex items-center gap-3">
        <NavLink to={"/"} className="w-14">
          <img src={images.phoneLogo} alt="" className="w-full h-full" />
        </NavLink>
      </div>
      <nav
        className={`${
          openNav ? "flex" : "hidden"
        } flex-col gap-3 fixed top-20 bg-white w-1/2 text-center rounded-md shadow-lg before:absolute before:top-[-20px] before:right-2 before:border-[10px] before:border-transparent before:border-b-white`}
      >
        <NavLink
          to={`/`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          الرئيسية
        </NavLink>
        <NavLink
          to={`/courses`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          الدورات
        </NavLink>
        <NavLink
          to={`/articles`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          المدونة
        </NavLink>
        <NavLink
          to={`/articles`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          المنتدى
        </NavLink>
      </nav>
      {user && (
        <nav className="fixed bottom-0 flex justify-center items-center gap-9 w-screen right-0 h-14 bg-white border-[1px] border-gray-400">
          <div className="flex items-center flex-col justify-center py-2">
            <Messages />
            <span className="text-gray-500 text-[8px] font-bold">الرسائل</span>
          </div>
          <div className="flex items-center flex-col justify-center py-2">
            <Search showSearch={showSearch} setShowSearch={setShowSearch} />
            <span className="text-gray-500 text-[8px] font-bold">البحث</span>
          </div>
          <div className="flex items-center flex-col justify-center py-2">
            <Notifications />
            <span className="text-gray-500 text-[8px] font-bold">
              الإشعارات
            </span>
          </div>
        </nav>
      )}
    </div>
  );
}
