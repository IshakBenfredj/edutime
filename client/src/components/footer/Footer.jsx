import { useSelector } from "react-redux";
import images from "../../constants/images";
import { Link } from "react-router-dom";

const Footer = () => {
  const user = useSelector((s) => s.user);
  const thisYear = () => {
    let thisDate = new Date();
    return thisDate.getFullYear();
  };
  return (
    <footer className="bg-gray-900">
      <div className="container">
        <Link to={"/"} className="mx-auto block w-44">
          <img src={images.whiteLogo} alt="Logo" />
        </Link>
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
            <Link className="hover:text-white transition-all" to={"/courses"}>
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
  );
};

export default Footer;
