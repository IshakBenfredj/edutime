import React, { useEffect } from "react";
import Title from "../../components/Title";
import CourseCard from "../../components/CourseCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "../../toolkit/slices/courses";
import { FaArrowLeft } from "react-icons/fa";
import Empty from "../../components/Empty";

const CoursesSugg = () => {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  return (
    <section className="py-12">
      <Title title={"دورات مقترحة"} />
      {courses.length > 0 ? (
        <div className="container grid lg:grid-cols-4 grid-cols-2 lg:gap-9 gap-3">
          {courses.map((coursework) => (
            <CourseCard key={coursework._id} data={coursework} />
          ))}
        </div>
      ) : (
        <Empty text={"لايوجد دورات إلى حد الآن"} />
      )}
      <Link
        to={"/courseworks/allCourseworks"}
        className="flex items-center gap-1 p-1 mt-4 lg:text-lg bg-secondary text-white rounded-md w-fit mx-auto"
      >
        <span>إكتشف أكثر</span>
        <FaArrowLeft />
      </Link>
    </section>
  );
};

export default CoursesSugg;
