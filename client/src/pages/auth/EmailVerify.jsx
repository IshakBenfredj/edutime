import { HiMail } from "react-icons/hi";
import { useState } from "react";
import Axios from "../../api";
import { handleError } from "../../functions/toastifyFunctions";

const EmailVerify = ({ setLoginStep, setUserReset, setResponseCode }) => {
  const [emptyInput, setEmptyInput] = useState(false);
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });

  const handleChangeUser = (e) => {
    setLoginUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const emailVerifyFunc = async (e) => {
    e.preventDefault();
    if (loginUser.email.length === 0) {
      setEmptyInput(true);
      handleError("يجب ملئ الحقل");
    } else {
      try {
        const response = await Axios.post(`/auth/emailVerify`, {
          email: loginUser.email,
        }, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
        setLoginStep("confirmEmail");
        setResponseCode(response.data.code);
        setUserReset(response.data.user);
        setEmptyInput(false);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="title">أدخل بريدك الإلكتروني</div>
      <form onSubmit={emailVerifyFunc}>
        <div className="input-boxes">
          <div className="input-box">
            <HiMail />
            <input
              type="email"
              name="email"
              value={loginUser.email}
              className={`input ${emptyInput && "border-red-500"}`}
              onChange={handleChangeUser}
              placeholder="البريد الإلكتروني"
            />
          </div>
          <div className="flex items-center mt-6 gap-3 justify-center">
            <button className="bg-primary text-white p-2 rounded-md font-bold text-lg">
              إرسال الرمز
            </button>
            <div
              className="bg-secondary text-white p-2 rounded-md font-bold text-lg"
              onClick={() => {
                setLoginStep("login");
                setEmptyInput(false);
              }}
            >
              رجوع
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmailVerify;
