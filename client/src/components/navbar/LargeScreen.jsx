import { NavLink, useLocation } from "react-router-dom";
import images from "../../constants/images";
import { useSelector } from "react-redux";
import Search from "./Search";
import NavDropdown from "./NavDropdown";
import AddAnnDropdown from "./AddAnnDropdown";
import Notifications from "./Notifications";
import Messages from "./Messages";

// Import Icons
import { PiStudent, PiStudentFill } from "react-icons/pi";
import RequestDropdown from "./RequestDropdown";

export default function LargeScreen({
  showSearch,
  setShowSearch,
  closeAll,
  setOpenNav,
  popupMessages,
  setPopupMessages,
  setPopupNot,
  popupNot,
}) {
  const user = useSelector((s) => s.user);
  const path = useLocation().pathname;

  return (
    <div className="container lg:flex hidden items-center justify-between">
      <NavLink to={"/"} className="w-32">
        <img src={images.mainLogo} alt="" />
      </NavLink>
      <nav className="flex items-center gap-3">
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
          to={`/blogs`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          المدونة
        </NavLink>
        <NavLink
          to={`/forum`}
          className={`p-2 text-lg text-gray-500 transition-all hover:text-title`}
        >
          المنتدى
        </NavLink>
      </nav>
      <div className="flex items-center gap-4 z-40">
        <Search
          setShowSearch={setShowSearch}
          showSearch={showSearch}
          setOpenNav={setOpenNav}
          setPopupMessages={setPopupMessages}
          setPopupNot={setPopupNot}
        />
        {user && (
          <>
            <Notifications
              closeAll={closeAll}
              popup={popupNot}
              setPopup={setPopupNot}
              setPopupMessages={setPopupMessages}
            />
            <Messages
              popup={popupMessages}
              setPopup={setPopupMessages}
              closeAll={closeAll}
              setPopupNot={setPopupNot}
            />
            {!user.isAdmin ? (
              <NavLink
                to={user.isCenter ? `/reservations` : `/my_reservations`}
                className="p-1 rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center gap-1"
              >
                {path === "/reservations" || path === "/my_reservations" ? (
                  <PiStudentFill size={28} />
                ) : (
                  <PiStudent size={28} />
                )}
                <span>{user.isCenter ? "طلبات الحجز" : "حجوزاتي"}</span>
              </NavLink>
            ) : (
              <RequestDropdown
                closeAll={closeAll}
                setPopupMessages={setPopupMessages}
                setPopupNot={setPopupNot}
              />
            )}
            {(user.isCenter || user.isAdmin) && (
              <AddAnnDropdown
                closeAll={closeAll}
                setPopupMessages={setPopupMessages}
                setPopupNot={setPopupNot}
              />
            )}
          </>
        )}
        <NavDropdown
          closeAll={closeAll}
          setPopupMessages={setPopupMessages}
          setPopupNot={setPopupNot}
        />
      </div>
    </div>
  );
}
