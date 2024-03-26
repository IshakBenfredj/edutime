import { useEffect, useState } from "react";
import images from "../../constants/images";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Advertisement() {
  const imagesTable = [images.ads3, images.ads4, images.ads3];

  const [index, setindex] = useState(0);
  useEffect(() => {
    setInterval(() => {
      setindex(index === imagesTable.length - 1 ? 0 : index + 1);
    }, 2000);
  }, [imagesTable, index]);
  return (
    <div className="py-8">
      <p className="font-bold text-center text-color mb-4">مساحة إشهارية</p>
      <div className="container w-1/2 relative flex items-center justify-center">
        <div
          className={`relative w-fit flex items-center justify-end overflow-hidden`}
        >
          <IoIosArrowForward className="absolute text-title top-1/2 -translate-y-1/2 right-3 bg-white/70 p-2 w-8 h-8 rounded-full" />
          {imagesTable.map((image) => (
            <img
              src={image}
              alt=""
              className="h-fit w-full transition-all duration-100 md:object-contain object-cover"
              style={{ transform: `translateX(-${index * 100}%)` }}
            />
          ))}
          <IoIosArrowBack className="absolute text-title top-1/2 -translate-y-1/2 left-3 bg-white/70 p-2 w-8 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
}
