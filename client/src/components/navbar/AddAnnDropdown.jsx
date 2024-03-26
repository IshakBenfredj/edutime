import React, { useEffect, useRef, useState } from "react";
import { AiFillPlusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { FaSchoolFlag } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import Unavailable from "./Unavailable";

export default function AddAnnDropdown({ closeAll, setPopupMessages,setPopupNot }) {
  const user = useSelector((state) => state.user);
  const [openDD, setOpenDD] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
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
    <>
      {openPopup && <Unavailable setOpenPopup={setOpenPopup} />}
      {user.isCenter && !user.isAdmin && (
        <div
          className="relative cursor-pointer z-50"
          ref={ddRef}
          onClick={user && openDD ? closeDDFunc : openDDFunc}
        >
          <>
            <button
              className={`p-1 rounded-lg text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center gap-1 ${
                path === "/add_announcement" && "text-title"
              }`}
            >
              {path === "/add_announcement" ? (
                <AiFillPlusCircle size={30} />
              ) : (
                <AiOutlinePlusCircle size={30} />
              )}
              <span className="lg:block hidden">إضافة إعلان</span>
            </button>
            {openDD && user && (
              <div className="absolute shadow-md lg:left-0 lg:right-auto right-0 bg-white p-2 top-14 rounded-md w-44 space-y-2">
                <Link
                  onClick={closeDDFunc}
                  to={`/add_announcement`}
                  className="p-2 w-[100%] flex items-center gap-1 rounded-md text-black font-semibold hover:bg-title hover:text-white transition-all"
                >
                  <FaSchoolFlag size={22} />
                  <span>دورة تكوينية</span>
                </Link>
                <button
                  onClick={() => {
                    closeDDFunc();
                    setOpenPopup(true);
                  }}
                  className="p-2 w-[100%] flex items-center gap-1 rounded-md text-black font-semibold hover:bg-title hover:text-white transition-all"
                >
                  <SiGoogleclassroom size={22} />
                  <span>دورة خصوصية</span>
                </button>
              </div>
            )}
          </>
        </div>
      )}
      {user.isAdmin && (
        <Link
          onClick={closeAll}
          to={"/add_article"}
          className={`p-1 rounded-lg z-50 text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center gap-1 ${
            path === "/add_article" && "text-title"
          }`}
        >
          {path === "/add_article" ? (
            <AiFillPlusCircle size={30} />
          ) : (
            <AiOutlinePlusCircle size={30} />
          )}
          <span className="lg:block hidden">إضافة مقال</span>
        </Link>
      )}
    </>
  );
}
