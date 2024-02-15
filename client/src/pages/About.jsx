import Title from "../components/title/Title";
import images from "../constants/images";

const About = () => {
  return (
    <section className="py-12 bg-bgcolor">
      <Title title={"من نحن ؟"} minTitle={"تعرف علينا أكثر"} />
      <div className="container grid lg:grid-cols-3 grid-cols-1 items-center lg:gap-0 gap-3">
        <img src={images.aboutLogo} alt="" className="col-span-1 lg:w-3/5 w-2/5 mx-auto" />
        <div className="col-span-2 text-gray-800 lg:leading-10 leading-7 lg:text-xl text-base">
          نحن منصة <span className="text-primary font-bold">EduTime</span> للحجز الإلكتروني للدورات في المراكز
          التعليمية والتدريبية نوفر تجربة سلسة ومبتكرة للمراكز والمتدربين. يمكنك
          بسهولة استعراض وحجز مجموعة متنوعة من الدورات، مع معلومات واضحة عن كل
          دورة وتقييمات الطلاب السابقين. نوفر واجهة سهلة الاستخدام. نسعى لتلبية
          احتياجات عملائنا عبر تقديم تجربة حجز مريحة وموثوقة. نحرص أيضًا على
          تقديم الدعم والتعاون لمقدمي الخدمات لتعزيز تجربة الحجز وتوفير أفضل
          العروض والخيارات للطلاب. إن <span className="text-primary font-bold">EduTime</span> مكرسة لتطوير قطاع
          التعليم والتدريب, وتحسين الخدمات الإلكترونية في الجزائر.
        </div>
      </div>
    </section>
  );
};

export default About;
