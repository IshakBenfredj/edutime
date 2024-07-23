import Landing from "./Landing";
import Categories from "./Categories";
import About from "./About";
import Contact from "./contact/Contact";
import CoursesSugg from "./CoursesSugg";
import WhyUs from "./WhyUs";
import Advertisement from "./Advertisement";
import HelmetHead from "../../components/HelmetHead";
const Home = () => {
  return (
    <>
      <HelmetHead
        title={"الرئيسية | EduTime"}
        desc={"الصفحة الرئيسية لمنصة Edutime التعليمية"}
      />
      <Landing />
      <Advertisement />
      <Categories />
      <CoursesSugg />
      <About />
      <WhyUs />
      <Contact />
    </>
  );
};

export default Home;
