import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../toolkit/slices/user";
import { handleSuccess } from "../functions/toastifyFunctions";
import { useEffect, useRef, useState } from "react";

export default function NavDropdown({ closeAll }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [openDD, setOpenDD] = useState(false);
  const ddRef = useRef(null);

  const handleLogOut = () => {
    dispatch(logout());
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
      className="relative"
      ref={ddRef}
      onClick={openDD ? closeDDFunc : openDDFunc}
    >
      <div
        onClick={openDD ? closeDDFunc : openDDFunc}
        className="w-10 h-10 rounded-md cursor-pointer overflow-hidden border-[1px] border-gray-800"
      >
        <img src={user && user.image} alt="" className="w-[100%] h-[100%]" />
      </div>
      {openDD && (
        <div className="absolute shadow-md -translate-x-1/2 left-1/2 bg-bgcolor p-2 top-14 rounded-md w-36">
          <Link
            onClick={closeDDFunc}
            to={`/profile/${user._id}`}
            className="p-2 w-[100%] text-center rounded-md text-black font-semibold hover:bg-primary hover:text-white transition-all block border-b-[1px] border-gray-400"
          >
            الملف الشخصي
          </Link>
          <Link
            onClick={closeDDFunc}
            to={"/settings"}
            className="p-2 w-[100%] text-center rounded-md text-black font-semibold hover:bg-primary hover:text-white transition-all block"
          >
            الإعدادات
          </Link>
          <button
            onClick={handleLogOut}
            className="p-2 w-[100%] text-center rounded-md bg-red-500 font-semibold hover:bg-red-600 text-white transition-all"
          >
            تسجيل الخروج
          </button>
        </div>
      )}
    </div>
  );
}
