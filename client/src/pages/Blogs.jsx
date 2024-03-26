import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import {
  axiosDeleteWithHeader,
  axiosGetWithoutHeader,
} from "../functions/axiosFunctions";
import Loading from "../components/loading/Loading";
import Empty from "../components/Empty";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { handleError, handleSuccess } from "../functions/toastifyFunctions";
import { useSelector } from "react-redux";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((s) => s.user);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await axiosGetWithoutHeader("/blogs");
      setBlogs(blogs);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm("هل ترغب فعلا في حذف هذه المدونة ؟");
    if (confirmDelete) {
      try {
        const data = await axiosDeleteWithHeader(`/blogs/delete/${id}`);
        handleSuccess(data.message);
        const new_blogs = blogs.filter((blog) => blog._id !== id);
        setBlogs(new_blogs);
      } catch (error) {
        handleError(error.response.data.error);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container">
        <Title title={"المدونة"} minTitle={"إكتشف آخر الأخبار والمقالات"} />
        {loading ? (
          <Loading />
        ) : !blogs.length ? (
          <Empty text={"لا يوجد أي مدونات"} />
        ) : (
          <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1 gap-8 md:w-full w-[95%] mx-auto">
            {blogs.map((blog) => (
              <div className="">
                <Link
                  to={`/blog/${blog._id}`}
                  key={blog._id}
                  className="space-y-1 relative"
                >
                  <span className="bg-slate-100/80 absolute top-2 right-2">
                    {new Intl.DateTimeFormat("ar-AR", dateOptions).format(
                      new Date(blog?.createdAt)
                    )}
                  </span>
                  <img
                    src={blog.image}
                    alt=""
                    className="rounded-md w-full h-32 object-cover"
                  />
                  <h3 className="font-bold text-lg text-primary">
                    {blog.title}
                  </h3>
                  <p className="text-xs text-color">
                    {blog.text.slice(0, 100)}...
                  </p>
                </Link>
                {user && user.isAdmin && (
                  <div
                    className="w-fit mt-2"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <Button text={"حذف"} color={"danger"} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
