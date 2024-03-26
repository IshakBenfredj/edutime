import React, { useEffect, useRef, useState } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";

export default function RequestDropdown({ closeAll, setPopupMessages,setPopupNot }) {
  const user = useSelector((state) => state.user);
  const [openDD, setOpenDD] = useState(false);
  const ddRef = useRef(null);
  const path = useLocation().pathname;

  const closeDDFunc = () => {
    setOpenDD(false);
    document.body.classList.remove("nav");
  };

  const openDDFunc = () => {
    closeAll();
    setOpenDD(true);
    setPopupMessages(false);
    setPopupNot(false)
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
      onClick={user && openDD ? closeDDFunc : openDDFunc}
    >
      <>
        <button
          className={`p-1 rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center gap-1 ${
            (path === "/documentation_requests" ||
              path === "change_requests") &&
            "text-title"
          }`}
        >
          <FaUserShield size={28} />
          <span className="lg:block hidden">الطلبات</span>
        </button>
        {openDD && user && (
          <div className="absolute shadow-md lg:left-0 lg:right-auto right-0 bg-white p-2 top-14 rounded-md w-44 space-y-2">
            <Link
              onClick={closeDDFunc}
              to={`/documentation_requests`}
              className="p-2 w-[100%] flex items-center gap-1 rounded-md text-black font-semibold hover:bg-title hover:text-white transition-all"
            >
              <IoIosCheckmarkCircle size={22} />
              <span>طلبات التوثيق</span>
            </Link>
            <Link
              onClick={closeDDFunc}
              to={`/change_requests`}
              className="p-2 w-[100%] flex items-center gap-1 rounded-md text-black font-semibold hover:bg-title hover:text-white transition-all"
            >
              <FaUserGear size={22} />
              <span>طلبات التغيير</span>
            </Link>
          </div>
        )}
      </>
    </div>
  );
}
