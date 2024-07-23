import React from "react";
import images from "../../constants/images";
import NavDropdown from "./NavDropdown";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./Search";
import Messages from "./Messages";
import Notifications from "./Notifications";
import AddAnnDropdown from "./AddAnnDropdown";

// Import Icons
import { FaBars } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { PiStudent, PiStudentFill } from "react-icons/pi";
import RequestDropdown from "./RequestDropdown";

export default function PhoneScreen({
  openNav,
  closeAll,
  showSearch,
  setShowSearch,
  setOpenNav,
  popupMessages,
  setPopupMessages,
  setPopupNot,
  popupNot,
}) {
  const user = useSelector((s) => s.user);
  const path = useLocation().pathname;

  const openNavFunc = () => {
    setOpenNav(!openNav);
    setShowSearch(false);
    setPopupMessages(false);
    setPopupNot(false);
    document.querySelector("body").classList.remove("open");
    document.querySelector("body").classList.add("nav");
  };

  return (
    <div className="px-3 lg:hidden relative flex items-center h-[100%] justify-between">
      <div className="flex items-center gap-3">
        <button
          className="text-gray-500"
          onClick={openNav ? closeAll : openNavFunc}
        >
          {openNav ? <IoClose size={24} /> : <FaBars size={24} />}
        </button>
        <NavDropdown
          closeAll={closeAll}
          setPopupMessages={setPopupMessages}
          setPopupNot={setPopupNot}
        />
        {user && (
          <>
            {user.isCenter && (
              <AddAnnDropdown
                closeAll={closeAll}
                setPopupMessages={setPopupMessages}
                setPopupNot={setPopupNot}
              />
            )}
            {!user.isAdmin ? (
              <NavLink
                onClick={closeAll}
                to={user.isCenter ? `/reservations` : `/my_reservations`}
                className="rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center"
              >
                {path === "/reservations" || path === "/my_reservations" ? (
                  <PiStudentFill size={30} />
                ) : (
                  <PiStudent size={30} />
                )}
              </NavLink>
            ) : (
              <RequestDropdown
                closeAll={closeAll}
                setPopupMessages={setPopupMessages}
                setPopupNot={setPopupNot}
              />
            )}
          </>
        )}
        {!user && (
          <Search
            setOpenNav={setOpenNav}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            setPopupMessages={setPopupMessages}
            setPopupNot={setPopupNot}
          />
        )}
      </div>
      <div className="flex items-center gap-3">
        <NavLink onClick={closeAll} to={"/"} className="w-14">
          <img src={images.phoneLogo} alt="" className="w-full h-full" />
        </NavLink>
      </div>
      <nav
        className={`${
          openNav ? "flex" : "hidden"
        } flex-col gap-3 fixed top-20 bg-white w-1/2 text-center rounded-md shadow-lg before:absolute before:top-[-20px] before:right-2 before:border-[10px] before:border-transparent before:border-b-white`}
      >
        <NavLink
          onClick={closeAll}
          to={`/`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          الرئيسية
        </NavLink>
        <NavLink
          onClick={closeAll}
          to={`/courses`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          الدورات
        </NavLink>
        <NavLink
          onClick={closeAll}
          to={`/blogs`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          المدونة
        </NavLink>
        <NavLink
          onClick={closeAll}
          to={`/forum`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          المنتدى
        </NavLink>
      </nav>
      {user && (
        <nav className="fixed bottom-0 flex justify-center items-center gap-9 w-screen right-0 h-14 bg-white border-[1px] border-gray-400">
          <div className="flex items-center flex-col justify-center py-2">
            <Messages
              popup={popupMessages}
              setPopup={setPopupMessages}
              closeAll={closeAll}
              setPopupNot={setPopupNot}
            />
            <span className="text-gray-500 text-[8px] font-bold">الرسائل</span>
          </div>
          <div className="flex items-center flex-col justify-center py-2">
            <Search
              setOpenNav={setOpenNav}
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              setPopupMessages={setPopupMessages}
              setPopupNot={setPopupNot}
            />
            <span className="text-gray-500 text-[8px] font-bold">البحث</span>
          </div>
          <div className="flex items-center flex-col justify-center py-2">
            <Notifications
              closeAll={closeAll}
              popup={popupNot}
              setPopup={setPopupNot}
              setPopupMessages={setPopupMessages}
            />
            <span className="text-gray-500 text-[8px] font-bold">
              الإشعارات
            </span>
          </div>
        </nav>
      )}
    </div>
  );
}
