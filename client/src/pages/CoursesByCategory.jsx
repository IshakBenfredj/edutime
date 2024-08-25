import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import CourseCard from "../components/CourseCard";
import Empty from "../components/Empty";
import data from "../constants/categories";
import HelmetHead from "../components/HelmetHead";
import Loading from "../components/loading/Loading";

export default function CoursesByCategory() {
  const { category } = useParams();
  const all_courses = useSelector((s) => s.courses);
  const [courses, setCourses] = useState([]);
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (all_courses.length > 0) {
      setloading(false);
    }
  }, [all_courses]);

  useEffect(() => {
    if (category) {
      if (data.filter((d) => d.name === category).length) {
        const courses = all_courses.filter((c) => c.category === category);
        setCourses(courses);
      } else {
        navigate("/404");
      }
    } else {
      setCourses(all_courses);
    }
  }, [all_courses, category, navigate]);

  return (
    <div className="pt-20 pb-16 min-h-screen">
      <HelmetHead
        title={"الدورات | EduTime"}
        desc={"الدورات المنشورة بمنصة Edutime"}
      />
      <div className="container">
        <Title title={category ? `إعلانات في ${category}` : "الدورات"} />
        {loading ? (
          <Loading />
        ) : courses.length > 0 ? (
          <div className="container grid lg:grid-cols-4 grid-cols-2 lg:gap-9 gap-3">
            {courses.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        ) : (
          <Empty text={"لايوجد دورات في هذه الفئة إلى حد الآن"} />
        )}
      </div>
    </div>
  );
}
