import React from 'react'
import './styles.css'
import Title from '../../components/title/Title'
import Offers from '../../components/offers/Offers'

const SubscriptionDetails = () => {
  return (
    <div className="conditions container">
        <Title title={'تفاصيل الاشتراك'} />
        <pre className="gray-bg text-color text">
            قم بإختيار الخطة المناسبة لك وأعرض خدماتك على منصتنا وأصحل على عملاء لمركزك  <br/>
            كما أننا نحن فريق <span>EduTime</span> سوف نقوب بالترويج لخدماتك ومركزك بتصاميم احترافية من طرف مختصين في مجال التصميم والتسويق عبر منصات التواصل الإجتماعي . <br/>
            <Offers />
            مع <span>EduTime</span> كن مميزا وارتقي بخدماتك بتوفير تجربة أفضل للمتدربين والمتعلمين. <br/>
        </pre>
    </div>
  )
}

export default SubscriptionDetails