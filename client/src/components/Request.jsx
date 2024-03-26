import React, { useState } from "react";
import images from "../constants/images";
import UploadImage from "./UploadImage";
import { axiosPostWithHeader } from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { useSelector } from "react-redux";

export default function Request() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState("");
  const user = useSelector((s) => s.user);

  const handleRequestDoc = async () => {
    if (image) {
      setLoading(true);
      try {
        await axiosPostWithHeader("/requests/add", { image, type: "doc" });
        handleSuccess("تم طلب التوثيق بنجاح, إنتظر الرد من فريق العمل");
        setImage("");
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoading(false);
    }
  };
  const handleRequestChange = async () => {
    if (image) {
      setLoading(true);
      try {
        await axiosPostWithHeader("/requests/add", { image, type: "change" });
        handleSuccess("تم طلب التغيير بنجاح, إنتظر الرد من فريق العمل");
        setImage("");
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoading(false);
    }
  };

  return (
    <>
      {user && user.isCenter && !user.checkmark && !user.isAdmin && (
        <div className="col-span-1 lg:w-4/5 w-[100%] mx-auto bg-white rounded-lg h-fit p-4">
          <img src={images.checkmark} alt="" className="w-1/3 mx-auto" />
          <p className="text-color mt-4 leading-8">
            أحصل على التوثيق الخاص بحسابك من أجل زيادة مصداقيتك على منصتنا, وجعل
            حسابك رسمي لتمييزه من بين الحسابات الزائفة , أرسل طلبك مرفوقا بصورة
            لبطاقة التعريف الوطنية .
          </p>
          <UploadImage image={image} setImage={setImage} />
          <button
            onClick={handleRequestDoc}
            className={`mt-4 rounded-lg mx-auto block ${
              image ? "bg-title" : "bg-gray-400 cursor-not-allowed"
            } text-white p-2`}
          >
            {loading ? "جاري الطلب ..." : "طلب التوثيق"}
          </button>
        </div>
      )}
      {user && !user.isCenter && !user.isAdmin && (
        <div className="col-span-1 lg:w-4/5 w-[100%] mx-auto bg-white rounded-lg h-fit p-4">
          <img src={images.teacher} alt="" className="w-2/5 mx-auto" />
          <p className="text-color mt-4 leading-8">
            قم بتغيير حسابك من حساب المتعلم إلى حساب معلم/مركز وتمتع بمزايا
            جديدة وتجربة أخرى , فقط عن طريق إرسال شهادة تخرج أو سجل تجاري
            لمركزك.
          </p>
          <UploadImage image={image} setImage={setImage} />
          <button
            onClick={handleRequestChange}
            className={`mt-4 rounded-lg mx-auto block ${
              image ? "bg-title" : "bg-gray-400 cursor-not-allowed"
            } text-white p-2`}
          >
            {loading ? "جاري الطلب ..." : "طلب التغيير"}
          </button>
        </div>
      )}
    </>
  );
}
