import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../components/UploadImage";
import { useState } from "react";
import DropSettings from "../components/DropSettings";
import { FaUserEdit, FaUserTie, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaHeartCircleCheck } from "react-icons/fa6";
import images from "../constants/images";

export default function Settings() {
  const user = useSelector((s) => s.user);
  const [image, setImage] = useState("");
  const [name, setName] = useState(user && user.name);
  const [bio, setBio] = useState(user && user?.bio);
  const [phone, setPhone] = useState(user && user?.phone);
  const [phonePrivate, setPhonePrivate] = useState(false);
  const [address, setAddress] = useState(user && user?.address);
  const [addressPrivate, setAddressPrivate] = useState(false);
  const [privateFollowers, setPrivateFollowers] = useState(false);
  const [privateFollowing, setPrivateFollowing] = useState(false);
  const [prevPassword, setPrevPassword] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [imageCheck, setImageCheck] = useState("");

  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  return (
    <div className="py-20 md:px-10 px-4 bg-bgcolor min-h-screen grid md:grid-cols-3 md:gap-0 gap-4 grid-cols-1">
      <div className="col-span-1 bg-white md:w-4/5 w-[100%] h-fit shadow rounded-lg p-4">
        <div className="w-44 h-44 lg:w-60 lg:h-60 mx-auto overflow-hidden">
          <img
            src={image ? image : user.image}
            alt=""
            className="w-full h-full rounded-full object-cover border-2 border-primary"
          />
        </div>
        <UploadImage image={image} setImage={setImage} />
        <button
          className={`mt-4 rounded-lg mx-auto block ${
            image ? "bg-title" : "bg-gray-400 cursor-not-allowed"
          } text-white p-2`}
        >
          تحديث الصورة
        </button>
      </div>
      <div className="col-span-1 space-y-4">
        <DropSettings title={"الإسم الكامل"} Icon={FaUserEdit}>
          <div className="pt-3">
            <input
              type="text"
              value={name}
              placeholder="الإسم الكامل"
              onChange={(e) => setName(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-md border-[1px] border-gray-200"
            />
            {name && name.length <= 7 && (
              <p className="text-red-400 mt-1 text-sm">الإسم يتجاوز 7 أحرف</p>
            )}
            <Button text={name && name.length > 7 && name !== user.name} />
          </div>
        </DropSettings>
        <DropSettings title={"السيرة الذاتية"} Icon={FaUserTie}>
          <div className="pt-3">
            <textarea
              placeholder="صف نفسك وأعمالك"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-md border-[1px] border-gray-200"
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
              className="bg-bgcolor p-2 w-full text-lg rounded-md border-[1px] border-gray-200"
            />
            {phone && phone.length !== 10 && (
              <p className="text-red-400 mt-1 text-sm">
                رقم الهاتف من عشرة أرقام
              </p>
            )}
            <PrivateOrPublic change={setPhonePrivate} state={phonePrivate} />
            <Button
              text={
                phone && phone.length === 10 && phone !== user.phone
                //  ||
                // phonePrivate !== user.phone.private
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
              className="bg-bgcolor p-2 w-full text-lg rounded-md border-[1px] border-gray-200"
            />
            {address && address.length < 3 && (
              <p className="text-red-400 mt-1 text-sm">العنوان يتجاوز 3 أحرف</p>
            )}
            <PrivateOrPublic
              change={setAddressPrivate}
              state={addressPrivate}
            />
            <Button
              text={
                address && address.length >= 3 && address !== user.address
                //  ||
                // addressPrivate !== user.address.private
              }
            />
          </div>
        </DropSettings>
        <DropSettings title={"كلمة السر"} Icon={RiLockPasswordFill}>
          <div className="pt-3 space-y-2">
            <input
              type="password"
              value={prevPassword}
              placeholder="كلمة السر القديمة"
              onChange={(e) => setPrevPassword(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-md border-[1px] border-gray-200"
            />
            <input
              type="password"
              value={password}
              placeholder="كلمة السر الجديدة"
              onChange={(e) => setPassword(e.target.value)}
              className="bg-bgcolor p-2 w-full text-lg rounded-md border-[1px] border-gray-200"
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
              className="bg-bgcolor p-2 w-full text-lg rounded-md border-[1px] border-gray-200"
            />
            {passwordConf && password !== passwordConf && (
              <p className="text-red-400 mt-1 text-sm">
                كلمتي السر غير متطابقتين
              </p>
            )}
            <Button text={password.length > 6 && password === passwordConf} />
          </div>
        </DropSettings>
        <div className="flex items-start md:gap-4 gap-1">
          <div className="w-1/2">
            <DropSettings title="توصياتك" Icon={FaHeartCircleCheck}>
              <PrivateOrPublic
                change={setPrivateFollowers}
                state={privateFollowers}
              />
              <Button text={user.privateFollowers !== privateFollowers} />
            </DropSettings>
          </div>
          <div className="w-1/2">
            <DropSettings title="موصى بهم" Icon={FaHeartCircleCheck}>
              <PrivateOrPublic
                change={setPrivateFollowing}
                state={privateFollowing}
              />
              <Button text={user.privateFollowing !== privateFollowing} />
            </DropSettings>
          </div>
        </div>
      </div>
      <div className="col-span-1 md:w-4/5 w-[100%] mx-auto bg-white rounded-lg h-fit p-4">
        <img src={images.checkmark} alt="" className="w-1/3 mx-auto" />
        <p className="text-color mt-4 leading-8">
          أحصل على التوثيق الخاص بحسابك من أجل زيادة مصداقيتك على منصتنا, وجعل
          حسابك رسمي لتمييزه من بين الحسابات الزائفة , أرسل طلبك مرفوقا بصورة
          لبطاقة التعريف الوطنية .
        </p>
        <UploadImage image={imageCheck} setImage={setImageCheck} />
        <button
          className={`mt-4 rounded-lg mx-auto block ${
            imageCheck ? "bg-title" : "bg-gray-400 cursor-not-allowed"
          } text-white p-2`}
        >
          طلب التوثيق
        </button>
      </div>
    </div>
  );
}

const Button = ({ loading, text }) => {
  return (
    <>
      {text ? (
        <button
          className={"bg-title p-2 text-white font-semibold rounded-md mt-2"}
        >
          {!loading ? "تحديث" : "جاري التحديث ..."}
        </button>
      ) : (
        <button
          className="bg-gray-400 cursor-not-allowed
           p-2 text-white font-semibold rounded-md mt-2"
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
        <span>عام</span>
      </div>
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
        <span>خاص</span>
      </div>
    </div>
  );
};