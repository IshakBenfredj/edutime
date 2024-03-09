import { useState } from "react";
import { Link } from "react-router-dom";
import ResetForm from "./ResetForm";
import LoginForm from "./LoginForm";
import EmailVerify from "./EmailVerify";
import ConfirmEmail from "./ConfirmEmail";

const Login = () => {
  const [responseCode, setResponseCode] = useState();
  const [userReset, setUserReset] = useState("");
  const [loginStep, setLoginStep] = useState("login");

  return (
    <div className="login-form">
      {loginStep === "login" && <LoginForm setLoginStep={setLoginStep} />}
      {loginStep === "emailVerify" && (
        <EmailVerify
          setLoginStep={setLoginStep}
          setUserReset={setUserReset}
          setResponseCode={setResponseCode}
        />
      )}
      {loginStep === "confirmEmail" && (
        <ConfirmEmail
          setLoginStep={setLoginStep}
          userReset={userReset}
          responseCode={responseCode}
        />
      )}
      {loginStep === "changePassword" && (
        <ResetForm setLoginStep={setLoginStep} userReset={userReset} />
      )}
      {loginStep === "done" && (
        <div>
          <div className="title">تم تغيير كلمة السر بنجاح</div>
          <div className="text sign-up-text">
            {" "}
            <Link className="text-primary input" onClick={() => setLoginStep("login")}>تسجيل الدخول</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
