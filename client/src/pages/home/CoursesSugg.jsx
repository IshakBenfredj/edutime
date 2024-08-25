import React, { useEffect, useState } from "react";
import Title from "../../components/Title";
import CourseCard from "../../components/CourseCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import Empty from "../../components/Empty";

const CoursesSugg = () => {
  const courses = useSelector((state) => state.courses);
  const [suggCourses, setSuggCourses] = useState([]);
  const [maxCourses, setMaxCourses] = useState(8); // Default is 8

  useEffect(() => {
    // Function to handle screen resize and adjust the max courses to show
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setMaxCourses(6); // For mobile screens (768px and below)
      } else {
        setMaxCourses(8); // For larger screens
      }
    };

    // Set initial value based on screen size
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const generateNumbers = (interval) => {
      if (interval <= maxCourses) {
        setSuggCourses(Array.from({ length: interval }, (_, index) => index));
        return;
      }

      const numbers = new Set();

      while (numbers.size < maxCourses) {
        const randomNumber = Math.floor(Math.random() * (interval + 1));
        numbers.add(randomNumber);
      }

      setSuggCourses(Array.from(numbers));
    };

    generateNumbers(courses.length);
  }, [courses, maxCourses]);

  return (
    <section className="py-12">
      <Title title={"دورات مقترحة"} />
      {courses.length > 0 && suggCourses.length ? (
        <div className="container grid lg:grid-cols-4 grid-cols-2 lg:gap-9 gap-3">
          {suggCourses.map((num) => (
            <CourseCard key={courses[num]?._id} data={courses[num]} />
          ))}
        </div>
      ) : (
        <Empty text={"لايوجد دورات إلى حد الآن"} />
      )}
      <Link
        to={"/courses"}
        className="flex items-center gap-1 p-1 mt-4 lg:text-lg bg-secondary text-white rounded-md w-fit mx-auto"
      >
        <span>إكتشف أكثر</span>
        <FaArrowLeft />
      </Link>
    </section>
  );
};

export default CoursesSugg;
