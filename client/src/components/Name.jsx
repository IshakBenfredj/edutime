import React from "react";
import images from "../constants/images";

export default function Name({ name, checkmark,width }) {
  return (
    <span className="flex items-center gap-1 w-fit">
      {name}
      {checkmark && <img src={images.checkmark} className={width} alt="" />}
    </span>
  );
}
