import React from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import data from "../../constants/categories";

const Categories = () => {
  return (
    <section className="bg-bgcolor py-12">
      <Title
        title={"الفئات"}
        minTitle={
          "كافة الدورات التدريبية والتعليمية لتطوير قدراتك العملية والعلمية"
        }
      />
      <div className="container grid lg:grid-cols-5 grid-cols-3 gap-5">
        {data.map((e, index) => (
          <Link
            to={`/courses/${e.name}`}
            key={e.name}
            className={`category rounded-lg cursor-pointer bg-black overflow-hidden md:h-48 h-20 relative before:absolute before:w-full before:h-full
             before:z-10 before:bg-black/60 ${
               index === data.length - 1 &&
               "col-start-1 lg:col-start-5 lg:col-end-6 col-end-4"
             }`}
          >
            <img
              src={e.image}
              alt=""
              className={`h-full w-[100%] transition-all duration-300 ${
                index === data.length - 1 ? "object-contain" : "object-cover"
              }`}
            />
            <span className="category text-white absolute text-center top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20 md:text-lg font-bold text-xs">
              {e.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
