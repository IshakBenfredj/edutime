import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import Loading from "./loading/Loading";
import Empty from "./Empty";
import { getPostsByUserId } from "../functions/getFunctions.js";
import Post from "./Post.jsx";

export default function ProfileLeftPart({ user, courses, loading }) {
  const [showCourses, setShowCourses] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPostsFunc = async () => {
      const data = await getPostsByUserId(user._id);
      setPosts(data);
      setLoadingPosts(false);
    };
    getPostsFunc();
  }, [user]);
  return (
    <>
      <div className="relative col-span-3 md:overflow-auto md:no-scrollbar">
        {user.isCenter && !user.isAdmin && (
          <div className="w-fit flex items-center mx-auto rounded-md mt-5 border-secondary border-2 font-bold">
            <button
              onClick={() => setShowCourses(true)}
              className={`p-2 ${
                showCourses && "bg-secondary text-white"
              } border-secondary border-l-2`}
            >
              الدورات
            </button>
            <button
              onClick={() => setShowCourses(false)}
              className={`p-2 ${!showCourses && "bg-secondary text-white"}`}
            >
              المناقشات
            </button>
          </div>
        )}
        {user.isCenter &&
          showCourses &&
          !user.isAdmin &&
          (loading ? (
            <Loading />
          ) : !courses.length ? (
            <Empty text={"لا يوجد أي دورات حاليا"} />
          ) : (
            <div className="col-span-3 grid lg:grid-cols-3 2xl:grid-cols-4 grid-cols-2 lg:gap-6 gap-2 p-4 h-fit">
              {courses.map((course) => (
                <CourseCard data={course} key={course._id} />
              ))}
            </div>
          ))}
        {((!showCourses && user.isCenter) || !user.isCenter || user.isAdmin) &&
          (loadingPosts ? (
            <Loading />
          ) : !posts.length ? (
            <Empty text={"لا يوجد أي مناقشات حاليا"} />
          ) : (
            <div className="md:w-3/5 mx-auto py-6 space-y-4">
              {posts.map((p) => (
                <Post postGet={p} key={p._id} setPosts={setPosts} bgGray />
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
