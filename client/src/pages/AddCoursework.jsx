import images from "../constants/images";

export default function AddCoursework() {
  return (
    <div className="bg-bgcolor pt-14 h-screen flex">
      <div className="w-5/12 h-full object-cover relative before:w-full before:h-full before:absolute before:bg-black/70">
        <img src={images.addAd} alt="" className="w-full h-full" />
        <p className="absolute w-2/3 h-full top-0 right-0 p-4 font-bold text-white text-5xl leading-[2]">
          أضف إعلان دورتك وساهم في نشر معرفتك
        </p>
      </div>
    </div>
  );
}