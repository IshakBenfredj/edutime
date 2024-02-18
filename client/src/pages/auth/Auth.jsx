import "./auth.css";
import images from "../../constants/images";
import Signup from "./Signup";
import Login from "./Login";

const Auth = () => {
  return (
    <div className="min-h-screen bg-bgcolor">
      <div className="auth mt-0 center z-30">
        <div className="container relative box-shadow">
          <input type="checkbox" id="flip" />
          <div className="cover">
            <div className="front">
              <div className="overlay"></div>
              <img className="backImg" src={images.informatique} alt="" />
              <div className="text center">
                <span className="text-1">سجل دخولك من جديد</span>
                <span className="text-2">مرحبا بك</span>
              </div>
            </div>
            <div className="back">
              <div className="overlay"></div>
              <img src={images.business} alt="" />
              <div className="text center">
                <span className="text-1">
                  {" "}
                  إعمل على تطوير نفسك <br /> في مختلف المجالات
                </span>
                <span className="text-2">إنضم إلينا </span>
              </div>
            </div>
          </div>
          <div className="forms">
            <div className="form-content center">
              <Signup />
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
