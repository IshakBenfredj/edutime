import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import { Link, NavLink, useNavigate } from "react-router-dom";
// import { ModeContext } from "../context/modeContext";
// import { IoMdCloseCircleOutline } from "react-icons/io";
// import { FaUserCircle } from "react-icons/fa";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { BsFillArrowUpCircleFill, BsSunFill } from "react-icons/bs";
// import { BiSolidMoon } from "react-icons/bi";
// import { FaUserGraduate } from "react-icons/fa";
// import { AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../toolkit/slices/user";
import images from "../constants/images";
import Search from "./Search";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { handleError } from "../functions/toastifyFunctions";

const Navbare = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [openNav, setOpenNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const location = useLocation();
  // const [bg, setBg] = useState(false);
  // const [auth, setAuth] = useState(true);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname === "/auth") {
  //     setAuth(true);
  //   } else {
  //     setAuth(false);
  //   }
  //   if (location.pathname === "/") {
  //     setBg(false);
  //   } else {
  //     setBg(true);
  //   }
  // }, [location.pathname, setBg]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     let position = window.pageYOffset;
  //     setScrollPosition(position);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  // }, []);

  // const scrollToTop = () => {
  //   window.scrollTo({ top: 0, behavior: "smooth" });
  // };
  const handleLogOut = () => {
    dispatch(logout());
    localStorage.removeItem('token')
    navigate("/");
    handleError("تم تسجيل الخروج بنجاح")
  };

  // const resetNotify = async () => {
  //   localStorage.setItem("notifyCount", user.notifyCount);
  //   const { data } = await axios.patch(`${url}resetNotify/${user._id}`);
  //   user.notifyCount = 0;
  //   // setUser(data.user)
  //   dispatch(login(data.user));
  // };

  function removeNotifyCountFromLocalStorage() {
    localStorage.removeItem("notifyCount");
  }

  useEffect(() => {
    window.addEventListener("beforeunload", removeNotifyCountFromLocalStorage);

    return () => {
      window.removeEventListener(
        "beforeunload",
        removeNotifyCountFromLocalStorage
      );
    };
  }, []);

  const openNavFunc = () => {
    setOpenNav(!openNav);
    setShowSearch(false);
    document.querySelector("body").classList.remove("open");
    document.querySelector("body").classList.toggle("nav");
  };

  return (
    <div className="h-16 bg-bgcolor flex md:px-10 px-4 py-6 justify-between items-center relative">
      <Link to={"/"} className="md:w-36 w-16 block">
        <img src={images.mainLogo} alt="" className="md:block hidden" />
        <img src={images.phoneLogo} alt="" className="md:hidden block" />
      </Link>
      <nav
        className={`navbar ${
          openNav
            ? "top-16 opacity-100 z-50"
            : "top-14 md:top-auto -z-10 md:z-50 opacity-0 md:opacity-100"
        }`}
      >
        <NavLink
          className={
            "text-gray-800 px-2 md:py-1 py-2 rounded font-semibold text-lg transition-all hover:bg-primary hover:text-white block"
          }
          to={"/"}
        >
          الرئيسية
        </NavLink>
        <NavLink
          className={
            "text-gray-800 px-2 md:py-1 py-2 rounded font-semibold text-lg transition-all hover:bg-primary hover:text-white block"
          }
          to={"/"}
        >
          الدورات
        </NavLink>
        <NavLink
          className={
            "text-gray-800 px-2 md:py-1 py-2 rounded font-semibold text-lg transition-all hover:bg-primary hover:text-white block"
          }
          to={"/"}
        >
          المدونة
        </NavLink>
      </nav>
      <Search showSearch={showSearch} setShowSearch={setShowSearch} />
      {!user ? (
        <Link to={'/auth'} className="p-2 bg-secondary rounded font-bold md:order-4 order-2">تسجيل الدخول</Link>
      ) : (
        <button onClick={handleLogOut} className="p-2 bg-secondary rounded font-bold md:order-4 order-2">تسجيل الخروج</button>
      )}
      <button
        onClick={openNavFunc}
        className="p-1 bg-gray-800 rounded-lg text-white flex justify-center items-center md:hidden order-4 relative z-50"
      >
        <HiMiniBars3BottomLeft size={28} />
      </button>
    </div>
  );
};

export default Navbare;
