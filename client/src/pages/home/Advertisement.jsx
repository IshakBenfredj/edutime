import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import UploadImage from "../../components/UploadImage";
import Button from "../../components/Button";
import {
  axiosDeleteWithHeader,
  axiosGetWithoutHeader,
  axiosPostWithHeader,
} from "../../functions/axiosFunctions";
import { handleError, handleSuccess } from "../../functions/toastifyFunctions";
import Loading from "../../components/loading/Loading";
import Empty from "../../components/Empty";
import { MdDeleteForever } from "react-icons/md";

export default function Advertisement() {
  const [index, setindex] = useState(0);
  const [image, setImage] = useState("");
  const [pubs, setPubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPubs, setLoadingPubs] = useState(true);

  const user = useSelector((s) => s.user);

  useEffect(() => {
    const fetchPubs = async () => {
      try {
        const data = await axiosGetWithoutHeader("/pubs");
        setPubs(data);
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoadingPubs(false);
    };
    fetchPubs();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setindex(index === pubs.length - 1 ? 0 : index + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [pubs.length, index]);

  const next = () => {
    setindex(index + 1);
  };
  const prev = () => {
    setindex(index - 1);
  };

  const handlePub = async () => {
    setLoading(true);
    if (image) {
      try {
        const data = await axiosPostWithHeader("/pubs", { image });
        setPubs([...pubs, data]);
        handleSuccess("تم نشر الاعلان");
        setImage("");
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const data = await axiosDeleteWithHeader(`/pubs/${id}`);
      const filtredPubs = pubs.filter((pub) => pub._id !== id);
      setPubs(filtredPubs);
      handleSuccess(data.message);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <div className="py-8">
      <p className="font-bold text-center text-color mb-4">مساحة إشهارية</p>
      {user && user.isAdmin && (
        <div className="lg:w-1/5 md:3/5 w-[95%] mx-auto mb-4 space-y-2">
          <UploadImage image={image} setImage={setImage} />
          <Button
            text={"نشر الإعلان"}
            loading={loading}
            loadingText={"جاري النشر"}
            clickFunc={handlePub}
          />
        </div>
      )}
      <div className="container md:w-2/3 2xl:w-2/5 w-full relative flex items-center justify-center">
        {loadingPubs ? (
          <Loading />
        ) : !pubs.length ? (
          <Empty text={"لا يوجد إعلانات حاليا"} />
        ) : (
          <div
            className={`relative w-full flex items-center justify-start overflow-x-hidden`}
          >
            {index !== 0 && (
              <IoIosArrowForward
                onClick={prev}
                className="absolute z-10 text-title top-1/2 -translate-y-1/2 right-3 bg-white/70 p-2 w-8 h-8 rounded-full"
              />
            )}
            {pubs.map((pub, i) => (
              <>
                {user && user.isAdmin && (
                  <button
                    onClick={() => handleDelete(pub._id)}
                    className="absolute top-3 right-3 p-2 text-3xl bg-red-500 text-white rounded-md z-10 cursor-pointer"
                  >
                    <MdDeleteForever />
                  </button>
                )}
                <img
                  src={pub.image}
                  alt=""
                  className="h-fit w-full transition-all object-cover"
                  style={{ transform: `translateX(${index * 100}%)` }}
                />
              </>
            ))}
            {index !== pubs.length - 1 && (
              <IoIosArrowBack
                onClick={next}
                className="absolute z-10 text-title top-1/2 -translate-y-1/2 left-3 bg-white/70 p-2 w-8 h-8 rounded-full"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
