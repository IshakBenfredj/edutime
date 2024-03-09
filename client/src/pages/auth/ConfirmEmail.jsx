import { MdPassword } from "react-icons/md";
import { useState } from "react";
import { handleError } from "../../functions/toastifyFunctions";

const ConfirmEmail = ({ setLoginStep, userReset, responseCode }) => {
  const [emptyCode, setEmptyCode] = useState(false);
  const [inputCode, setInputCode] = useState();

  const confirmEmail = async (e) => {
    e.preventDefault();
    if (responseCode !== inputCode) {
      setEmptyCode(true);
      handleError("الرمز الذي أدخلته خاطئ");
    } else {
      setLoginStep("changePassword");
      setEmptyCode(false);
    }
  };

  return (
    <div>
      <div className="title">أكد بريدك الإلكتروني</div>
      <p className="text-color mt-2">سيد(ة) {userReset.name}</p>
      <form onSubmit={confirmEmail}>
        <p className="text-color mt-3">قمنا بإرسال رمز الى بريدك الإلكتروني</p>
        <div className="input-boxes">
          <div className="input-box">
            <MdPassword />
            <input
              type="text"
              value={inputCode}
              className={`input ${emptyCode && "border-red-500"}`}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="الرمز"
            />
          </div>
          <div className="flex items-center mt-6 gap-3 justify-center">
            <input
              type="submit"
              value="تأكيد"
              className="bg-primary w-1/2 text-white p-2 rounded-md font-bold text-lg"
            />
            <div
              className="bg-secondary text-white p-2 rounded-md font-bold text-lg"
              onClick={(e) => setLoginStep("emailVerify")}
            >
              رجوع
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ConfirmEmail;
