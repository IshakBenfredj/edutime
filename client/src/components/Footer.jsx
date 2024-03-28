import { useSelector } from "react-redux";
import images from "../constants/images";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const user = useSelector((s) => s.user);
  const path = useLocation().pathname;

  const thisYear = () => {
    let thisDate = new Date();
    return thisDate.getFullYear();
  };
  return (
    <>
      {((user &&
        !path.startsWith("/profile") &&
        !path.startsWith("/messages")) ||
        !user) && (
        <footer className={`bg-gray-900 ${user && "lg:mb-0 mb-14"} `}>
          <div className="p-3 text-white font-semibold text-center bg-gray-800 md:text-base text-sm">
            للإشهار في موقع Edutime يمكنكم التواصل معنا عبر : البريد الإلكتروني{" "}
            <Link className="hover:underline" to={"mailto:edutime19@gmail.com"}>
              edutime19@gmail.com
            </Link>{" "}
            أو رقم الهاتف :
            <Link className="hover:underline" to={"tel:0556488809"}>
              05.56.48.88.09
            </Link>
          </div>
          <div className="container">
            <Link to={"/"} className="mx-auto block w-44">
              <img src={images.whiteLogo} alt="Logo" />
            </Link>
            <div className="mb-6 text-center">
              <p className="md:mb-5 mb-6 text-white font-bold text-xl">
                قم بتحميل تطبيق Edutime وإستمتع بتجربة أفضل
              </p>
              <div className="flex items-center justify-center gap-7">
                <Link className="relative flex items-center gap-3 border-[1px] border-gray-200 rounded-lg p-3 transition-all hover:scale-110">
                  <span className="font-bold text-gray-200 md:text-xl">
                    Google Play
                  </span>
                  <span className="absolute bg-white p-1 text-xs font-semibold rounded-md -top-4 left-2">
                    قريبا
                  </span>
                  <img src={images.googlePlay} className="md:w-10 w-6" alt="" />
                </Link>
                <Link className="relative flex items-center gap-3 border-[1px] border-gray-200 rounded-lg p-3 transition-all hover:scale-110">
                  <span className="font-bold text-gray-200 md:text-xl">
                    Apple Store
                  </span>
                  <span className="absolute bg-white p-1 text-xs font-semibold rounded-md -top-4 left-2">
                    قريبا
                  </span>
                  <img src={images.appStore} className="md:w-10 w-6" alt="" />
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-between md:flex-row flex-col gap-3 pb-4 text-gray-300">
              <div className="flex flex-col gap-3 md:items-start items-center">
                <h3 className="font-bold text-white text-lg">حول المنصة :</h3>
                <Link
                  className="hover:text-white transition-all"
                  to={"/termsAndConditions"}
                >
                  الشروط والأحكام
                </Link>
                <Link
                  className="hover:text-white transition-all"
                  to={"/privacyPolicy"}
                >
                  سياسة الخصوصية
                </Link>
                <Link
                  className="hover:text-white transition-all"
                  to={"/platformWork"}
                >
                  كيف تعمل منصتنا ؟
                </Link>
              </div>
              <div className="flex flex-col gap-3 md:items-start items-center">
                <h3 className="font-bold text-white text-lg">روابط مختصرة :</h3>
                <Link
                  className="hover:text-white transition-all"
                  to={"/courses"}
                >
                  الدورات
                </Link>
                <Link className="hover:text-white transition-all" to={"/forum"}>
                  المنتدى
                </Link>
                <Link className="hover:text-white transition-all" to={"/blogs"}>
                  المدونة
                </Link>
                {user && (
                  <>
                    <Link
                      className="hover:text-white transition-all"
                      to={`/profile/${user._id}`}
                    >
                      الملف الشخصي
                    </Link>
                  </>
                )}
              </div>
              <div
                className="flex flex-col gap-3 md:items-start items-center"
                style={{ direction: "ltr" }}
              >
                <h3
                  className="font-bold text-white text-lg text-end"
                  style={{ direction: "rtl" }}
                >
                  للتواصل معنا :
                </h3>
                <Link className="hover:text-white transition-all">
                  Sétif, Algérie
                </Link>
                <Link
                  className="hover:text-white transition-all"
                  to={"mailto:edutime19@gmail.com"}
                >
                  edutime19@gmail.com
                </Link>
                <Link
                  className="hover:text-white transition-all"
                  to={"tel:0556488809"}
                >
                  0556 48 88 09
                </Link>
              </div>
            </div>
          </div>
          <div className="p-3 text-white font-semibold text-center bg-gray-800">
            جميع الحقوق محفوظة{" "}
            <span className="font-bold">EduTime &copy; {thisYear()}</span>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
