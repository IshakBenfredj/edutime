import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

export default function DropSettings({ title, Icon, children }) {
  const [fermer, setfermer] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-3">
      <div
        onClick={() => setfermer(!fermer)}
        className="flex justify-between cursor-pointer"
      >
        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Icon />
          <p>{title}</p>
        </div>
        {fermer ? <IoIosArrowUp size={24} /> : <IoIosArrowDown size={24} />}
      </div>
      <div
        className={`transition-all duration-500 overflow-hidden ${
          !fermer ? "h-0" : "min-h-fit"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
