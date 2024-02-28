import { NavLink, useLocation } from "react-router-dom";
import images from "../../constants/images";
import { useSelector } from "react-redux";
import Search from "./Search";
import NavDropdown from "./NavDropdown";

// Import Icons
import { PiStudent, PiStudentFill } from "react-icons/pi";
import { AiOutlinePlusCircle, AiFillPlusCircle } from "react-icons/ai";
import Notifications from "./Notifications";
import Messages from "./Messages";

export default function LargeScreen({ showSearch, setShowSearch, closeAll }) {
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
      <div className="flex items-center gap-4 z-40">
        {user && (
          <>
            <Search setShowSearch={setShowSearch} showSearch={showSearch} />
            <Notifications />
            <Messages />
            {user.isCenter && (
              <>
                <NavLink
                  to={`/reservations`}
                  className="p-1 rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center gap-1"
                >
                  <PiStudent size={28} />
                  <span>الحجوزات</span>
                </NavLink>
                <NavLink
                  to={`/add_announcement`}
                  className="p-1 rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center gap-1"
                >
                  {path === "/add_announcement" ? (
                    <AiFillPlusCircle size={30} />
                  ) : (
                    <AiOutlinePlusCircle size={30} />
                  )}
                  <span>إضافة إعلان</span>
                </NavLink>
              </>
            )}
          </>
        )}
        <NavDropdown closeAll={closeAll} />
      </div>
    </div>
  );
}
