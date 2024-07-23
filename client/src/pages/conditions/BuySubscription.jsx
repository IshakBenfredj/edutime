import React from 'react'
import Title from '../../components/Title'
import images from '../../constants/images'
import './styles.css'
import ccp from '../../constants/ccp'
import HelmetHead from '../../components/HelmetHead'

const BuySubscription = () => {
  return (
    <div className="conditions container">
      <Title title={'كيف شراء إشتراك في منصة EduTime ؟'} />
      <pre className="gray-bg text-color text">
        <span>الخطوة رقم 1 :</span> <br />
        قم بإنشاء حساب جديد كمركز  أو إذا كان لديك حساب قم بتسجيل الدخول. <br /><br />

        <span>الخطوة رقم 2 :</span> <br />
        قم بالنقر على زر “أضف دورة” بعدها إملئ جميع المعلومات الخاصة بدورتك. <br /><br />

        <span>الخطوة رقم 3 :</span> <br />
        إختر الخطة التي تناسبك و قم بنسخ معلومات حسابنا  CCP، ثم انتقل إلى أقرب مكتب بريد لإجراء الدفع. <br /><br />

        <span>الخطوة رقم 4 :</span> <br />
        أنقر على زر بريد الجزائر الموجود أسفل الموقع، و إملئ جميع المعلومات ثم أنقر على إرسال صورة لإرسال وصل الدفع إلينا. <br /><br />
        <img src={images.barid} className='img-barid' alt="" />
        <span>الخطوة رقم 5 :</span> <br />
        بعد إرسال وصل الدفع إلينا ستتم مراجعتها من طرف فريقنا خلال مدة زمنية قصيرة وإضافة دورتكم في منصتنا وتلقي الطلبات (الحجوزات) في دوراتكم ومراكزكم التعليمية والتديبية. <br /><br />

        <div className="remark">
          ملاحظة: يمكنك الدفع أيضا عن طريق تطبيق BaridiMob بنفس الخطوات، أنرقر على زر بريد الجزائر، و إملئ المعلومات ثم أنقر على تصفح لإرسال صورة شاشة لمثال عن التحقق من صحة الطلب.
        </div> <br />

        <span> معلومات CCP :</span> <br />
        الإسم واللقب: {ccp.name}<br />
        رقم الحساب: {ccp.num}<br />
        المفتاح: {ccp.key}<br />
        العنوان: {ccp.address}<br />
        بريدي موب: {ccp.baridi}<br />

      </pre>
    </div>
  )
}

export default BuySubscription