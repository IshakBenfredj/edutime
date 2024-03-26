import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import images from "../../constants/images";

export default function Unavailable({ setOpenPopup }) {
  return (
    <div className="fixed z-50 h-screen top-0 right-0 left-0 bg-black/70 flex justify-center items-center">
      <div className="bg-white max-h-96 lg:w-1/4 md:w-2/5 w-4/5 rounded-lg">
        <div className="p-1 border-b-[1px] border-gray-500">
          <IoCloseSharp
            size={30}
            className="cursor-pointer"
            onClick={() => setOpenPopup(false)}
          />
        </div>
        <div>
          <img src={images.unavailable} className="w-2/5 mx-auto" alt="" />
          <p className="p-2 text-color text-center">
            نأسف، هذه الصفحة غير متاحة حالياً. سيتم إلحاقها في التحديث القادم
          </p>
        </div>
      </div>
    </div>
  );
}
