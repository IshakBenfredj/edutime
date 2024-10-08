import { Link } from "react-router-dom";
import Title from "../../components/Title";
import "./styles.css";
import HelmetHead from "../../components/HelmetHead";

const PlatformWork = () => {

  return (
    <div className="conditions container">
      <HelmetHead title={'كيف تعمل منصتنا ؟'} desc={'كيف تعمل منصتنا Edutime التعليمية'} />
      <Title title={"كيف تعمل منصتنا ؟"} />
      <pre className="gray-bg text-color text">
        تهدف هذه الصفحة إلى تقديم إجابات عن الأسئلة الأكثر شيوعًا حول{" "}
        <span>Edutime </span> إذا لم تجد إجابة لسؤالك في هذه الصفحة فلا تتردد
        بمراسلتنا على{" "}
        <Link to={"mailto:edutime19@gmail.com"}>edutime19@gmail.com</Link> ، أو
        على الأرقام التالية: 09 88 48 0556 ،سيكون فريقنا سعيدًا بالرد عليكم
        <br />. نحن منصة<span>Edutime </span> للحجز الإلكتروني للدورات في
        المراكز التعليم والتدريب نوفر تجربة سلسة ومبتكرة للمراكز والمتدربين.
        يمكنك بسهولة استعراض وحجز مجموعة متنوعة من الدورات، مع معلومات واضحة عن
        كل دورة وتقييمات الطلاب السابقين. نوفر واجهة سهلة الاستخدام. نسعى لتلبية
        احتياجات عملائنا عبر تقديم تجربة حجز مريحة وموثوقة. نحرص أيضًا على تقديم
        الدعم والتعاون لمقدمي الخدمات لتعزيز تجربة الحجز وتوفير أفضل العروض
        والخيارات للطلاب. إن<span>Edutime </span> مكرسة لتحسين و تطوير قطاع
        الخدمات الالكترونية في الجزائر. <br />
        <span>
          <span>🟢إذا كنت من مقدمي الخدمات(مركز): </span>
        </span>{" "}
        تقوم بإنشاء حساب جديد كمركز أو سجل الدخول للموقع إذا كان لديك حساب، ثم
        قم بالنقر بعدها على زر “أضف إعلان” بعدها إملئ جميع المعلومات الخاصة
        بدورتك.  بعد اضافة دورتك في منصتنا وتلقي
        الطلبات (الحجوزات) في دوراتك سوف تتصليون بهم هاتفيا لتأكيد حجوزاتهم
        واستعلامهم بمزيد من المعلومات. <br />
        <span>
          🟢 إذا كنت من الراغبين في تطوير مهاراتك في مختلف المجالات (متعلم):{" "}
        </span>
        أنشئ حساباً جديداً كمتعلم أو سجل الدخول للموقع إذا كان لديك حساب، ابحث عن
        العروض واختر منها التي تناسبك يمكنك ايجاد الدورات من خلال الكتابة في
        محرك البحث تسمية الدورة التي تريدها او من خلال التصنيفات او يمكنك تصفحها
        عن طريق المراكز، ان كنت مهتما بدورة ما يمكنك ان تحجز مقعد فيها، او
        التوصية بها، او التواصل مع المركز بشكل مباشر لمعرفة بقية التفاصيل، بعد
        إتمام الحجز لدورة التي اخترتها سيتم بعدها الاتصال بك من مركز الدورة
        لتأكيد حجزك واستعلامك بمزيد من المعلومات، كما يمكنك إلغاء الحجز فأي وقت
        وحجز دورة أخرى جديدة. <br />
      </pre>
    </div>
  );
};

export default PlatformWork;
