import { MdPassword } from "react-icons/md";
import { useState } from "react";
import Axios from "../../api";
import { handleError, handleSuccess } from "../../functions/toastifyFunctions";

const ResetForm = ({ setLoginStep, userReset }) => {
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

  const resetPassword = async (e) => {
    e.preventDefault();
    if (loginUser.password.length === 0) {
      setEmptyInput(true);
      handleError("يجب ملئ الحقل");
    } else {
      try {
        const response = await Axios.post(`/auth/resetPassword`, {
          password: loginUser.password,
          id: userReset._id,
        }, {
    headers: {
      "x-custom-header": "secretValueForEdutimeWebsiteEducationAliHani",
    },
  });
        handleSuccess(response.data.message);
        setEmptyInput(false);
        setLoginStep("done");
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <div>
      <div className="title">تغيير كلمة السر</div>
      <form onSubmit={resetPassword}>
        <div className="input-boxes">
          <div className="input-box">
            <MdPassword />
            <input
              type="text"
              name="password"
              className={`input ${emptyInput && "border-2 border-red-500"}`}
              value={loginUser.password}
              onChange={handleChangeUser}
              placeholder="كلمة السر الجديدة"
            />
          </div>
          <div className="button input-box center">
            <input type="submit" value="تغيير" className="input" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetForm;
