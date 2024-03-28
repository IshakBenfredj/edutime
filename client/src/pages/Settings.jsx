import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../components/UploadImage";
import { useState } from "react";
import DropSettings from "../components/DropSettings";
import { FaUserEdit, FaUserTie, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaHeartCircleCheck } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import {
  axiosDeleteWithHeader,
  axiosPostWithoutHeader,
  axiosPutWithHeader,
} from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { logout, update } from "../toolkit/slices/user";
import { useNavigate } from "react-router-dom";
import Request from "../components/Request";

export default function Settings() {
  const user = useSelector((s) => s.user);
  const [image, setImage] = useState("");
  const [name, setName] = useState(user && user.name);
  const [bio, setBio] = useState(user?.bio ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState(user?.address ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [responseCode, setResponseCode] = useState(null);
  const [inputCode, setInputCode] = useState(null);
  const [publicPhone, setPublicPhone] = useState(user && user.public.phone);
  const [publicAddress, setPublicAddress] = useState(
    user && user.public.address
  );
  const [publicEmail, setPublicEmail] = useState(user && user.public.email);
  const [publicFollowers, setPublicFollowers] = useState(
    user && user.public.followers
  );
  const [publicFollowing, setPublicFollowing] = useState(
    user && user.public.following
  );

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    name: false,
    email: false,
    imageProfile: false,
    bio: false,
    password: false,
    phone: false,
    address: false,
    following: false,
    followers: false,
    imageCheck: false,
  });

  const dispatch = useDispatch();

  const updateUser = async (field, value, isPublic, loading) => {
    setLoading((prev) => ({
      ...prev,
      [loading]: true,
    }));
    try {
      const data = await axiosPutWithHeader(`/users/update/${user._id}`, {
        field,
        value,
        isPublic,
      });
      dispatch(update(data));
      setLoading((prev) => ({
        ...prev,
        [loading]: false,
      }));
      handleSuccess("تم التحديث بنجاح");
      setResponseCode(null);
      setInputCode(null);
    } catch (error) {
      handleError(error.response.data.error);
      dispatch(logout());
      localStorage.removeItem("token");
    }
  };

  const changePassowrd = async () => {
    setLoading((prev) => ({
      ...prev,
      password: true,
    }));
    try {
      const data = await axiosPutWithHeader(
        `/users/changePassword/${user._id}`,
        {
          oldPassword,
          password,
        }
      );
      dispatch(update(data));
      handleSuccess("تم تحديث كلمة السر بنجاح");
    } catch (error) {
      handleError(error.response.data.error);
      if (error.response.data.failed) {
        dispatch(logout());
        localStorage.removeItem("token");
      }
    }
    setLoading((prev) => ({
      ...prev,
      password: false,
    }));
  };

  const updatePhotoProfile = async () => {
    setLoading((prev) => ({
      ...prev,
      imageProfile: true,
    }));
    try {
      const data = await axiosPutWithHeader("/users/updatePhotoProfile", {
        image,
      });
      dispatch(update(data.user));
      handleSuccess(data.message);
      setImage("");
    } catch (error) {
      dispatch(logout());
      localStorage.removeItem("token");
      handleError(error.response.data.error);
    }
    setLoading((prev) => ({
      ...prev,
      imageProfile: false,
    }));
  };

  const handleDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm("هل ترغب فعلا في حذف حسابك ؟");
    if (confirmDelete) {
      try {
        const data = await axiosDeleteWithHeader(`/users/delete/${user._id}`);

        handleSuccess(data.message);
        navigate("/");
        dispatch(logout());
        localStorage.removeItem("token");
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  const confirmMail = async (e) => {
    try {
      const data = await axiosPostWithoutHeader(`/auth/confirmEmail`, {
        email,
      });
      handleSuccess("لقد أرسلنا رمزا في بريدك الإلكتروني");
      setResponseCode(data.code);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const handleMail = async (e) => {
    if (email === user.email) {
      updateUser("email", email, publicEmail, loading.email);
      return;
    }
    if (!responseCode) {
      confirmMail();
    } else if (responseCode !== inputCode) {
      handleError("الرمز الذي أدخلته خاطئ");
    } else {
      updateUser("email", email, publicEmail, loading.email);
    }
  };

  const cancel = () => {
    setEmail(user.email);
    setResponseCode(null);
    setInputCode(null);
  };

  return (
    <div className="py-20 lg:px-10 px-4 bg-bgcolor min-h-screen grid lg:grid-cols-3 lg:gap-0 gap-4 grid-cols-1">
      <div className="col-span-1 bg-white lg:w-4/5 w-[100%] h-fit shadow rounded-lg p-4">
        <div className="w-44 h-44 lg:w-60 lg:h-60 mx-auto overflow-hidden">
          <img
            src={image ? image : user.image}
            alt=""
            className="w-full h-full rounded-full object-cover border-2 border-primary"
          />
        </div>
        <UploadImage image={image} setImage={setImage} />
        <div className="flex justify-center">
          <Button
            text={image}
            loading={loading.imageProfile}
            handleSubmit={updatePhotoProfile}
          />
        </div>
      </div>
      <div className="col-span-1 space-y-4">
        <DropSettings title={"الإسم الكامل"} Icon={FaUserEdit}>
          <div className="pt-3">
            <input
              type="text"
              value={name}
              placeholder="الإسم الكامل"
              onChange={(e) => setName(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
            />
            {name && name.length <= 7 && (
              <p className="text-red-400 mt-1 text-sm">الإسم يتجاوز 7 أحرف</p>
            )}
            <Button
              text={name && name.length > 7 && name !== user.name}
              handleSubmit={() =>
                updateUser("name", name, "null", loading.name)
              }
            />
          </div>
        </DropSettings>
        <DropSettings title={"السيرة الذاتية"} Icon={FaUserTie}>
          <div className="pt-3">
            <textarea
              placeholder="صف نفسك وأعمالك"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
            ></textarea>
            {bio && bio.length > 120 && (
              <p className="text-red-400 mt-1 text-sm">
                السيرة لا تتجاوز 120 حرف
              </p>
            )}
            <Button
              text={
                bio && bio.length > 0 && bio.length <= 120 && bio !== user.bio
              }
              handleSubmit={() => updateUser("bio", bio, "null", loading.bio)}
            />
          </div>
        </DropSettings>
        <DropSettings title={"رقم الهاتف"} Icon={FaPhone}>
          <div className="pt-3">
            <input
              type="number"
              value={phone}
              placeholder="رقم الهاتف"
              name="phone"
              onChange={(e) => setPhone(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
            />
            {phone && phone.length !== 10 && (
              <p className="text-red-400 mt-1 text-sm">
                رقم الهاتف من عشرة أرقام
              </p>
            )}
            <PrivateOrPublic change={setPublicPhone} state={publicPhone} />
            <Button
              text={
                (phone && phone.length === 10 && phone !== user.phone) ||
                publicPhone !== user.public.phone
              }
              handleSubmit={() =>
                updateUser("phone", phone, publicPhone, loading.phone)
              }
            />
          </div>
        </DropSettings>
        <DropSettings title={"العنوان"} Icon={FaMapMarkerAlt}>
          <div className="pt-3">
            <input
              type="text"
              value={address}
              placeholder="العنوان"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
            />
            {address && address.length < 3 && (
              <p className="text-red-400 mt-1 text-sm">العنوان يتجاوز 3 أحرف</p>
            )}
            <PrivateOrPublic change={setPublicAddress} state={publicAddress} />
            <Button
              text={
                (address && address.length >= 3 && address !== user.address) ||
                publicAddress !== user.public.address
              }
              handleSubmit={() =>
                updateUser("address", address, publicAddress, loading.address)
              }
            />
          </div>
        </DropSettings>
        {!user.fromGoogle && (
          <DropSettings
            title={"البريد الإلكتروني"}
            Icon={MdOutlineAlternateEmail}
          >
            <div className="pt-3 space-y-3">
              <input
                type="email"
                value={email}
                placeholder="البريد الإلكتروني"
                disabled={responseCode}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200 ${
                  responseCode && "text-gray-400"
                }`}
              />
              {responseCode && (
                <>
                  <p className="text-color">
                    لقد أرسلنا رمزا في بريدك الإلكتروني
                  </p>
                  <input
                    type="number"
                    value={inputCode}
                    placeholder="رمز التأكيد"
                    name="inputCode"
                    onChange={(e) => setInputCode(e.target.value)}
                    className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
                  />
                </>
              )}
              <PrivateOrPublic change={setPublicEmail} state={publicEmail} />
              <div className="flex items-center gap-2">
                <Button
                  text={
                    ((email !== user.email ||
                      publicEmail !== user.public.email) &&
                      !responseCode) ||
                    (responseCode && inputCode && inputCode.length === 6)
                  }
                  handleSubmit={handleMail}
                />
                {responseCode && (
                  <button
                    onClick={cancel}
                    className="bg-red-500 cursor-pointer p-2 text-white font-semibold rounded-lg mt-2"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </div>
          </DropSettings>
        )}
        {!user.fromGoogle && (
          <DropSettings title={"كلمة السر"} Icon={RiLockPasswordFill}>
            <div className="pt-3 space-y-2">
              <input
                type="password"
                value={oldPassword}
                placeholder="كلمة السر القديمة"
                onChange={(e) => setOldPassword(e.target.value)}
                className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
              />
              <input
                type="password"
                value={password}
                placeholder="كلمة السر الجديدة"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
              />
              {password && password.length <= 6 && (
                <p className="text-red-400 mt-1 text-sm">
                  كلمة السر تتجاوز 6 أحرف
                </p>
              )}
              <input
                type="password"
                value={passwordConf}
                placeholder="تأكيد كلمة السر الجديدة"
                onChange={(e) => setPasswordConf(e.target.value)}
                className="bg-bgcolor p-2 w-full text-lg rounded-lg border-[1px] border-gray-200"
              />
              {passwordConf && password !== passwordConf && (
                <p className="text-red-400 mt-1 text-sm">
                  كلمتي السر غير متطابقتين
                </p>
              )}
              <Button
                text={password.length > 6 && password === passwordConf}
                loading={loading.password}
                handleSubmit={changePassowrd}
              />
            </div>
          </DropSettings>
        )}
        <div className="flex items-start lg:gap-4 gap-1">
          <div className="w-1/2">
            <DropSettings title="توصياتك" Icon={FaHeartCircleCheck}>
              <PrivateOrPublic
                change={setPublicFollowers}
                state={publicFollowers}
              />
              <Button
                text={user.public.followers !== publicFollowers}
                handleSubmit={() =>
                  updateUser(
                    "followers",
                    "null",
                    publicFollowers,
                    loading.followers
                  )
                }
              />
            </DropSettings>
          </div>
          <div className="w-1/2">
            <DropSettings title="موصى بهم" Icon={FaHeartCircleCheck}>
              <PrivateOrPublic
                change={setPublicFollowing}
                state={publicFollowing}
              />
              <Button
                text={user.public.following !== publicFollowing}
                handleSubmit={() =>
                  updateUser(
                    "following",
                    "null",
                    publicFollowing,
                    loading.following
                  )
                }
              />
            </DropSettings>
          </div>
        </div>
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white p-2 font-bold text-lg rounded-md"
        >
          حذف الحساب
        </button>
      </div>
      <Request />
    </div>
  );
}

const Button = ({ loading, text, handleSubmit }) => {
  return (
    <>
      {text ? (
        <button
          onClick={handleSubmit}
          className={"bg-title p-2 text-white font-semibold rounded-lg mt-2"}
        >
          {!loading ? "تحديث" : "جاري التحديث ..."}
        </button>
      ) : (
        <button
          className="bg-gray-400 cursor-not-allowed
           p-2 text-white font-semibold rounded-lg mt-2"
        >
          تحديث
        </button>
      )}
    </>
  );
};

const PrivateOrPublic = ({ change, state }) => {
  return (
    <div className="flex items-center gap-4 mt-3">
      <div
        onClick={() => change(true)}
        className={"flex items-center gap-2 cursor-pointer"}
      >
        <span
          className={`w-5 h-5 flex justify-center items-center rounded-full border-2 ${
            state ? "border-primary text-primary" : "border-color text-color"
          }`}
        >
          <span
            className={`rounded-full bg-primary transition-all duration-300 ${
              state ? "w-3 h-3" : "max-w-0 max-h-0"
            }`}
          ></span>
        </span>
        <span>عام</span>
      </div>
      <div
        onClick={() => change(false)}
        className={"flex items-center gap-2 cursor-pointer"}
      >
        <span
          className={`w-5 h-5 flex justify-center items-center rounded-full border-2 ${
            !state ? "border-primary text-primary" : "border-color text-color"
          }`}
        >
          <span
            className={`rounded-full bg-primary transition-all duration-300 ${
              !state ? "w-3 h-3" : "max-w-0 max-h-0"
            }`}
          ></span>
        </span>
        <span>خاص</span>
      </div>
    </div>
  );
};
