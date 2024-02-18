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
import NavDropdown from "./NavDropdown";

const Navbare = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [openNav, setOpenNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(false);
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

  // const resetNotify = async () => {
  //   localStorage.setItem("notifyCount", user.notifyCount);
  //   const { data } = await axios.patch(`${url}resetNotify/${user._id}`);
  //   user.notifyCount = 0;
  //   // setUser(data.user)
  //   dispatch(login(data.user));
  // };

  // function removeNotifyCountFromLocalStorage() {
  //   localStorage.removeItem("notifyCount");
  // }

  // useEffect(() => {
  //   window.addEventListener("beforeunload", removeNotifyCountFromLocalStorage);

  //   return () => {
  //     window.removeEventListener(
  //       "beforeunload",
  //       removeNotifyCountFromLocalStorage
  //     );
  //   };
  // }, []);

  // Scroll Position to put shadow for header
  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition >= 100) {
        setScrollPosition(true);
      } else {
        setScrollPosition(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const openNavFunc = () => {
    setOpenNav(!openNav);
    setShowSearch(false);
    document.querySelector("body").classList.remove("open");
    document.querySelector("body").classList.toggle("nav");
  };

  const closeAll = () => {
    setOpenNav(false);
    setShowSearch(false);
    document.querySelector("body").classList.remove("open");
    document.querySelector("body").classList.remove("nav");
  };

  return (
    <header
      className={`h-16 z-50 fixed top-0 right-0 left-0 bg-bgcolor flex md:px-10 px-4 py-6 justify-between items-center transition-all ${
        scrollPosition && "shadow-lg"
      }`}
    >
      <Link to={"/"} onClick={closeAll} className="md:w-36 w-16 block">
        <img src={images.mainLogo} alt="" className="md:block hidden" />
        <img src={images.phoneLogo} alt="" className="md:hidden block" />
      </Link>
      <nav
        className={`navbar ${openNav ? "block top-16 z-50" : "hidden md:flex"}`}
      >
        <NavLink
          className={
            "text-gray-800 px-2 md:py-1 py-2 rounded font-semibold text-lg transition-all hover:bg-primary hover:text-white block"
          }
          to={"/"}
          onClick={closeAll}
        >
          الرئيسية
        </NavLink>
        <NavLink
          className={
            "text-gray-800 px-2 md:py-1 py-2 rounded font-semibold text-lg transition-all hover:bg-primary hover:text-white block"
          }
          to={"/"}
          onClick={closeAll}
        >
          الدورات
        </NavLink>
        <NavLink
          className={
            "text-gray-800 px-2 md:py-1 py-2 rounded font-semibold text-lg transition-all hover:bg-primary hover:text-white block"
          }
          to={"/"}
          onClick={closeAll}
        >
          المدونة
        </NavLink>
      </nav>
      <div className="flex gap-2 md:order-none order-3">
        {user && <NavDropdown closeAll={closeAll} user={user} />}
        <Search showSearch={showSearch} setShowSearch={setShowSearch} />
        <button
          onClick={openNavFunc}
          className="p-1 bg-gray-800 rounded-lg text-white flex justify-center items-center md:hidden order-4 relative"
        >
          <HiMiniBars3BottomLeft size={28} />
        </button>
      </div>
      {!user && (
        <Link to={"/auth"} className="p-2 bg-secondary rounded font-bold">
          تسجيل الدخول
        </Link>
      )}
    </header>
  );
};

export default Navbare;
