import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import images from "../constants/images";
import { Link } from "react-router-dom";

export default function LoginPopup({ set, student }) {
  return (
    <div className="fixed z-50 h-screen top-0 right-0 left-0 bg-black/70 flex justify-center items-center">
      <div className="bg-bgcolor max-h-fit no-scrollbar overflow-auto lg:w-1/4 md:w-2/5 w-4/5 rounded-lg">
        <div className="p-1 border-b-[1px] border-gray-500">
          <IoCloseSharp
            size={30}
            className="cursor-pointer"
            onClick={() => set(false)}
          />
        </div>
        <div className="space-y-3 pb-3">
          <img
            src={images.authenticationReq}
            className="w-1/3 mx-auto"
            alt=""
          />
          <p className="p-2 text-color text-center">
            {student
              ? "هذه الميزة متاحة فقط عند تسجيل الدخول إلى حساب المتعلم الخاص بك أو إنشاء حساب كمتعلم"
              : "هذه الميزة متاحة فقط عند تسجيل الدخول إلى حسابك الخاص أو إنشاء حساب "}
          </p>
          <Link
            to={"/auth"}
            className="block p-1 border-2 border-secondary w-fit text-secondary mx-auto rounded-md"
          >
            تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
}
