import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { logout, update } from "../toolkit/slices/user";
import { axiosPutWithHeader } from "../functions/axiosFunctions";

export default function TypePopup() {
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateType = async () => {
    setLoading(true);
    if (!type) {
      setEmptyInput(true);
      return;
    }
    console.log(type);
    try {
      const data = await axiosPutWithHeader(`/users/update/${user._id}`, {
        field: "isCenter",
        value: type === "center" ? true : false,
        isPublic: "null",
      });
      dispatch(update(data));
      setLoading(false);
      handleSuccess("تم التحديث بنجاح");
    } catch (error) {
      handleError(error.response.data.error);
      dispatch(logout());
      localStorage.removeItem("token");
    }
  };

  if (
    user &&
    user.fromGoogle &&
    !(user.isCenter === true || user.isCenter === false) &&
    !user.isAdmin
  ) {
    return (
      <div className="fixed top-0 h-screen left-0 right-0 z-[51] bg-black/70 flex justify-center items-center">
        <div className="md:w-1/3 w-11/12 bg-white p-4 rounded-md">
          <h2 className="font-bold md:text-xl text-xl">
            مرحبا بك في منصة <span className="text-primary">EduTime</span>{" "}
            التعليمية
          </h2>
          <p className="text-lg mt-2 text-gray-800">
            الرجاء تحديد ما إذا كنت :{" "}
          </p>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              checked={type === "user"}
              onChange={(e) => setType(e.target.value)}
              name="type"
              value="user"
              id="user"
              className="w-6"
            />
            <label
              className={`${emptyInput && !type && "text-red-500"}`}
              htmlFor="user"
            >
              متعلم
            </label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="radio"
              checked={type === "center"}
              onChange={(e) => setType(e.target.value)}
              name="type"
              value="center"
              id="center"
              className="w-6"
            />
            <label
              className={`${emptyInput && !type && "text-red-500"}`}
              htmlFor="center"
            >
              أستاذ/مركز
            </label>
          </div>
          {!loading ? (
            <button
              onClick={updateType}
              className="font-bold p-2 rounded-md text-white mt-2 bg-primary"
            >
              تأكيد
            </button>
          ) : (
            <button className="font-bold p-2 rounded-md text-white mt-2 bg-gray-600 cursor-not-allowed">
              يرجى الإنتظار...
            </button>
          )}
        </div>
      </div>
    );
  }
}
