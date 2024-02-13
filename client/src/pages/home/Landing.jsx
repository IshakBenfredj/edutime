import images from "../../constants/images";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { Link } from "react-router-dom";
// import SearchResult from "./SearchResult";
// import { useState } from "react";
// import { FaSearch } from "react-icons/fa";

const Landing = () => {
  // const [searchText, setSearchText] = useState("");
  return (
    <div className="bg-bgcolor md:py-8 py-4">
      <div className="container grid md:grid-cols-2 grid-cols-1 items-center">
        <div className="">
          <h1 className="leading-[2] md:mb-0 -mb-3 md:leading-[2] md:text-4xl text-[28px] font-bold">اهلا بك في <span className="font-black text-secondary">اودوتايم</span> وجهتك التعليمية الرائدة في الجزائر</h1>
          <p className="mb-6 leading-8 text-xl text-gray-800">
            <br /> اكتشف افضل الدورات التعليمية ومراكز التدريب لتطوير مهاراتك <br />
            كل ما تحتاجه في مكان واحد
          </p>
          <Link className="flex items-center gap-3 text-secondary hover:underline w-fit">
            <MdOutlineSlowMotionVideo size={40} />
            <span className="text-xl font-bold">شاهد الفيديو</span>
          </Link>
        </div>
        <div className="">
          <img src={images.landing} alt="landing" />
        </div>
      </div>
    </div>
  );
};
export default Landing;
