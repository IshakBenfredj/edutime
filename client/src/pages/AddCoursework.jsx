import images from "../constants/images";
import { FaImage, FaInfo, FaPhone, FaCalendarAlt } from "react-icons/fa6";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory, MdOutlineAttachMoney } from "react-icons/md";
import { useState } from "react";
import UploadImage from "../components/UploadImage";

export default function AddCoursework() {
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [isFree, setIsFree] = useState();
  const [open, setOpen] = useState();
  const [date, setDate] = useState();
  const [isOnline, setIsOnline] = useState();
  const [place, setplace] = useState();
  const [certificate, setCertificate] = useState();
  const [description, setDescription] = useState();
  return (
    <div className="bg-bgcolor pt-14 h-screen flex">
      <div className="w-1/2 h-full object-cover relative before:w-full before:h-full before:absolute before:bg-black/70">
        <img src={images.addAd} alt="" className="w-full h-full" />
        <div className="absolute w-full h-full top-0 right-0 p-4 font-bold text-white text-5xl leading-[2]">
          <img src={images.whiteLogo} alt="" />
          <p className="w-2/3 mx-auto text-center -mt-14">
            أضف إعلان دورتك وساهم في نشر معرفتك
          </p>
        </div>
      </div>
      <div className="p-6 w-1/2">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-1/2 h-60 bg-white flex items-center justify-center rounded-lg shadow-lg">
            {image && (
              <img src={image} alt="" className="w-full h-full object-cover" />
            )}
            {!image && <FaImage className="text-5xl text-title" />}
          </div>
          <div className="space-y-3 w-1/2">
            <div className="-mt-5">
              <UploadImage setImage={setImage} image={image} />
            </div>
            <Input label={'إسم الدورة'} set={setName} type={'text'} name='name' Icon={FaInfo} />
            <Input label={'رقم الهاتف'} set={setPhone} type={'number'} name='phone' Icon={FaPhone} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Input = ({ set, label, type, name, Icon }) => {
  return (
    <div>
      <label
        htmlFor={name}
        name={name}
        className="block text-primary text-lg font-semibold mb-2"
      >
        {label}
      </label>
      <div className="flex h-11 bg-white shadow-lg rounded-lg overflow-hidden">
        <span className="p-2 flex items-center justify-center text-xl text-white bg-title">
          <Icon />
        </span>
        <input
          type={type}
          className="w-full px-2 focus:outline-none"
          id={name}
          name={name}
          onChange={(e) => set(e.target.value)}
        />
      </div>
    </div>
  );
};
