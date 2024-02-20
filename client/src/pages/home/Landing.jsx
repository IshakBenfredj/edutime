import images from "../../constants/images";
import { MdClose, MdOutlineSlowMotionVideo } from "react-icons/md";
import landing_video from "../../assets/landing-video.mp4";
import { useState } from "react";
import TypePopup from "../../components/TypePopup";

const Landing = () => {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <>
      {showVideo && (
        <div className="fixed top-0 h-screen right-0 left-0 z-50 bg-black/70 flex items-center justify-center">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-10 bg-red-600 p-2 text-2xl text-white font-bold rounded-full cursor-pointer"
          >
            <MdClose />
          </button>
          <video src={landing_video} controls className="md:w-1/2"></video>
        </div>
      )}
      <TypePopup />
      <div className="bg-bgcolor md:py-24 py-20">
        <div className="container grid md:grid-cols-2 grid-cols-1 items-center">
          <div className="">
            <h1 className="leading-[2] md:mb-0 -mb-3 md:leading-[2] md:text-4xl text-[28px] text-primary font-bold">
              اهلا بك في{""}
              <span className="font-black text-secondary"> اودوتايم</span> وجهتك
              التعليمية الرائدة في الجزائر
            </h1>
            <p className="mb-6 leading-8 text-xl text-color">
              <br /> اكتشف افضل الدورات التعليمية ومراكز التدريب لتطوير مهاراتك{" "}
              <br />
              كل ما تحتاجه في مكان واحد
            </p>
            <button
              onClick={() => setShowVideo(true)}
              className="flex items-center gap-3 text-secondary hover:underline w-fit"
            >
              <MdOutlineSlowMotionVideo size={40} />
              <span className="text-xl font-bold">شاهد الفيديو</span>
            </button>
          </div>
          <div className="">
            <img src={images.landing} alt="landing" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Landing;
