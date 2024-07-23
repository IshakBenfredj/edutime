import React, { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { GiDiscussion } from "react-icons/gi";
import { FaQuestion } from "react-icons/fa";
import Input from "../components/Input";
import UploadImage from "../components/UploadImage";
import {
  axiosGetWithoutHeader,
  axiosPostWithHeader,
} from "../functions/axiosFunctions";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import Button from "../components/Button";
import Loading from "../components/loading/Loading";
import Empty from "../components/Empty";
import Post from "../components/Post";
import { useSelector } from "react-redux";
import HelmetHead from "../components/HelmetHead";

export default function Forum() {
  const [fermer, setFermer] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const user = useSelector((s) => s.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if ((image || text) && title) {
      try {
        const data = await axiosPostWithHeader("/posts/add", {
          image,
          title,
          text,
        });
        setPosts([data, ...posts]);
        handleSuccess("تم النشر بنجاح");
        setImage("");
        setTitle("");
        setText("");
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const data = await axiosGetWithoutHeader("/posts");
        setPosts(data);
      } catch (error) {
        handleError(error.response.data.error);
      }
      setLoadingPosts(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-14 md:pb-2 pb-16 bg-bgcolor min-h-screen">
      <HelmetHead title={'المنتدى | EduTime'} desc={'المنتدى بمنصة Edutime'} />
      <div className="py-7 lg:w-1/2 mx-auto md:w-3/5 w-[95%] space-y-3">
        {user && (
          <div className="bg-white shadow-md rounded-lg p-3 h-fit">
            <div
              onClick={() => setFermer(!fermer)}
              className="flex justify-between cursor-pointer"
            >
              <div className="flex items-center gap-2 text-lg font-semibold text-primary">
                <GiDiscussion />
                <p>إضافة موضوع للمناقشة</p>
              </div>
              {fermer ? (
                <IoIosArrowUp size={24} />
              ) : (
                <IoIosArrowDown size={24} />
              )}
            </div>
            <div
              className={`transition-all duration-500 overflow-hidden ${!fermer ? "h-0" : "min-h-fit"
                }`}
            >
              <form className="space-y-3" onSubmit={handleSubmit}>
                <UploadImage image={image} setImage={setImage} />
                <Input
                  set={setTitle}
                  state={title}
                  label={"موضوع المناقشة :"}
                  type={"text"}
                  name={"title"}
                  Icon={FaQuestion}
                  bgGray
                />
                <Input
                  set={setText}
                  state={text}
                  label={"المناقشة :"}
                  type={"text"}
                  name={"text"}
                  Icon={GiDiscussion}
                  bgGray
                  textarea
                />
                <Button
                  text={"نشر المناقشة"}
                  loadingText={"جاري النشر"}
                  loading={loading}
                />
              </form>
            </div>
          </div>
        )}
        {loadingPosts ? (
          <Loading />
        ) : !posts.length ? (
          <Empty text={"لا يوجد أي مناقشات"} />
        ) : (
          posts.map((p) => <Post key={p._id} postGet={p} setPosts={setPosts} />)
        )}
      </div>
    </div>
  );
}
