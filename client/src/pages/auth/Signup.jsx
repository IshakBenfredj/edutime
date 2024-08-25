import React, { useState } from "react";
import { FaPhone, FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { MdPassword } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import Axios from "../../api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../toolkit/slices/user";
import { handleError, handleSuccess } from "../../functions/toastifyFunctions";
import validatePhoneNumber from "../../functions/phoneCheck";

const SignupForm = () => {
  const [signupStep, setSignupStep] = useState("signup");
  const [signupDone, setSignupDone] = useState(false);
  const [signupInfo, setSignupInfo] = useState({
    isCenter: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [responseCode, setResponseCode] = useState();
  const [inputCode, setInputCode] = useState();
  const [emptyInput, setEmptyInput] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignupInfo = (e) => {
    setSignupInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const confirmMail = async (e) => {
    e.preventDefault();
    if (
      signupInfo.name.length === 0 ||
      signupInfo.email.length === 0 ||
      signupInfo.password.length === 0 ||
      signupInfo.isCenter.length === 0
    ) {
      setEmptyInput(true);
      handleError("جميع الحقول مطلوبة");
    } else {
      // Validate phone number
      if (!validatePhoneNumber(signupInfo.phone)) {
        return;
      }
      try {
        const response = await Axios.post(
          `/auth/confirmEmail`,
          {
            email: signupInfo.email,
          },
          {
            headers: {
              "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
            },
          }
        );
        setSignupStep("confirmEmail");
        handleSuccess(response.data.message);
        setResponseCode(response.data.code);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };
  const Signup = async (e) => {
    e.preventDefault();
    console.log(signupInfo);
    if (inputCode !== responseCode) {
      handleError("الرمز الذي أدخلته خاطئ");
    } else {
      try {
        const { data } = await Axios.post("/auth/signup", signupInfo, {
          headers: {
            "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
          },
        });
        dispatch(login(data.user));
        localStorage.setItem("token", data.token);
        navigate("/");
        handleSuccess(data.message);
        setSignupDone(true);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <div className="signup-form">
      {signupStep === "signup" && (
        <div>
          <div className="title">إنشاء حساب</div>
          <form onSubmit={confirmMail}>
            <div className="input-boxes">
              <div className="user-type center">
                <div
                  className="center"
                  onClick={() =>
                    setSignupInfo({ ...signupInfo, isCenter: false })
                  }
                >
                  <input
                    type="radio"
                    checked={!signupInfo.isCenter}
                    name="isCenter"
                    id="user"
                  />
                  <label
                    className={`${
                      emptyInput && !signupInfo.isCenter && "text-red-500"
                    }`}
                    htmlFor="user"
                  >
                    متعلم
                  </label>
                </div>
                <div
                  className="center"
                  onClick={() =>
                    setSignupInfo({ ...signupInfo, isCenter: true })
                  }
                >
                  <input
                    type="radio"
                    checked={signupInfo.isCenter}
                    name="isCenter"
                    id="center"
                  />
                  <label
                    className={`${
                      emptyInput && !signupInfo.isCenter && "text-red-500"
                    }`}
                    htmlFor="center"
                  >
                    أستاذ/مركز
                  </label>
                </div>
              </div>
              <div className="input-box">
                <FaUserAlt />
                <input
                  type="text"
                  value={signupInfo.name}
                  onChange={handleSignupInfo}
                  name="name"
                  className={`input ${
                    emptyInput && !signupInfo.name && "border-red-500 border-2"
                  }`}
                  placeholder="الإسم الكامل"
                />
              </div>
              <div className="input-box">
                <HiMail />
                <input
                  type="email"
                  value={signupInfo.email}
                  onChange={handleSignupInfo}
                  name="email"
                  className={`input ${
                    emptyInput && !signupInfo.email && "border-red-500 border-2"
                  }`}
                  placeholder="البريد الإلكتروني"
                />
              </div>
              <div className="input-box">
                <FaPhone />
                <input
                  type="number"
                  value={signupInfo.phone}
                  onChange={handleSignupInfo}
                  name="phone"
                  className={`input ${
                    emptyInput && !signupInfo.phone && "border-red-500 border-2"
                  }`}
                  placeholder="رقم الهاتف"
                />
              </div>
              <div className="input-box">
                <AiFillLock />
                <input
                  type="password"
                  value={signupInfo.password}
                  onChange={handleSignupInfo}
                  name="password"
                  className={`input ${
                    emptyInput &&
                    !signupInfo.password &&
                    "border-red-500 border-2"
                  }`}
                  placeholder="كلمة السر"
                />
              </div>
              <div className="button input-box">
                <input type="submit" className="input" value="إنشاء" />
              </div>
              <div className="text sign-up-text">
                لديك حساب بالفعل ؟ <label htmlFor="flip">تسجيل الدخول</label>
              </div>
            </div>
          </form>
        </div>
      )}
      {signupStep === "confirmEmail" && !signupDone && (
        <div>
          <div className="title">أكد بريدك الإلكتروني</div>
          <form onSubmit={Signup}>
            <p className="text-color mt-3">
              قمنا بإرسال رمز الى بريدك الإلكتروني
            </p>
            <div className="input-boxes">
              <div className="input-box">
                <MdPassword />
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="الرمز"
                  className="input"
                />
              </div>
              <div className="flex items-center mt-6 gap-3 justify-center">
                <input
                  type="submit"
                  value="تأكيد"
                  className="bg-primary input w-1/2 text-white p-2 rounded-md font-bold text-lg"
                />
                <div
                  className="bg-secondary text-white p-2 rounded-md font-bold text-lg"
                  onClick={(e) => setSignupStep("signup")}
                >
                  رجوع
                </div>
              </div>
              <div className="text sign-up-text">
                لديك حساب بالفعل ؟ <label htmlFor="flip">تسجيل الدخول</label>
              </div>
            </div>
          </form>
        </div>
      )}
      {signupDone && (
        <div>
          <div className="title">تم إنشاء الحساب</div>
          <div className="text sign-up-text">
            {" "}
            <label className="fs-4" htmlFor="flip">
              تسجيل الدخول
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;
