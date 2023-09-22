import './about.css'
import Title from '../../../components/title/Title'
import images from '../../../constants/images'

const About = () => {
  return (
    <section id='about'>
        <Title title={'من نحن ؟'} 
        minTitle={'تعرف علينا أكثر'} />
        <div className="info center container">
          <img src={images.aboutLogo} alt="" />
          <div className="text">
            نحن منصة  <span>EduTime</span> للحجز الإلكتروني للدورات في المراكز التعليمية والتدريبية نوفر تجربة سلسة ومبتكرة للمراكز والمتدربين. يمكنك بسهولة استعراض وحجز مجموعة متنوعة من الدورات، مع معلومات واضحة عن كل دورة وتقييمات الطلاب السابقين. نوفر واجهة سهلة الاستخدام. نسعى لتلبية احتياجات عملائنا عبر تقديم تجربة حجز مريحة وموثوقة. نحرص أيضًا على تقديم الدعم والتعاون لمقدمي الخدمات لتعزيز تجربة الحجز وتوفير أفضل العروض والخيارات للطلاب. إن <span>EduTime</span>  مكرسة لتطوير قطاع التعليم والتدريب, وتحسين الخدمات الإلكترونية في الجزائر.
          </div>
        </div>
    </section>
  )
}

export default About