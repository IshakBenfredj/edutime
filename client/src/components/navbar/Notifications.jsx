// Notifications.jsx

import { useContext, useEffect, useState } from "react";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import {
  axiosGetWithHeader,
  axiosPutWithHeader,
} from "../../functions/axiosFunctions";
import Empty from "../Empty";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../functions/getFunctions";
import { SocketContext } from "../../SocketContext";

export default function Notifications({
  closeAll,
  popup,
  setPopup,
  setPopupMessages,
}) {
  const [loading, setLoading] = useState(true);
  const [newNotLength, setNewNotLength] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((s) => s.user);

  const [arrivalNotification, setArrivalNotification] = useState();
  const { socket } = useContext(SocketContext);

  // getNotification with socket
  useEffect(() => {
    if (socket) {
      socket?.on("getNotification", (data) => {
        setArrivalNotification(data);
      });
    }
  }, [socket]);

  // add user to online users
  useEffect(() => {
    socket?.emit("addOnlineUser", user._id);
  }, [socket, user]);

  // get new notification
  useEffect(() => {
    arrivalNotification &&
      setNotifications((prev) => [arrivalNotification, ...prev]);
  }, [arrivalNotification]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const data = await axiosGetWithHeader("/notifications");
        setNotifications(data);
        setLoading(false);
      } catch (error) {
        console.error("Error creating notification:", error);
        throw error;
      }
    };
    getNotification();
  }, []);

  useEffect(() => {
    if (notifications.length) {
      const newNot = notifications.filter((n) => n.isNewNot);
      setNewNotLength(newNot.length);
    }
  }, [notifications]);

  async function handleNot() {
    if (popup) {
      close();
    } else {
      await open();
    }
  }

  async function open() {
    setPopup(true);
    closeAll();
    setPopupMessages(false);
    await axiosPutWithHeader(`/notifications`);
    setNewNotLength(0);
  }

  function close() {
    setPopup(false);
    notifications.forEach((notification) => {
      notification.isNewNot = false;
    });
  }

  return (
    <>
      <button
        onClick={handleNot}
        className="relative p-1 rounded-lg lg:text-3xl text-2xl text-gray-500 transition-all hover:text-title font-bold flex justify-center items-center"
      >
        {popup ? (
          <IoMdNotifications className="text-title" />
        ) : (
          <IoMdNotificationsOutline />
        )}
        {newNotLength > 0 && (
          <span className="absolute text-xs bg-orange-500 top-0 left-0 text-white rounded-full p-[2px] w-4 h-4 flex items-center justify-center">
            {newNotLength <= 9 ? newNotLength : "+9"}
          </span>
        )}
        {popup && (
          <NotificationsPopup notifications={notifications} loading={loading} />
        )}
      </button>
    </>
  );
}

const NotificationsPopup = ({ loading, notifications }) => {
  return (
    <div className="md:w-[350px] w-[95%] bg-white h-96 fixed md:left-auto left-1/2 md:translate-x-0 overflow-auto -translate-x-1/2 lg:top-16 lg:bottom-auto bottom-16 shadow-xl border-2 border-title">
      <h3 className="p-2 text-lg font-bold text-primary text-start">
        الإشعارات :
      </h3>
      {loading ? (
        <>
          <NotificationLoading />
          <NotificationLoading />
          <NotificationLoading />
          <NotificationLoading />
        </>
      ) : !notifications.length ? (
        <Empty text={"لا يوجد إشعارات"} />
      ) : (
        notifications.map((n) => <Notification notification={n} />)
      )}
    </div>
  );
};

const Notification = ({ notification }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState();
  const currentUser = useSelector((s) => s.user);

  useEffect(() => {
    const getUserProfile = async () => {
      setLoading(true);
      try {
        const user = await getUser(notification.userFrom);
        setUser(user);
      } catch (error) {}
      setLoading(false);
    };
    if (
      notification.type !== "changeRequest" &&
      notification.type !== "docRequest"
    )
      getUserProfile();
  }, [notification]);

  return (
    <>
      {loading ? (
        <NotificationLoading />
      ) : (
        user && (
          <>
            {notification.type === "like" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/post/${notification.post}`}
              >
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  تم الإعجاب بمنشورك من قبل{" "}
                  <span className="text-primary">{user.name}</span>
                </span>
              </Link>
            )}
            {notification.type === "comment" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/post/${notification.post}`}
              >
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  تم التعليق على منشورك من قبل{" "}
                  <span className="text-primary">{user.name}</span>
                </span>
              </Link>
            )}
            {notification.type === "follow" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/profile/${notification.userFrom}`}
              >
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  قام <span className="text-primary">{user.name}</span> بمتابعتك
                </span>
              </Link>
            )}
            {notification.type === "blog" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/blog/${notification.post}`}
              >
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  تم الإعجاب بمقالتك من قبل
                  <span className="text-primary">{user.name}</span>
                </span>
              </Link>
            )}
            {notification.type === "course" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/course_details/${notification.post}`}
              >
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  تم التعليق على إعلانك من قبل{" "}
                  <span className="text-primary">{user.name}</span>
                </span>
              </Link>
            )}
            {notification.type === "reservation" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/my_reservations`}
              >
                <img
                  src={user.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  تم {notification.accept ? "قبول" : "رفض"} طلب حجزك من قبل{" "}
                  <span className="text-primary">{user.name}</span>
                </span>
              </Link>
            )}
            {notification.type === "changeRequest" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/profile/${notification.userTo}`}
              >
                <img
                  src={currentUser?.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  تم {notification.accept ? "قبول" : "رفض"} طلب التغيير إلى معلم
                  من قبل المسؤول
                </span>
              </Link>
            )}
            {notification.type === "docRequest" && (
              <Link
                className={`${
                  notification.isNewNot && "bg-gray-200"
                } flex items-center gap-2 p-2 border-b-[1px] border-gray-300`}
                to={`/profile/${notification.userTo}`}
              >
                <img
                  src={currentUser.image}
                  className="w-10 h-10 rounded-full bg-slate-300"
                  alt=""
                />
                <span className="text-sm text-start">
                  تم {notification.accept ? "قبول" : "رفض"} طلب التوثيق من قبل
                  المسؤول
                </span>
              </Link>
            )}
          </>
        )
      )}
    </>
  );
};

function NotificationLoading() {
  return (
    <div className="flex items-center gap-2 p-2 animate-pulse">
      <span className="w-10 h-10 rounded-full bg-slate-300"></span>
      <span className="bg-slate-300 w-2/3 h-5"></span>
    </div>
  );
}
