import React from "react";
import Landing from "./Landing";
import Categories from "./Categories";
import About from "./About";
import Contact from "./contact/Contact";
import CoursesSugg from "./CoursesSugg";
import WhyUs from "./WhyUs";
const Home = () => {
  return (
    <>
      <Landing />
      <Categories />
      <CoursesSugg />
      <About />
      <WhyUs />
      <Contact />
    </>
  );
};

export default Home;
