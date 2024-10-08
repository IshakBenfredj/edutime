import { FaHourglassHalf, FaImage, FaInfo, FaPhone } from "react-icons/fa6";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory, MdOutlineAttachMoney, MdEditNote } from "react-icons/md";
import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { axiosPostWithHeader } from "../functions/axiosFunctions";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../toolkit/slices/courses";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";
import HelmetHead from "../components/HelmetHead";
import { useNavigate } from "react-router-dom";
import validatePhoneNumber from "../functions/phoneCheck";

export default function AddCourse() {
  const user = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [isFree, setIsFree] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const [place, setPlace] = useState();
  const [certificate, setCertificate] = useState(false);
  const [description, setDescription] = useState();
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState();
  const [hours, setHours] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !image ||
      !name ||
      !phone ||
      !category ||
      (!price && !isFree) ||
      (!date && !isOpen) ||
      !place ||
      !description ||
      !hours
    ) {
      setEmpty(true);
    } else {
      setEmpty(false);
    }
  }, [
    image,
    name,
    phone,
    category,
    price,
    date,
    place,
    description,
    isFree,
    isOpen,
    hours,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (empty) {
      handleError("جميع الحقول مطلوبة");
    } else {
      if (!validatePhoneNumber(phone)) {
        setLoading(false);
        return;
      }
      try {
        const data = await axiosPostWithHeader("/courses/add", {
          image,
          name,
          phone,
          category,
          price,
          isFree,
          isOpen,
          date,
          isOnline,
          place,
          certificate,
          description,
          hours,
        });
        dispatch(addCourse(data));
        handleSuccess("تم نشر الإعلان بنجاح");
        navigate(`/profile/${user._id}`);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
    setLoading(false);
  };

  return (
    <div className="bg-bgcolor pt-20 min-h-screen">
      <Title title={"إضافة إعلان"} />
      <HelmetHead title={"إضافة إعلان"} desc={"إضافة إعلان بمنصة Edutime"} />
      <form
        className="p-3 pb-20 lg:w-[60%] mx-auto w-full"
        onSubmit={handleSubmit}
      >
        <div className="flex gap-3 lg:flex-row flex-col items-center justify-center">
          <div className="lg:w-1/2 overflow-hidden w-full lg:h-60 h-44 bg-white flex items-center justify-center rounded-lg shadow-lg">
            {image && (
              <img src={image} alt="" className="w-full h-full object-cover" />
            )}
            {!image && <FaImage className="text-5xl text-title" />}
          </div>
          <div className="space-y-3 lg:w-1/2 w-full">
            <div className="lg:-mt-5 mt-0">
              <UploadImage setImage={setImage} image={image} />
            </div>
            <Input
              label={"إسم الدورة"}
              set={setName}
              type={"text"}
              name="name"
              Icon={FaInfo}
              state={name}
            />
            <Input
              label={"رقم الهاتف"}
              set={setPhone}
              type={"number"}
              name="phone"
              Icon={FaPhone}
              state={phone}
            />
          </div>
        </div>
        <div className="space-y-3 lg:mt-4 mt-3">
          <div className="flex items-start lg:flex-row flex-col gap-3">
            <CheckBox
              name={"certificate"}
              label={"مع شهادة"}
              set={setCertificate}
              state={certificate}
            />
            <div className="lg:w-1/2 w-full">
              <Input
                set={setCategory}
                label={"الفئة"}
                Icon={MdCategory}
                category
                state={category}
              />
            </div>
          </div>
          <div className="flex items-start lg:flex-row flex-col gap-3">
            <CheckBox
              name={"isFree"}
              label={"دورة مجانية"}
              set={setIsFree}
              state={isFree}
            />
            {!isFree && (
              <div className="lg:w-1/2 w-full">
                <Input
                  set={setPrice}
                  label={"سعر الدورة (دج)"}
                  type={"number"}
                  name={"price"}
                  Icon={MdOutlineAttachMoney}
                  state={price}
                />
              </div>
            )}
          </div>
          <div className="flex items-start lg:flex-row flex-col gap-3">
            <CheckBox
              name={"isOnline"}
              label={"دورة عن بعد"}
              set={setIsOnline}
              state={isOnline}
            />
            <div className="lg:w-1/2 w-full">
              <Input
                set={setPlace}
                label={
                  isOnline ? "موقع أو تطبيق عرض الدورة" : "مكان عرض الدورة"
                }
                type={"text"}
                name={"palce"}
                Icon={FaMapMarkerAlt}
                state={place}
              />
            </div>
          </div>
          <div className="flex items-start lg:flex-row flex-col gap-3">
            <CheckBox
              name={"isOpen"}
              label={"متاحة دائما"}
              set={setIsOpen}
              state={isOpen}
            />
            {!isOpen && (
              <div className="lg:w-1/2 w-full">
                <Input
                  set={setDate}
                  label={"تاريخ الدورة"}
                  type={"date"}
                  name={"date"}
                  Icon={FaCalendarAlt}
                  state={date}
                />
              </div>
            )}
          </div>
          <div className="lg:w-1/2">
            <Input
              set={setHours}
              label={"عدد الساعات"}
              type={"number"}
              name={"hours"}
              state={hours}
              Icon={FaHourglassHalf}
            />
          </div>
          <Input
            set={setDescription}
            label={"وصف الدورة"}
            state={description}
            textarea
            Icon={MdEditNote}
            placeholder={
              "قدم وصفا دقيقا لهذا الإعلان ليشمل كل تفاصيل الخدمة المقدمة"
            }
          />
          <Button
            loading={loading}
            text={"نشر الإعلان"}
            loadingText={"جاري النشر"}
          />
        </div>
      </form>
    </div>
  );
}

const CheckBox = ({ name, label, set, state }) => {
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className="flex items-center gap-2 lg:w-1/2 w-full">
      <input
        type="checkbox"
        name={name}
        id={name}
        className="w-6 h-6"
        onChange={() => set(!state)}
      />
      <label htmlFor={name} className="text-primary text-xl font-semibold">
        {label}
      </label>
    </div>
  );
};
