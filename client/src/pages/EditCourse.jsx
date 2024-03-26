import images from "../constants/images";
import { FaHourglassHalf, FaImage, FaInfo, FaPhone } from "react-icons/fa6";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory, MdOutlineAttachMoney, MdEditNote } from "react-icons/md";
import { useEffect, useState } from "react";
import UploadImage from "../components/UploadImage";
import data from "../constants/categories";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { axiosPutWithHeader } from "../functions/axiosFunctions";
import { useDispatch, useSelector } from "react-redux";
import { updateCourse } from "../toolkit/slices/courses";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";

export default function EditCourse() {
  const dispatch = useDispatch();
  const courses = useSelector((s) => s.courses);
  const user = useSelector((s) => s.user);
  const [course, setCourse] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [isFree, setIsFree] = useState("");
  const [isOpen, setIsOpen] = useState("");
  const [date, setDate] = useState("");
  const [isOnline, setIsOnline] = useState("");
  const [place, setPlace] = useState("");
  const [certificate, setCertificate] = useState("");
  const [description, setDescription] = useState("");
  const [hours, setHours] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingHandle, setLoadingHandle] = useState(false);
  const [empty, setEmpty] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getCourseFunc = async () => {
      setLoading(true);
      const data = courses.find((c) => c._id === id);
      if (!data || data.userId !== user._id) {
        navigate("/404");
        return;
      }
      setCourse(data);
      setImage(data?.image ?? "");
      setName(data?.name ?? "");
      setPhone(data?.phone ?? "");
      setCategory(data?.category ?? "");
      setPrice(data?.price ?? "");
      setIsFree(data?.isFree ?? "");
      setIsOpen(data?.isOpen ?? "");
      setDate(data?.date ?? "");
      setIsOnline(data?.isOnline ?? "");
      setPlace(data?.place ?? "");
      setCertificate(data?.certificate ?? "");
      setDescription(data?.description ?? "");
      setHours(data?.hours ?? "");
      setLoading(false);
    };
    getCourseFunc();
  }, [id, courses, navigate]);

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
    setLoadingHandle(true);
    if (empty) {
      handleError("جميع الحقول مطلوبة");
    } else {
      try {
        const data = await axiosPutWithHeader(`/courses/update/${course._id}`, {
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
        setCourse(data);
        dispatch(updateCourse({ id, data }));
        handleSuccess("تم تحديث الإعلان بنجاح");
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
    setLoadingHandle(false);
  };
  return (
    <div className="bg-bgcolor pt-14 min-h-screen flex">
      {loading ? (
        <Loading />
      ) : course ? (
        <>
          <div className="w-5/12 h-screen object-cover relative lg:block hidden before:w-full before:h-full before:absolute before:bg-black/70">
            <img src={images.addAd} alt="" className="w-full h-full" />
            <div className="absolute w-full h-full top-0 right-0 p-4 font-bold text-white text-5xl leading-[2]">
              <img src={images.whiteLogo} alt="" />
              <p className="w-2/3 mx-auto text-center -mt-14">
                عدل إعلان دورتك وإعمل على جعله أفضل
              </p>
            </div>
          </div>
          <form
            className="lg:p-6 p-6 pb-20 lg:w-7/12 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex gap-3 lg:flex-row flex-col items-center justify-center">
              <div className="lg:w-1/2 overflow-hidden w-full lg:h-60 h-44 bg-white flex items-center justify-center rounded-lg shadow-lg">
                {image && (
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
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
              />
              <button
                className={`p-2 lg:w-1/3 w-1/2 block mx-auto ${
                  loadingHandle ? "bg-gray-500" : "bg-title"
                } rounded-lg font-bold text-lg text-white`}
              >
                {loadingHandle ? "جاري التحديث..." : "تحديث الإعلان"}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>notfound</>
      )}
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
        checked={state}
      />
      <label htmlFor={name} className="text-primary text-xl font-semibold">
        {label}
      </label>
    </div>
  );
};

const Input = ({ set, label, type, name, Icon, state, category, textarea }) => {
  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <div className="w-full">
      <label
        htmlFor={name}
        name={name}
        className="block text-primary text-lg font-semibold mb-2"
      >
        {label}
      </label>

      <div
        className={`flex ${
          !textarea && "h-11"
        } bg-white shadow-lg rounded-lg overflow-hidden`}
      >
        <span className="p-2 flex items-center justify-center text-xl text-white bg-title">
          <Icon />
        </span>
        {!category && !textarea && (
          <input
            type={type}
            className="w-full px-2 focus:outline-none bg-white"
            id={name}
            name={name}
            onChange={(e) => set(e.target.value)}
            value={state}
          />
        )}
        {textarea && (
          <textarea
            className="w-full px-2 focus:outline-none bg-white h-48"
            id={name}
            onChange={(e) => set(e.target.value)}
            value={state}
            placeholder="قدم وصفا دقيقا لهذا الإعلان ليشمل كل تفاصيل الخدمة المقدمة"
          ></textarea>
        )}
        {category && (
          <select
            onChange={(e) => set(e.target.value)}
            className="w-full px-2 focus:outline-none bg-white"
          >
            <option disabled>الفئة</option>
            {data.map((c) => (
              <option key={c.name} value={c.name} selected={state === c.name}>
                {c.name}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};
