import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import {
  axiosGetWithHeader,
  axiosPutWithHeader,
} from "../functions/axiosFunctions";
import Loading from "../components/loading/Loading";
import Empty from "../components/Empty";
import { getUser } from "../functions/getFunctions";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { useCreateNotification } from "../functions/newNotification";

export default function DocRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await axiosGetWithHeader("/requests");
      const reqFilter = data.filter((d) => d.type === "doc");
      setRequests(reqFilter);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="pt-20 pb-16 bg-bgcolor min-h-screen">
      <div className="container">
        <Title title={"طلبات التوثيق"} />
        {loading ? (
          <Loading />
        ) : requests.length === 0 ? (
          <Empty text={"لا يوجد طلبات توثيق جديدة"} />
        ) : (
          <div className="flex justify-center gap-4">
            {requests.map((r) => (
              <Request
                req={r}
                key={r._id}
                setRequests={setRequests}
                requests={requests}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const Request = ({ req, setRequests, requests }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [seePhoto, setSeePhoto] = useState(false);
  const createNotification = useCreateNotification();

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const user = await getUser(req.userId);
        setUser(user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getUserProfile();
  }, [req]);

  const handleAccept = async () => {
    try {
      await axiosPutWithHeader(`/requests/accept/${req._id}`);
      handleSuccess(`تم قبول طلب التوثيق الخاص ب ${user.name}`);
      const newReqs = requests.filter((r) => r._id !== req._id);
      setRequests(newReqs);
      await createNotification({
        userTo: user._id,
        type: "docRequest",
        accept: true,
      });
    } catch (error) {
      handleError(error.response.data.error);
    }
  };
  const handleRefuse = async () => {
    try {
      await axiosPutWithHeader(`/requests/refuse/${req._id}`);
      handleSuccess(`تم رفض طلب التوثيق الخاص ب ${user.name}`);
      const newReqs = requests.filter((r) => r._id !== req._id);
      setRequests(newReqs);
      await createNotification({
        userTo: user._id,
        type: "docRequest",
        accept: false,
      });
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <>
      {seePhoto && (
        <div className="fixed h-screen w-screen top-0 right-0 left-0 bg-black/70 z-50 flex justify-center items-center">
          <div className="w-4/5 h-4/5 relative">
            <div
              className="p-2 cursor-pointer text-xl absolute right-0 top-0 bg-white"
              onClick={() => setSeePhoto(false)}
            >
              <IoCloseSharp />
            </div>
            <img
              src={req.image}
              alt=""
              className="f-full h-full object-contain m-auto"
            />
          </div>
        </div>
      )}

      {loading ? (
        <></>
      ) : !user ? (
        <></>
      ) : (
        <div className="bg-white rounded-md shadow-lg">
          <img
            src={req.image}
            alt=""
            className="w-full h-36 object-contain"
            onClick={() => setSeePhoto(true)}
          />
          <Link
            to={`/profile/${user._id}`}
            className="flex items-center gap-2 p-3 text-primary font-bold"
          >
            <img src={user.image} alt="" className="w-8 h-8 rounded-full" />
            <span>{user.name}</span>
          </Link>
          <div className="grid grid-cols-2 gap-2 p-3">
            <span
              onClick={handleAccept}
              className="p-2 text-xl border-2 border-green-500 text-green-500 cursor-pointer rounded-md flex items-center justify-center"
            >
              <FaCheck />
            </span>
            <span
              onClick={handleRefuse}
              className="p-2 text-xl border-2 border-red-500 text-red-500 cursor-pointer rounded-md flex items-center justify-center"
            >
              <IoCloseSharp />
            </span>
          </div>
        </div>
      )}
    </>
  );
};
