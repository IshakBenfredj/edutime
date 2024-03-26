import { Link } from "react-router-dom";
import images from "../constants/images";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-4">
        <p className="font-bold text-3xl md:-mb-16">خطأ 404</p>
      <img src={images.notfound} alt="" />
      <p className="md:text-2xl text-xl font-bold mb-2">هذه الصفحة غير موجودة , توجه إلى :</p>
      <Link to={"/"} className="text-xl font-bold text-white bg-title rounded-md p-2">الرئيسية</Link>
    </div>
  );
}
