import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import {
  axiosGetWithoutHeader,
  axiosPutWithHeader,
} from "../functions/axiosFunctions";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading/Loading";
import Empty from "../components/Empty";
import { useSelector } from "react-redux";
import {
  AiOutlineDislike,
  AiFillDislike,
  AiFillLike,
  AiOutlineLike,
} from "react-icons/ai";
import { handleError } from "../functions/toastifyFunctions";
import LoginPopup from "../components/LoginPopup";
import { FaRegClock } from "react-icons/fa";
import Name from "../components/Name";
import { useCreateNotification } from "../functions/newNotification";
import renderPostText from "../functions/renderPostText";
import HelmetHead from "../components/HelmetHead";

export default function Blog() {
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openPopup, setOpenPopup] = useState(false);
  const { id } = useParams();
  const user = useSelector((s) => s.user);
  const users = useSelector((s) => s.users);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const admin = users.find((u) => u.isAdmin);
  const createNotification = useCreateNotification();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await axiosGetWithoutHeader(`/blogs/${id}`);
        if (!blog) {
          return navigation("/404");
        }
        setBlog(blog);
      } catch (error) {
        navigation("/404");
      }
      setLoading(false);
    };
    fetchBlog();
  }, [id, navigation]);

  const like = async () => {
    try {
      const data = await axiosPutWithHeader(`/blogs/like/${blog._id}`);
      setBlog(data);
      if (admin._id !== user._id) {
        await createNotification({
          userTo: admin._id,
          userFrom: user._id,
          post: blog._id,
          type: "blog",
        });
      }
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  const disLike = async () => {
    try {
      const data = await axiosPutWithHeader(`/blogs/dislike/${blog._id}`);
      setBlog(data);
    } catch (error) {
      handleError(error.response.data.error);
    }
  };

  return (
    <>
      {openPopup && <LoginPopup set={setOpenPopup} />}
      <HelmetHead title={blog.title || 'Loading ...'} desc={blog?.text?.slice(0, 100) || 'Loading...'} />
      <div className="min-h-screen pt-20 pb-16">
        <div className="container md:px-32">
          {loading ? (
            <Loading />
          ) : !blog ? (
            <Empty text={"لا يوجد أي مدونات"} />
          ) : (
            <>
              <img
                src={blog.image}
                alt=""
                className="md:w-2/3 w-full mx-auto mb-6 object-contain"
              />
              <Title title={blog.title} />
              <div className="flex items-center gap-4 justify-center -mt-4 mb-5">
                <Link
                  to={`/profile/${admin._id}`}
                  className="flex items-center gap-1 font-bold text-color hover:underline"
                >
                  <img
                    src={admin.image}
                    className="w-10 h-10 rounded-full"
                    alt=""
                  />
                  <Name
                    name={admin.name}
                    checkmark={admin.checkmark}
                    width={"w-4"}
                  />
                </Link>
                <div className="flex items-center gap-1 font-bold text-color">
                  <FaRegClock size={24} />
                  <p>
                    {" "}
                    {new Intl.DateTimeFormat("ar-AR", dateOptions).format(
                      new Date(blog?.createdAt)
                    )}
                  </p>
                </div>
              </div>
              <pre className="leading-8">{renderPostText(blog.text)}</pre>
              <div className="text-center space-y-4 mt-7">
                {user ? (
                  <>
                    <h3 className="text-xl font-bold">هل أعجبك المقال ؟</h3>
                    <div className="flex items-center justify-center gap-5">
                      <div className="flex flex-col items-center gap-2">
                        <span
                          onClick={like}
                          className="text-2xl cursor-pointer w-12 h-12 flex items-center justify-center border-2 border-black rounded-full"
                        >
                          {blog.likes.includes(user._id) ? (
                            <AiFillLike className="text-red-500" />
                          ) : (
                            <AiOutlineLike />
                          )}
                        </span>
                        <span className="react-count">{blog.likes.length}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span
                          onClick={disLike}
                          className="text-2xl cursor-pointer w-12 h-12 flex items-center justify-center border-2 border-black rounded-full"
                        >
                          {blog.dislikes.includes(user._id) ? (
                            <AiFillDislike className="text-red-500" />
                          ) : (
                            <AiOutlineDislike />
                          )}
                        </span>
                        <span className="react-count">
                          {blog.dislikes.length}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-xl font-bold">هل أعجبك المقال ؟</h3>
                    <div className="flex items-center justify-center gap-5">
                      <div className="flex flex-col items-center gap-2">
                        <span
                          onClick={() => setOpenPopup(true)}
                          className="text-2xl cursor-pointer w-12 h-12 flex items-center justify-center border-2 border-black rounded-full"
                        >
                          <AiOutlineLike />
                        </span>
                        <span className="react-count">{blog.likes.length}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <span
                          onClick={() => setOpenPopup(true)}
                          className="text-2xl cursor-pointer w-12 h-12 flex items-center justify-center border-2 border-black rounded-full"
                        >
                          <AiOutlineDislike />
                        </span>
                        <span className="react-count">
                          {blog.dislikes.length}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
