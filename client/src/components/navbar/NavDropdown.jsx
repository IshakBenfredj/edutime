import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../toolkit/slices/user";
import { handleSuccess } from "../../functions/toastifyFunctions";
import { useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";
import { deleteAllLogout } from "../../toolkit/slices/reservations";

export default function NavDropdown({ closeAll }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [openDD, setOpenDD] = useState(false);
  const ddRef = useRef(null);
  const path = useLocation().pathname;

  useEffect(() => {
    console.log(path);
  }, [path]);

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(deleteAllLogout());
    localStorage.removeItem("token");
    navigate("/");
    handleSuccess("تم تسجيل الخروج بنجاح");
    closeDDFunc();
  };

  const closeDDFunc = () => {
    setOpenDD(false);
    document.body.classList.remove("nav");
  };

  const openDDFunc = () => {
    closeAll();
    setOpenDD(true);
    document.body.classList.add("nav");
  };

  useEffect(() => {
    const closeNavOnOutsideClick = (event) => {
      if (openDD && ddRef.current && !ddRef.current.contains(event.target)) {
        closeDDFunc();
      }
    };

    document.body.addEventListener("click", closeNavOnOutsideClick);

    return () => {
      document.body.removeEventListener("click", closeNavOnOutsideClick);
    };
  }, [openDD]);

  return (
    <div
      className="relative cursor-pointer z-50"
      ref={ddRef}
      onClick={user && (openDD ? closeDDFunc : openDDFunc)}
    >
      {user ? (
        <button
          className={`rounded-lg text-gray-500 flex justify-center items-center gap-1`}
        >
          <IoMdArrowDropdown />
          <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
        </button>
      ) : (
        <NavLink
          to={"/auth"}
          className={`rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center gap-1 ${
            openDD && "text-title"
          }`}
        >
          <FaRegUserCircle size={30} />
        </NavLink>
      )}
      {openDD && user && (
        <div className="absolute shadow-md lg:left-0 lg:right-auto right-0 bg-white p-2 top-14 rounded-md w-44 space-y-2">
          <Link
            onClick={closeDDFunc}
            to={`/profile/${user._id}`}
            className="p-2 w-[100%] flex items-center gap-1 rounded-md text-black font-semibold hover:bg-title hover:text-white transition-all"
          >
            <FaUserCircle size={22} />
            <span>الملف الشخصي</span>
          </Link>
          <Link
            onClick={closeDDFunc}
            to={"/settings"}
            className="p-2 w-[100%] flex items-center gap-1 rounded-md text-black font-semibold hover:bg-title hover:text-white transition-all"
          >
            <IoSettingsSharp size={22} />
            <span>الإعدادات</span>
          </Link>
          <button
            onClick={handleLogOut}
            className="p-2 w-[100%] flex items-center gap-1 rounded-md bg-red-500 font-semibold hover:bg-red-600 text-white transition-all"
          >
            <IoLogOut size={22} />
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
