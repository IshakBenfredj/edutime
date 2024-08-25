import { HiMail } from "react-icons/hi";
import { AiFillLock } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../toolkit/slices/user";
import Axios from "../../api";
import { handleError } from "../../functions/toastifyFunctions";
import images from "../../constants/images";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

const LoginForm = ({ setLoginStep }) => {
  const [emptyInput, setEmptyInput] = useState(false);
  const [seeMp, setSeeMp] = useState(false);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangeUser = (e) => {
    setLoginUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const userLogin = async (e) => {
    e.preventDefault();
    if (loginUser.email.length === 0 || loginUser.password.length === 0) {
      setEmptyInput(true);
      handleError("جميع الحقول مطلوبة");
    } else {
      try {
        const { data } = await Axios.post("/auth/login", {
          ...loginUser,
        }, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
        dispatch(login(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
        setEmptyInput(false);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        Axios.post("/auth/google", {
          googleUser: result.user,
        }, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  }).then((res) => {
          dispatch(login(res.data.user));
          localStorage.setItem("token", res.data.token);
          navigate("/");
        });
      })
      .catch((error) => {});
  };

  return (
    <div>
      <div className="title">تسجيل الدخول</div>
      <form onSubmit={userLogin}>
        <div className="input-boxes">
          <div className="input-box">
            <HiMail />
            <input
              type="email"
              onChange={handleChangeUser}
              name="email"
              className={`input ${
                emptyInput &&
                !loginUser.email.length &&
                "border-2 border-red-500"
              }`}
              placeholder="البريد الإلكتروني"
            />
          </div>
          <div className="input-box">
            <AiFillLock />
            <input
              type={seeMp ? "text" : "password"}
              onChange={handleChangeUser}
              name="password"
              className={`input ${
                emptyInput &&
                !loginUser.password.length &&
                "border-2 border-red-500"
              }`}
              placeholder="كلمة السر"
            />
            <span className="center cursor-pointer">
              {seeMp ? (
                <FaEyeSlash onClick={() => setSeeMp(false)} />
              ) : (
                <FaEye onClick={() => setSeeMp(true)} />
              )}
            </span>
          </div>
          <div className="text">
            <Link
              className="text-primary"
              onClick={() => setLoginStep("emailVerify")}
            >
              نسيت كلمة السر ؟
            </Link>
          </div>
          <div className="button input-box">
            <input type="submit" className="input" value="دخول" />
          </div>
          <div className="text sign-up-text">
            ليس لديك حساب ؟ <label htmlFor="flip">إنشاء حساب</label>
          </div>
          <div
            onClick={signInWithGoogle}
            className="mt-4 p-2 w-full bg-bgcolor rounded-md flex justify-center items-center gap-3 cursor-pointer"
          >
            <img src={images.google} alt="" className="w-6" />
            <span className="font-bold text-xl">التسجيل بجوجل</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
